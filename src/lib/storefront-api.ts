import { serverFetch } from '@/lib/api-client';
import {
  FALLBACK_STOREFRONT_LANGUAGES,
  sortStorefrontLanguages,
  type StorefrontLanguage,
} from '@/lib/storefront-languages';
import type { BrandNarrativeSlug, StorefrontBrandNarrativeDetail } from '@/lib/storefront-types';

export type {
  BrandNarrativeHero,
  BrandNarrativeSlug,
  BrandSection,
  CtaSection,
  HeaderGridSection,
  PatentGridSection,
  CourseSection,
  SplitContentSection,
  StorefrontBrandNarrativeDetail,
  TimelineSection,
  ValueCardIcon,
} from '@/lib/storefront-types';

export function brandNarrativeHref(slug: string) {
  return `/${slug.trim()}`;
}

export async function getStorefrontLanguages(): Promise<StorefrontLanguage[]> {
  try {
    const payload = await serverFetch<{ languages?: StorefrontLanguage[] }>('/api/front/languages');
    const languages = sortStorefrontLanguages(payload.languages ?? []);
    return languages.length ? languages : FALLBACK_STOREFRONT_LANGUAGES;
  } catch {
    return FALLBACK_STOREFRONT_LANGUAGES;
  }
}

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

export {
  getStorefrontInsightBySlug,
  getStorefrontInsightsBoardCounts,
  getStorefrontInsightsList,
  getStorefrontRandomInsights,
} from '@/lib/storefront-insights-api';

export type {
  StorefrontInsightAuthor,
  StorefrontInsightBoardCount,
  StorefrontInsightDetail,
  StorefrontInsightListItem,
  StorefrontInsightRelatedItem,
  StorefrontInsightsBoardCountsResponse,
  StorefrontInsightsListResponse,
} from '@/lib/storefront-insights-api';
