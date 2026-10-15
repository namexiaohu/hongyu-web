import { notFound } from 'next/navigation';
import Link from 'next/link';

import { ProductGallery } from '@/components/product/product-gallery';
import { StatsBar } from '@/components/shared/stats-bar';
import { MarketEventSpeakersSection } from '@/components/market-events/market-event-speakers-section';
import { MarketEventSponsorsSection } from '@/components/market-events/market-event-sponsors-section';
import { buildHeroMediaSlides } from '@/lib/hero-media-slides';
import { getPageTranslations, getStorefrontLocaleContext } from '@/lib/i18n-server';
import type { TranslateFn } from '@/lib/i18n-server';
import { buildContactHref, CONTACT_TOPIC_MARKET_EVENT_QUERY } from '@/lib/storefront-inquiry';
import { type StorefrontMarketEventDetail, getStorefrontMarketEventDetail } from '@/lib/storefront-market-events-api';
import type { AgendaGroup, AgendaItem } from '@/lib/storefront-market-events-api';

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
    const weekday = t(`marketEvents.weekdays.${d.getDay()}`);
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
      <p className="eyebrow" style={{ marginBottom: 'var(--space-3)' }}>{t('detail.marketEvents.agendaEyebrow')}</p>
      <h2>{t('detail.marketEvents.agendaTitle')}</h2>
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

