import { serverFetch } from '@/lib/api-client';
import type { BrandNarrativeSlug, StorefrontBrandNarrativeDetail } from '@/lib/storefront-types';

export async function getStorefrontBrandNarrativeBySlug(
  slug: BrandNarrativeSlug,
  locale?: string,
): Promise<StorefrontBrandNarrativeDetail | null> {
  try {
    return await serverFetch<StorefrontBrandNarrativeDetail>(
      `/api/front/brand-narratives/${encodeURIComponent(slug)}`,
      { locale },
    );
  } catch {
    return null;
  }
}
