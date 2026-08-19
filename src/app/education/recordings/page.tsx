import type { Metadata } from 'next';

import { DEFAULT_SEO_TITLE } from '@/lib/site-config';

export const metadata: Metadata = {
  title: '录播课程 · 竑宇医疗',
  description: DEFAULT_SEO_TITLE,
};

const html = "<div class=\"breadcrumb container\">\n      <a href=\"/\">首页</a><span>/</span>\n      <span style=\"color:var(--fg);\">录播课程</span>\n    </div>\n\n    <section class=\"coming-soon\" data-od-id=\"coming-soon\">\n      <div class=\"cs-content\">\n        <div class=\"cs-icon\">\n          <svg viewBox=\"0 0 24 24\" fill=\"none\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n            <polygon points=\"23 7 16 12 23 17 23 7\"/>\n            <rect x=\"1\" y=\"5\" width=\"15\" height=\"14\" rx=\"2\" ry=\"2\"/>\n          </svg>\n        </div>\n        <div class=\"cs-eyebrow\">Coming Soon</div>\n        <h1>录播课程即将上线</h1>\n        <p>我们正在精心制作 V-CLAMP 标准操作、运动医学技术等系列录播课程，预计 2026 年 Q4 上线。届时认证术者可免费观看学习。</p>\n        <div class=\"cs-links\">\n          <a href=\"/education/training\" class=\"cs-link\">\n            <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/><path d=\"M23 21v-2a4 4 0 0 0-3-3.87\"/><path d=\"M16 3.13a4 4 0 0 1 0 7.75\"/></svg>\n            培训计划\n          </a>\n          <a href=\"/summit\" class=\"cs-link\">\n            <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z\"/><line x1=\"4\" y1=\"22\" x2=\"4\" y2=\"15\"/></svg>\n            行业峰会\n          </a>\n        </div>\n      </div>\n    </section>";

export default function Page() {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
