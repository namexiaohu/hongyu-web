import type { Metadata } from 'next';

import { SolutionsListView } from '@/components/solution/solutions-list-view';
import { getStorefrontLocaleContext } from '@/lib/i18n-server';
import { DEFAULT_SEO_TITLE } from '@/lib/site-config';
import { solutionsHero } from '@/lib/solutions';
import {
  getStorefrontSolutionCategoryTabs,
  getStorefrontSolutionsList,
  type StorefrontSolutionListResponse,
} from '@/lib/storefront-solutions-api';

export const metadata: Metadata = {
  title: 'Solutions',
  description: solutionsHero.lead || DEFAULT_SEO_TITLE,
};

type PageProps = {
  searchParams: Promise<{ board?: string; category?: string; page?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const category = (params.board ?? params.category)?.trim() || null;
  const page = Math.max(1, Number.parseInt(params.page ?? '1', 10) || 1);
  const { locale } = await getStorefrontLocaleContext();

  const emptyList: StorefrontSolutionListResponse = {
    locale,
    category,
    items: [],
    total: 0,
    page,
    pageSize: 4,
  };

  let list = emptyList;
  let tabs: Awaited<ReturnType<typeof getStorefrontSolutionCategoryTabs>>['tabs'] = [
    { id: 'all', slug: null, label: 'All Products', count: 0 },
  ];

  try {
    const [listPayload, tabPayload] = await Promise.all([
      getStorefrontSolutionsList({ category, page, pageSize: 4, locale }),
      getStorefrontSolutionCategoryTabs(locale),
    ]);
    list = listPayload;
    tabs = tabPayload.tabs;
  } catch {
    // CMS unavailable — empty shell
  }

  return (
    <SolutionsListView
      list={list}
      tabs={tabs}
      category={category}
      page={page}
    />
  );
}
