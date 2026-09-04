import { serverFetch } from '@/lib/api-client';
import type { HeroBackgroundFitMode } from '@/lib/hero-background-fit';
import type { HeroCopyStyle } from '@/lib/hero-copy-style';
import type { ListHeroCoverDisplay } from '@/lib/list-hero-cover-display';

export type StorefrontNavItem = {
  id: string;
  href: string;
  name: string;
};

export type StorefrontNavColumn = {
  id: string;
  href: string;
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
  solutions: StorefrontListHeroBoard;
  insights: StorefrontListHeroBoard;
  surgeons: StorefrontListHeroBoard;
  centers: StorefrontListHeroBoard;
};

export type StorefrontPrivacyPreference = {
  title: string;
  summary: string;
  detailHtml: string;
};

export type StorefrontWebsiteConfig = {
  locale: string;
  headerNavColumns: StorefrontNavColumn[];
  footerNavColumns: StorefrontNavColumn[];
  listHeroBoards: StorefrontListHeroBoardsRecord;
  privacyPreference: StorefrontPrivacyPreference | null;
};

export async function getStorefrontWebsiteConfig(locale?: string): Promise<StorefrontWebsiteConfig> {
  return serverFetch<StorefrontWebsiteConfig>('/api/front/website-config', { locale });
}
