import { serverFetch } from '@/lib/api-client';

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

export type StorefrontWebsiteConfig = {
  locale: string;
  navColumns: StorefrontNavColumn[];
};

export const EMPTY_STOREFRONT_WEBSITE_CONFIG: StorefrontWebsiteConfig = {
  locale: '',
  navColumns: [],
};

export async function getStorefrontWebsiteConfig(locale?: string): Promise<StorefrontWebsiteConfig> {
  try {
    return await serverFetch<StorefrontWebsiteConfig>('/api/front/website-config', { locale });
  } catch {
    return { ...EMPTY_STOREFRONT_WEBSITE_CONFIG, locale: locale ?? '' };
  }
}
