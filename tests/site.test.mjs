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
 for(const url of urls){const file=path.join(root,'dist',url);assert((await stat(file)).isFile(),'Missing local asset '+url);}
 const screenshots=[...html.matchAll(/<img[^>]+src="([^"]+)"[^>]+alt="([^"]+)"/g)];assert(screenshots.length>=6);
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
