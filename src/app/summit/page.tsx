import type { Metadata } from 'next';
import Link from 'next/link';

import { DEFAULT_SEO_TITLE } from '@/lib/site-config';
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

export default async function SummitListPage() {
  const data = await getStorefrontSummitsList();

  return (
    <div className="page-summit">
      {/* HERO */}
      <section className="summit-hero" data-od-id="hero">
        <div className="breadcrumb container">
          <Link href="/">首页</Link><span>/</span>
          <span>行业峰会</span>
        </div>
        <div className="summit-hero-inner">
          <div className="sh-eyebrow">Industry Summit · 行业峰会</div>
          <h1>全球兽医行业会议</h1>
          <p>竑宇医疗积极参与全球兽医行业重要会议，与同行分享技术成果，推动宠物医疗行业发展。</p>
        </div>
      </section>

      {/* UPCOMING */}
      {data.upcoming.length > 0 && (
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Upcoming · 即将举办</p>
            <h2>即将举办的行业会议</h2>
            <p>了解竑宇医疗即将参与的行业峰会与学术会议。</p>
          </div>
          <div className="event-grid">
            {data.upcoming.map((item) => (
              <SummitCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      )}

      {/* COMPLETED */}
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

      {/* CTA */}
      <section className="cta-section" data-od-id="cta">
        <div className="container">
          <div className="cta-inner">
            <p className="eyebrow" style={{ color: 'var(--accent)', marginBottom: 'var(--space-4)' }}>Partner · 会议合作</p>
            <h2>成为会议合作伙伴</h2>
            <p>竑宇医疗欢迎行业会议、学术机构的合作邀请，共同推动宠物医疗技术交流。</p>
            <Link href="/partnership" className="btn-cta">
              洽谈合作
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
