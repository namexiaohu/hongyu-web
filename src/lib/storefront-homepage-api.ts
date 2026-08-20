import { serverFetch } from '@/lib/api-client';

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

export type StorefrontHomepageConfig = {
  locale: string;
  bannerSlides: HomepageMediaSlide[];
  aboutSlides: HomepageMediaSlide[];
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
};

export const EMPTY_STOREFRONT_HOMEPAGE: StorefrontHomepageConfig = {
  locale: '',
  bannerSlides: [],
  aboutSlides: [],
  bannerTitle: '',
  bannerSubtitle: '',
  bannerDescription: '',
  solutionsTitle: '',
  solutionsDescription: '',
  aboutTitle: '',
  aboutDescription: '',
  stats: [],
  globalTitle: '',
  globalDescription: '',
  educationTitle: '',
  educationDescription: '',
  educationItems: [],
};

export async function getStorefrontHomepageConfig(locale?: string): Promise<StorefrontHomepageConfig> {
  try {
    return await serverFetch<StorefrontHomepageConfig>('/api/front/homepage', { locale });
  } catch {
    return { ...EMPTY_STOREFRONT_HOMEPAGE, locale: locale ?? '' };
  }
}
