const fs = require('fs');
const path = require('path');

const ui = 'F:/data/dev/ui/b0e1b467-99c1-439c-a5a1-8c35335c4da6';
const html = fs.readFileSync(path.join(ui, 'b0e1b467-99c1-439c-a5a1-8c35335c4da6.html'), 'utf8');
const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)[1].trim();

const hrefMap = [
  ['b0e1b467-99c1-439c-a5a1-8c35335c4da6.html#insights', '/insights'],
  ['b0e1b467-99c1-439c-a5a1-8c35335c4da6.html', '/'],
  ['solutions-list.html', '/solutions'],
  ['article-list.html', '/insights'],
  ['article.html', '/insights/v-clamp-splenectomy'],
  ['about.html', '/about'],
  ['partnership.html', '/partnership'],
  ['training.html', '/education/training'],
  ['contact.html', '/contact'],
];

let out = main;
out = out.replace(/\s+target="_blank"/g, '');
out = out.replace(/src="banner0\.mp4"/g, 'src="/hero/banner0.mp4"');
out = out.replace(/src="2\.jpg"/g, 'src="/hero/2.jpg"');
out = out.replace(/src="3\.jpg"/g, 'src="/hero/3.jpg"');
out = out.replace(/src="4\.jpg"/g, 'src="/hero/4.jpg"');
out = out.replace(/src="images\//g, 'src="/images/');
for (const [from, to] of hrefMap) {
  out = out.replaceAll(`href="${from}"`, `href="${to}"`);
}

// First product card stays V-CLAMP; remaining three go to listing.
out = out.replace(
  /<a href="solutions\.html"([\s\S]*?)<h3>V-CLAMP<\/h3>/,
  '<a href="/solutions/v-clamp"$1<h3>V-CLAMP</h3>',
);
out = out.replaceAll('href="solutions.html"', 'href="/solutions"');

const dest = 'F:/data/dev/html/lianchuan/hongyu/hongyu-web/src/lib/home-html.ts';
fs.writeFileSync(dest, `export const homeHtml = ${JSON.stringify(out)};\n`);
console.log('home html bytes', Buffer.byteLength(out));
