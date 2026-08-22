import type { Metadata } from 'next';
import Link from 'next/link';

import { CtaStrip } from '@/components/shared/cta-strip';
import { joinCatalogTitles, resolveCompanyName } from '@/lib/company-display';
import { getStorefrontLocaleContext } from '@/lib/i18n-server';
import { buildPartnershipCta } from '@/lib/partnership-cta';
import { DEFAULT_SEO_TITLE } from '@/lib/site-config';
import { getStorefrontCompanyProfile } from '@/lib/storefront-company-api';
import { type StorefrontSummitItem, getStorefrontSummitsList } from '@/lib/storefront-summits-api';

export const metadata: Metadata = {
  title: '行业峰会',
  description: DEFAULT_SEO_TITLE,
};

const statusLabels: Record<string, string> = {
  upcoming: '即将举办',
  registering: '报名中',
  completed: '已结束',
};

const statusClasses: Record<string, string> = {
  upcoming: 'upcoming',
  registering: 'ongoing',
  completed: 'completed',
};

function formatDate(iso: string | null): string {
  if (!iso) return '';
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function SummitCard({ item }: { item: StorefrontSummitItem }) {
  return (
    <Link href={`/summit/${item.slug}`} className="event-card" style={{ display: 'block', textDecoration: 'none' }}>
      <div className="ec-img">
        {item.coverImage
          ? <img src={item.coverImage} alt={item.title} />
          : <div style={{ width: '100%', height: '100%', background: 'var(--surface)' }} />
        }
        <span className={`ec-status ${statusClasses[item.status] ?? 'upcoming'}`}>
          {statusLabels[item.status] ?? item.status}
        </span>
      </div>
      <div className="ec-body">
        <div className="ec-date">{formatDate(item.startDate)}{item.location ? ` · ${item.location}` : ''}</div>
        <div className="ec-title">{item.title}</div>
        <div className="ec-desc">{item.description}</div>
        <div className="ec-meta">
          {item.scale && (
            <span className="ec-meta-item">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>
              {item.scale}
            </span>
          )}
          {item.duration && (
            <span className="ec-meta-item">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" stroke="currentColor"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
              {item.duration}
            </span>
          )}
        </div>
        <span className="ec-link">了解详情 →</span>
      </div>
    </Link>
  );
}

function buildSummitHeroLead(companyName: string, isZh: boolean) {
  const org = companyName.trim();
  if (isZh) {
    return org
      ? `${org}积极参与全球兽医行业重要会议，与同行分享技术成果，推动宠物医疗行业发展。`
      : '积极参与全球兽医行业重要会议，与同行分享技术成果，推动宠物医疗行业发展。';
  }
  return org
    ? `${org} participates in major global veterinary conferences to share clinical innovations and industry insights.`
    : 'Participating in major global veterinary conferences to share clinical innovations and industry insights.';
}

function buildUpcomingSectionLead(companyName: string, upcoming: StorefrontSummitItem[], locale: string) {
  const isZh = locale.toLowerCase().startsWith('zh');
  const summitNames = joinCatalogTitles(upcoming, { max: 2, locale });
  if (summitNames) {
    return isZh
      ? `即将参与 ${summitNames} 等行业峰会与学术会议。`
      : `Upcoming events include ${summitNames} and more.`;
  }
  const org = companyName.trim();
  return isZh
    ? org
      ? `了解${org}即将参与的行业峰会与学术会议。`
      : '了解即将参与的行业峰会与学术会议。'
    : org
      ? `Explore industry summits and conferences ${org} will attend.`
      : 'Explore upcoming industry summits and conferences.';
}

export default async function SummitListPage() {
  const { locale } = await getStorefrontLocaleContext();
  const isZh = locale.toLowerCase().startsWith('zh');
  const [company, data] = await Promise.all([
    getStorefrontCompanyProfile(locale),
    getStorefrontSummitsList(),
  ]);
  const companyName = resolveCompanyName(company, locale);

  return (
    <div className="page-summit">
      <section className="summit-hero" data-od-id="hero">
        <div className="breadcrumb container">
          <Link href="/">首页</Link><span>/</span>
          <span>行业峰会</span>
        </div>
        <div className="summit-hero-inner">
          <div className="sh-eyebrow">Industry Summit · 行业峰会</div>
          <h1>全球兽医行业会议</h1>
          <p>{buildSummitHeroLead(companyName, isZh)}</p>
        </div>
      </section>

      {data.upcoming.length > 0 && (
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Upcoming · 即将举办</p>
            <h2>即将举办的行业会议</h2>
            <p>{buildUpcomingSectionLead(companyName, data.upcoming, locale)}</p>
          </div>
          <div className="event-grid">
            {data.upcoming.map((item) => (
              <SummitCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      )}

      {data.completed.length > 0 && (
        <div className="container">
          <div className="section-header" style={{ paddingTop: data.upcoming.length > 0 ? undefined : 0 }}>
            <p className="eyebrow">Past Events · 往期回顾</p>
            <h2>往年会议回顾</h2>
          </div>
          <div className="event-grid">
            {data.completed.map((item) => (
              <SummitCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      )}

      {data.upcoming.length === 0 && data.completed.length === 0 && (
        <div className="container" style={{ paddingBlock: 'var(--space-16)', textAlign: 'center', color: 'var(--muted)' }}>
          暂无会议数据
        </div>
      )}

      <CtaStrip {...buildPartnershipCta('summit')} variant="section" />
    </div>
  );
}
