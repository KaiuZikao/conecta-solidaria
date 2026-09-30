import http from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const raiz=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../dist');
const tipos={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml'};
http.createServer(async(req,res)=>{try{const c=decodeURIComponent(new URL(req.url,'http://localhost').pathname);const arquivo=path.resolve(raiz,'.'+(c==='/'?'/index.html':c));if(!arquivo.startsWith(raiz+path.sep)||!tipos[path.extname(arquivo)]){res.writeHead(404);res.end('Arquivo não encontrado');return;}const dados=await readFile(arquivo);res.writeHead(200,{'Content-Type':tipos[path.extname(arquivo)],'Cache-Control':'no-store'});res.end(dados);}catch{res.writeHead(404);res.end('Arquivo não encontrado');}}).listen(8002,'127.0.0.1',()=>console.log('Abra http://127.0.0.1:8002/html/index.html — Ctrl+C encerra o servidor.'));
