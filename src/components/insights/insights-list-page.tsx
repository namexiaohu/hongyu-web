import Link from 'next/link';

import { CtaStrip } from '@/components/shared/cta-strip';
import {
  formatInsightMeta,
  insightHref,
  insightsCta,
  insightsHero,
  insightsListHref,
} from '@/lib/insights';
import type {
  StorefrontInsightListItem,
  StorefrontInsightRelatedItem,
  StorefrontInsightsBoardCountsResponse,
  StorefrontInsightsListResponse,
} from '@/lib/storefront-insights-api';

type InsightsListPageProps = {
  list: StorefrontInsightsListResponse;
  boardCounts: StorefrontInsightsBoardCountsResponse;
  randomItems: StorefrontInsightRelatedItem[];
  category?: string | null;
  page: number;
};

function FeaturedCard({ item }: { item: StorefrontInsightListItem }) {
  return (
    <div className="featured">
      <div className="featured-img">
        {item.coverImage ? (
          <img src={item.coverImage} alt={item.title} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'var(--border-soft)' }} />
        )}
      </div>
      <div>
        <div className="f-tag">
          {item.boardName} · Featured
        </div>
        <h2>
          <Link href={insightHref(item.slug)}>{item.title}</Link>
        </h2>
        {item.summary ? <p className="f-desc">{item.summary}</p> : null}
        <div className="f-meta">{formatInsightMeta(item.createdAt ?? item.publishedAt, item.author)}</div>
      </div>
    </div>
  );
}

function ArticleCard({ item }: { item: StorefrontInsightListItem }) {
  return (
    <Link href={insightHref(item.slug)} className="art-card">
      <div className="ac-img">
        {item.coverImage ? (
          <img src={item.coverImage} alt={item.title} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'var(--border-soft)' }} />
        )}
      </div>
      <div className="ac-tag">{item.boardName}</div>
      <h3>{item.title}</h3>
      {item.summary ? <p className="ac-desc">{item.summary}</p> : null}
      <div className="ac-date">{formatInsightMeta(item.createdAt ?? item.publishedAt, item.author)}</div>
    </Link>
  );
}

function Pagination({
  page,
  pageSize,
  total,
  category,
}: {
  page: number;
  pageSize: number;
  total: number;
  category?: string | null;
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  if (totalPages <= 1) return null;

  const pages: Array<number | 'dots'> = [];
  for (let i = 1; i <= totalPages; i += 1) {
    if (i === 1 || i === totalPages || Math.abs(i - page) <= 1) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== 'dots') {
      pages.push('dots');
    }
  }

  return (
    <div className="pagination">
      {page > 1 ? (
        <Link href={insightsListHref({ category, page: page - 1 })} className="pg-arrow">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          上一页
        </Link>
      ) : (
        <span className="pg-arrow" style={{ opacity: 0.4, pointerEvents: 'none' }}>
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          上一页
        </span>
      )}

      {pages.map((entry, index) =>
        entry === 'dots' ? (
          <span key={`dots-${index}`} className="pg-dots">
            …
          </span>
        ) : (
          <Link
            key={entry}
            href={insightsListHref({ category, page: entry })}
            className={entry === page ? 'pg-active' : undefined}
          >
            {entry}
          </Link>
        ),
      )}

      {page < totalPages ? (
        <Link href={insightsListHref({ category, page: page + 1 })} className="pg-arrow">
          下一页
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </Link>
      ) : (
        <span className="pg-arrow" style={{ opacity: 0.4, pointerEvents: 'none' }}>
          下一页
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </span>
      )}
    </div>
  );
}

export function InsightsListPage({
  list,
  boardCounts,
  randomItems,
  category,
  page,
}: InsightsListPageProps) {
  const featured = page === 1 && list.items.length ? list.items[0] : null;
  const gridItems =
    page === 1 && featured ? list.items.slice(1) : list.items;

  return (
    <>
      <div className="breadcrumb container">
        <Link href="/">首页</Link>
        <span>/</span>
        <span style={{ color: 'var(--fg)' }}>前沿资讯</span>
      </div>

      <div className="container">
        <div className="page-title" data-od-id="hero">
          <div className="pt-eyebrow eyebrow">{insightsHero.eyebrow}</div>
          <h1>
            {insightsHero.titleLine1}
            <br />
            {insightsHero.titleLine2}
          </h1>
          <p>{insightsHero.lead}</p>
        </div>

        <div className="cat-filter">
          <Link
            href={insightsListHref()}
            className={`cat-btn${!category ? ' active' : ''}`}
          >
            All <span className="cat-count">{boardCounts.total}</span>
          </Link>
          {boardCounts.boards.map((board) => (
            <Link
              key={board.boardKey}
              href={insightsListHref({ category: board.boardKey })}
              className={`cat-btn${category === board.boardKey ? ' active' : ''}`}
            >
              {board.name} <span className="cat-count">{board.count}</span>
            </Link>
          ))}
        </div>

        {featured ? <FeaturedCard item={featured} /> : null}

        <div className="article-grid" data-od-id="listing">
          {gridItems.map((item) => (
            <ArticleCard key={item.id} item={item} />
          ))}
        </div>

        {randomItems.length ? (
          <div className="compact-section">
            <h2>往期回顾</h2>
            {randomItems.map((item) => (
              <div key={item.id} className="compact-row">
                <div className="cr-date">{formatInsightMeta(item.createdAt, null)}</div>
                <h4>
                  <Link href={insightHref(item.slug)}>{item.title}</Link>
                </h4>
                <div className="cr-tag">{item.boardName}</div>
              </div>
            ))}
          </div>
        ) : null}

        <Pagination
          page={page}
          pageSize={list.pageSize}
          total={list.total}
          category={category}
        />
      </div>

      <CtaStrip {...insightsCta} />
    </>
  );
}
