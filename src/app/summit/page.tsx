import type { Metadata } from 'next';
import Link from 'next/link';

import { CtaStrip } from '@/components/shared/cta-strip';
import { joinCatalogTitles, resolveCompanyName } from '@/lib/company-display';
import { getPageTranslations, getStorefrontLocaleContext } from '@/lib/i18n-server';
import { buildPartnershipCta } from '@/lib/partnership-cta';
import { DEFAULT_SEO_TITLE } from '@/lib/site-config';
import { getStorefrontCompanyProfile } from '@/lib/storefront-company-api';
import { type StorefrontSummitItem, getStorefrontSummitsList } from '@/lib/storefront-summits-api';

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getStorefrontLocaleContext();
  const { t } = await getPageTranslations(locale, ['summit']);
  return {
    title: t('summit.metaTitle'),
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

function SummitCard({
  item,
  statusLabel,
  cardLinkLabel,
}: {
  item: StorefrontSummitItem;
  statusLabel: string;
  cardLinkLabel: string;
}) {
  return (
    <Link href={`/summit/${item.slug}`} className="event-card" style={{ display: 'block', textDecoration: 'none' }}>
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
  upcoming: StorefrontSummitItem[],
  locale: string,
) {
  const summitNames = joinCatalogTitles(upcoming, { max: 2, locale });
  if (summitNames) {
    return t('summit.upcoming.leadWithNames', { names: summitNames });
  }
  const org = companyName.trim();
  return org
    ? t('summit.upcoming.leadWithCompany', { companyName: org })
    : t('summit.upcoming.leadFallback');
}

export default async function SummitListPage() {
  const { locale } = await getStorefrontLocaleContext();
  const { t } = await getPageTranslations(locale, ['summit', 'breadcrumb', 'cta']);
  const [company, data] = await Promise.all([
    getStorefrontCompanyProfile(locale),
    getStorefrontSummitsList(),
  ]);
  const companyName = resolveCompanyName(company, locale);
  const heroLead = companyName.trim()
    ? t('summit.heroLeadWithCompany', { companyName })
    : t('summit.heroLeadFallback');

  const statusLabel = (status: string) => {
    const key = `summit.status.${status}`;
    const label = t(key);
    return label === key ? status : label;
  };

  return (
    <div className="page-summit">
      <section className="summit-hero" data-od-id="hero">
        <div className="breadcrumb container">
          <Link href="/">{t('breadcrumb.home')}</Link><span>/</span>
          <span>{t('breadcrumb.industrySummits')}</span>
        </div>
        <div className="summit-hero-inner">
          <div className="sh-eyebrow">{t('summit.eyebrow')}</div>
          <h1>{t('summit.title')}</h1>
          <p>{heroLead}</p>
        </div>
      </section>

      {data.upcoming.length > 0 && (
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">{t('summit.upcoming.eyebrow')}</p>
            <h2>{t('summit.upcoming.title')}</h2>
            <p>{buildUpcomingSectionLead(t, companyName, data.upcoming, locale)}</p>
          </div>
          <div className="event-grid">
            {data.upcoming.map((item) => (
              <SummitCard
                key={item.slug}
                item={item}
                statusLabel={statusLabel(item.status)}
                cardLinkLabel={t('summit.cardLink')}
              />
            ))}
          </div>
        </div>
      )}

      {data.completed.length > 0 && (
        <div className="container">
          <div className="section-header" style={{ paddingTop: data.upcoming.length > 0 ? undefined : 0 }}>
            <p className="eyebrow">{t('summit.past.eyebrow')}</p>
            <h2>{t('summit.past.title')}</h2>
          </div>
          <div className="event-grid">
            {data.completed.map((item) => (
              <SummitCard
                key={item.slug}
                item={item}
                statusLabel={statusLabel(item.status)}
                cardLinkLabel={t('summit.cardLink')}
              />
            ))}
          </div>
        </div>
      )}

      {data.upcoming.length === 0 && data.completed.length === 0 && (
        <div className="container" style={{ paddingBlock: 'var(--space-16)', textAlign: 'center', color: 'var(--muted)' }}>
          {t('summit.empty')}
        </div>
      )}

      <CtaStrip {...buildPartnershipCta(t, 'summit')} variant="section" />
    </div>
  );
}
