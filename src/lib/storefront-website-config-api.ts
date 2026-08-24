import { serverFetch } from '@/lib/api-client';
import { DEFAULT_LIST_HERO_SOLID_CSS } from '@/lib/list-hero-board-defaults';
import type { HeroBackgroundFitMode } from '@/lib/hero-background-fit';
import type { HeroCopyStyle } from '@/lib/hero-copy-style';
import type { ListHeroCoverDisplay } from '@/lib/list-hero-cover-display';
import { defaultListHeroCoverDisplay } from '@/lib/list-hero-cover-display';

export type StorefrontNavItem = {
  id: string;
  href: string;
  name: string;
};

export type StorefrontNavColumn = {
  id: string;
  name: string;
  items: StorefrontNavItem[];
};

export type StorefrontListHeroBoard = {
  coverImage: string;
  videoUrl: string;
  showCoverOnBackground: boolean;
  coverDisplay: ListHeroCoverDisplay;
  heroCopyStyle: HeroCopyStyle;
  backgroundFitMode: HeroBackgroundFitMode;
  backgroundMode: string;
  backgroundImage: string;
  backgroundSolidCss: string;
};

export type StorefrontListHeroBoardsRecord = {
  insights: StorefrontListHeroBoard;
  surgeons: StorefrontListHeroBoard;
  centers: StorefrontListHeroBoard;
};

export type StorefrontWebsiteConfig = {
  locale: string;
  navColumns: StorefrontNavColumn[];
  listHeroBoards: StorefrontListHeroBoardsRecord;
};

const emptyBoard = (): StorefrontListHeroBoard => ({
  coverImage: '',
  videoUrl: '',
  showCoverOnBackground: false,
  coverDisplay: defaultListHeroCoverDisplay(),
  heroCopyStyle: 'light',
  backgroundFitMode: 'contain',
  backgroundMode: '',
  backgroundImage: '',
  backgroundSolidCss: DEFAULT_LIST_HERO_SOLID_CSS,
});

export const EMPTY_STOREFRONT_WEBSITE_CONFIG: StorefrontWebsiteConfig = {
  locale: '',
  navColumns: [],
  listHeroBoards: {
    insights: emptyBoard(),
    surgeons: emptyBoard(),
    centers: emptyBoard(),
  },
};

export async function getStorefrontWebsiteConfig(locale?: string): Promise<StorefrontWebsiteConfig> {
  try {
    return await serverFetch<StorefrontWebsiteConfig>('/api/front/website-config', { locale });
  } catch {
    return { ...EMPTY_STOREFRONT_WEBSITE_CONFIG, locale: locale ?? '' };
  }
}
