const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'src', 'app');

function readHtml(content) {
  const match = content.match(/const html = "([\s\S]*)";\s*\n\s*export default/);
  if (!match) return null;
  return match[1]
    .replace(/\\n/g, '\n')
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\');
}

function writeWrappedPage(filePath, imports, componentBody) {
  const content = `${imports}\n\n${componentBody}\n`;
  fs.writeFileSync(filePath, content);
}

function wrapBrandPage(config) {
  const filePath = path.join(ROOT, config.file);
  const source = fs.readFileSync(filePath, 'utf8');
  let html = readHtml(source);
  if (!html) {
    console.log('skip (no html)', config.file);
    return;
  }

  html = html.replace(/^[\s\S]*?<section class="page-hero"[\s\S]*?<\/section>\n?/m, '');
  html = html.replace(/^[\s\S]*?<section class="tr-hero"[\s\S]*?<\/section>\n?/m, '');
  html = html.replace(/\n\s*<!-- STATS -->[\s\S]*?<\/div>\n\s*<\/div>\n\n?/m, '\n');

  const escapedBody = html
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$/g, '\\$');

  const statsBlock = config.stats
    ? `\n      stats={${JSON.stringify(config.stats)}}\n`
    : '';

  const heroClass = config.heroClass ? `\n        heroClass: '${config.heroClass}',` : '';

  writeWrappedPage(
    filePath,
    `import type { Metadata } from 'next';

import { BrandNarrativePage } from '@/components/templates/brand-narrative-page';
import { DEFAULT_SEO_TITLE } from '@/lib/site-config';

export const metadata: Metadata = {
  title: '${config.title}',
  description: DEFAULT_SEO_TITLE,
};

const bodyHtml = \`${escapedBody.trim()}\`;`,
    `export default function Page() {
  return (
    <BrandNarrativePage
      breadcrumbs={[${config.breadcrumbs}]}
      hero={{
        eyebrow: '${config.hero.eyebrow}',
        title: ${JSON.stringify(config.hero.title)},
        lead: ${JSON.stringify(config.hero.lead)},
        image: '${config.hero.image}',
        imageAlt: '${config.hero.imageAlt}',${heroClass}
      }}${statsBlock}
    >
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </BrandNarrativePage>
  );
}`,
  );
  console.log('wrapped', config.file);
}

function wrapDirectoryPage(config) {
  const filePath = path.join(ROOT, config.file);
  const source = fs.readFileSync(filePath, 'utf8');
  let html = readHtml(source);
  if (!html) return;

  html = html.replace(/^[\s\S]*?<section class="dir-hero"[\s\S]*?<\/section>\n?/m, '');
  html = html.replace(/<div class="breadcrumb container">[\s\S]*?<\/div>\n\n/m, '');

  const escapedBody = html.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');

  writeWrappedPage(
    filePath,
    `import type { Metadata } from 'next';

import { DirectoryPage } from '@/components/templates/directory-page';
import { DEFAULT_SEO_TITLE } from '@/lib/site-config';

export const metadata: Metadata = {
  title: '${config.title}',
  description: DEFAULT_SEO_TITLE,
};

const bodyHtml = \`${escapedBody.trim()}\`;`,
    `export default function Page() {
  return (
    <DirectoryPage
      breadcrumbs={[${config.breadcrumbs}]}
      hero={{
        eyebrow: '${config.hero.eyebrow}',
        title: '${config.hero.title}',
        lead: ${JSON.stringify(config.hero.lead)},
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </DirectoryPage>
  );
}`,
  );
  console.log('wrapped dir', config.file);
}

wrapBrandPage({
  file: 'about/page.tsx',
  title: '企业介绍 · 竑宇医疗',
  breadcrumbs: "{ label: '首页', href: '/' }, { label: '企业介绍' }",
  hero: {
    eyebrow: 'About Us · 企业介绍',
    title: '以工程技术守护\\n动物生命健康',
    lead: '竑宇医疗成立于动物医疗科技领域，致力于将精密工程技术与兽医学深度融合。从材料科学到机械设计，从临床验证到全球推广，每一步都以更高的手术精度和更好的术后预后为目标。',
    image: '/images/about-hero.jpg',
    imageAlt: '竑宇医疗企业介绍',
  },
});

wrapBrandPage({
  file: 'patents/page.tsx',
  title: '技术专利 · 竑宇医疗',
  breadcrumbs: "{ label: '首页', href: '/' }, { label: '技术专利' }",
  stats: [
    { value: '120', suffix: '+', label: '授权发明专利' },
    { value: '45', suffix: '+', label: 'PCT 国际专利' },
    { value: '15', suffix: '%', label: '年营收研发投入占比' },
    { value: '60', suffix: '%+', label: '研发团队硕士以上占比' },
  ],
  hero: {
    eyebrow: 'Technology · 技术专利',
    title: '120+ 项核心专利\\n构筑技术壁垒',
    lead: '竑宇医疗持续投入研发创新，在血管闭合、微创手术、生物材料等领域建立了完整的自主知识产权体系。',
    image: '/images/patent-hero.jpg',
    imageAlt: '技术研发',
  },
});

wrapBrandPage({
  file: 'history/page.tsx',
  title: '发展历程 · 竑宇医疗',
  breadcrumbs: "{ label: '首页', href: '/' }, { label: '发展历程' }",
  hero: {
    eyebrow: 'History · 发展历程',
    title: '从实验室到全球\\n的十二年征程',
    lead: '自 2014 年创立以来，竑宇医疗始终专注于动物医疗器械的自主研发与产业化，逐步成长为行业领先的技术驱动型企业。',
    image: '/images/history-hero.jpg',
    imageAlt: '发展历程',
  },
});

wrapBrandPage({
  file: 'education/training/page.tsx',
  title: '培训计划 · 竑宇医疗',
  breadcrumbs: "{ label: '首页', href: '/' }, { label: '培训计划' }",
  heroClass: 'tr-hero',
  hero: {
    eyebrow: 'Training Program · 培训计划',
    title: '认证术者\\n培训体系',
    lead: '从理论学习到实操考核，系统化培养掌握 V-CLAMP 等核心产品标准操作流程的专业兽医师。',
    image: '/images/edu-2.jpg',
    imageAlt: '培训计划',
  },
});

wrapDirectoryPage({
  file: 'surgeons/page.tsx',
  title: '认证术者 · 竑宇医疗',
  breadcrumbs: "{ label: '首页', href: '/' }, { label: '全球布局', href: '/surgeons' }, { label: '认证术者' }",
  hero: {
    eyebrow: 'Certified Surgeons · 认证术者',
    title: '全球认证术者名录',
    lead: '经过竑宇医疗系统化培训与考核，掌握 V-CLAMP 等核心产品标准操作流程的认证兽医师。',
  },
});

wrapDirectoryPage({
  file: 'centers/page.tsx',
  title: '合作中心 · 竑宇医疗',
  breadcrumbs: "{ label: '首页', href: '/' }, { label: '全球布局', href: '/centers' }, { label: '合作中心' }",
  hero: {
    eyebrow: 'Partner Centers · 合作中心',
    title: '全球合作医院与研究中心',
    lead: '与全球顶尖动物医院及研究机构共建临床合作网络，推动循证医学与技术创新。',
  },
});

console.log('done');
