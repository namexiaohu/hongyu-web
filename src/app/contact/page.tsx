import type { Metadata } from 'next';
import { Suspense } from 'react';

import { ContactInquiryForm } from '@/components/contact/contact-inquiry-form';
import { getPageTranslations, getStorefrontLocaleContext } from '@/lib/i18n-server';
import { DEFAULT_SEO_TITLE } from '@/lib/site-config';
import { getStorefrontCompanyProfile } from '@/lib/storefront-company-api';
import { telHref } from '@/lib/contact-display';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getStorefrontLocaleContext();
  const { t } = await getPageTranslations(locale, ['contact']);
  return {
    title: t('contact.metaTitle'),
    description: DEFAULT_SEO_TITLE,
  };
}

export default async function Page() {
  const { locale } = await getStorefrontLocaleContext();
  const { t } = await getPageTranslations(locale, ['contact', 'breadcrumb', 'common']);
  const company = await getStorefrontCompanyProfile(locale);
  const phone = company.contactPhone.trim();
  const email = company.companyEmail.trim();
  const address = company.address.trim();
  const hours = company.businessHours.trim();
  const phoneLink = telHref(phone);

  return (
    <>
      <div className="breadcrumb container">
        <Link href="/">{t('breadcrumb.home')}</Link>
        <span>/</span>
        <span style={{ color: 'var(--fg)' }}>{t('contact.metaTitle')}</span>
      </div>

      <section className="contact-split container" data-od-id="contact">
        <div className="contact-info">
          <p className="eyebrow">{t('contact.eyebrow')}</p>
          <h1>{t('contact.title')}</h1>
          <p className="lead">{t('contact.lead')}</p>

          {phone ? (
            <div className="ci-item">
              <div className="ci-icon">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <div className="ci-label">{t('contact.phoneLabel')}</div>
                <div className="ci-value">
                  {phoneLink ? <a href={`tel:${phoneLink}`}>{phone}</a> : phone}
                </div>
              </div>
            </div>
          ) : null}

          {email ? (
            <div className="ci-item">
              <div className="ci-icon">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <div className="ci-label">{t('contact.emailLabel')}</div>
                <div className="ci-value">
                  <a href={`mailto:${email}`}>{email}</a>
                </div>
              </div>
            </div>
          ) : null}

          {address ? (
            <div className="ci-item">
              <div className="ci-icon">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <div className="ci-label">{t('contact.addressLabel')}</div>
                <div className="ci-value">{address}</div>
              </div>
            </div>
          ) : null}

          {hours ? (
            <div className="ci-item">
              <div className="ci-icon">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <div>
                <div className="ci-label">{t('contact.hoursLabel')}</div>
                <div className="ci-value">{hours}</div>
              </div>
            </div>
          ) : null}

          <div className="office-map">
            <img src="/images/contact-map.jpg" alt={t('contact.mapAlt')} />
          </div>
        </div>

        <div className="contact-form-wrap">
          <h2>{t('contact.formTitle')}</h2>
          <p className="cf-sub">{t('contact.formSubtitle')}</p>
          <Suspense fallback={<p className="cf-sub">{t('common.loadingForm')}</p>}>
            <ContactInquiryForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
