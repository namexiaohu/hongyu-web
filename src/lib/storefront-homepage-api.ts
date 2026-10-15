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
  | 'education';

export type HomepageSectionConfig = {
  key: HomepageSectionKey;
  enabled?: boolean;
};

export type StorefrontHomepageConfig = {
  locale: string;
  bannerSlides: HomepageMediaSlide[];
  aboutSlides: HomepageMediaSlide[];
  bannerHeroCopyStyle: HeroCopyStyle;
  aboutHeroCopyStyle: HeroCopyStyle;
  bannerCarouselFitMode: HeroBackgroundFitMode;
  aboutCarouselFitMode: HeroBackgroundFitMode;
  sections: HomepageSectionConfig[];
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
};

const DEFAULT_HOMEPAGE_SECTIONS: HomepageSectionConfig[] = [
  { key: 'banner', enabled: true },
  { key: 'solutions', enabled: true },
  { key: 'about', enabled: true },
  { key: 'stats', enabled: true },
  { key: 'global', enabled: true },
  { key: 'education', enabled: true },
];

export function resolveHomepageSections(sections: HomepageSectionConfig[] | undefined): HomepageSectionConfig[] {
  const seen = new Set<HomepageSectionKey>();
  const ordered: HomepageSectionConfig[] = [];
  for (const row of sections ?? []) {
    if (!row?.key || seen.has(row.key)) continue;
    if (!DEFAULT_HOMEPAGE_SECTIONS.some((item) => item.key === row.key)) continue;
    seen.add(row.key);
    ordered.push({ key: row.key, enabled: row.enabled !== false });
  }
  for (const item of DEFAULT_HOMEPAGE_SECTIONS) {
    if (seen.has(item.key)) continue;
    ordered.push({ ...item });
  }
  return ordered;
}

export async function getStorefrontHomepageConfig(locale?: string): Promise<StorefrontHomepageConfig> {
  return serverFetch<StorefrontHomepageConfig>('/api/front/homepage', { locale });
}
