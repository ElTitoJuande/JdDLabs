import { createServer } from 'vite';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
const hashes = new Set();
try {
  const pages = [['index','main','Portada'],['caso-cristaleria','caso','CasoCristaleria'],['aviso-legal','legal','PaginaLegal'],['privacidad','legal','PaginaLegal'],['404','notfound','NoEncontrada']];
  for (const [file, entry, component] of pages) {
    const module = await server.ssrLoadModule('/src/entries/' + entry + '.jsx');
    const props = entry === 'legal' ? { documento: module.DOCUMENTOS[file] } : {};
    let html = await readFile('dist/' + file + '.html', 'utf8');
    const content = renderToString(createElement(module[component], props));
    html = html.replace(/(<div id="root"[^>]*>)(<\/div>)/, (_, open, close) => open + content + close).replace(/<noscript>[\s\S]*?<\/noscript>/g, '');
    for (const [, body] of html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)) hashes.add("'sha256-" + createHash('sha256').update(body).digest('base64') + "'");
    await writeFile('dist/' + file + '.html', html);
    console.log('Prerendered ' + file);
  }
  const headers = await readFile('public/_headers', 'utf8');
  await writeFile('dist/_headers', headers.replace('SCRIPT_HASHES', [...hashes].join(' ')));
} finally { await server.close(); }
