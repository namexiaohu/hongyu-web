import Link from 'next/link';

import { ArticleToc } from '@/components/insights/article-toc';
import { prepareArticleBody } from '@/lib/article-toc';
import { getPageTranslations, getStorefrontLocaleContext } from '@/lib/i18n-server';
import {
  formatInsightDate,
  insightHref,
} from '@/lib/insights';
import type {
  StorefrontInsightDetail,
  StorefrontInsightRelatedItem,
} from '@/lib/storefront-insights-api';

type InsightArticlePageProps = {
  article: StorefrontInsightDetail;
};

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="4" />
      <path d="M20 21a8 8 0 0 0-16 0" />
    </svg>
  );
}

function RelatedSidebarItem({ item }: { item: StorefrontInsightRelatedItem }) {
  return (
    <Link href={insightHref(item.slug)} className="sr-item">
      <div className="sr-thumb">
        {item.coverImage ? (
          <img src={item.coverImage} alt="" />
        ) : (
          <div
            style={{
              background: 'var(--accent-soft)',
              display: 'grid',
              placeItems: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
        )}
      </div>
      <div className="sr-info">
        <h5>{item.title}</h5>
        <span className="sr-date">{formatInsightDate(item.createdAt)}</span>
      </div>
    </Link>
  );
}

function RelatedCard({ item }: { item: StorefrontInsightRelatedItem }) {
  return (
    <Link href={insightHref(item.slug)} className="related-card">
      <div className="related-card-img">
        {item.coverImage ? (
          <img src={item.coverImage} alt="" />
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'var(--border-soft)' }} />
        )}
      </div>
      <div className="related-card-body">
        <div className="rc-tag">{item.boardName}</div>
        <h3>{item.title}</h3>
        <span className="rc-date">{formatInsightDate(item.createdAt)}</span>
      </div>
    </Link>
  );
}

export async function InsightArticlePage({ article }: InsightArticlePageProps) {
  const { locale } = await getStorefrontLocaleContext();
  const { t } = await getPageTranslations(locale, ['insights', 'breadcrumb']);

  const { html: bodyHtml, toc } = prepareArticleBody(article.body);
  const dateLabel = formatInsightDate(article.createdAt ?? article.publishedAt);
  const authorLabel = [article.author.name, article.author.title].filter(Boolean).join(', ');

  return (
    <>
      <link rel="stylesheet" href="/cms-article-content.css" />

      <div className="breadcrumb container">
        <Link href="/">{t('breadcrumb.home')}</Link>
        <span>/</span>
        <Link href="/insights">{t('breadcrumb.insights')}</Link>
        <span>/</span>
        <Link href={`/insights?category=${article.boardKey}`}>{article.boardName}</Link>
        <span>/</span>
        <span style={{ color: 'var(--fg)' }}>{article.title}</span>
      </div>

      <section className="art-hero" data-od-id="art-hero">
        <div className="container">
          <div className="art-hero-inner">
            <span className="art-category">{article.boardName}</span>
            <h1>{article.title}</h1>
            {article.summary ? <p className="art-lead">{article.summary}</p> : null}
            <div className="art-meta">
              {dateLabel ? (
                <span>
                  <CalendarIcon /> {dateLabel}
                </span>
              ) : null}
              {authorLabel ? (
                <span>
                  <UserIcon /> {authorLabel}
                </span>
              ) : null}
            </div>
          </div>
          {article.coverImage ? (
            <div className="art-hero-cover">
              <img src={article.coverImage} alt={article.title} />
            </div>
          ) : null}
        </div>
      </section>

      <div className="container">
        <div className="art-body-layout">
          <article
            className="art-body cms-article-content"
            data-od-id="art-body"
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />

          <aside className="art-sidebar" data-od-id="sidebar">
            <ArticleToc items={toc} />
            {article.relatedReading.length ? (
              <div className="sidebar-card sidebar-related">
                <h4>{t('insights.article.relatedReading')}</h4>
                {article.relatedReading.map((item) => (
                  <RelatedSidebarItem key={item.id} item={item} />
                ))}
              </div>
            ) : null}
          </aside>
        </div>
      </div>

      {article.relatedArticles.length ? (
        <section className="section related-section" data-od-id="related">
          <div className="container">
            <div className="section-header">
              <p className="eyebrow">{t('insights.article.moreEyebrow')}</p>
              <h2>{t('insights.article.relatedTitle')}</h2>
            </div>
            <div className="grid-4">
              {article.relatedArticles.map((item) => (
                <RelatedCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
