const fs = require('fs');
const path = require('path');

const ui = 'F:/data/dev/ui/b0e1b467-99c1-439c-a5a1-8c35335c4da6';
const outFile = 'F:/data/dev/html/lianchuan/hongyu/hongyu-web/src/app/globals.css';
const homeFile = 'b0e1b467-99c1-439c-a5a1-8c35335c4da6.html';

const innerPages = [
  ['about.html', 'about'],
  ['patents.html', 'patents'],
  ['history.html', 'history'],
  ['solutions-list.html', 'solutions-list'],
  ['solutions.html', 'solutions'],
  ['surgeons.html', 'surgeons'],
  ['centers.html', 'centers'],
  ['article-list.html', 'article-list'],
  ['article.html', 'article'],
  ['training.html', 'training'],
  ['summit.html', 'summit'],
  ['recordings.html', 'recordings'],
  ['contact.html', 'contact'],
  ['partnership.html', 'partnership'],
  ['company.html', 'company'],
  ['media.html', 'media'],
];

function extractStyle(file) {
  const html = fs.readFileSync(path.join(ui, file), 'utf8');
  const m = html.match(/<style>([\s\S]*?)<\/style>/);
  if (!m) throw new Error(`no style in ${file}`);
  return m[1].trim();
}

function extractBlock(css, braceIndex) {
  let depth = 0;
  for (let i = braceIndex; i < css.length; i += 1) {
    if (css[i] === '{') depth += 1;
    else if (css[i] === '}') {
      depth -= 1;
      if (depth === 0) {
        return { block: css.slice(braceIndex + 1, i), end: i + 1 };
      }
    }
  }
  throw new Error('unbalanced css brace');
}

function isChromeRule(selector) {
  return /\.(topnav|pagefoot|footer-grid|footer-brand|footer-col|footer-bottom)(?=[\s.#:[>+~,-]|$)/.test(
    selector,
  );
}

function prefixSelectorList(selector, prefix) {
  return selector
    .split(',')
    .map((part) => {
      const s = part.trim();
      if (!s) return s;
      if (s === ':root' || s === 'html' || s === 'body' || s === 'html body') return prefix;
      if (/^(html|body)(\s|$|\.|:|#|\[)/.test(s)) {
        return `${prefix}${s.replace(/^(html|body)/, '')}`;
      }
      return `${prefix} ${s}`;
    })
    .join(', ');
}

function prefixCss(css, prefix) {
  let out = '';
  let i = 0;
  const n = css.length;

  while (i < n) {
    if (css.startsWith('/*', i)) {
      const end = css.indexOf('*/', i + 2);
      if (end < 0) throw new Error('unterminated comment');
      out += css.slice(i, end + 2);
      i = end + 2;
      continue;
    }

    const ch = css[i];
    if (/\s/.test(ch)) {
      out += ch;
      i += 1;
      continue;
    }

    if (ch === '@') {
      let j = i;
      while (j < n && css[j] !== '{' && css[j] !== ';') j += 1;
      const prelude = css.slice(i, j);
      const atName = (prelude.match(/^@[\w-]+/) || ['@'])[0];
      if (css[j] === ';') {
        out += css.slice(i, j + 1);
        i = j + 1;
        continue;
      }
      const { block, end } = extractBlock(css, j);
      if (atName === '@keyframes' || atName === '@-webkit-keyframes' || atName === '@font-face') {
        out += `${prelude}{${block}}`;
      } else if (atName === '@media' || atName === '@supports') {
        out += `${prelude}{${prefixCss(block, prefix)}}`;
      } else {
        out += `${prelude}{${block}}`;
      }
      i = end;
      continue;
    }

    let j = i;
    while (j < n && css[j] !== '{') j += 1;
    if (j >= n) {
      out += css.slice(i);
      break;
    }
    const selector = css.slice(i, j);
    const { block, end } = extractBlock(css, j);
    if (!isChromeRule(selector)) {
      out += `${prefixSelectorList(selector, prefix)}{${block}}`;
    }
    i = end;
  }

  return out;
}

const layoutOverrides = `
/* ===== hongyu-web layout overrides ===== */
:root {
  --font-display: var(--font-inter), 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  --font-body: var(--font-inter), 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  --font-mono: var(--font-jetbrains), 'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace;
}

.site-shell {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.site-shell main {
  flex: 1 0 auto;
}

.site-shell:not(.site-shell-overlay) {
  padding-top: 76px;
}

.logo-mark .st0 { fill: #212d5d; }
.logo-mark .st1 {
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  font-weight: 900;
}
.logo-mark .st2 { font-size: 19.5815px; }
.logo-mark .st3 {
  font-family: var(--font-montserrat), 'Montserrat', sans-serif;
  font-weight: 700;
}
.logo-mark .st4 { font-size: 10px; }

.topnav.solid,
.topnav.overlay.scrolled {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px) saturate(180%);
  box-shadow: 0 1px 0 var(--border), 0 4px 24px rgba(0, 0, 0, 0.04);
  border-bottom: none;
}
.topnav.solid nav a,
.topnav.overlay.scrolled nav a {
  color: var(--muted);
}
.topnav.solid nav a:hover,
.topnav.solid nav a.active,
.topnav.overlay.scrolled nav a:hover,
.topnav.overlay.scrolled nav a.active {
  color: var(--fg);
}
.topnav.solid .nav-cta,
.topnav.overlay.scrolled .nav-cta {
  background: var(--accent);
  color: #fff;
  border: none;
}
.topnav.solid .logo-mark svg path,
.topnav.solid .logo-mark svg text,
.topnav.overlay.scrolled .logo-mark svg path,
.topnav.overlay.scrolled .logo-mark svg text {
  fill: #212d5d;
}

.topnav.overlay:not(.scrolled) {
  background: transparent;
  box-shadow: none;
  border-bottom: none;
}
.topnav.overlay:not(.scrolled) nav a {
  color: rgba(255, 255, 255, 0.75);
}
.topnav.overlay:not(.scrolled) nav a:hover,
.topnav.overlay:not(.scrolled) nav a.active {
  color: #fff;
}
.topnav.overlay:not(.scrolled) .nav-cta {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.topnav.overlay:not(.scrolled) .logo-mark svg path,
.topnav.overlay:not(.scrolled) .logo-mark svg text {
  fill: #fff;
}

.site-shell-overlay .section-header {
  margin-bottom: var(--space-12);
  padding-block: 0;
  border-bottom: none;
}
.site-shell-overlay .section-header h2 {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: inherit;
  margin-top: var(--space-3);
  margin-bottom: var(--space-4);
}
.site-shell-overlay .btn-hero-secondary {
  background: transparent;
  color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.25);
}
`;

let css = '/* Generated from UI HTML prototypes; inner pages are scoped. */\n';
css += `\n/* ===== ${homeFile} (home, unscoped) ===== */\n${extractStyle(homeFile)}\n`;

for (const [file, slug] of innerPages) {
  const scoped = prefixCss(extractStyle(file), `.page-${slug}`);
  css += `\n/* ===== ${file} → .page-${slug} ===== */\n${scoped}\n`;
}

css += layoutOverrides;
fs.writeFileSync(outFile, css);
console.log('wrote', outFile, 'bytes', Buffer.byteLength(css));
