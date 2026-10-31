import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolveStaticFile} from './static-file.mjs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import './build.mjs';
const root=path.join(fileURLToPath(new URL('..',import.meta.url)),'dist'),port=Number(process.env.PORT||4174);
const securityHeaders=Object.fromEntries((await readFile(path.join(root,'_headers'),'utf8')).split('\n/screenshots/')[0].split('\n').flatMap(line=>{const match=line.match(/^  ([^:]+): (.+)$/);return match?[[match[1],match[2]]]:[];}));
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.txt':'text/plain; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.xml':'application/xml'};
/** Serve only built files inside this site; missing files stay truthful 404s. */
const server=createServer(async(req,res)=>{
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{Allow:'GET, HEAD'}).end();return;}
 try{
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname),file=await resolveStaticFile(root,pathname);
  res.writeHead(200,{...securityHeaders,'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});res.end(req.method==='HEAD'?undefined:await readFile(file));
 }catch{res.writeHead(404,{'Content-Type':'text/plain'}).end('Page not found.');}
});
server.listen(port,'127.0.0.1',()=>console.log(`Cyclist AI guide → http://127.0.0.1:${port}`));
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>server.close(()=>process.exit(0)));
