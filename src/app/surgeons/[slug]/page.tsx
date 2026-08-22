import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Breadcrumb } from '@/components/shared/breadcrumb';
import { getPageTranslations, getStorefrontLocaleContext } from '@/lib/i18n-server';
import { DEFAULT_SEO_TITLE } from '@/lib/site-config';
import { getStorefrontSurgeonBySlug } from '@/lib/storefront-surgeons-api';

type PageProps = {
  params: Promise<{ slug: string }>;
};

const badgeSymbols: Record<string, string> = {
  platinum: '◆',
  gold: '★',
  silver: '●',
};

function formatCount(value: number) {
  return value.toLocaleString('en-US');
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { locale } = await getStorefrontLocaleContext();
  const { t } = await getPageTranslations(locale, ['detail', 'common']);
  const surgeon = await getStorefrontSurgeonBySlug(slug, locale);
  if (!surgeon) return { title: t('common.notFound') };
  return {
    title: `${surgeon.name} · ${t('detail.surgeon.metaTitleSuffix')}`,
    description: surgeon.expertise || surgeon.experience || DEFAULT_SEO_TITLE,
  };
}

export default async function SurgeonDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const { locale } = await getStorefrontLocaleContext();
  const { t } = await getPageTranslations(locale, ['detail', 'breadcrumb', 'common']);
  const surgeon = await getStorefrontSurgeonBySlug(slug, locale);
  if (!surgeon) notFound();

  const titleLine = [surgeon.position, surgeon.institution].filter(Boolean).join(' · ');
  const hasStats = surgeon.certificationYear != null || surgeon.surgeryCount != null;
  const hasCertInfo =
    Boolean(surgeon.gradeTitle)
    || surgeon.certificationYear != null
    || surgeon.surgeryCount != null
    || surgeon.otherCertifications.length > 0;
  const firstCenter = surgeon.partnerCenters[0] ?? null;

  return (
    <>
      <Breadcrumb
        items={[
          { label: t('breadcrumb.home'), href: '/' },
          { label: t('breadcrumb.certifiedSurgeons'), href: '/surgeons' },
          { label: surgeon.name },
        ]}
      />

      <section className="profile-hero container" data-od-id="hero">
        <div className="profile-hero-inner">
          {surgeon.avatar ? (
            <div className="profile-avatar">
              <img src={surgeon.avatar} alt={surgeon.name} />
            </div>
          ) : null}
          <div className="profile-info">
            <div className="pi-name">{surgeon.name}</div>
            {titleLine ? <div className="pi-title">{titleLine}</div> : null}
            {surgeon.gradeTitle ? (
              <div className={`pi-badge ${surgeon.gradeKey}`}>
                {badgeSymbols[surgeon.gradeKey] ?? ''} {surgeon.gradeTitle}
              </div>
            ) : null}
            {hasStats ? (
              <div className="pi-stats">
                {surgeon.certificationYear != null ? (
                  <div className="pi-stat">
                    <span className="ps-num">{surgeon.certificationYear}</span>
                    <span className="ps-label">{t('detail.surgeon.statCertificationYear')}</span>
                  </div>
                ) : null}
                {surgeon.surgeryCount != null ? (
                  <div className="pi-stat">
                    <span className="ps-num">{formatCount(surgeon.surgeryCount)}</span>
                    <span className="ps-label">{t('detail.surgeon.statTotalSurgeries')}</span>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <div className="container surgeon-detail-body">
        <div className="two-col">
          <div className="main-content">
            {surgeon.detailDescription.trim() ? (
              <section data-od-id="about">
                <p className="eyebrow" style={{ marginBottom: 'var(--space-3)' }}>{t('detail.surgeon.aboutEyebrow')}</p>
                <h2 className="surgeon-section-title">{t('detail.surgeon.aboutTitle')}</h2>
                <div
                  className="rich-content"
                  dangerouslySetInnerHTML={{ __html: surgeon.detailDescription }}
                />
              </section>
            ) : null}
          </div>

          <aside className="sidebar" data-od-id="sidebar">
            {surgeon.partnerCenters.length > 0 ? (
              <div className="sidebar-card">
                <div className="sc-label">{t('detail.surgeon.affiliatedCenters')}</div>
                <div className="sc-centers">
                  {surgeon.partnerCenters.map((center) => (
                    <div key={center.slug} className="sc-center-item">
                      <div className="sc-value">
                        <Link href={`/centers/${center.slug}`}>{center.name}</Link>
                      </div>
                      {center.badgeText ? <div className="sc-meta">{center.badgeText}</div> : null}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {hasCertInfo ? (
              <div className="sidebar-card">
                <div className="sc-label">{t('detail.surgeon.certificationInfo')}</div>
                <div className="sc-cert-rows">
                  {surgeon.gradeTitle ? (
                    <div className="sc-cert-row">
                      <span className="sc-cert-key">{t('detail.surgeon.certificationLevel')}</span>
                      <span className={`pi-badge ${surgeon.gradeKey} pi-badge-sm`}>
                        {surgeon.gradeTitle}
                      </span>
                    </div>
                  ) : null}
                  {surgeon.certificationYear != null ? (
                    <div className="sc-cert-row">
                      <span className="sc-cert-key">{t('detail.surgeon.certificationYear')}</span>
                      <span className="sc-cert-value">{surgeon.certificationYear}</span>
                    </div>
                  ) : null}
                  {surgeon.surgeryCount != null ? (
                    <div className="sc-cert-row">
                      <span className="sc-cert-key">{t('detail.surgeon.totalSurgeries')}</span>
                      <span className="sc-cert-value">{formatCount(surgeon.surgeryCount)}</span>
                    </div>
                  ) : null}
                  {surgeon.otherCertifications.map((row) => (
                    <div key={`${row.label}-${row.value}`} className="sc-cert-row">
                      <span className="sc-cert-key">{row.label}</span>
                      <span className="sc-cert-value">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {surgeon.specialties.length > 0 ? (
              <div className="sidebar-card">
                <div className="sc-label">{t('detail.surgeon.specialties')}</div>
                <div className="sc-specialty-tags">
                  {surgeon.specialties.map((item) => (
                    <span key={item} className="sc-specialty-tag">{item}</span>
                  ))}
                </div>
              </div>
            ) : null}

            {firstCenter ? (
              <div className="sidebar-card sidebar-card-muted">
                <div className="sc-label">{t('detail.surgeon.contactSurgeon')}</div>
                <p className="sc-contact-copy">
                  {t('detail.surgeon.contactCopy')}
                </p>
                <Link href={`/centers/${firstCenter.slug}`} className="sc-contact-link">
                  {t('detail.center.visitHospital')}
                </Link>
              </div>
            ) : null}
          </aside>
        </div>
      </div>

      {surgeon.relatedSurgeons.length > 0 ? (
        <section className="section related-surgeons-section" data-od-id="related">
          <div className="container">
            <p className="eyebrow" style={{ marginBottom: 'var(--space-3)' }}>{t('detail.surgeon.relatedEyebrow')}</p>
            <h2 className="surgeon-section-title">
              {firstCenter
                ? t('detail.surgeon.relatedTitleWithCenter', { centerName: firstCenter.name })
                : t('detail.surgeon.relatedTitleFallback')}
            </h2>
            <div className="related-surgeons-grid">
              {surgeon.relatedSurgeons.map((peer) => (
                <Link key={peer.slug} href={`/surgeons/${peer.slug}`} className="related-surgeon">
                  <div className="rs-avatar">
                    {peer.avatar ? <img src={peer.avatar} alt={peer.name} /> : null}
                  </div>
                  <div>
                    <div className="rs-name">{peer.name}</div>
                    {peer.position ? <div className="rs-title">{peer.position}</div> : null}
                    {peer.gradeTitle ? (
                      <div className={`pi-badge ${peer.gradeKey} pi-badge-sm rs-grade`}>
                        {badgeSymbols[peer.gradeKey] ?? ''} {peer.gradeTitle}
                      </div>
                    ) : null}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
