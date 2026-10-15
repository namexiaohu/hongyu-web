import type { Metadata } from 'next';
import Link from 'next/link';

import { CtaStrip } from '@/components/shared/cta-strip';
import { joinCatalogTitles, resolveCompanyName } from '@/lib/company-display';
import { getPageTranslations, getStorefrontLocaleContext } from '@/lib/i18n-server';
import { buildPartnershipCta } from '@/lib/partnership-cta';
import { DEFAULT_SEO_TITLE } from '@/lib/site-config';
import { getStorefrontCompanyProfile } from '@/lib/storefront-company-api';
import { type StorefrontMarketEventItem, getStorefrontMarketEventsList } from '@/lib/storefront-market-events-api';

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getStorefrontLocaleContext();
  const { t } = await getPageTranslations(locale, ['marketEvents']);
  return {
    title: t('marketEvents.metaTitle'),
    description: DEFAULT_SEO_TITLE,
  };
}

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

function MarketEventCard({
  item,
  statusLabel,
  cardLinkLabel,
}: {
  item: StorefrontMarketEventItem;
  statusLabel: string;
  cardLinkLabel: string;
}) {
  return (
    <Link href={`/market-events/${item.slug}`} className="event-card" style={{ display: 'block', textDecoration: 'none' }}>
      <div className="ec-img">
        {item.coverImage
          ? <img src={item.coverImage} alt={item.title} />
          : <div style={{ width: '100%', height: '100%', background: 'var(--surface)' }} />
        }
        <span className={`ec-status ${statusClasses[item.status] ?? 'upcoming'}`}>
          {statusLabel}
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
        <span className="ec-link">{cardLinkLabel}</span>
      </div>
    </Link>
  );
}

function buildUpcomingSectionLead(
  t: (key: string, params?: Record<string, string>) => string,
  companyName: string,
  upcoming: StorefrontMarketEventItem[],
  locale: string,
) {
  const marketEventNames = joinCatalogTitles(upcoming, { max: 2, locale });
  if (marketEventNames) {
    return t('marketEvents.upcoming.leadWithNames', { names: marketEventNames });
  }
  const org = companyName.trim();
  return org
    ? t('marketEvents.upcoming.leadWithCompany', { companyName: org })
    : t('marketEvents.upcoming.leadFallback');
}

export default async function MarketEventListPage() {
  const { locale } = await getStorefrontLocaleContext();
  const { t } = await getPageTranslations(locale, ['marketEvents', 'breadcrumb', 'cta']);
  const [company, data] = await Promise.all([
    getStorefrontCompanyProfile(locale),
    getStorefrontMarketEventsList(),
  ]);
  const companyName = resolveCompanyName(company, locale);
  const heroLead = companyName.trim()
    ? t('marketEvents.heroLeadWithCompany', { companyName })
    : t('marketEvents.heroLeadFallback');

  const statusLabel = (status: string) => {
    const key = `marketEvents.status.${status}`;
    const label = t(key);
    return label === key ? status : label;
  };

  return (
    <div className="page-summit">
      <section className="summit-hero" data-od-id="hero">
        <div className="breadcrumb container">
          <Link href="/">{t('breadcrumb.home')}</Link><span>/</span>
          <span>{t('breadcrumb.marketEvents')}</span>
        </div>
        <div className="summit-hero-inner">
          <div className="sh-eyebrow">{t('marketEvents.eyebrow')}</div>
          <h1>{t('marketEvents.title')}</h1>
          <p>{heroLead}</p>
        </div>
      </section>

      {data.upcoming.length > 0 && (
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">{t('marketEvents.upcoming.eyebrow')}</p>
            <h2>{t('marketEvents.upcoming.title')}</h2>
            <p>{buildUpcomingSectionLead(t, companyName, data.upcoming, locale)}</p>
          </div>
          <div className="event-grid">
            {data.upcoming.map((item) => (
              <MarketEventCard
                key={item.slug}
                item={item}
                statusLabel={statusLabel(item.status)}
                cardLinkLabel={t('marketEvents.cardLink')}
              />
            ))}
          </div>
        </div>
      )}

      {data.completed.length > 0 && (
        <div className="container">
          <div className="section-header" style={{ paddingTop: data.upcoming.length > 0 ? undefined : 0 }}>
            <p className="eyebrow">{t('marketEvents.past.eyebrow')}</p>
            <h2>{t('marketEvents.past.title')}</h2>
          </div>
          <div className="event-grid">
            {data.completed.map((item) => (
              <MarketEventCard
                key={item.slug}
                item={item}
                statusLabel={statusLabel(item.status)}
                cardLinkLabel={t('marketEvents.cardLink')}
              />
            ))}
          </div>
        </div>
      )}

      {data.upcoming.length === 0 && data.completed.length === 0 && (
        <div className="container" style={{ paddingBlock: 'var(--space-16)', textAlign: 'center', color: 'var(--muted)' }}>
          {t('marketEvents.empty')}
        </div>
      )}

      <CtaStrip {...buildPartnershipCta(t, 'marketEvents')} variant="section" />
    </div>
  );
}
