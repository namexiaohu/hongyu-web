import Link from 'next/link';

import { CtaStrip } from '@/components/shared/cta-strip';
import { SolutionCardItem } from '@/components/shared/solution-card';
import { FilterListPage } from '@/components/templates/filter-list-page';
import { solutionsCta, solutionsHero } from '@/lib/solutions';
import {
  solutionsListHref,
  type StorefrontSolutionCategoryTab,
  type StorefrontSolutionListResponse,
} from '@/lib/storefront-solutions-api';

type SolutionsListViewProps = {
  list: StorefrontSolutionListResponse;
  tabs: StorefrontSolutionCategoryTab[];
  category: string | null;
  page: number;
};

function Pagination({
  page,
  pageSize,
  total,
  category,
}: {
  page: number;
  pageSize: number;
  total: number;
  category: string | null;
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
        <Link href={solutionsListHref({ category, page: page - 1 })} className="pg-arrow">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Previous
        </Link>
      ) : (
        <span className="pg-arrow" style={{ opacity: 0.4, pointerEvents: 'none' }}>
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Previous
        </span>
      )}
      {pages.map((entry, index) =>
        entry === 'dots' ? (
          <span key={`dots-${index}`} className="pg-dots">…</span>
        ) : (
          <Link
            key={entry}
            href={solutionsListHref({ category, page: entry })}
            className={entry === page ? 'pg-active' : undefined}
          >
            {entry}
          </Link>
        ),
      )}
      {page < totalPages ? (
        <Link href={solutionsListHref({ category, page: page + 1 })} className="pg-arrow">
          Next
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </Link>
      ) : (
        <span className="pg-arrow" style={{ opacity: 0.4, pointerEvents: 'none' }}>
          Next
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </span>
      )}
    </div>
  );
}

export function SolutionsListView({ list, tabs, category, page }: SolutionsListViewProps) {
  return (
    <FilterListPage
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Solutions' }]}
      hero={solutionsHero}
      listingOdId="listing"
      listingSectionStyle={{ paddingTop: 'var(--space-16)' }}
      footer={<CtaStrip {...solutionsCta} />}
    >
      {tabs.length ? (
        <div className="filter-tabs">
          {tabs.map((tab) => {
            const isActive = (!category && tab.id === 'all') || category === tab.slug;
            return (
              <Link
                key={tab.id}
                href={solutionsListHref({ category: tab.slug, page: 1 })}
                className={`filter-tab${isActive ? ' active' : ''}`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      ) : null}

      {list.items.length ? (
        list.items.map((card) => <SolutionCardItem key={card.slug} card={card} />)
      ) : (
        <p className="lead" style={{ paddingBlock: 'var(--space-12)' }}>No solutions in this category yet.</p>
      )}

      <Pagination
        page={page}
        pageSize={list.pageSize}
        total={list.total}
        category={category}
      />
    </FilterListPage>
  );
}
