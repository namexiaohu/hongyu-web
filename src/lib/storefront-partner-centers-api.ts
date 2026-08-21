import { serverFetch } from '@/lib/api-client';

export type CenterRegion = 'asia-pacific' | 'europe' | 'north-america' | 'latin-america' | 'middle-east-africa' | 'oceania';

export type PartnerCenterMetric = {
  label: string;
  value: string;
};

export type StorefrontCenterItem = {
  slug: string;
  coverImage: string;
  logo: string;
  backgroundImage: string;
  region: CenterRegion;
  email: string;
  website: string;
  name: string;
  description: string;
  detailDescription: string;
  location: string;
  badgeText: string;
  address: string;
  businessHours: string;
  contact: string;
  tags: string[];
  stats: PartnerCenterMetric[];
  cooperationInfo: PartnerCenterMetric[];
};

export type StorefrontCenterSurgeon = {
  slug: string;
  avatar: string;
  name: string;
  position: string;
  gradeKey: 'platinum' | 'gold' | 'silver';
  gradeTitle: string;
  certificationYear: number | null;
  surgeryCount: number | null;
};

export type StorefrontRelatedCenter = {
  slug: string;
  coverImage: string;
  name: string;
  location: string;
};

export type StorefrontCenterDetail = StorefrontCenterItem & {
  regionLabel: string;
  surgeons: StorefrontCenterSurgeon[];
  relatedCenters: StorefrontRelatedCenter[];
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

export async function getStorefrontPartnerCenterBySlug(
  slug: string,
  locale?: string,
): Promise<StorefrontCenterDetail | null> {
  try {
    return await serverFetch<StorefrontCenterDetail>(
      `/api/front/partner-centers/${encodeURIComponent(slug)}`,
      { locale },
    );
  } catch {
    return null;
  }
}
