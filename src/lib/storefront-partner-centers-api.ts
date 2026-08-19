import { serverFetch } from '@/lib/api-client';

export type CenterRegion = 'asia-pacific' | 'europe' | 'north-america' | 'latin-america' | 'middle-east-africa' | 'oceania';

export type StorefrontCenterItem = {
  slug: string;
  coverImage: string;
  logo: string;
  region: CenterRegion;
  name: string;
  description: string;
  location: string;
  badgeText: string;
  address: string;
  businessHours: string;
  contact: string;
  website: string;
  tags: string[];
};

export type StorefrontCenterGroup = {
  region: CenterRegion;
  regionLabel: string;
  count: number;
  items: StorefrontCenterItem[];
};

export type StorefrontPartnerCentersResponse = {
  locale: string;
  groups: StorefrontCenterGroup[];
};

export async function getStorefrontPartnerCentersList(locale?: string): Promise<StorefrontPartnerCentersResponse> {
  return serverFetch<StorefrontPartnerCentersResponse>('/api/front/partner-centers', { locale });
}
