import type { Metadata } from 'next';
import Link from 'next/link';

import { DirectoryPage } from '@/components/templates/directory-page';
import { getStorefrontLocaleContext } from '@/lib/i18n-server';
import { DEFAULT_SEO_TITLE } from '@/lib/site-config';
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
    <div className="surgeon-card">
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
    </div>
  );
}

export default async function Page() {
  const { locale } = await getStorefrontLocaleContext();
  const { items } = await getStorefrontSurgeonsList(locale);

  return (
    <DirectoryPage
      breadcrumbs={[{ label: '首页', href: '/' }, { label: '全球布局', href: '/surgeons' }, { label: '认证术者' }]}
      hero={{
        eyebrow: 'Certified Surgeons · 认证术者',
        title: '全球认证术者名录',
        lead: '经过竑宇医疗系统化培训与考核，掌握 V-CLAMP 等核心产品标准操作流程的认证兽医师。',
      }}
    >
      <section className="section" style={{ paddingTop: 'var(--space-10)' }}>
        <div className="container">
          <div className="grid-3">
            {items.map((surgeon) => (
              <SurgeonCard key={surgeon.slug} surgeon={surgeon} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="contact">
        <div className="container">
          <div className="cta-strip">
            <p className="eyebrow" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 'var(--space-4)' }}>
              Partnership · 商务合作
            </p>
            <h2>加入竑宇专业合作网络</h2>
            <p className="lead">欢迎临床机构与术者与我们建立合作，共同推进专业交流与产品落地。</p>
            <Link href="/partnership" className="btn-cta-white">
              商务合作咨询
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </DirectoryPage>
  );
}
