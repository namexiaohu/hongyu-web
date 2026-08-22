import Link from 'next/link';
import type { ReactNode } from 'react';

import { GlobalPartnerMap, type GlobalMapCenter } from '@/components/home/global-partner-map';
import { HomeAboutCarousel } from '@/components/home/home-about-carousel';
import { HomeBannerCarousel } from '@/components/home/home-banner-carousel';
import { StatsBar } from '@/components/shared/stats-bar';
import { formatInsightDate, insightHref } from '@/lib/insights';
import type { StorefrontHomepageConfig } from '@/lib/storefront-homepage-api';
import type { StorefrontInsightListItem } from '@/lib/storefront-insights-api';
import type { StorefrontSolutionListItem } from '@/lib/storefront-solutions-api';

function MultilineTitle({ text, as: Tag = 'h2' }: { text: string; as?: 'h1' | 'h2' }) {
  const lines = text.split(/\n+/).map((line) => line.trim()).filter(Boolean);
  if (!lines.length) return null;
  return (
    <Tag>
      {lines.map((line, index) => (
        <span key={`${line}-${index}`}>
          {index > 0 ? <br /> : null}
          {line}
        </span>
      ))}
    </Tag>
  );
}

function ParagraphBlocks({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/\n+/).map((line) => line.trim()).filter(Boolean);
  if (!parts.length) return null;
  return (
    <>
      {parts.map((part, index) => (
        <p key={`${index}-${part.slice(0, 12)}`} className={className}>
          {part}
        </p>
      ))}
    </>
  );
}

