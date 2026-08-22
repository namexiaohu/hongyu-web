import { notFound } from 'next/navigation';
import Link from 'next/link';

import { ProductGallery } from '@/components/product/product-gallery';
import { StatsBar } from '@/components/shared/stats-bar';
import { SummitSpeakersSection } from '@/components/summit/summit-speakers-section';
import { SummitSponsorsSection } from '@/components/summit/summit-sponsors-section';
import { buildHeroMediaSlides } from '@/lib/hero-media-slides';
import { type StorefrontSummitDetail, getStorefrontSummitDetail } from '@/lib/storefront-summits-api';
import type { AgendaGroup, AgendaItem } from '@/lib/storefront-summits-api';

const statusLabels: Record<string, string> = {
  upcoming: '即将举办',
  registering: '报名中',
  completed: '已结束',
};

function formatDateRange(start: string | null, end: string | null, withWeekday = false): string {
  if (!start) return '';
  const s = new Date(start);
  const formatSingle = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    if (!withWeekday) return `${year}.${month}.${day}`;
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return `${year}.${month}.${day}（${weekdays[d.getDay()]}）`;
  };
  if (!end) return formatSingle(s);
  const e = new Date(end);
  return `${formatSingle(s)} – ${formatSingle(e)}`;
}

function AgendaSection({ agenda }: { agenda: AgendaGroup[] }) {
  if (!agenda.length) return null;
  return (
    <section className="detail-section container" id="agenda" data-od-id="agenda">
      <p className="eyebrow" style={{ marginBottom: 'var(--space-3)' }}>Agenda · 大会议程</p>
      <h2>核心议程</h2>
      {agenda.map((group) => (
        <div key={group.id} className="agenda-day">
          <div className="agenda-day-header">
            <span className="adh-date">{group.dayLabel}</span>
            <h3>{group.groupTitle}</h3>
          </div>
          {group.items.map((item: AgendaItem) => (
            <div key={item.id} className="agenda-item">
              <div className="ai-time">{item.startTime}{item.endTime ? ` –\u00a0${item.endTime}` : ''}</div>
              <div>
                <div className="ai-title">{item.title}</div>
                {item.desc && <div className="ai-desc">{item.desc}</div>}
              </div>
              {item.speaker && <div className="ai-speaker">{item.speaker}</div>}
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}

export default async function SummitDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const summit: StorefrontSummitDetail | null = await getStorefrontSummitDetail(slug);
  if (!summit) notFound();

  const isRegistering = summit.status === 'registering';
  const dateRange = formatDateRange(summit.startDate, summit.endDate);
  const dateRangeWithWeekday = formatDateRange(summit.startDate, summit.endDate, true);
  const slides = buildHeroMediaSlides({
    id: summit.slug,
    name: summit.title,
    videoUrl: summit.videoUrl,
    coverUrl: summit.coverImage,
    coverAlt: summit.title,
    gallery: [],
  });
  const showHeroMedia = Boolean(summit.showCoverOnBackground && slides.length);
  const hasImageBackground = Boolean(summit.backgroundImage);
  const heroClassName = [
    'event-hero',
    hasImageBackground ? 'has-bg' : '',
    showHeroMedia ? 'has-cover' : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      <section className={heroClassName} data-od-id="hero">
        {summit.backgroundImage ? (
          <div className="event-hero-bg">
            <img src={summit.backgroundImage} alt="" />
          </div>
        ) : null}
        <div className="breadcrumb container">
          <Link href="/">首页</Link><span>/</span>
          <Link href="/summit">行业峰会</Link><span>/</span>
          <span>{summit.title}</span>
        </div>
        <div className="container event-hero-inner">
          <div>
            <div className="eh-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" />
              </svg>
              {statusLabels[summit.status] ?? summit.status}
            </div>
            <h1>{summit.title}</h1>
            <div className="eh-meta">
              {dateRange && (
                <div className="eh-meta-item">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" stroke="currentColor">
                    <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                  {dateRange}
                </div>
              )}
              {summit.location && (
                <div className="eh-meta-item">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" stroke="currentColor">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                  {summit.location}
                </div>
              )}
              {summit.duration && (
                <div className="eh-meta-item">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                  </svg>
                  {summit.duration}
                </div>
              )}
            </div>
            {summit.description && <p className="eh-desc">{summit.description}</p>}
            <div className="eh-actions">
              {isRegistering && (
                <Link href="/contact" className="btn-primary">立即报名</Link>
              )}
              <a href="#agenda" className="btn-ghost">查看议程</a>
            </div>
          </div>
          {showHeroMedia ? (
            <div className="event-hero-img has-slot">
              <ProductGallery slides={slides} alt={summit.title} />
            </div>
          ) : null}
        </div>
      </section>

      {summit.stats.length > 0 ? (
        <div className="container summit-stats-wrap">
          <StatsBar stats={summit.stats} className="summit-stats-bar" />
        </div>
      ) : null}

      <AgendaSection agenda={summit.agenda} />

      <SummitSpeakersSection speakers={summit.speakers} />

      <SummitSponsorsSection sponsors={summit.sponsors} />

      {(summit.location || summit.address || summit.scale || summit.transportation || summit.venueImage) && (
        <section className="detail-section container" id="venue" data-od-id="venue">
          <p className="eyebrow" style={{ marginBottom: 'var(--space-3)' }}>Venue · 会议地点</p>
          <h2>{summit.location || '会议地点'}</h2>
          <div className="venue-split">
            <div className="venue-info">
              {summit.address && (
                <div className="vi-item">
                  <div className="vi-icon">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" stroke="currentColor">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <div className="vi-label">地址</div>
                    <div className="vi-value">{summit.address}</div>
                  </div>
                </div>
              )}
              {dateRangeWithWeekday && (
                <div className="vi-item">
                  <div className="vi-icon">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" stroke="currentColor">
                      <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                    </svg>
                  </div>
                  <div>
                    <div className="vi-label">会议时间</div>
                    <div className="vi-value">{dateRangeWithWeekday}</div>
                  </div>
                </div>
              )}
              {summit.scale && (
                <div className="vi-item">
                  <div className="vi-icon">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" stroke="currentColor">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="vi-label">会议规模</div>
                    <div className="vi-value">{summit.scale}</div>
                  </div>
                </div>
              )}
              {summit.transportation && (
                <div className="vi-item">
                  <div className="vi-icon">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" stroke="currentColor">
                      <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  </div>
                  <div>
                    <div className="vi-label">交通指引</div>
                    <div className="vi-value">{summit.transportation}</div>
                  </div>
                </div>
              )}
            </div>
            {summit.venueImage && (
              <div className="venue-map">
                <img src={summit.venueImage} alt={summit.location || '会议地点'} />
              </div>
            )}
          </div>
        </section>
      )}

      {isRegistering && (
        <section className="cta-section" id="cta" data-od-id="cta">
          <div className="container">
            <div className="cta-inner">
              <p className="eyebrow" style={{ color: 'var(--accent)', marginBottom: 'var(--space-4)' }}>Register · 参会报名</p>
              <h2>立即报名参会</h2>
              <p>名额有限，欢迎通过联系页面提交报名意向，会务团队将在 3 个工作日内与您确认。</p>
              <Link href="/contact" className="btn-cta">
                立即报名
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
