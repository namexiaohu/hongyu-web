import type { Metadata } from 'next';
import Link from 'next/link';

import { DirectoryPage } from '@/components/templates/directory-page';
import { CtaStrip } from '@/components/shared/cta-strip';
import { getPageTranslations, getStorefrontLocaleContext } from '@/lib/i18n-server';
import { buildPartnershipCta } from '@/lib/partnership-cta';
import { DEFAULT_SEO_TITLE } from '@/lib/site-config';
import {
  getStorefrontPartnerCentersList,
  type StorefrontCenterItem,
  type StorefrontCenterGroup,
} from '@/lib/storefront-partner-centers-api';

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getStorefrontLocaleContext();
  const { t } = await getPageTranslations(locale, ['centers']);
  return {
    title: t('centers.metaTitle'),
    description: DEFAULT_SEO_TITLE,
  };
}

const locationSvg = `<svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;

function CenterCard({ center }: { center: StorefrontCenterItem }) {
  return (
    <Link href={`/centers/${center.slug}`} className="center-card">
      <div className="cc-img">
        {center.coverImage
          ? <img src={center.coverImage} alt={center.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <div style={{ width: '100%', height: '100%', background: 'var(--border-soft)' }} />}
        {center.badgeText ? <span className="cc-type-badge">{center.badgeText}</span> : null}
      </div>
      <div className="cc-body">
        <div className="cc-header">
          {center.logo
            ? <div className="cc-logo"><img src={center.logo} alt={`${center.name} logo`} /></div>
            : null}
          <div className="cc-name">{center.name}</div>
        </div>
        {center.location
          ? <div className="cc-location" dangerouslySetInnerHTML={{ __html: `${locationSvg}${center.location}` }} />
          : null}
        {center.description ? <div className="cc-desc">{center.description}</div> : null}
        {(center.address || center.businessHours || center.contact || center.website) ? (
          <div className="cc-detail">
            {center.address ? (
              <div className="cc-detail-row">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                <span>{center.address}</span>
              </div>
            ) : null}
            {center.businessHours ? (
              <div className="cc-detail-row">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                <span>{center.businessHours}</span>
              </div>
            ) : null}
            {center.contact ? (
              <div className="cc-detail-row">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.57 1.2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.7A16 16 0 0 0 16 16.73l1.56-1.56a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 24 16.92z" /></svg>
                <span>{center.contact}</span>
              </div>
            ) : null}
            {center.website ? (
              <div className="cc-detail-row">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                <span>{center.website.replace(/^https?:\/\//, '')}</span>
              </div>
            ) : null}
          </div>
        ) : null}
        {center.tags.length > 0 ? (
          <div className="cc-tags">
            {center.tags.map((tag) => <span key={tag} className="cc-tag">{tag}</span>)}
          </div>
        ) : null}
      </div>
    </Link>
  );
}

function RegionSection({
  group,
  regionCountLabel,
}: {
  group: StorefrontCenterGroup;
  regionCountLabel: string;
}) {
  return (
    <section className="region-section">
      <div className="container">
        <div className="region-header">
          <h2>{group.regionLabel}</h2>
          <span className="rh-count">{regionCountLabel}</span>
        </div>
        <div className="center-grid">
          {group.items.map((center) => (
            <CenterCard key={center.slug} center={center} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function Page() {
  const { locale } = await getStorefrontLocaleContext();
  const { t } = await getPageTranslations(locale, ['centers', 'breadcrumb', 'cta']);
  const { groups } = await getStorefrontPartnerCentersList(locale);

  return (
    <DirectoryPage
      breadcrumbs={[
        { label: t('breadcrumb.home'), href: '/' },
        { label: t('breadcrumb.globalLayout'), href: '/centers' },
        { label: t('breadcrumb.partnerCenters') },
      ]}
      hero={{
        eyebrow: t('centers.eyebrow'),
        title: t('centers.title'),
        lead: t('centers.lead'),
      }}
    >
      <div className="page-centers" style={{ paddingTop: 'var(--space-10)' }}>
        {groups.map((group) => (
          <RegionSection
            key={group.region}
            group={group}
            regionCountLabel={t('centers.regionCount', { count: group.count })}
          />
        ))}

        <CtaStrip {...buildPartnershipCta(t, 'centers')} />
      </div>
    </DirectoryPage>
  );
}
