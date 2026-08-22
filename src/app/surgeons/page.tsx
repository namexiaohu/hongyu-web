import type { Metadata } from 'next';
import Link from 'next/link';

import { DirectoryPage } from '@/components/templates/directory-page';
import { CtaStrip } from '@/components/shared/cta-strip';
import { joinCatalogTitles, resolveCompanyName } from '@/lib/company-display';
import { getPageTranslations, getStorefrontLocaleContext } from '@/lib/i18n-server';
import { buildPartnershipCta } from '@/lib/partnership-cta';
import { DEFAULT_SEO_TITLE } from '@/lib/site-config';
import { getStorefrontCompanyProfile } from '@/lib/storefront-company-api';
import { getStorefrontSolutionsList } from '@/lib/storefront-solutions-api';
import { getStorefrontSurgeonsList, type StorefrontSurgeonItem } from '@/lib/storefront-surgeons-api';

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getStorefrontLocaleContext();
  const { t } = await getPageTranslations(locale, ['surgeons']);
  return {
    title: t('surgeons.metaTitle'),
    description: DEFAULT_SEO_TITLE,
  };
}

const locationSvg = '<svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>';
const expertiseSvg = '<svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/></svg>';
const experienceSvg = '<svg viewBox="0 0 24 24" fill="none" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>';

const badgeSymbols: Record<string, string> = {
  platinum: '◆',
  gold: '★',
  silver: '●',
};

function SurgeonCard({ surgeon }: { surgeon: StorefrontSurgeonItem }) {
  return (
    <Link href={`/surgeons/${surgeon.slug}`} className="surgeon-card">
      <div className="sc-header">
        <div className="sc-avatar">
          {surgeon.avatar ? <img src={surgeon.avatar} alt={surgeon.name} /> : null}
        </div>
        <div className="sc-info">
          <h3>{surgeon.name}</h3>
          {surgeon.position ? <div className="sc-title">{surgeon.position}</div> : null}
        </div>
      </div>
      <div className="sc-body">
        {surgeon.institution ? (
          <div className="sc-row" dangerouslySetInnerHTML={{ __html: `${locationSvg}${surgeon.institution}` }} />
        ) : null}
        {surgeon.expertise ? (
          <div className="sc-row" dangerouslySetInnerHTML={{ __html: `${expertiseSvg}${surgeon.expertise}` }} />
        ) : null}
        {surgeon.experience ? (
          <div className="sc-row" dangerouslySetInnerHTML={{ __html: `${experienceSvg}${surgeon.experience}` }} />
        ) : null}
        {surgeon.tags.length > 0 ? (
          <div className="sc-tags">
            {surgeon.tags.map((tag) => (
              <span key={tag} className="sc-tag">{tag}</span>
            ))}
          </div>
        ) : null}
        {surgeon.gradeTitle ? (
          <div className={`sc-badge ${surgeon.gradeKey}`}>
            {badgeSymbols[surgeon.gradeKey] ?? ''} {surgeon.gradeTitle}
          </div>
        ) : null}
      </div>
    </Link>
  );
}

function buildSurgeonsHeroLead(
  t: (key: string, params?: Record<string, string>) => string,
  companyName: string,
  solutionNames: string,
) {
  const org = companyName.trim();
  const products = solutionNames.trim();
  if (org && products) {
    return t('surgeons.leadWithCompanyAndProducts', { companyName: org, products });
  }
  if (org) {
    return t('surgeons.leadWithCompany', { companyName: org });
  }
  return t('surgeons.leadFallback');
}

export default async function Page() {
  const { locale } = await getStorefrontLocaleContext();
  const { t } = await getPageTranslations(locale, ['surgeons', 'breadcrumb', 'cta']);

  const [company, solutionsRes, surgeonsRes] = await Promise.all([
    getStorefrontCompanyProfile(locale),
    getStorefrontSolutionsList({ page: 1, pageSize: 2, sort: 'createdAt', locale }),
    getStorefrontSurgeonsList(locale),
  ]);

  const companyName = resolveCompanyName(company, locale);
  const solutionNames = joinCatalogTitles(solutionsRes.items, { max: 2, locale });

  return (
    <DirectoryPage
      breadcrumbs={[
        { label: t('breadcrumb.home'), href: '/' },
        { label: t('breadcrumb.globalLayout'), href: '/surgeons' },
        { label: t('breadcrumb.certifiedSurgeons') },
      ]}
      hero={{
        eyebrow: t('surgeons.eyebrow'),
        title: t('surgeons.title'),
        lead: buildSurgeonsHeroLead(t, companyName, solutionNames),
      }}
    >
      <section className="section" style={{ paddingTop: 'var(--space-10)' }}>
        <div className="container">
          <div className="grid-3">
            {surgeonsRes.items.map((surgeon) => (
              <SurgeonCard key={surgeon.slug} surgeon={surgeon} />
            ))}
          </div>
        </div>
      </section>

      <CtaStrip {...buildPartnershipCta(t, 'surgeons', { companyName })} />
    </DirectoryPage>
  );
}
