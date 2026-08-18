import type { Metadata } from 'next';
import Link from 'next/link';

import { CtaStrip } from '@/components/shared/cta-strip';
import { SolutionCardItem } from '@/components/shared/solution-card';
import { FilterListPage } from '@/components/templates/filter-list-page';
import {
  solutionCards,
  solutionsCta,
  solutionsFilters,
  solutionsHero,
} from '@/lib/solutions';
import { DEFAULT_SEO_TITLE } from '@/lib/site-config';

export const metadata: Metadata = {
  title: '解决方案 · 竑宇医疗',
  description: DEFAULT_SEO_TITLE,
};

export default function Page() {
  return (
    <FilterListPage
      breadcrumbs={[{ label: '首页', href: '/' }, { label: '解决方案' }]}
      hero={solutionsHero}
      filters={solutionsFilters}
      footer={<CtaStrip {...solutionsCta} />}
    >
      {solutionCards.map((card) => (
        <SolutionCardItem key={card.title} card={card} />
      ))}
      <div className="pagination">
        <Link href="/solutions" className="pg-arrow">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          上一页
        </Link>
        <span className="pg-active">1</span>
        <Link href="/solutions">2</Link>
        <Link href="/solutions">3</Link>
        <span className="pg-dots">…</span>
        <Link href="/solutions">8</Link>
        <Link href="/solutions" className="pg-arrow">
          下一页
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </Link>
      </div>
    </FilterListPage>
  );
}
