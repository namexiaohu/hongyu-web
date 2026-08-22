import type { Metadata } from 'next';
import Link from 'next/link';

import { joinCatalogTitles } from '@/lib/company-display';
import { getStorefrontLocaleContext } from '@/lib/i18n-server';
import { DEFAULT_SEO_TITLE } from '@/lib/site-config';
import { getStorefrontSolutionsList } from '@/lib/storefront-solutions-api';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '录播课程',
    description: DEFAULT_SEO_TITLE,
  };
}

function buildCourseDescription(solutionNames: string, isZh: boolean) {
  const names = solutionNames.trim();
  if (isZh) {
    return names
      ? `我们正在精心制作 ${names} 等系列录播课程，预计 2026 年 Q4 上线。届时认证术者可免费观看学习。`
      : '我们正在精心制作系列录播课程，预计 2026 年 Q4 上线。届时认证术者可免费观看学习。';
  }
  return names
    ? `We are producing on-demand courses covering ${names} and more, expected to launch in Q4 2026. Certified surgeons will receive complimentary access.`
    : 'We are producing on-demand training courses, expected to launch in Q4 2026. Certified surgeons will receive complimentary access.';
}

export default async function Page() {
  const { locale } = await getStorefrontLocaleContext();
  const isZh = locale.toLowerCase().startsWith('zh');
  const solutionsRes = await getStorefrontSolutionsList({ page: 1, pageSize: 2, sort: 'createdAt', locale });
  const solutionNames = joinCatalogTitles(solutionsRes.items, { max: 2, locale });

  return (
    <>
      <div className="breadcrumb container">
        <Link href="/">首页</Link>
        <span>/</span>
        <span style={{ color: 'var(--fg)' }}>{isZh ? '录播课程' : 'On-demand Courses'}</span>
      </div>

      <section className="coming-soon" data-od-id="coming-soon">
        <div className="cs-content">
          <div className="cs-icon">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
          </div>
          <div className="cs-eyebrow">Coming Soon</div>
          <h1>{isZh ? '录播课程即将上线' : 'On-demand courses coming soon'}</h1>
          <p>{buildCourseDescription(solutionNames, isZh)}</p>
          <div className="cs-links">
            <Link href="/training" className="cs-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              {isZh ? '培训计划' : 'Training programs'}
            </Link>
            <Link href="/summit" className="cs-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                <line x1="4" y1="22" x2="4" y2="15" />
              </svg>
              {isZh ? '行业峰会' : 'Industry summits'}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
