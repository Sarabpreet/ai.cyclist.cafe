import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('..',import.meta.url));
execFileSync(process.execPath,['scripts/build.mjs'],{cwd:root});
const html=await readFile(path.join(root,'dist/index.html'),'utf8'),tools=JSON.parse(await readFile(path.join(root,'dist/tools.json'),'utf8'));
const expected=['get_cafe_status','search_menu','get_menu_item','list_events','get_event','quote_order','prepare_checkout','get_checkout_status','get_my_order','prepare_event_rsvp','get_event_rsvp_status','get_my_event_rsvps'];

test('All 12 current contracts are rendered statically and examples use real schema field names',()=>{
 assert.deepEqual(tools.map(tool=>tool.name).sort(),expected.sort());assert.equal(new Set(tools.map(tool=>tool.name)).size,12);
 for(const tool of tools){assert(html.includes(`<code>${tool.name}</code>`));assert(tool.example&&typeof tool.example==='object');assert(!['customerId','price','isPaid','paymentMethod'].some(key=>key in tool.example));}
 assert.equal(tools.filter(tool=>tool.scope===null).length,5);
 assert.equal(tools.find(tool=>tool.name==='quote_order').example.fulfilment,'takeaway');
 assert.match(tools.find(tool=>tool.name==='prepare_event_rsvp').example.requestId,/^[a-f0-9-]{36}$/);
 assert(!html.includes('<!-- TOOL_ROWS -->'));
});
test('All internal anchors and declared IDs are valid and unique',()=>{
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);assert.equal(new Set(ids).size,ids.length,'Duplicate HTML ID');
 for(const [,id]of html.matchAll(/href="#([^"]+)"/g))assert(ids.includes(id),'Missing anchor '+id);
 for(const [,id]of html.matchAll(/aria-(?:controls|labelledby)="([^"]+)"/g))assert(ids.includes(id),'Missing ARIA target '+id);
});
test('Every local link, screenshot and script resolves to the standalone output',async()=>{
 const urls=[...html.matchAll(/(?:href|src|data-image)="(\/[^"#?]*)"/g)].map(match=>match[1]);
 for(const url of urls){let file=path.join(root,'dist',url);if((await stat(file)).isDirectory())file=path.join(file,'index.html');assert((await stat(file)).isFile(),'Missing local asset '+url);}
 const screenshots=[...html.matchAll(/<img[^>]+src="(\/screenshots\/[^"]+)"[^>]+alt="([^"]+)"/g)];assert(screenshots.length>=6);
 for(const [,url,alt]of screenshots){assert(alt.length>35);const bytes=await readFile(path.join(root,'dist',url));assert(bytes.subarray(1,4).toString()==='PNG','Expected real PNG '+url);}
});
test('Connection metadata, static safety boundaries and machine-readable guide agree',async()=>{
 const metadata=JSON.parse(await readFile(path.join(root,'dist/cyclist-mcp.json'),'utf8')),llms=await readFile(path.join(root,'dist/llms.txt'),'utf8');
 assert.equal(metadata.endpoint,'https://api.cyclist.cafe/mcp');assert.equal(metadata.customerConfirmationRequired,true);assert.equal(metadata.authentication.clientRegistration,'dynamic-client-registration');
 for(const name of expected)assert(llms.includes(name),'Agent instructions missing '+name);
 for(const text of ['Local flows verified','fictional test data','CIMD','DCR','payment is collected at the café counter','does not activate the server'])assert(html.includes(text),text);
 assert(!/<iframe|<script[^>]*src="https?:|<link[^>]*href="https?:[^>]*(?:stylesheet|woff)/i.test(html));
 const headers=await readFile(path.join(root,'dist/_headers'),'utf8');assert(headers.includes("default-src 'self'"));assert(headers.includes("frame-ancestors 'none'"));
 const app=await readFile(path.join(root,'dist/app.js'),'utf8');assert(!/localStorage|document\.cookie|innerHTML|api\.cyclist\.cafe/.test(app),'Guide must not store credentials, inject search HTML or call business API');
});
test('pnpm is pinned and the project has no runtime/development dependency duplication',async()=>{
 const pkg=JSON.parse(await readFile(path.join(root,'package.json'),'utf8'));assert.equal(pkg.packageManager,'pnpm@9.15.9');assert.equal(Object.keys(pkg.dependencies||{}).length,0);assert.equal(Object.keys(pkg.devDependencies||{}).length,0);
 execFileSync(process.execPath,['--check','src/app.js'],{cwd:root});
});

test('SEO metadata and structured data consistently identify the public guide',async()=>{
 const title=html.match(/<title>([^<]+)<\/title>/)?.[1];assert(title?.includes('MCP Server for Cyclist Cafe'));
 assert.equal((html.match(/<h1\b/g)||[]).length,1);
 assert.match(html,/<h1[^>]*>MCP Server for<br>Cyclist Café\./);
 assert(html.includes('rel="canonical" href="https://ai.cyclist.cafe/"'));
 assert(html.includes('name="robots" content="index,follow,max-image-preview:large"'));
 const description=html.match(/name="description" content="([^"]+)"/)?.[1];assert(description?.length>=100&&description.length<=170);assert(description.includes('MCP server for Cyclist Cafe'));
 const json=html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];assert(json);
 const schema=JSON.parse(json);assert.equal(schema['@context'],'https://schema.org');
 const article=schema['@graph'].find(node=>node['@type']==='TechArticle');assert.equal(article.url,'https://ai.cyclist.cafe/');assert.equal(article.about.url,'https://api.cyclist.cafe/mcp');assert.equal(article.mainEntityOfPage,article.url);assert(article.description.includes('Production activation is separate'));
 const website=schema['@graph'].find(node=>node['@type']==='WebSite');assert.equal(website.url,article.url);
 const {createHash}=await import('node:crypto'),hash=createHash('sha256').update(json).digest('base64'),headers=await readFile(path.join(root,'dist/_headers'),'utf8');assert(headers.includes(`script-src 'self' 'sha256-${hash}'`));assert(!headers.includes("'unsafe-inline'"));
 const social=await readFile(path.join(root,'dist/social/mcp-server-cyclist-cafe.jpg'));assert.equal(social.subarray(0,3).toString('hex'),'ffd8ff');assert(html.includes('name="twitter:card" content="summary_large_image"'));
 const robots=await readFile(path.join(root,'dist/robots.txt'),'utf8'),sitemap=await readFile(path.join(root,'dist/sitemap.xml'),'utf8');assert(robots.includes('Sitemap: https://ai.cyclist.cafe/sitemap.xml'));assert(sitemap.includes('<loc>https://ai.cyclist.cafe/</loc>'));
});


