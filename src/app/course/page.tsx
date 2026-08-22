import type { Metadata } from 'next';
import Link from 'next/link';

import { joinCatalogTitles } from '@/lib/company-display';
import { getPageTranslations, getStorefrontLocaleContext } from '@/lib/i18n-server';
import { DEFAULT_SEO_TITLE } from '@/lib/site-config';
import { getStorefrontSolutionsList } from '@/lib/storefront-solutions-api';

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getStorefrontLocaleContext();
  const { t } = await getPageTranslations(locale, ['course']);
  return {
    title: t('course.metaTitle'),
    description: DEFAULT_SEO_TITLE,
  };
}

export default async function Page() {
  const { locale } = await getStorefrontLocaleContext();
  const { t } = await getPageTranslations(locale, ['course', 'breadcrumb', 'common']);
  const solutionsRes = await getStorefrontSolutionsList({ page: 1, pageSize: 2, sort: 'createdAt', locale });
  const solutionNames = joinCatalogTitles(solutionsRes.items, { max: 2, locale });
  const description = solutionNames.trim()
    ? t('course.descriptionWithNames', { names: solutionNames })
    : t('course.descriptionFallback');

  return (
    <>
      <div className="breadcrumb container">
        <Link href="/">{t('breadcrumb.home')}</Link>
        <span>/</span>
        <span style={{ color: 'var(--fg)' }}>{t('course.metaTitle')}</span>
      </div>

      <section className="coming-soon" data-od-id="coming-soon">
        <div className="cs-content">
          <div className="cs-icon">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
          </div>
          <div className="cs-eyebrow">{t('common.comingSoon')}</div>
          <h1>{t('course.title')}</h1>
          <p>{description}</p>
          <div className="cs-links">
            <Link href="/training" className="cs-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              {t('course.linkTraining')}
            </Link>
            <Link href="/summit" className="cs-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                <line x1="4" y1="22" x2="4" y2="15" />
              </svg>
              {t('course.linkSummits')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
