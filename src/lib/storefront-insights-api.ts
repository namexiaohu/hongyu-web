import { serverFetch } from '@/lib/api-client';

export type StorefrontInsightAuthor = {
  name: string | null;
  title: string | null;
  bio: string | null;
};

export type StorefrontInsightListItem = {
  id: string;
  title: string;
  summary: string | null;
  slug: string;
  boardKey: string;
  boardName: string;
  coverImage: string | null;
  author: StorefrontInsightAuthor;
  createdAt: string | null;
  publishedAt: string | null;
};

export type StorefrontInsightsListResponse = {
  locale: string;
  boardKey: string | null;
  items: StorefrontInsightListItem[];
  total: number;
  page: number;
  pageSize: number;
};

export type StorefrontInsightBoardCount = {
  boardKey: string;
  name: string;
  count: number;
};

export type StorefrontInsightsBoardCountsResponse = {
  locale: string;
  total: number;
  boards: StorefrontInsightBoardCount[];
};

export type StorefrontInsightRelatedItem = {
  id: string;
  title: string;
  slug: string;
  boardKey: string;
  boardName: string;
  coverImage: string | null;
  createdAt: string | null;
};

export type StorefrontInsightDetail = {
  id: string;
  title: string;
  summary: string | null;
  body: string;
  slug: string;
  boardKey: string;
  boardName: string;
  category: string | null;
  categorySlug: string | null;
  coverStyle: number | null;
  coverImage: string | null;
  author: StorefrontInsightAuthor;
  seo: {
    title: string | null;
    description: string | null;
  };
  createdAt: string | null;
  publishedAt: string | null;
  boardKeys: string[];
  tags: string[];
  relatedProductSlugs: string[];
  relatedReading: StorefrontInsightRelatedItem[];
  relatedArticles: StorefrontInsightRelatedItem[];
};

export async function getStorefrontInsightsList(input?: {
  category?: string | null;
  page?: number;
  pageSize?: number;
  locale?: string;
}): Promise<StorefrontInsightsListResponse> {
  const params = new URLSearchParams();
  if (input?.category?.trim()) params.set('category', input.category.trim());
  if (input?.page) params.set('page', String(input.page));
  if (input?.pageSize) params.set('pageSize', String(input.pageSize));
  const query = params.toString();
  return serverFetch<StorefrontInsightsListResponse>(
    `/api/front/insights${query ? `?${query}` : ''}`,
    { locale: input?.locale },
  );
}

export async function getStorefrontInsightsBoardCounts(
  locale?: string,
): Promise<StorefrontInsightsBoardCountsResponse> {
  return serverFetch<StorefrontInsightsBoardCountsResponse>('/api/front/insights/board-counts', {
    locale,
  });
}

export async function getStorefrontRandomInsights(input?: {
  limit?: number;
  excludeIds?: string[];
  locale?: string;
}): Promise<{ locale: string; items: StorefrontInsightRelatedItem[] }> {
  const params = new URLSearchParams();
  if (input?.limit) params.set('limit', String(input.limit));
  for (const id of input?.excludeIds ?? []) {
    params.append('excludeId', id);
  }
  const query = params.toString();
  return serverFetch(`/api/front/insights/random${query ? `?${query}` : ''}`, {
    locale: input?.locale,
  });
}

export async function getStorefrontInsightBySlug(
  slug: string,
  locale?: string,
): Promise<StorefrontInsightDetail | null> {
  try {
    return await serverFetch<StorefrontInsightDetail>(
      `/api/front/blog/${encodeURIComponent(slug)}`,
      { locale },
    );
  } catch {
    return null;
  }
}