export default async function MarketEventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { locale } = await getStorefrontLocaleContext();
  const { t } = await getPageTranslations(locale, ['detail', 'marketEvents', 'breadcrumb', 'common']);
  const marketEvent: StorefrontMarketEventDetail | null = await getStorefrontMarketEventDetail(slug);
  if (!marketEvent) notFound();

  const registerHref = buildContactHref({ topic: CONTACT_TOPIC_MARKET_EVENT_QUERY, marketEvent: marketEvent.title });
  const isRegistering = marketEvent.status === 'registering';
  const dateRange = formatDateRange(marketEvent.startDate, marketEvent.endDate, t);
  const dateRangeWithWeekday = formatDateRange(marketEvent.startDate, marketEvent.endDate, t, true);
  const slides = buildHeroMediaSlides({
    id: marketEvent.slug,
    name: marketEvent.title,
    videoUrl: marketEvent.videoUrl,
    coverUrl: marketEvent.coverImage,
    coverAlt: marketEvent.title,
    gallery: [],
    coverDisplay: marketEvent.coverDisplay,
    includeGalleryInDisplay: false,
  });
  const showHeroMedia = Boolean(marketEvent.showCoverOnBackground && slides.length);
  const hasImageBackground = Boolean(marketEvent.backgroundImage);
  const heroClassName = [
    'event-hero',
    hasImageBackground ? 'has-bg' : '',
    showHeroMedia ? 'has-cover' : '',
    marketEvent.heroCopyStyle === 'dark' ? 'event-hero--copy-dark' : '',
  ].filter(Boolean).join(' ');
  const statusLabel = t(`marketEvents.status.${marketEvent.status}`);

  return (
    <>
      <section className={heroClassName} data-od-id="hero">
        {marketEvent.backgroundImage ? (
          <div className="event-hero-bg">
            <img src={marketEvent.backgroundImage} alt="" />
          </div>
        ) : null}
        {marketEvent.backgroundImage ? <div className="event-hero-overlay" aria-hidden="true" /> : null}
        <div className="breadcrumb container">
          <Link href="/">{t('breadcrumb.home')}</Link><span>/</span>
          <Link href="/market-events">{t('breadcrumb.marketEvents')}</Link><span>/</span>
          <span>{marketEvent.title}</span>
        </div>
        <div className="container event-hero-inner">
          <div>
            <div className="eh-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" />
              </svg>
              {statusLabel}
            </div>
            <h1>{marketEvent.title}</h1>
            <div className="eh-meta">
              {dateRange && (
                <div className="eh-meta-item">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" stroke="currentColor">
                    <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                  {dateRange}
                </div>
              )}
              {marketEvent.location && (
                <div className="eh-meta-item">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" stroke="currentColor">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                  {marketEvent.location}
                </div>
              )}
              {marketEvent.duration && (
                <div className="eh-meta-item">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                  </svg>
                  {marketEvent.duration}
                </div>
              )}
            </div>
            {marketEvent.description && <p className="eh-desc">{marketEvent.description}</p>}
            <div className="eh-actions">
              {isRegistering && (
                <Link href={registerHref} className="btn-primary">{t('detail.marketEvents.registerNow')}</Link>
              )}
              <a href="#agenda" className="btn-ghost">{t('detail.marketEvents.viewAgenda')}</a>
            </div>
          </div>
          {showHeroMedia ? (
            <div className="event-hero-img has-slot">
              <ProductGallery slides={slides} alt={marketEvent.title} />
            </div>
          ) : null}
        </div>
      </section>

      {marketEvent.stats.length > 0 ? (
        <div className="container summit-stats-wrap">
          <StatsBar stats={marketEvent.stats} className="summit-stats-bar" />
        </div>
      ) : null}

      {marketEvent.detailDescription.trim() ? (
        <section className="conf-desc" data-od-id="conf-desc">
          <div className="container conf-desc-inner">
            <div
              className="conf-desc-content"
              dangerouslySetInnerHTML={{ __html: marketEvent.detailDescription }}
            />
          </div>
        </section>
      ) : null}

      <AgendaSection agenda={marketEvent.agenda} t={t} />

      <MarketEventSpeakersSection speakers={marketEvent.speakers} />

      <MarketEventSponsorsSection sponsors={marketEvent.sponsors} />

      {(marketEvent.location || marketEvent.address || marketEvent.scale || marketEvent.transportation || marketEvent.venueImage) && (
        <section className="detail-section container" id="venue" data-od-id="venue">
          <p className="eyebrow" style={{ marginBottom: 'var(--space-3)' }}>{t('detail.marketEvents.venueEyebrow')}</p>
          <h2>{marketEvent.location || t('detail.marketEvents.venueFallback')}</h2>
          <div className="venue-split">
            <div className="venue-info">
              {marketEvent.address && (
                <div className="vi-item">
                  <div className="vi-icon">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" stroke="currentColor">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <div className="vi-label">{t('detail.marketEvents.addressLabel')}</div>
                    <div className="vi-value">{marketEvent.address}</div>
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
                    <div className="vi-label">{t('detail.marketEvents.timeLabel')}</div>
                    <div className="vi-value">{dateRangeWithWeekday}</div>
                  </div>
                </div>
              )}
              {marketEvent.scale && (
                <div className="vi-item">
                  <div className="vi-icon">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" stroke="currentColor">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="vi-label">{t('detail.marketEvents.scaleLabel')}</div>
                    <div className="vi-value">{marketEvent.scale}</div>
                  </div>
                </div>
              )}
              {marketEvent.transportation && (
                <div className="vi-item">
                  <div className="vi-icon">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" stroke="currentColor">
                      <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  </div>
                  <div>
                    <div className="vi-label">{t('detail.marketEvents.transportLabel')}</div>
                    <div className="vi-value">{marketEvent.transportation}</div>
                  </div>
                </div>
              )}
            </div>
            {marketEvent.venueImage && (
              <div className="venue-map">
                <img src={marketEvent.venueImage} alt={marketEvent.location || t('detail.marketEvents.venueFallback')} />
              </div>
            )}
          </div>
        </section>
      )}

      {isRegistering && (
        <section className="cta-section" id="cta" data-od-id="cta">
          <div className="container">
            <div className="cta-inner">
              <p className="eyebrow" style={{ color: 'var(--accent)', marginBottom: 'var(--space-4)' }}>{t('detail.marketEvents.registerSectionEyebrow')}</p>
              <h2>{t('detail.marketEvents.registerSectionTitle')}</h2>
              <p>{t('detail.marketEvents.registerSectionLead')}</p>
              <Link href={registerHref} className="btn-cta">
                {t('detail.marketEvents.registerNow')}
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
