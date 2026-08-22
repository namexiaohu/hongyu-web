import { notFound } from 'next/navigation';
import Link from 'next/link';

import { ProductGallery } from '@/components/product/product-gallery';
import { StatsBar } from '@/components/shared/stats-bar';
import { SummitSpeakersSection } from '@/components/summit/summit-speakers-section';
import { SummitSponsorsSection } from '@/components/summit/summit-sponsors-section';
import { buildHeroMediaSlides } from '@/lib/hero-media-slides';
import { getPageTranslations, getStorefrontLocaleContext } from '@/lib/i18n-server';
import type { TranslateFn } from '@/lib/i18n-server';
import { buildContactHref, CONTACT_TOPIC_SUMMIT_QUERY } from '@/lib/storefront-inquiry';
import { type StorefrontSummitDetail, getStorefrontSummitDetail } from '@/lib/storefront-summits-api';
import type { AgendaGroup, AgendaItem } from '@/lib/storefront-summits-api';

function formatDateRange(
  start: string | null,
  end: string | null,
  t: TranslateFn,
  withWeekday = false,
): string {
  if (!start) return '';
  const s = new Date(start);
  const formatSingle = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    if (!withWeekday) return `${year}.${month}.${day}`;
    const weekday = t(`summit.weekdays.${d.getDay()}`);
    return `${year}.${month}.${day}（${weekday}）`;
  };
  if (!end) return formatSingle(s);
  const e = new Date(end);
  return `${formatSingle(s)} – ${formatSingle(e)}`;
}

function AgendaSection({ agenda, t }: { agenda: AgendaGroup[]; t: TranslateFn }) {
  if (!agenda.length) return null;
  return (
    <section className="detail-section container" id="agenda" data-od-id="agenda">
      <p className="eyebrow" style={{ marginBottom: 'var(--space-3)' }}>{t('detail.summit.agendaEyebrow')}</p>
      <h2>{t('detail.summit.agendaTitle')}</h2>
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
  const { locale } = await getStorefrontLocaleContext();
  const { t } = await getPageTranslations(locale, ['detail', 'summit', 'breadcrumb', 'common']);
  const summit: StorefrontSummitDetail | null = await getStorefrontSummitDetail(slug);
  if (!summit) notFound();

  const registerHref = buildContactHref({ topic: CONTACT_TOPIC_SUMMIT_QUERY, summit: summit.title });
  const isRegistering = summit.status === 'registering';
  const dateRange = formatDateRange(summit.startDate, summit.endDate, t);
  const dateRangeWithWeekday = formatDateRange(summit.startDate, summit.endDate, t, true);
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
    summit.heroCopyStyle === 'dark' ? 'event-hero--copy-dark' : '',
  ].filter(Boolean).join(' ');
  const statusLabel = t(`summit.status.${summit.status}`);

  return (
    <>
      <section className={heroClassName} data-od-id="hero">
        {summit.backgroundImage ? (
          <div className="event-hero-bg">
            <img src={summit.backgroundImage} alt="" />
          </div>
        ) : null}
        {summit.backgroundImage ? <div className="event-hero-overlay" aria-hidden="true" /> : null}
        <div className="breadcrumb container">
          <Link href="/">{t('breadcrumb.home')}</Link><span>/</span>
          <Link href="/summit">{t('breadcrumb.industrySummits')}</Link><span>/</span>
          <span>{summit.title}</span>
        </div>
        <div className="container event-hero-inner">
          <div>
            <div className="eh-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" />
              </svg>
              {statusLabel}
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
                <Link href={registerHref} className="btn-primary">{t('detail.summit.registerNow')}</Link>
              )}
              <a href="#agenda" className="btn-ghost">{t('detail.summit.viewAgenda')}</a>
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

      {summit.detailDescription.trim() ? (
        <section className="conf-desc" data-od-id="conf-desc">
          <div className="container conf-desc-inner">
            <div
              className="conf-desc-content"
              dangerouslySetInnerHTML={{ __html: summit.detailDescription }}
            />
          </div>
        </section>
      ) : null}

      <AgendaSection agenda={summit.agenda} t={t} />

      <SummitSpeakersSection speakers={summit.speakers} />

      <SummitSponsorsSection sponsors={summit.sponsors} />

      {(summit.location || summit.address || summit.scale || summit.transportation || summit.venueImage) && (
        <section className="detail-section container" id="venue" data-od-id="venue">
          <p className="eyebrow" style={{ marginBottom: 'var(--space-3)' }}>{t('detail.summit.venueEyebrow')}</p>
          <h2>{summit.location || t('detail.summit.venueFallback')}</h2>
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
                    <div className="vi-label">{t('detail.summit.addressLabel')}</div>
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
                    <div className="vi-label">{t('detail.summit.timeLabel')}</div>
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
                    <div className="vi-label">{t('detail.summit.scaleLabel')}</div>
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
                    <div className="vi-label">{t('detail.summit.transportLabel')}</div>
                    <div className="vi-value">{summit.transportation}</div>
                  </div>
                </div>
              )}
            </div>
            {summit.venueImage && (
              <div className="venue-map">
                <img src={summit.venueImage} alt={summit.location || t('detail.summit.venueFallback')} />
              </div>
            )}
          </div>
        </section>
      )}

      {isRegistering && (
        <section className="cta-section" id="cta" data-od-id="cta">
          <div className="container">
            <div className="cta-inner">
              <p className="eyebrow" style={{ color: 'var(--accent)', marginBottom: 'var(--space-4)' }}>{t('detail.summit.registerSectionEyebrow')}</p>
              <h2>{t('detail.summit.registerSectionTitle')}</h2>
              <p>{t('detail.summit.registerSectionLead')}</p>
              <Link href={registerHref} className="btn-cta">
                {t('detail.summit.registerNow')}
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
