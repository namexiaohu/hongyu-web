const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'src', 'app');

function stripInHtmlString(content, stripFn) {
  const match = content.match(/const html = "([\s\S]*)";\s*\n\s*export default/);
  if (!match) return null;
  let html = match[1]
    .replace(/\\n/g, '\n')
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\');
  const stripped = stripFn(html);
  if (stripped === html) return null;
  const escaped = stripped
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n');
  return content.replace(/const html = "[\s\S]*";\s*\n(\s*export default)/, `const html = "${escaped}";\n$1`);
}

const jobs = [
  {
    file: 'solutions/page.tsx',
    strip: (html) => html.replace(/\n\s*<div class="stats-bar">[\s\S]*?<\/div>\n/, '\n'),
  },
  {
    file: 'about/page.tsx',
    strip: (html) =>
      html.replace(/\n\s*<!-- STATS -->[\s\S]*?<\/div>\n\n(\s*<!-- MISSION -->)/, '\n\n$1'),
  },
  {
    file: 'surgeons/page.tsx',
    strip: (html) => html.replace(/\n\s*<div class="dir-stats">[\s\S]*?<\/div>\n/, '\n'),
  },
  {
    file: 'centers/page.tsx',
    strip: (html) => html.replace(/\n\s*<div class="dir-stats">[\s\S]*?<\/div>\n/, '\n'),
  },
  {
    file: 'education/training/page.tsx',
    strip: (html) =>
      html.replace(/\n\s*<!-- STATS -->[\s\S]*?<\/div>\n\n(\s*<!-- PROGRAMS -->)/, '\n\n$1'),
  },
  {
    file: 'education/summit/page.tsx',
    strip: (html) =>
      html.replace(/\n\s*<!-- STATS -->[\s\S]*?<\/div>\n\n(\s*<!--)/, '\n\n$1'),
  },
];

for (const job of jobs) {
  const filePath = path.join(ROOT, job.file);
  const content = fs.readFileSync(filePath, 'utf8');
  const next = stripInHtmlString(content, job.strip);
  if (next) {
    fs.writeFileSync(filePath, next);
    console.log('ok', job.file);
  } else {
    console.log('skip', job.file);
  }
}

console.log('done');
