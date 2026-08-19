import type { Metadata } from 'next';
import Link from 'next/link';

import { DirectoryPage } from '@/components/templates/directory-page';
import { getStorefrontLocaleContext } from '@/lib/i18n-server';
import { DEFAULT_SEO_TITLE } from '@/lib/site-config';
import {
  getStorefrontPartnerCentersList,
  type StorefrontCenterItem,
  type StorefrontCenterGroup,
} from '@/lib/storefront-partner-centers-api';

export const metadata: Metadata = {
  title: '合作中心 · 竑宇医疗',
  description: DEFAULT_SEO_TITLE,
};

const locationSvg = `<svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;

function CenterCard({ center }: { center: StorefrontCenterItem }) {
  return (
    <div className="center-card">
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
                <a href={center.website} target="_blank" rel="noreferrer">{center.website.replace(/^https?:\/\//, '')}</a>
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
    </div>
  );
}

function RegionSection({ group }: { group: StorefrontCenterGroup }) {
  return (
    <section className="region-section">
      <div className="container">
        <div className="region-header">
          <h2>{group.regionLabel}</h2>
          <span className="rh-count">{group.count} 家合作中心</span>
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
  const { groups } = await getStorefrontPartnerCentersList(locale);

  return (
    <DirectoryPage
      breadcrumbs={[{ label: '首页', href: '/' }, { label: '全球布局', href: '/centers' }, { label: '合作中心' }]}
      hero={{
        eyebrow: 'Partner Centers · 合作中心',
        title: '全球合作医院与研究中心',
        lead: '与全球顶尖动物医院及研究机构共建临床合作网络，推动循证医学与技术创新。',
      }}
    >
      <div className="page-centers" style={{ paddingTop: 'var(--space-10)' }}>
        {groups.map((group) => (
          <RegionSection key={group.region} group={group} />
        ))}

        <section className="section" id="contact">
          <div className="container">
            <div className="cta-strip">
              <p className="eyebrow" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 'var(--space-4)' }}>
                Partner · 成为合作伙伴
              </p>
              <h2>加入全球合作网络</h2>
              <p className="lead">如果您的医院或研究机构希望与竑宇医疗建立合作，欢迎联系我们。</p>
              <Link href="/partnership" className="btn-cta-white">
                申请合作
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </DirectoryPage>
  );
}
