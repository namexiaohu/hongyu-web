import type { Metadata } from 'next';
import Link from 'next/link';

import { MediaPlatformCard } from '@/components/media/media-platform-card';
import { resolveCompanyName } from '@/lib/company-display';
import { getPageTranslations, getStorefrontLocaleContext } from '@/lib/i18n-server';
import { DEFAULT_SEO_TITLE } from '@/lib/site-config';
import { getStorefrontCompanyProfile } from '@/lib/storefront-company-api';
import { getStorefrontSocialMedia } from '@/lib/storefront-social-media-api';

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getStorefrontLocaleContext();
  const { t } = await getPageTranslations(locale, ['media']);
  return {
    title: t('media.metaTitle'),
    description: DEFAULT_SEO_TITLE,
  };
}

export default async function Page() {
  const { locale } = await getStorefrontLocaleContext();
  const { t } = await getPageTranslations(locale, ['media', 'breadcrumb']);
  const [company, data] = await Promise.all([
    getStorefrontCompanyProfile(locale),
    getStorefrontSocialMedia(locale),
  ]);
  const companyName = resolveCompanyName(company, locale);
  const businessEmail = company.businessEmail.trim();

  return (
    <div className="page-media-dark" style={{ background: '#0f172a', color: '#f1f5f9', minHeight: '100vh' }}>
      <section className="pmd-hero">
        <div className="pmd-breadcrumb container">
          <Link href="/">{t('breadcrumb.home')}</Link>
          <span>/</span>
          <span>{t('media.metaTitle')}</span>
        </div>
        <div className="pmd-hero-inner">
          <div className="pmd-hero-icon">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="32" height="32" stroke="currentColor">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>
          <div className="pmd-hero-eyebrow">{t('media.eyebrow')}</div>
          <h1>{t('media.title', { companyName })}</h1>
          <p>{t('media.lead')}</p>
        </div>
      </section>

      <div className="container">
        {data.socialChannels.length > 0 ? (
          <section className="pmd-section">
            <p className="pmd-eyebrow">{t('media.platforms.eyebrow')}</p>
            <h2>{t('media.platforms.title')}</h2>
            <p className="pmd-sub">{t('media.platforms.subtitle')}</p>
            <div className="pmd-platform-grid">
              {data.socialChannels.map((channel) => (
                <MediaPlatformCard
                  key={`${channel.type}-${channel.name}`}
                  channel={channel}
                  qrHint={t('media.platforms.qrHint')}
                />
              ))}
            </div>
          </section>
        ) : null}

        {data.overseasContacts.length > 0 ? (
          <section className="pmd-section pmd-section-border">
            <p className="pmd-eyebrow">{t('media.contacts.eyebrow')}</p>
            <h2>{t('media.contacts.title')}</h2>
            <p className="pmd-sub">
              {businessEmail
                ? t('media.contacts.subtitleWithEmail', { businessEmail })
                : t('media.contacts.subtitleFallback')}
            </p>
            <div className="pmd-contact-grid">
              {data.overseasContacts.map((contact) => (
                <div key={`${contact.region}-${contact.location}`} className="pmd-contact-card">
                  <h3>{contact.regionLabel}</h3>
                  {contact.location ? <div className="pmd-cc-region">{contact.location}</div> : null}
                  {contact.phone ? (
                    <div className="pmd-cc-item">
                      <div className="pmd-cc-label">{t('media.contacts.phone')}</div>
                      <div className="pmd-cc-value">{contact.phone}</div>
                    </div>
                  ) : null}
                  {contact.contactPerson ? (
                    <div className="pmd-cc-item">
                      <div className="pmd-cc-label">{t('media.contacts.contactPerson')}</div>
                      <div className="pmd-cc-value">{contact.contactPerson}</div>
                    </div>
                  ) : null}
                  {contact.email ? (
                    <div className="pmd-cc-item">
                      <div className="pmd-cc-label">{t('media.contacts.email')}</div>
                      <div className="pmd-cc-value">
                        <a href={`mailto:${contact.email}`}>{contact.email}</a>
                      </div>
                    </div>
                  ) : null}
                  {contact.address ? (
                    <div className="pmd-cc-item">
                      <div className="pmd-cc-label">{t('media.contacts.address')}</div>
                      <div className="pmd-cc-value">{contact.address}</div>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {data.featuredPosts.length > 0 ? (
          <section className="pmd-section pmd-section-border">
            <p className="pmd-eyebrow">{t('media.posts.eyebrow')}</p>
            <h2>{t('media.posts.title')}</h2>
            <p className="pmd-sub">{t('media.posts.subtitle')}</p>
            <div className="pmd-posts-grid">
              {data.featuredPosts.map((post) => {
                const PostTag = post.url ? 'a' : 'div';
                const postProps = post.url
                  ? { href: post.url, target: '_blank' as const, rel: 'noopener noreferrer' as const }
                  : {};

                return (
                  <PostTag key={`${post.title}-${post.badgeText}`} className="pmd-post-card" {...postProps}>
                    {post.coverImage ? (
                      <div className="pmd-post-img">
                        <img src={post.coverImage} alt={post.title} />
                        {post.badgeText ? <span className="pmd-post-badge">{post.badgeText}</span> : null}
                      </div>
                    ) : null}
                    <div className="pmd-post-body">
                      {post.title ? <div className="pmd-post-title">{post.title}</div> : null}
                      {post.description ? <div className="pmd-post-date">{post.description}</div> : null}
                    </div>
                  </PostTag>
                );
              })}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
