const fs = require('fs');
const text = fs.readFileSync('F:/data/dev/html/lianchuan/hongyu/hongyu-web/src/lib/home-html.ts', 'utf8');
const hrefs = [...text.matchAll(/href=\\"([^\\"]+)\\"/g)].map((m) => m[1]);
console.log([...new Set(hrefs)].join('\n'));
console.log('--- src ---');
const srcs = [...text.matchAll(/src=\\"([^\\"]+)\\"/g)].map((m) => m[1]);
console.log([...new Set(srcs)].join('\n'));