test('Presentation has complete content, notes, local assets and safe controls',async()=>{
 const ppt=await readFile(path.join(root,'dist/ppt/index.html'),'utf8');
 const slides=[...ppt.matchAll(/<section id="([^"]+)" data-chapter="([^"]+)"/g)];
 assert.equal(slides.length,19);assert.equal(new Set(slides.map(s=>s[1])).size,19);
 assert.equal((ppt.match(/<aside class="notes">/g)||[]).length,19);
 for(const id of ['why','when','connect','takeaway','events','control','boundaries','retry','availability'])assert(slides.some(s=>s[1]===id));
 for(const [,url]of ppt.matchAll(/(?:href|src)="(\/[^"#?]*)/g)){let file=path.join(root,'dist',url);if((await stat(file)).isDirectory())file=path.join(file,'index.html');assert((await stat(file)).isFile(),url);}
 const headers=await readFile(path.join(root,'dist/_headers'),'utf8');assert(headers.includes("style-src 'self' 'sha256-"));assert(!headers.includes("'unsafe-inline'"));
 assert(ppt.includes('https://api.cyclist.cafe/mcp'));assert(ppt.includes('https://ai.cyclist.cafe/ppt/'));assert(ppt.includes('fictional data'));assert(ppt.includes('Publishing this presentation does not enable MCP.'));
 assert(!/<iframe|<script[^>]*src="https?:/.test(ppt));assert(!/ style=| onclick=/.test(ppt));
 const js=await readFile(path.join(root,'dist/ppt/presentation.js'),'utf8');assert(!/\bfetch\(|XMLHttpRequest|localStorage|document\.cookie/.test(js));
 execFileSync(process.execPath,['--check','public/ppt/presentation.js'],{cwd:root});
 assert((await readFile(path.join(root,'dist/ppt/vendor/LICENSE'),'utf8')).includes('Permission is hereby granted'));
 assert((await readFile(path.join(root,'dist/sitemap.xml'),'utf8')).includes('<loc>https://ai.cyclist.cafe/ppt/</loc>'));
});

test('Static preview resolves /ppt with and without a trailing slash and rejects missing files',async()=>{
 const {resolveStaticFile}=await import('../scripts/static-file.mjs');
 const dist=path.join(root,'dist');
 for(const url of ['/ppt','/ppt/','/ppt/index.html'])assert.equal(await resolveStaticFile(dist,url),path.join(dist,'ppt/index.html'));
 assert.equal(await resolveStaticFile(dist,'/'),path.join(dist,'index.html'));
 await assert.rejects(resolveStaticFile(dist,'/ppt/missing.js'));
 await assert.rejects(resolveStaticFile(dist,'/../package.json'));
});
