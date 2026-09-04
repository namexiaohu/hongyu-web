import { serverFetch } from '@/lib/api-client';

export type StorefrontOtherContentDetail = {
  id: string;
  title: string;
  summary: string | null;
  body: string;
  slug: string;
  coverImage: string | null;
  seo: {
    title: string | null;
    description: string | null;
  };
  publishedAt: string | null;
  createdAt: string | null;
};

export async function getStorefrontOtherContentBySlug(slug: string, locale?: string) {
  try {
    return await serverFetch<StorefrontOtherContentDetail>(`/api/front/pages/${encodeURIComponent(slug)}`, {
      locale,
      next: { revalidate: 60 },
    });
  } catch {
    return null;
  }
}

export function otherContentHref(slug: string) {
  return `/pages/${slug}`;
}
