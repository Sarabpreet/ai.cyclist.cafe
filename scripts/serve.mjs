import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolveStaticFile} from './static-file.mjs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import './build.mjs';
const {default:accessWorker}=await import('../dist/_worker.js');
const root=path.join(fileURLToPath(new URL('..',import.meta.url)),'dist'),port=Number(process.env.PORT||4174);
const securityHeaders=Object.fromEntries((await readFile(path.join(root,'_headers'),'utf8')).split('\n/screenshots/')[0].split('\n').flatMap(line=>{const match=line.match(/^  ([^:]+): (.+)$/);return match?[[match[1],match[2]]]:[];}));
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.txt':'text/plain; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.xml':'application/xml','.pdf':'application/pdf','.ttf':'font/ttf'};
/** Serve only built files inside this site; missing files stay truthful 404s. */
const server=createServer(async(req,res)=>{
 const origin='http://127.0.0.1:'+port;
 const assets={async fetch(request){
  if(!['GET','HEAD'].includes(request.method))return new Response('Method not allowed.',{status:405,headers:{Allow:'GET, HEAD'}});
  try{const pathname=decodeURIComponent(new URL(request.url).pathname);
   if(['/_worker.js','/_routes.json','/_headers','/_redirects'].includes(pathname))return new Response('Page not found.',{status:404});
   const file=await resolveStaticFile(root,pathname);
   return new Response(request.method==='HEAD'?null:await readFile(file),{headers:{...securityHeaders,'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache'}});
  }catch{return new Response('Page not found.',{status:404});}
 }};
 try{
  const headers=new Headers(req.headers),chunks=[];for await(const chunk of req)chunks.push(chunk);
  const request=new Request(new URL(req.url,origin),{method:req.method,headers,body:['GET','HEAD'].includes(req.method)?undefined:Buffer.concat(chunks)});
  const response=await accessWorker.fetch(request,{ASSETS:assets,POS_PRESENTATION_PASSWORD:process.env.POS_PRESENTATION_PASSWORD,POS_PRESENTATION_COOKIE_SECRET:process.env.POS_PRESENTATION_COOKIE_SECRET});
  res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()));
 }catch{res.writeHead(500).end('Unable to serve page.');}
});
server.listen(port,'127.0.0.1',()=>console.log(`Cyclist AI guide → http://127.0.0.1:${port}`));
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>server.close(()=>process.exit(0)));
