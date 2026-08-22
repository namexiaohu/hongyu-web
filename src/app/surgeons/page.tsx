import type { Metadata } from 'next';
import Link from 'next/link';

import { DirectoryPage } from '@/components/templates/directory-page';
import { CtaStrip } from '@/components/shared/cta-strip';
import { joinCatalogTitles, resolveCompanyName } from '@/lib/company-display';
import { getStorefrontLocaleContext } from '@/lib/i18n-server';
import { buildPartnershipCta } from '@/lib/partnership-cta';
import { DEFAULT_SEO_TITLE } from '@/lib/site-config';
import { getStorefrontCompanyProfile } from '@/lib/storefront-company-api';
import { getStorefrontSolutionsList } from '@/lib/storefront-solutions-api';
import { getStorefrontSurgeonsList, type StorefrontSurgeonItem } from '@/lib/storefront-surgeons-api';

export const metadata: Metadata = {
  title: '认证术者',
  description: DEFAULT_SEO_TITLE,
};

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

function buildSurgeonsHeroLead(companyName: string, solutionNames: string, isZh: boolean) {
  const org = companyName.trim();
  const products = solutionNames.trim();
  if (isZh) {
    if (org && products) {
      return `经过${org}系统化培训与考核，掌握 ${products} 等核心产品标准操作流程的认证兽医师。`;
    }
    if (org) {
      return `经过${org}系统化培训与考核，掌握核心产品标准操作流程的认证兽医师。`;
    }
    return '经过系统化培训与考核，掌握核心产品标准操作流程的认证兽医师。';
  }
  if (org && products) {
    return `Veterinarians certified through ${org}'s training programs, proficient in standard workflows for ${products} and other core products.`;
  }
  if (org) {
    return `Veterinarians certified through ${org}'s training and assessment programs.`;
  }
  return 'Certified veterinarians trained in standard operating workflows for core products.';
}

export default async function Page() {
  const { locale } = await getStorefrontLocaleContext();
  const isZh = locale.toLowerCase().startsWith('zh');

  const [company, solutionsRes, surgeonsRes] = await Promise.all([
    getStorefrontCompanyProfile(locale),
    getStorefrontSolutionsList({ page: 1, pageSize: 2, sort: 'createdAt', locale }),
    getStorefrontSurgeonsList(locale),
  ]);

  const companyName = resolveCompanyName(company, locale);
  const solutionNames = joinCatalogTitles(solutionsRes.items, { max: 2, locale });
  const partnershipCta = buildPartnershipCta('surgeons', companyName);

  return (
    <DirectoryPage
      breadcrumbs={[{ label: '首页', href: '/' }, { label: '全球布局', href: '/surgeons' }, { label: '认证术者' }]}
      hero={{
        eyebrow: 'Certified Surgeons · 认证术者',
        title: '全球认证术者名录',
        lead: buildSurgeonsHeroLead(companyName, solutionNames, isZh),
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

      <CtaStrip {...partnershipCta} />
    </DirectoryPage>
  );
}
