import { serverFetch } from '@/lib/api-client';

export type StorefrontProductImage = {
  id: string;
  url: string;
  alt: string;
  width?: number | null;
  height?: number | null;
};

export type StorefrontProductAttachment = {
  id: string;
  name: string;
  url: string;
  mimeType: string;
};

export type StorefrontProductStat = {
  label: string;
  value: string;
};

export type StorefrontSeriesProduct = {
  id: string;
  name: string;
  slug: string;
  badgeText?: string;
  extraText?: string;
  coverImage?: StorefrontProductImage | string | null;
};

export type StorefrontProductSolutionRef = {
  slug: string;
  title: string;
};

export type StorefrontProductDetail = {
  id: string;
  name: string;
  slug: string;
  spu: string;
  badgeText?: string;
  extraText?: string;
  shortDescription?: string | null;
  description: string;
  coverImage?: StorefrontProductImage | null;
  videoUrl?: string | null;
  gallery: StorefrontProductImage[];
  stats?: StorefrontProductStat[];
  attachments: StorefrontProductAttachment[];
  seriesProducts?: StorefrontSeriesProduct[];
  solution?: StorefrontProductSolutionRef | null;
  seo?: {
    title?: string | null;
    description?: string | null;
  };
  seoTitle?: string | null;
  seoDescription?: string | null;
};

export function productCoverUrl(
  cover: StorefrontProductImage | string | null | undefined,
): string {
  if (!cover) return '';
  if (typeof cover === 'string') return cover;
  return cover.url?.trim() || '';
}

export async function getStorefrontProductBySlug(
  slug: string,
  locale?: string,
): Promise<StorefrontProductDetail | null> {
  try {
    return await serverFetch<StorefrontProductDetail>(
      `/api/front/products/${encodeURIComponent(slug)}`,
      { locale },
    );
  } catch {
    return null;
  }
}
