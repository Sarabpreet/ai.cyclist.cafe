import {createHash} from 'node:crypto';
import {cp,mkdir,readFile,rm,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('..',import.meta.url)),out=path.join(root,'dist');
await rm(out,{recursive:true,force:true});await mkdir(out,{recursive:true});
await cp(path.join(root,'public'),out,{recursive:true});
for(const file of ['index.html','styles.css','app.js','tools.json'])await cp(path.join(root,'src',file),path.join(out,file));
const tools=JSON.parse(await readFile(path.join(root,'src/tools.json'),'utf8'));
const html=await readFile(path.join(out,'index.html'),'utf8');
/** Escape documentation data before interpolating it into the static tool reference. */
const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rows=tools.map(tool=>`<tr data-tool-group="${escape(tool.group)}"><th scope="row"><code>${escape(tool.name)}</code><span>${escape(tool.description)}</span></th><td>${tool.scope?`<code>${escape(tool.scope)}</code>`:'Public'}</td><td>${escape(tool.effect)}</td></tr>`).join('\n');
await writeFile(path.join(out,'index.html'),html.replace('<!-- TOOL_ROWS -->',rows));
console.log(`Built ${tools.length} documented tools into dist/. No installed runtime packages.`);

// Hash only the static structured data; keep executable inline scripts blocked.
const structuredData=html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
if(structuredData){const hash=createHash('sha256').update(structuredData).digest('base64');const file=path.join(out,'_headers');const headers=await readFile(file,'utf8');await writeFile(file,headers.replace("script-src 'self'",`script-src 'self' 'sha256-${hash}'`));}

// Reveal.js 6.0.2 print styles for the fixed 1280×720 deck (margin 0.035).
// Permit these exact blocks, never unsafe-inline or arbitrary executable scripts.
const printStyles=['@page{size:1324px 745px; margin: 0px;}','.reveal section>img, .reveal section>video, .reveal section>iframe{max-width: 1280px; max-height:720px}'];
printStyles.push('@page{size:1600px 900px; margin: 0px;}','.reveal section>img, .reveal section>video, .reveal section>iframe{max-width: 1600px; max-height:900px}');
const styleHashes=printStyles.map(css=>`'sha256-${createHash('sha256').update(css).digest('base64')}'`).join(' ');
const headersFile=path.join(out,'_headers');
await writeFile(headersFile,(await readFile(headersFile,'utf8')).replace("style-src 'self'",`style-src 'self' ${styleHashes}`));

// Reveal restores only these display attributes when switching view modes.
const displayHashes=['display: none;','display: block;'].map(css=>`'sha256-${createHash('sha256').update(css).digest('base64')}'`).join(' ');
await writeFile(headersFile,(await readFile(headersFile,'utf8')).replace("; img-src",`; style-src-attr 'unsafe-hashes' ${displayHashes}; img-src`));

// Gate every POS file before it reaches Pages' static assets. Never embed secrets.
const policies=await readFile(headersFile,'utf8');
const posCsp=policies.match(/Content-Security-Policy: (.+)/)[1].replace("form-action 'none'","form-action 'self'");
const worker=(await readFile(path.join(root,'src/pos-access.mjs'),'utf8')).replace("'__POS_CSP__'",JSON.stringify(posCsp));
await writeFile(path.join(out,'_worker.js'),worker);
// Run before all static assets, including encoded forms of the protected path.
await writeFile(path.join(out,'_routes.json'),JSON.stringify({version:1,include:['/*'],exclude:[]}));
