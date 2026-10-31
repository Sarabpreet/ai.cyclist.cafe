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
console.log(`Built ${tools.length} documented tools into dist/. Zero runtime dependencies.`);

// Hash only the static structured data; keep executable inline scripts blocked.
const structuredData=html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
if(structuredData){const hash=createHash('sha256').update(structuredData).digest('base64');const file=path.join(out,'_headers');const headers=await readFile(file,'utf8');await writeFile(file,headers.replace("script-src 'self'",`script-src 'self' 'sha256-${hash}'`));}
