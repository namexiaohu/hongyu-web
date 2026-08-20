import type { Metadata } from 'next';
import Link from 'next/link';

import { MediaPlatformCard } from '@/components/media/media-platform-card';
import { getStorefrontLocaleContext } from '@/lib/i18n-server';
import { DEFAULT_SEO_TITLE } from '@/lib/site-config';
import { getStorefrontSocialMedia } from '@/lib/storefront-social-media-api';

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getStorefrontLocaleContext();
  const isZh = locale.toLowerCase().startsWith('zh');
  return {
    title: isZh ? '海外社媒' : 'Social Media',
    description: DEFAULT_SEO_TITLE,
  };
}

export default async function Page() {
  const { locale } = await getStorefrontLocaleContext();
  const data = await getStorefrontSocialMedia(locale);
  const isZh = locale.toLowerCase().startsWith('zh');

  return (
    <div className="page-media-dark" style={{ background: '#0f172a', color: '#f1f5f9', minHeight: '100vh' }}>
      <section className="pmd-hero">
        <div className="pmd-breadcrumb container">
          <Link href="/">{isZh ? '首页' : 'Home'}</Link>
          <span>/</span>
          <span>{isZh ? '海外社媒' : 'Social Media'}</span>
        </div>
        <div className="pmd-hero-inner">
          <div className="pmd-hero-icon">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="32" height="32" stroke="currentColor">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>
          <div className="pmd-hero-eyebrow">
            {isZh ? 'Social Media · 海外社媒' : 'Social Media'}
          </div>
          <h1>{isZh ? '关注竑宇医疗' : 'Follow HONGYU Medical'}</h1>
          <p>
            {isZh
              ? '在各大海外社交平台关注我们，获取最新产品动态、临床案例分享与行业会议资讯。'
              : 'Follow us on global social platforms for product updates, clinical stories, and industry event highlights.'}
          </p>
        </div>
      </section>

      <div className="container">
        {data.socialChannels.length > 0 ? (
          <section className="pmd-section">
            <p className="pmd-eyebrow">{isZh ? 'Follow Us · 社交平台' : 'Follow Us'}</p>
            <h2>{isZh ? '海外社交媒体' : 'Global social media'}</h2>
            <p className="pmd-sub">
              {isZh ? '选择您常用的平台，与我们保持连接。' : 'Choose your preferred platform to stay connected.'}
            </p>
            <div className="pmd-platform-grid">
              {data.socialChannels.map((channel) => (
                <MediaPlatformCard
                  key={`${channel.type}-${channel.name}`}
                  channel={channel}
                  qrHint={isZh ? '悬停图标查看二维码' : 'Hover icon for QR code'}
                />
              ))}
            </div>
          </section>
        ) : null}

        {data.overseasContacts.length > 0 ? (
          <section className="pmd-section pmd-section-border">
            <p className="pmd-eyebrow">{isZh ? 'Contact · 海外联系' : 'Contact'}</p>
            <h2>{isZh ? '海外业务联系方式' : 'Global business contacts'}</h2>
            <p className="pmd-sub">
              {isZh
                ? '按区域联系对应办事处，或直接发送邮件至全球商务合作邮箱。'
                : 'Reach the regional office closest to you, or email our global partnerships team.'}
            </p>
            <div className="pmd-contact-grid">
              {data.overseasContacts.map((contact) => (
                <div key={`${contact.region}-${contact.location}`} className="pmd-contact-card">
                  <h3>{contact.regionLabel}</h3>
                  {contact.location ? <div className="pmd-cc-region">{contact.location}</div> : null}
                  {contact.phone ? (
                    <div className="pmd-cc-item">
                      <div className="pmd-cc-label">{isZh ? '电话' : 'Phone'}</div>
                      <div className="pmd-cc-value">{contact.phone}</div>
                    </div>
                  ) : null}
                  {contact.contactPerson ? (
                    <div className="pmd-cc-item">
                      <div className="pmd-cc-label">{isZh ? '联系人' : 'Contact'}</div>
                      <div className="pmd-cc-value">{contact.contactPerson}</div>
                    </div>
                  ) : null}
                  {contact.email ? (
                    <div className="pmd-cc-item">
                      <div className="pmd-cc-label">{isZh ? '邮箱' : 'Email'}</div>
                      <div className="pmd-cc-value">
                        <a href={`mailto:${contact.email}`}>{contact.email}</a>
                      </div>
                    </div>
                  ) : null}
                  {contact.address ? (
                    <div className="pmd-cc-item">
                      <div className="pmd-cc-label">{isZh ? '地址' : 'Address'}</div>
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
            <p className="pmd-eyebrow">{isZh ? 'Recent · 最新动态' : 'Recent'}</p>
            <h2>{isZh ? '社媒精选内容' : 'Featured social content'}</h2>
            <p className="pmd-sub">
              {isZh ? '来自各平台的最新精彩内容。' : 'Highlights from our social channels.'}
            </p>
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
