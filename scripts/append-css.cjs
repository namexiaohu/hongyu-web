const fs = require('fs');
const file = 'F:/data/dev/html/lianchuan/hongyu/hongyu-web/src/app/globals.css';
const extra = `
/* ===== hongyu-web layout overrides ===== */
:root {
  --font-display: var(--font-inter), 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  --font-body: var(--font-inter), 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  --font-mono: var(--font-jetbrains), 'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace;
}

.site-shell:not(.site-shell-overlay) {
  padding-top: 76px;
}

.logo-mark .st0 { fill: #212d5d; }
.logo-mark .st1 { font-family: Arial, sans-serif; font-weight: 900; }
.logo-mark .st2 { font-size: 19.5815px; }
.logo-mark .st3 { font-family: Arial, sans-serif; font-weight: 700; }
.logo-mark .st4 { font-size: 10px; }

.topnav.solid,
.topnav.overlay.scrolled {
  background: rgba(255, 255, 255, 0.95) !important;
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
  background: transparent !important;
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
`;
fs.appendFileSync(file, extra);
console.log('appended overrides');
