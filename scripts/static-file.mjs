import path from 'node:path';
import {stat} from 'node:fs/promises';
/** Resolve real static files and directory indexes without SPA fallbacks. */
export async function resolveStaticFile(root,pathname){
 let file=path.resolve(root,'.'+pathname);
 if(file!==root&&!file.startsWith(root+path.sep))throw Error('path');
 if((await stat(file)).isDirectory())file=path.join(file,'index.html');
 if(!(await stat(file)).isFile())throw Error('file');
 return file;
}