function MetaIcon({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <svg
      className="home-meta-ico"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function UserMetaIcon() {
  return (
    <MetaIcon>
      <circle cx="12" cy="8" r="4" />
      <path d="M20 21a8 8 0 0 0-16 0" />
    </MetaIcon>
  );
}

function BriefcaseMetaIcon() {
  return (
    <MetaIcon>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </MetaIcon>
  );
}

function TagMetaIcon() {
  return (
    <MetaIcon>
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </MetaIcon>
  );
}

function InsightAuthorMeta({ author }: { author: StorefrontInsightListItem['author'] }) {
  const name = author?.name?.trim() || '';
  const title = author?.title?.trim() || '';
  if (!name && !title) return null;

  return (
    <p className="log-author">
      {name ? (
        <span className="home-meta-item">
          <UserMetaIcon />
          {name}
        </span>
      ) : null}
      {name && title ? <span className="home-meta-sep" aria-hidden="true">·</span> : null}
      {title ? (
        <span className="home-meta-item">
          <BriefcaseMetaIcon />
          {title}
        </span>
      ) : null}
    </p>
  );
}

function EducationExtraMeta({ text }: { text: string }) {
  const value = text.trim();
  if (!value) return null;

  return (
    <p className="edu-extra">
      <span className="home-meta-item">
        <TagMetaIcon />
        {value}
      </span>
    </p>
  );
}

type HomePageViewProps = {
  config: StorefrontHomepageConfig;
  solutions: StorefrontSolutionListItem[];
  insights: StorefrontInsightListItem[];
  partnerCenters: GlobalMapCenter[];
};

export function HomePageView({ config, solutions, insights, partnerCenters }: HomePageViewProps) {
  return (
    <>
      <HomeBannerCarousel
        slides={config.bannerSlides}
        title={config.bannerTitle}
        subtitle={config.bannerSubtitle}
        description={config.bannerDescription}
      />

      <section className="section" id="products" data-od-id="products">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Solutions · 解决方案</p>
            {config.solutionsTitle ? <h2>{config.solutionsTitle}</h2> : null}
            {config.solutionsDescription ? <p className="lead">{config.solutionsDescription}</p> : null}
          </div>
          <div className="grid-4">
            {solutions.map((item) => (
              <Link key={item.slug} href={item.href || `/solutions/${item.slug}`} className="product-card">
                {item.coverImage ? (
                  <div className="product-cover">
                    <img src={item.coverImage} alt={item.title} />
                  </div>
                ) : (
                  <div className="product-cover product-cover-empty" />
                )}
                <h3>{item.title}</h3>
                {item.description ? <p>{item.description}</p> : null}
                {item.badgeText ? <span className="product-tag">{item.badgeText}</span> : null}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="about" data-od-id="about" style={{ background: 'var(--bg-soft)' }}>
        <div className="container about-grid">
          <div className="about-text">
            <p className="eyebrow">About · 企业介绍</p>
            {config.aboutTitle ? <MultilineTitle text={config.aboutTitle} /> : null}
            <ParagraphBlocks text={config.aboutDescription} />
            <Link href="/about" className="btn-text" style={{ marginTop: 'var(--space-6)', display: 'inline-flex' }}>
              了解更多 →
            </Link>
          </div>
          <HomeAboutCarousel slides={config.aboutSlides} />
        </div>
      </section>

      {config.stats.length > 0 ? (
        <section className="section" data-od-id="stats">
          <div className="container">
            <p className="eyebrow" style={{ marginBottom: 'var(--space-8)' }}>By the Numbers · 核心数据</p>
            <StatsBar
              stats={config.stats.map((stat) => ({
                value: stat.title,
                suffix: stat.subtitle || undefined,
                label: stat.description,
              }))}
            />
          </div>
        </section>
      ) : null}

      <section className="section" id="global" data-od-id="global">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Global · 全球布局</p>
            {config.globalTitle ? <h2>{config.globalTitle}</h2> : null}
            {config.globalDescription ? <p className="lead">{config.globalDescription}</p> : null}
          </div>
          <GlobalPartnerMap centers={partnerCenters} />
        </div>
      </section>

      <section className="section" id="insights" data-od-id="insights" style={{ background: 'var(--bg-soft)' }}>
        <div className="container">
          <div className="row-between" style={{ marginBottom: 'var(--space-8)' }}>
            <div>
              <p className="eyebrow">Insights · 前沿资讯</p>
              <h2 style={{ marginTop: 'var(--space-3)' }}>技术前沿与临床实践</h2>
            </div>
            <Link href="/insights" className="btn" style={{ fontSize: 13, fontWeight: 500, color: 'var(--accent)' }}>
              查看全部 →
            </Link>
          </div>
          <div className="log-list">
            {insights.map((item) => {
              const dateLabel = formatInsightDate(item.publishedAt || item.createdAt);
              return (
                <Link
                  key={item.id}
                  href={insightHref(item.slug)}
                  className="log-row"
                >
                  <span className="meta num">{dateLabel || '—'}</span>
                  <div className="log-main">
                    <div className="log-thumb">
                      {item.coverImage ? <img src={item.coverImage} alt="" /> : null}
                    </div>
                    <div className="log-body">
                      <h3>{item.title}</h3>
                      {item.summary ? <p className="log-desc">{item.summary}</p> : null}
                      <InsightAuthorMeta author={item.author} />
                    </div>
                  </div>
                  <span className="log-tag">{item.boardName || item.boardKey}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section" id="education" data-od-id="education">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Education · 持续教育</p>
            {config.educationTitle ? <h2>{config.educationTitle}</h2> : null}
            {config.educationDescription ? <p className="lead">{config.educationDescription}</p> : null}
          </div>
          <div className="grid-3">
            {config.educationItems.map((item, index) => {
              const inner = (
                <>
                  <div className="edu-card-img">
                    {item.coverImage ? (
                      <img src={item.coverImage} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : null}
                  </div>
                  <div className="edu-card-body">
                    {item.badgeText ? <div className="ec-type">{item.badgeText}</div> : null}
                    <h3>{item.title}</h3>
                    {item.description ? <p>{item.description}</p> : null}
                    {item.extraText ? <EducationExtraMeta text={item.extraText} /> : null}
                  </div>
                </>
              );
              if (item.href) {
                return (
                  <Link key={`${item.title}-${index}`} href={item.href} className="edu-card">
                    {inner}
                  </Link>
                );
              }
              return (
                <div key={`${item.title}-${index}`} className="edu-card">
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section" id="contact" data-od-id="cta">
        <div className="container">
          <div className="cta-strip">
            <p className="eyebrow" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 'var(--space-4)' }}>
              Partnership · 商务合作
            </p>
            <h2>期待与您携手同行</h2>
            <p className="lead">无论您希望探讨产品合作、市场拓展还是联合推广，欢迎与我们交流。</p>
            <Link href="/partnership" className="btn-cta-white">
              商务合作咨询
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
