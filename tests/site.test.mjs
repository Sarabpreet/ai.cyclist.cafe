import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('..',import.meta.url));
execFileSync(process.execPath,['scripts/build.mjs'],{cwd:root});
const html=await readFile(path.join(root,'dist/index.html'),'utf8'),tools=JSON.parse(await readFile(path.join(root,'dist/tools.json'),'utf8'));
const expected=['get_cafe_status','search_menu','get_menu_item','list_events','get_event','quote_order','prepare_checkout','get_checkout_status','get_my_order','prepare_event_rsvp','get_event_rsvp_status','get_my_event_rsvps','list_my_orders','get_my_rewards','get_table_status'];

test('All 15 documented contracts are rendered statically and examples use real schema field names',()=>{
 assert.deepEqual(tools.map(tool=>tool.name).sort(),expected.sort());assert.equal(new Set(tools.map(tool=>tool.name)).size,15);
 for(const tool of tools){assert(html.includes(`<code>${tool.name}</code>`));assert(tool.example&&typeof tool.example==='object');assert(!['customerId','price','isPaid','paymentMethod'].some(key=>key in tool.example));}
 assert.equal(tools.filter(tool=>tool.scope===null).length,6);
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
 for(const text of ['Local flows verified','fictional test data','CIMD','DCR','Payment is collected at the café counter','does not activate the server'])assert(html.includes(text),text);
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
 const ppt=await readFile(path.join(root,'dist/ppt/ai/index.html'),'utf8');
 const slides=[...ppt.matchAll(/<section id="([^"]+)" data-chapter="([^"]+)"/g)];
 assert.equal(slides.length,19);assert.equal(new Set(slides.map(s=>s[1])).size,19);
 assert.equal((ppt.match(/<aside class="notes">/g)||[]).length,19);
 for(const id of ['why','when','connect','takeaway','events','control','boundaries','retry','availability'])assert(slides.some(s=>s[1]===id));
 for(const [,url]of ppt.matchAll(/(?:href|src)="(\/[^"#?]*)/g)){let file=path.join(root,'dist',url);if((await stat(file)).isDirectory())file=path.join(file,'index.html');assert((await stat(file)).isFile(),url);}
 const headers=await readFile(path.join(root,'dist/_headers'),'utf8');assert(headers.includes("style-src 'self' 'sha256-"));assert(!headers.includes("'unsafe-inline'"));
 assert(ppt.includes('https://api.cyclist.cafe/mcp'));assert(ppt.includes('https://ai.cyclist.cafe/ppt/ai/'));assert(ppt.includes('fictional data'));assert(ppt.includes('Publishing this presentation does not enable MCP.'));
 assert(!/<iframe|<script[^>]*src="https?:/.test(ppt));assert(!/ style=| onclick=/.test(ppt));
 const js=await readFile(path.join(root,'dist/ppt/ai/presentation.js'),'utf8');assert(!/\bfetch\(|XMLHttpRequest|localStorage|document\.cookie/.test(js));
 execFileSync(process.execPath,['--check','public/ppt/ai/presentation.js'],{cwd:root});
 assert((await readFile(path.join(root,'dist/ppt/ai/vendor/LICENSE'),'utf8')).includes('Permission is hereby granted'));
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


test('Presentation library separates AI and POS decks and retains all training companions',async()=>{
 const base=path.join(root,'dist/ppt');
 const hub=await readFile(path.join(base,'index.html'),'utf8');
 assert(hub.includes('href="/ppt/ai/"'));assert(!hub.includes('/ppt/pos'));assert(!hub.includes('POS training'));
 assert(!(await readFile(path.join(root,'dist/sitemap.xml'),'utf8')).includes('/ppt/pos'));
 const {resolveStaticFile}=await import('../scripts/static-file.mjs');
 for(const name of ['ai','pos']){
  for(const suffix of ['', '/', '/index.html'])assert.equal(await resolveStaticFile(path.join(root,'dist'),'/ppt/'+name+suffix),path.join(base,name,'index.html'));
  const page=await readFile(path.join(base,name,'index.html'),'utf8');
  assert(page.includes('href="/ppt/"'));assert(page.includes('https://ai.cyclist.cafe/ppt/'+name+'/'));
  for(const [,url]of page.matchAll(/(?:href|src)="([^"#?]+)"/g)){
   if(/^https?:/.test(url))continue;
   let file=url.startsWith('/')?path.join(root,'dist',url):path.join(base,name,url);
   if((await stat(file)).isDirectory())file=path.join(file,'index.html');
   assert((await stat(file)).isFile(),'Missing deck asset '+url);
  }
 }
 const vm=await import('node:vm'),context={window:{}};
 vm.runInNewContext(await readFile(path.join(base,'pos/deck-data.js'),'utf8'),context);
 const slides=context.window.POS_TRAINING.slides;assert.equal(slides.length,72);
 assert.equal(new Set(slides.map(slide=>slide.id)).size,72);assert(slides.every(slide=>slide.notes.length>0));
 const training=await readFile(path.join(base,'pos/training.js'),'utf8');assert(!training.includes(' style='));
 for(const file of ['Cyclist-Cafe-POS-Staff-Training.pdf','Daily-Shift-Checklist.pdf'])assert.equal((await readFile(path.join(base,'pos',file))).subarray(0,5).toString(),'%PDF-');
 const legacy=await readFile(path.join(base,'library.js'),'utf8');
 for(const [hash,search,expected]of [['#/why','','/ppt/ai/#/why'],['','?print-pdf','/ppt/ai/?print-pdf'],['','','']]){
  let actual='';vm.runInNewContext(legacy,{URLSearchParams,location:{hash,search,replace:value=>actual=value}});assert.equal(actual,expected);
 }
});

test('Actual SDK schema snapshot, human examples, scopes and all selector options stay in sync',async()=>{
 const snapshot=JSON.parse(await readFile(path.join(root,'dist/mcp-tools.schema.json'),'utf8'));
 assert.deepEqual(snapshot.tools.map(tool=>tool.name).sort(),tools.map(tool=>tool.name).sort());
 for(const tool of tools){
  const actual=snapshot.tools.find(row=>row.name===tool.name);assert.deepEqual(tool.inputSchema,actual.inputSchema);assert.equal(tool.description,actual.description);
  const security=actual._meta.securitySchemes[0];assert.equal(tool.scope,security.type==='oauth2'?security.scopes[0]:null);
  for(const field of Object.keys(tool.example))assert(field in actual.inputSchema.properties,tool.name+' example uses an unknown argument');
  for(const field of actual.inputSchema.required||[])assert(field in tool.example,tool.name+' example omits required '+field);
  assert(html.includes('<option value="'+tool.name+'">'+tool.name+'</option>'),'Example selector missing '+tool.name);
 }
 assert(html.includes('All tools <span>15</span>'));assert(!html.includes('<!-- TOOL_COUNT -->'));assert(!html.includes('<!-- TOOL_OPTIONS -->'));
 assert.equal(tools.find(row=>row.name==='search_menu').inputSchema.properties.detail.default,'summary');
 assert.equal(snapshot.checkoutPolicy.linkTtlMinutes,10);assert.equal(snapshot.checkoutPolicy.requiresSignIn,false);assert.equal(snapshot.checkoutPolicy.preparationRequiresPayment,true);
});
test('Ticket links, cancellation, payment gating and RSVP authentication are distinguished with accurate deployment verification limits',async()=>{
 const llms=await readFile(path.join(root,'dist/llms.txt'),'utf8'),metadata=JSON.parse(await readFile(path.join(root,'dist/cyclist-mcp.json'),'utf8'));
 assert.equal(metadata.toolCount,15);assert.equal(metadata.release.status,'deployed-contracts-verified');
 for(const text of ['#ticket=','No repeat login','Not paid','cancel','fresh quote','No production orders','RSVP links'])assert(llms.includes(text),text);
 for(const tool of ['confirm_order','cancel_order','pay_order','confirm_ticket','cancel_ticket'])assert(!tools.some(row=>row.name===tool),'A browser-only action was advertised as an MCP tool');
 assert(html.includes('Live MCP discovery reports all 15 tools'));assert(html.includes('RSVP links also last ten minutes'));assert(html.includes('without signing in again'));assert(html.includes('No repeat login'));
 const deck=await readFile(path.join(root,'dist/ppt/ai/index.html'),'utf8');assert(deck.includes('Not paid'));assert(deck.includes('Hosted discovery verified'));assert(!deck.includes('Verify your identity and approve the exact order.'));
});
