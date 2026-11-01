import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../src/pos-access.mjs';
const origin='https://ai.cyclist.cafe',password='fixture-password-only',secret='fixture-cookie-signing-key-with-32-characters';
let forwarded=0;
const env={POS_PRESENTATION_PASSWORD:password,POS_PRESENTATION_COOKIE_SECRET:secret,ASSETS:{fetch:async request=>{forwarded++;return new Response('protected file: '+new URL(request.url).pathname,{headers:{'Content-Type':'text/html','Access-Control-Allow-Origin':'*'}})}}};
const get=(path,headers={})=>worker.fetch(new Request(origin+path,{headers}),env);
const post=(fields,extra={})=>worker.fetch(new Request(origin+'/ppt/pos/unlock',{method:'POST',headers:{Origin:origin,'Content-Type':'application/x-www-form-urlencoded','CF-Connecting-IP':crypto.randomUUID(),...extra},body:new URLSearchParams(fields)}),env);
async function login(){const response=await post({password},{Accept:'application/json'});assert.equal(response.status,200);return response.headers.get('set-cookie');}
test('Direct visit prompts; slide source, notes, PDF and encoded paths cannot bypass it',async()=>{
 forwarded=0;
 for(const path of ['/ppt/pos','/ppt/pos/','/ppt/pos/index.html']){const response=await get(path);assert.equal(response.status,200);const body=await response.text();assert(body.includes('type="password"'));assert(!body.includes(password));assert(!body.includes('POS_TRAINING'));}
 for(const path of ['/ppt/pos/deck-data.js','/ppt/pos/training.js','/ppt/pos/trainer-notes.html','/ppt/pos/Cyclist-Cafe-POS-Staff-Training.pdf','/ppt/%70os/deck-data.js','/ppt/pos%2fdeck-data.js','//ppt//pos//deck-data.js','/ppt/%2570os/deck-data.js'])assert.equal((await get(path)).status,401,path);
 assert.equal(forwarded,0);
});
test('Correct entry creates a scoped 90-day signed cookie and grants protected files',async()=>{
 const cookie=await login();
 for(const flag of ['Path=/ppt/pos','Max-Age=7776000','HttpOnly','Secure','SameSite=Strict'])assert(cookie.includes(flag));
 assert(!cookie.includes(password));
 const response=await get('/ppt/pos/deck-data.js',{Cookie:cookie.split(';')[0]});assert.equal(response.status,200);assert((await response.text()).startsWith('protected file:'));
 assert.equal(response.headers.get('cache-control'),'private, no-store, max-age=0');assert.equal(response.headers.get('x-robots-tag'),'noindex, nofollow, noarchive');assert.equal(response.headers.get('access-control-allow-origin'),null);
});
test('Incorrect password, localStorage-style flags, forged and expired cookies are rejected',async()=>{
 assert.equal((await post({password:'incorrect'})).status,401);
 for(const Cookie of ['haspassword=true','__Secure-cyclist_pos_access=true','__Secure-cyclist_pos_access=v1.9999999999.'+'A'.repeat(43)])assert.equal((await get('/ppt/pos/deck-data.js',{Cookie})).status,401);
 const valid=(await login()).split(';')[0],forged=valid.slice(0,-1)+(valid.endsWith('A')?'B':'A');
 assert.equal((await get('/ppt/pos/deck-data.js',{Cookie:forged})).status,401);
 const futureDate=Date.now()+91*86400000,realNow=Date.now;Date.now=()=>futureDate;
 try{assert.equal((await get('/ppt/pos/deck-data.js',{Cookie:valid})).status,401);}finally{Date.now=realNow;}
});
test('Configuration fails closed and password/signing-key rotation revokes previous browsers',async()=>{
 const cookie=(await login()).split(';')[0];
 for(const bindings of [{},{POS_PRESENTATION_PASSWORD:password},{POS_PRESENTATION_COOKIE_SECRET:secret}])assert.equal((await worker.fetch(new Request(origin+'/ppt/pos/deck-data.js'),{...bindings,ASSETS:env.ASSETS})).status,503);
 for(const changed of [{POS_PRESENTATION_PASSWORD:'changed'},{POS_PRESENTATION_COOKIE_SECRET:'changed'}])assert.equal((await worker.fetch(new Request(origin+'/ppt/pos/deck-data.js',{headers:{Cookie:cookie}}),{...env,...changed})).status,401);
});
test('Login enforces same-origin POST and cannot redirect to another website',async()=>{
 assert.equal((await post({password},{Origin:'https://other.example'})).status,403);
 assert.equal((await get('/ppt/pos/unlock')).status,405);
 assert.equal((await post({password},{'Content-Type':'application/json'})).status,415);
 const response=await post({password,returnTo:'https://other.example/'});assert.equal(response.status,303);assert.equal(response.headers.get('location'),'/ppt/pos/');
 const ip='rate-limit-test';for(let i=0;i<10;i++)assert.equal((await post({password:'wrong'},{'CF-Connecting-IP':ip})).status,401);
 assert.equal((await post({password},{'CF-Connecting-IP':ip})).status,429);
});
test('Public AI content stays available; HEAD does not send protected content',async()=>{
 assert.equal((await get('/ppt/ai/')).status,200);
 const head=await worker.fetch(new Request(origin+'/ppt/pos/deck-data.js',{method:'HEAD'}),env);assert.equal(head.status,401);assert.equal(await head.text(),'');
});
