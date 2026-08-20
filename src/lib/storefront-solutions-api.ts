import { serverFetch } from '@/lib/api-client';

export type StorefrontSolutionMaterial = {
  name: string;
  url: string;
  mimeType: string;
};

export type StorefrontSolutionListItem = {
  slug: string;
  href: string;
  coverImage: string;
  badgeText: string;
  categorySlug: string;
  categoryLabel: string;
  title: string;
  largeTitle: string;
  description: string;
  tags: string[];
};

export type StorefrontSolutionSection = {
  type: string;
  id?: string;
  [key: string]: unknown;
};

export type StorefrontSolutionDetail = {
  slug: string;
  locale: string;
  seo: { title: string; description: string };
  breadcrumbs: Array<{ label: string; href?: string }>;
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    image: string;
    imageAlt: string;
  };
  stats: Array<{ value: string; label: string; suffix?: string }> | null;
  materials: StorefrontSolutionMaterial[];
  productParams: Array<{ label: string; value: string }>;
  sections: StorefrontSolutionSection[];
  related: StorefrontSolutionListItem[];
};

export type StorefrontSolutionListResponse = {
  locale: string;
  category: string | null;
  page: number;
  pageSize: number;
  total: number;
  items: StorefrontSolutionListItem[];
};

export type StorefrontSolutionCategoryTab = {
  id: string;
  slug: string | null;
  label: string;
  count: number;
};

export function solutionsListHref(input?: { category?: string | null; page?: number }) {
  const params = new URLSearchParams();
  if (input?.category?.trim() && input.category !== 'all') {
    params.set('board', input.category.trim());
  }
  if (input?.page && input.page > 1) params.set('page', String(input.page));
  const query = params.toString();
  return query ? `/solutions?${query}` : '/solutions';
}

export async function getStorefrontSolutionBySlug(
  slug: string,
  locale?: string,
): Promise<StorefrontSolutionDetail | null> {
  try {
    return await serverFetch<StorefrontSolutionDetail>(
      `/api/front/solutions/${encodeURIComponent(slug)}`,
      { locale },
    );
  } catch {
    return null;
  }
}

export async function getStorefrontSolutionsList(input?: {
  category?: string | null;
  page?: number;
  pageSize?: number;
  sort?: 'sortOrder' | 'createdAt';
  locale?: string;
}): Promise<StorefrontSolutionListResponse> {
  const params = new URLSearchParams();
  if (input?.category?.trim()) params.set('board', input.category.trim());
  if (input?.page) params.set('page', String(input.page));
  if (input?.pageSize) params.set('pageSize', String(input.pageSize));
  if (input?.sort) params.set('sort', input.sort);
  const query = params.toString();
  return serverFetch<StorefrontSolutionListResponse>(
    `/api/front/solutions${query ? `?${query}` : ''}`,
    { locale: input?.locale },
  );
}

export async function getStorefrontSolutionCategoryTabs(locale?: string) {
  return serverFetch<{ locale: string; tabs: StorefrontSolutionCategoryTab[] }>(
    '/api/front/solutions/category-tabs',
    { locale },
  );
}
