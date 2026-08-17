const fs = require('fs');
const path = require('path');

const ui = 'F:/data/dev/ui/b0e1b467-99c1-439c-a5a1-8c35335c4da6';
const appDir = 'F:/data/dev/html/lianchuan/hongyu/hongyu-web/src/app';

const hrefMap = [
  ['b0e1b467-99c1-439c-a5a1-8c35335c4da6.html#insights', '/insights'],
  ['b0e1b467-99c1-439c-a5a1-8c35335c4da6.html', '/'],
  ['solutions-list.html', '/solutions'],
  ['solutions.html', '/solutions/v-clamp'],
  ['article-list.html', '/insights'],
  ['article.html', '/insights/v-clamp-splenectomy'],
  ['about.html', '/about'],
  ['patents.html', '/patents'],
  ['history.html', '/history'],
  ['surgeons.html', '/surgeons'],
  ['centers.html', '/centers'],
  ['training.html', '/education/training'],
  ['summit.html', '/education/summit'],
  ['recordings.html', '/education/recordings'],
  ['contact.html', '/contact'],
  ['partnership.html', '/partnership'],
  ['company.html', '/company'],
  ['media.html', '/media'],
];

function rewriteHtml(html) {
  let out = html;
  out = out.replace(/\s+target="_blank"/g, '');
  out = out.replace(/src="banner0\.mp4"/g, 'src="/hero/banner0.mp4"');
  out = out.replace(/src="2\.jpg"/g, 'src="/hero/2.jpg"');
  out = out.replace(/src="3\.jpg"/g, 'src="/hero/3.jpg"');
  out = out.replace(/src="4\.jpg"/g, 'src="/hero/4.jpg"');
  out = out.replace(/src="images\//g, 'src="/images/');
  for (const [from, to] of hrefMap) {
    out = out.replaceAll(`href="${from}"`, `href="${to}"`);
    out = out.replaceAll(`href='${from}'`, `href="${to}"`);
  }
  out = out.replace(/href="#"/g, 'href="/solutions"');
  return out;
}

function extractMain(html) {
  const m = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (!m) throw new Error('no main');
  return m[1].trim();
}

const pages = [
  { file: 'about.html', route: 'about', title: '企业介绍', crumb: '企业介绍' },
  { file: 'patents.html', route: 'patents', title: '技术专利', crumb: '技术专利' },
  { file: 'history.html', route: 'history', title: '发展历程', crumb: '发展历程' },
  { file: 'solutions-list.html', route: 'solutions', title: '解决方案', crumb: '解决方案' },
  { file: 'solutions.html', route: 'solutions/v-clamp', title: 'V-CLAMP 血管闭合系统', crumb: 'V-CLAMP' },
  { file: 'surgeons.html', route: 'surgeons', title: '认证术者', crumb: '认证术者' },
  { file: 'centers.html', route: 'centers', title: '合作中心', crumb: '合作中心' },
  { file: 'article-list.html', route: 'insights', title: '前沿资讯', crumb: '前沿资讯' },
  { file: 'article.html', route: 'insights/v-clamp-splenectomy', title: 'V-CLAMP 在犬脾脏切除术中的应用回顾', crumb: '资讯详情' },
  { file: 'training.html', route: 'education/training', title: '培训计划', crumb: '培训计划' },
  { file: 'summit.html', route: 'education/summit', title: '行业峰会', crumb: '行业峰会' },
  { file: 'recordings.html', route: 'education/recordings', title: '录播课程', crumb: '录播课程' },
  { file: 'contact.html', route: 'contact', title: '联系我们', crumb: '联系我们' },
  { file: 'partnership.html', route: 'partnership', title: '商务合作', crumb: '商务合作' },
  { file: 'company.html', route: 'company', title: '企业信息', crumb: '企业信息' },
  { file: 'media.html', route: 'media', title: '海外媒体', crumb: '海外媒体' },
];

for (const page of pages) {
  const html = fs.readFileSync(path.join(ui, page.file), 'utf8');
  const main = rewriteHtml(extractMain(html));
  const dir = path.join(appDir, page.route);
  fs.mkdirSync(dir, { recursive: true });
  const source = `import type { Metadata } from 'next';

import { SiteFrame } from '@/components/layout/site-frame';
import { DEFAULT_SEO_TITLE } from '@/lib/site-config';

export const metadata: Metadata = {
  title: '${page.title} · 竑宇医疗',
  description: DEFAULT_SEO_TITLE,
};

const html = ${JSON.stringify(main)};

export default function Page() {
  return (
    <SiteFrame overlay={false}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </SiteFrame>
  );
}
`;
  fs.writeFileSync(path.join(dir, 'page.tsx'), source);
  console.log('wrote', page.route);
}

console.log('done', pages.length);
