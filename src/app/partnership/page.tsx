import type { Metadata } from 'next';
import Link from 'next/link';

import { PartnershipInquiryForm } from '@/components/partnership/partnership-inquiry-form';
import { resolveCompanyName } from '@/lib/company-display';
import { telHref } from '@/lib/contact-display';
import { getPageTranslations, getStorefrontLocaleContext } from '@/lib/i18n-server';
import { DEFAULT_SEO_TITLE } from '@/lib/site-config';
import { getStorefrontCompanyProfile } from '@/lib/storefront-company-api';

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getStorefrontLocaleContext();
  const { t } = await getPageTranslations(locale, ['partnership']);
  return {
    title: t('partnership.metaTitle'),
    description: DEFAULT_SEO_TITLE,
  };
}

const coopTypeKeys = ['distribution', 'academic', 'oem', 'investment'] as const;

function CoopTypesSection({ t }: { t: (key: string) => string }) {
  return (
    <div className="container" data-od-id="coop-types">
      <div className="coop-types">
        {coopTypeKeys.map((key) => (
          <div className="coop-card" key={key}>
            <div className="cc-icon">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round">
                {key === 'distribution' ? (
                  <>
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </>
                ) : key === 'academic' ? (
                  <>
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </>
                ) : key === 'oem' ? (
                  <>
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </>
                ) : (
                  <>
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </>
                )}
              </svg>
            </div>
            <h3>{t(`partnership.coopTypes.${key}Title`)}</h3>
            <p>{t(`partnership.coopTypes.${key}Desc`)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function Page() {
  const { locale } = await getStorefrontLocaleContext();
  const { t } = await getPageTranslations(locale, ['partnership', 'breadcrumb']);
  const company = await getStorefrontCompanyProfile(locale);
  const companyName = resolveCompanyName(company, locale);
  const hotline = company.businessHotline.trim();
  const email = company.businessEmail.trim();
  const hotlineLink = telHref(hotline);
  const heroLead = companyName.trim()
    ? t('partnership.heroLeadWithCompany', { companyName })
    : t('partnership.heroLeadFallback');

  return (
    <>
      <div className="breadcrumb container">
        <Link href="/">{t('breadcrumb.home')}</Link>
        <span>/</span>
        <span style={{ color: 'var(--fg)' }}>{t('partnership.metaTitle')}</span>
      </div>

      <section className="hero-dark" data-od-id="hero">
        <div className="container hero-dark-content">
          <div>
            <div className="ph-eyebrow">{t('partnership.heroEyebrow')}</div>
            <h1>
              {t('partnership.heroTitleLine1')}
              <br />
              {t('partnership.heroTitleLine2')}
            </h1>
            <p>{heroLead}</p>
          </div>
          <div className="hero-dark-img">
            <img src="/images/partnership-handshake.jpg" alt={t('partnership.metaTitle')} />
          </div>
        </div>
      </section>

      <CoopTypesSection t={t} />

      <section className="form-section" data-od-id="form">
        <div className="container">
          <div className="form-layout">
            <div className="form-info">
              <p className="eyebrow">{t('partnership.formInfo.eyebrow')}</p>
              <h2>{t('partnership.formInfo.title')}</h2>
              <p>{t('partnership.formInfo.lead')}</p>
              <ul className="fi-list">
                <li>{t('partnership.formInfo.bullet1')}</li>
                <li>{t('partnership.formInfo.bullet2')}</li>
                <li>{t('partnership.formInfo.bullet3')}</li>
              </ul>
              {hotline ? (
                <div className="fi-contact">
                  <div className="fic-label">{t('partnership.formInfo.hotlineLabel')}</div>
                  <div className="fic-value">
                    {hotlineLink ? <a href={`tel:${hotlineLink}`}>{hotline}</a> : hotline}
                  </div>
                </div>
              ) : null}
              {email ? (
                <div className="fi-contact" style={{ marginTop: 'var(--space-4)' }}>
                  <div className="fic-label">{t('partnership.formInfo.emailLabel')}</div>
                  <div className="fic-value">
                    <a href={`mailto:${email}`}>{email}</a>
                  </div>
                </div>
              ) : null}
            </div>
            <PartnershipInquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
