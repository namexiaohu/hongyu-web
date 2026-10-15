import { serverFetch } from '@/lib/api-client';
import type { HeroBackgroundFitMode } from '@/lib/hero-background-fit';
import type { HeroCopyStyle } from '@/lib/hero-copy-style';

export type HomepageMediaSlide = {
  id: string;
  url: string;
  mediaType: 'image' | 'video';
};

export type HomepageStatItem = {
  title: string;
  subtitle: string;
  description: string;
};

export type HomepageEducationItem = {
  title: string;
  description: string;
  badgeText: string;
  extraText: string;
  href: string;
  coverImage: string;
};

export type HomepageSolutionItem = {
  title: string;
  description: string;
  badgeText: string;
  coverImage: string;
  href: string;
};

export type HomepageSectionKey =
  | 'banner'
  | 'solutions'
  | 'about'
  | 'stats'
  | 'global'
  | 'insights'
  | 'education';

export type HomepageSectionConfig = {
  key: HomepageSectionKey;
  enabled?: boolean;
};

export const DEFAULT_HOMEPAGE_INSIGHTS_ARTICLE_COUNT = 5;

export type StorefrontHomepageConfig = {
  locale: string;
  bannerSlides: HomepageMediaSlide[];
  aboutSlides: HomepageMediaSlide[];
  bannerHeroCopyStyle: HeroCopyStyle;
  aboutHeroCopyStyle: HeroCopyStyle;
  bannerCarouselFitMode: HeroBackgroundFitMode;
  aboutCarouselFitMode: HeroBackgroundFitMode;
  sections: HomepageSectionConfig[];
  insightsArticleCount?: number;
  bannerTitle: string;
  bannerSubtitle: string;
  bannerDescription: string;
  solutionsTitle: string;
  solutionsDescription: string;
  aboutTitle: string;
  aboutDescription: string;
  stats: HomepageStatItem[];
  globalTitle: string;
  globalDescription: string;
  educationTitle: string;
  educationDescription: string;
  educationItems: HomepageEducationItem[];
  solutionItems: HomepageSolutionItem[];
  insightsTitle?: string;
};

const HOMEPAGE_SECTION_KEYS: HomepageSectionKey[] = [
  'banner',
  'solutions',
  'about',
  'stats',
  'global',
  'insights',
  'education',
];

const DEFAULT_HOMEPAGE_SECTIONS: HomepageSectionConfig[] = HOMEPAGE_SECTION_KEYS.map((key) => ({
  key,
  enabled: true,
}));

export function normalizeInsightsArticleCount(value: number | null | undefined): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return DEFAULT_HOMEPAGE_INSIGHTS_ARTICLE_COUNT;
  }
  return Math.min(50, Math.max(1, Math.round(value)));
}

export function resolveHomepageSections(sections: HomepageSectionConfig[] | undefined): HomepageSectionConfig[] {
  const seen = new Set<HomepageSectionKey>();
  const ordered: HomepageSectionConfig[] = [];
  for (const row of sections ?? []) {
    if (!row?.key || seen.has(row.key)) continue;
    if (!HOMEPAGE_SECTION_KEYS.includes(row.key)) continue;
    seen.add(row.key);
    ordered.push({ key: row.key, enabled: row.enabled !== false });
  }
  for (const key of HOMEPAGE_SECTION_KEYS) {
    if (seen.has(key)) continue;
    const educationIndex = ordered.findIndex((row) => row.key === 'education');
    if (key === 'insights' && educationIndex >= 0) {
      ordered.splice(educationIndex, 0, { key, enabled: true });
    } else {
      ordered.push({ key, enabled: true });
    }
    seen.add(key);
  }
  return ordered;
}

export async function getStorefrontHomepageConfig(locale?: string): Promise<StorefrontHomepageConfig> {
  return serverFetch<StorefrontHomepageConfig>('/api/front/homepage', { locale });
}
