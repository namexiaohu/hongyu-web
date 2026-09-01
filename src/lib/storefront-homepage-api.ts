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

export type StorefrontHomepageConfig = {
  locale: string;
  bannerSlides: HomepageMediaSlide[];
  aboutSlides: HomepageMediaSlide[];
  bannerHeroCopyStyle: HeroCopyStyle;
  aboutHeroCopyStyle: HeroCopyStyle;
  bannerCarouselFitMode: HeroBackgroundFitMode;
  aboutCarouselFitMode: HeroBackgroundFitMode;
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

export async function getStorefrontHomepageConfig(locale?: string): Promise<StorefrontHomepageConfig> {
  return serverFetch<StorefrontHomepageConfig>('/api/front/homepage', { locale });
}
