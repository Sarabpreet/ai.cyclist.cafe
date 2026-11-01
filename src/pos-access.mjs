// Cloudflare Pages advanced-mode worker. No password or signing key belongs in this file.
const ROOT='/ppt/pos', COOKIE='__Secure-cyclist_pos_access', TTL=90*24*60*60;
const CSP='__POS_CSP__';
const encoder=new TextEncoder(), attempts=new Map();
const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function pathname(url){let value=url.pathname;for(let i=0;i<3;i++){const next=decodeURIComponent(value);if(next===value)break;value=next;}return new URL(value.replace(/\\/g,'/').replace(/\/{2,}/g,'/'),'https://local.invalid').pathname;}
const protectedPath=path=>path===ROOT||path.startsWith(ROOT+'/');
function secure(response){const headers=new Headers(response.headers);headers.set('Cache-Control','private, no-store, max-age=0');headers.set('X-Robots-Tag','noindex, nofollow, noarchive');headers.set('X-Content-Type-Options','nosniff');headers.set('Referrer-Policy','same-origin');headers.set('X-Frame-Options','DENY');headers.set('Content-Security-Policy',CSP);headers.delete('Access-Control-Allow-Origin');return new Response(response.body,{status:response.status,headers});}
function reply(body,status=200,headers={}){return secure(new Response(body,{status,headers:{'Content-Type':'text/plain; charset=utf-8',...headers}}));}
function gate(returnTo){return reply(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow,noarchive"><title>Staff training access | Cyclist Café</title><link rel="icon" href="/favicon.svg"><link rel="stylesheet" href="/ppt-access/access.css"><script src="/ppt-access/access.js" defer></script></head><body><main><a class="brand" href="/">cyclist.café</a><p class="eyebrow">FOR THE CAFÉ TEAM</p><h1>A little learning.<br><em>For a better day.</em></h1><p class="intro">Enter the password to open the POS staff presentation.</p><form action="/ppt/pos/unlock" method="post"><input type="hidden" name="returnTo" value="${escape(returnTo)}"><label for="access-password">Presentation password</label><input id="access-password" name="password" type="password" autocomplete="current-password" required maxlength="256" autofocus><p id="access-error" role="alert" aria-live="polite"></p><button type="submit">Open presentation <span aria-hidden="true">↗</span></button></form><p class="remember">Access stays unlocked in this browser for 90 days. Clearing cookies or using another browser will ask for the password again.</p></main></body></html>`,200,{'Content-Type':'text/html; charset=utf-8'});}
async function key(env){return crypto.subtle.importKey('raw',encoder.encode(env.POS_PRESENTATION_COOKIE_SECRET+'\n'+env.POS_PRESENTATION_PASSWORD),{name:'HMAC',hash:'SHA-256'},false,['sign','verify']);}
const base64url=bytes=>btoa(String.fromCharCode(...new Uint8Array(bytes))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
async function token(env){const payload='v1.'+(Math.floor(Date.now()/1000)+TTL);return payload+'.'+base64url(await crypto.subtle.sign('HMAC',await key(env),encoder.encode(payload)));}
async function authorized(request,env){try{const cookies=request.headers.get('cookie')||'',value=cookies.split(';').map(v=>v.trim()).find(v=>v.startsWith(COOKIE+'='))?.slice(COOKIE.length+1);if(!value)return false;const parts=value.split('.');if(parts.length!==3||parts[0]!=='v1'||!/^\d{10}$/.test(parts[1])||!/^[A-Za-z0-9_-]{43}$/.test(parts[2]))return false;const expires=Number(parts[1]),now=Math.floor(Date.now()/1000);if(expires<=now||expires>now+TTL+60)return false;const signature=Uint8Array.from(atob(parts[2].replace(/-/g,'+').replace(/_/g,'/')+'='),c=>c.charCodeAt(0));return await crypto.subtle.verify('HMAC',await key(env),signature,encoder.encode(parts.slice(0,2).join('.')));}catch{return false;}}
async function samePassword(a,b){const digest=value=>crypto.subtle.digest('SHA-256',encoder.encode(value));const [left,right]=await Promise.all([digest(a),digest(b)]);return new Uint8Array(left).reduce((diff,byte,index)=>diff|(byte^new Uint8Array(right)[index]),0)===0;}
async function unlock(request,env){
 const origin=new URL(request.url).origin;
 if(request.headers.get('origin')!==origin)return reply('Request not allowed.',403);
 if(!request.headers.get('content-type')?.startsWith('application/x-www-form-urlencoded'))return reply('Unsupported request.',415);
 if(Number(request.headers.get('content-length')||0)>4096)return reply('Request too large.',413);
 const text=await request.text();if(text.length>4096)return reply('Request too large.',413);
 const data=new URLSearchParams(text),ip=request.headers.get('cf-connecting-ip')||'unknown',now=Date.now();
 let attempt=attempts.get(ip);if(!attempt||attempt.until<=now){attempt={count:0,until:now+300000};if(attempts.size>1000)attempts.clear();attempts.set(ip,attempt);}
 if(attempt.count>=10)return reply('Too many attempts. Please try again in five minutes.',429,{'Retry-After':'300'});
 if(!await samePassword(data.get('password')||'',env.POS_PRESENTATION_PASSWORD)){attempt.count++;return reply('That password is incorrect. Please try again.',401);}
 attempts.delete(ip);
 const cookie=`${COOKIE}=${await token(env)}; Path=${ROOT}; Max-Age=${TTL}; HttpOnly; Secure; SameSite=Strict`;
 if(request.headers.get('accept')?.includes('application/json'))return reply('{"success":true}',200,{'Content-Type':'application/json','Set-Cookie':cookie});
 let returnTo=data.get('returnTo')||ROOT+'/';try{const target=new URL(returnTo,origin);if(target.origin!==origin||!protectedPath(pathname(target))||target.pathname===ROOT+'/unlock')returnTo=ROOT+'/';else returnTo=target.pathname+target.search;}catch{returnTo=ROOT+'/';}
 return reply(null,303,{'Location':returnTo,'Set-Cookie':cookie});
}
export default {async fetch(request,env){
 const url=new URL(request.url);let path;try{path=pathname(url);}catch{return reply('Invalid address.',400);}
 if(!protectedPath(path))return env.ASSETS.fetch(request);
 if(!env.POS_PRESENTATION_PASSWORD||!env.POS_PRESENTATION_COOKIE_SECRET)return reply('Presentation access is temporarily unavailable.',503);
 if(path===ROOT+'/unlock'){if(request.method!=='POST')return reply('Method not allowed.',405,{'Allow':'POST'});return unlock(request,env);}
 if(!['GET','HEAD'].includes(request.method))return reply('Method not allowed.',405,{'Allow':'GET, HEAD'});
 if(!await authorized(request,env)){
  const page=[ROOT,ROOT+'/',ROOT+'/index.html'].includes(path);
  const response=page?gate(path+url.search):reply('Enter the presentation password at /ppt/pos/ to access this file.',401);
  return request.method==='HEAD'?new Response(null,{status:response.status,headers:response.headers}):response;
 }
 if(path===ROOT)return reply(null,302,{Location:ROOT+'/'+url.search});
 url.pathname=path;
 return secure(await env.ASSETS.fetch(new Request(url,request)));
}};
