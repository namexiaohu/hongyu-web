import Link from 'next/link';

import { HomeAboutCarousel } from '@/components/home/home-about-carousel';
import { HomeBannerCarousel } from '@/components/home/home-banner-carousel';
import { formatInsightDate, insightHref } from '@/lib/insights';
import type { StorefrontHomepageConfig } from '@/lib/storefront-homepage-api';
import type { StorefrontInsightListItem } from '@/lib/storefront-insights-api';
import type { StorefrontSolutionListItem } from '@/lib/storefront-solutions-api';

const GLOBAL_CARDS = [
  {
    region: '亚太地区',
    title: '亚太合作中心',
    body: '覆盖中国、日本、韩国、东南亚等地区，建立区域技术培训与临床支持体系。',
  },
  {
    region: '欧洲',
    title: '欧洲认证网络',
    body: '与多国权威兽医学会合作，推动产品 CE 认证及区域临床指南制定。',
  },
  {
    region: '北美',
    title: '北美市场拓展',
    body: 'FDA 注册进程推进中，与当地头部动物医疗集团建立战略合作关系。',
  },
  {
    region: '认证体系',
    title: '认证术者计划',
    body: '系统化培训与考核体系，确保每一位术者掌握标准操作流程与最佳实践。',
  },
  {
    region: '学术合作',
    title: '合作中心医院',
    body: '与全球 50+ 动物医院共建临床研究中心，持续产出循证医学证据。',
  },
  {
    region: '产业生态',
    title: '海外媒体矩阵',
    body: '多语言内容传播体系，面向全球兽医从业者传递最新技术动态与临床案例。',
  },
] as const;

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

function formatAuthorLine(author: StorefrontInsightListItem['author']) {
  const name = author?.name?.trim() || '';
  const title = author?.title?.trim() || '';
  if (name && title) return `${name} · ${title}`;
  return name || title;
}

type HomePageViewProps = {
  config: StorefrontHomepageConfig;
  solutions: StorefrontSolutionListItem[];
  insights: StorefrontInsightListItem[];
};

export function HomePageView({ config, solutions, insights }: HomePageViewProps) {
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
            <div className="grid-3">
              {config.stats.map((stat, index) => (
                <div key={`${stat.title}-${index}`} className="stat-item">
                  <div className="stat-num num">
                    {stat.title}
                    {stat.subtitle ? <span className="stat-suffix">{stat.subtitle}</span> : null}
                  </div>
                  {stat.description ? <p className="stat-label">{stat.description}</p> : null}
                </div>
              ))}
            </div>
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
          <div className="grid-3">
            {GLOBAL_CARDS.map((card) => (
              <div key={card.title} className="global-card">
                <div className="gc-region">{card.region}</div>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </div>
            ))}
          </div>
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
              const authorLine = formatAuthorLine(item.author);
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
                      {authorLine ? <p className="log-author">{authorLine}</p> : null}
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
                    {item.extraText ? <p className="edu-extra">{item.extraText}</p> : null}
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
