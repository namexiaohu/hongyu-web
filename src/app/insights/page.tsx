import type { Metadata } from 'next';

import { InsightsListPage } from '@/components/insights/insights-list-page';
import { getStorefrontLocaleContext } from '@/lib/i18n-server';
import { insightsHero } from '@/lib/insights';
import {
  getStorefrontInsightsBoardCounts,
  getStorefrontInsightsList,
  getStorefrontRandomInsights,
  type StorefrontInsightRelatedItem,
  type StorefrontInsightsBoardCountsResponse,
  type StorefrontInsightsListResponse,
} from '@/lib/storefront-insights-api';
import { DEFAULT_SEO_TITLE } from '@/lib/site-config';

export const metadata: Metadata = {
  title: '前沿资讯 · 竑宇医疗',
  description: insightsHero.lead || DEFAULT_SEO_TITLE,
};

type PageProps = {
  searchParams: Promise<{ category?: string; page?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const category = params.category?.trim() || null;
  const page = Math.max(1, Number.parseInt(params.page ?? '1', 10) || 1);
  const { locale } = await getStorefrontLocaleContext();

  const emptyList: StorefrontInsightsListResponse = {
    locale,
    boardKey: category,
    items: [],
    total: 0,
    page,
    pageSize: 6,
  };
  const emptyCounts: StorefrontInsightsBoardCountsResponse = {
    locale,
    total: 0,
    boards: [
      { boardKey: 'case', name: 'Case Review', count: 0 },
      { boardKey: 'paper', name: 'Industry Papers', count: 0 },
      { boardKey: 'experience', name: 'Surgeon Experience', count: 0 },
    ],
  };

  let list: StorefrontInsightsListResponse = emptyList;
  let boardCounts: StorefrontInsightsBoardCountsResponse = emptyCounts;
  let randomItems: StorefrontInsightRelatedItem[] = [];

  try {
    [list, boardCounts, randomItems] = await Promise.all([
      getStorefrontInsightsList({ category, page, pageSize: 6, locale }),
      getStorefrontInsightsBoardCounts(locale),
      getStorefrontRandomInsights({ limit: 6, locale }).then((payload) => payload.items),
    ]);
  } catch {
    // CMS unavailable — render empty shell.
  }

  return (
    <InsightsListPage
      list={list}
      boardCounts={boardCounts}
      randomItems={randomItems}
      category={category}
      page={page}
    />
  );
}
