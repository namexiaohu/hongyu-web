const fs = require('fs');
const path = require('path');

const ui = 'F:/data/dev/ui/b0e1b467-99c1-439c-a5a1-8c35335c4da6';
const outDir = 'F:/data/dev/html/lianchuan/hongyu/hongyu-web/src/app';
fs.mkdirSync(outDir, { recursive: true });

const files = fs.readdirSync(ui).filter((f) => f.endsWith('.html') && !f.includes('artifact'));
let css = '/* Concatenated from UI HTML prototypes */\n';

for (const f of files) {
  const html = fs.readFileSync(path.join(ui, f), 'utf8');
  const m = html.match(/<style>([\s\S]*?)<\/style>/);
  if (m) {
    css += `\n/* ===== ${f} ===== */\n${m[1]}\n`;
  }
}

fs.writeFileSync(path.join(outDir, '_extracted.css'), css);
console.log('files', files.length, 'css bytes', Buffer.byteLength(css));
