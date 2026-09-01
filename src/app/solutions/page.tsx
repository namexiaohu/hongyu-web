import type { Metadata } from 'next';
import Link from 'next/link';

import { DirectoryPage } from '@/components/templates/directory-page';
import { CtaStrip } from '@/components/shared/cta-strip';
import { getPageTranslations, getStorefrontLocaleContext } from '@/lib/i18n-server';
import { buildPartnershipCta } from '@/lib/partnership-cta';
import { DEFAULT_SEO_TITLE } from '@/lib/site-config';
import {
  getStorefrontSolutionsList,
  type StorefrontSolutionListItem,
} from '@/lib/storefront-solutions-api';
import { getStorefrontWebsiteConfig } from '@/lib/storefront-website-config-api';

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getStorefrontLocaleContext();
  const { t } = await getPageTranslations(locale, ['solutionsList']);
  return {
    title: t('solutionsList.metaTitle'),
    description: DEFAULT_SEO_TITLE,
  };
}

const arrowSvg = (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

function SolutionCard({
  item,
  viewDetailsLabel,
}: {
  item: StorefrontSolutionListItem;
  viewDetailsLabel: string;
}) {
  const title = item.largeTitle?.trim() || item.title;
  // 每张卡片固定跳转对应详情页 /solutions/[slug]
  const detailHref = `/solutions/${item.slug}`;
  return (
    <Link href={detailHref} className="sol-card">
      <div className="sol-card-media" aria-hidden="true">
        {item.coverImage
          ? <img src={item.coverImage} alt={title} />
          : <div className="sol-card-media-placeholder" />}
        <div className="sol-card-overlay" />
      </div>
      {item.badgeText ? <span className="sol-badge">{item.badgeText}</span> : null}
      <div className="sol-card-content">
        {item.categoryLabel ? <div className="sc-category">{item.categoryLabel}</div> : null}
        <h3>{title}</h3>
        {item.description ? <p>{item.description}</p> : null}
        {item.tags.length > 0 ? (
          <div className="sc-features">
            {item.tags.map((tag) => (
              <span key={tag} className="sc-feature">{tag}</span>
            ))}
          </div>
        ) : null}
        <span className="sc-link">
          <span className="sc-link-icon" aria-hidden="true">{arrowSvg}</span>
          {viewDetailsLabel}
        </span>
      </div>
    </Link>
  );
}

export default async function Page() {
  const { locale } = await getStorefrontLocaleContext();
  const { t } = await getPageTranslations(locale, ['solutionsList', 'breadcrumb', 'cta']);
  const [listRes, websiteConfig] = await Promise.all([
    getStorefrontSolutionsList({ page: 1, pageSize: 50, sort: 'sortOrder', locale }),
    getStorefrontWebsiteConfig(locale),
  ]);

  return (
    <DirectoryPage
      breadcrumbs={[
        { label: t('breadcrumb.home'), href: '/' },
        { label: t('breadcrumb.solutions') },
      ]}
      hero={{
        eyebrow: t('solutionsList.eyebrow'),
        title: t('solutionsList.title'),
        lead: t('solutionsList.lead'),
      }}
      heroBoard={websiteConfig.listHeroBoards.solutions}
    >
      <div className="page-solutions-list" style={{ paddingTop: 'var(--space-10)' }}>
        <div className="container">
          {listRes.items.length > 0 ? (
            <div className="sol-grid">
              {listRes.items.map((item) => (
                <SolutionCard
                  key={item.slug}
                  item={item}
                  viewDetailsLabel={t('solutionsList.viewDetails')}
                />
              ))}
            </div>
          ) : (
            <p className="sol-list-empty">{t('solutionsList.empty')}</p>
          )}
        </div>
        <CtaStrip {...buildPartnershipCta(t, 'solutions')} />
      </div>
    </DirectoryPage>
  );
}
