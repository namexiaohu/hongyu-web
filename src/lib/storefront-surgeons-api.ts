import { serverFetch } from '@/lib/api-client';

export type StorefrontSurgeonPartnerCenter = {
  slug: string;
  name: string;
  badgeText: string;
};

export type StorefrontSurgeonItem = {
  slug: string;
  avatar: string;
  gradeKey: 'platinum' | 'gold' | 'silver';
  certificationYear: number | null;
  surgeryCount: number | null;
  name: string;
  position: string;
  institution: string;
  expertise: string;
  experience: string;
  gradeTitle: string;
  tags: string[];
};

export type StorefrontRelatedSurgeon = {
  slug: string;
  avatar: string;
  name: string;
  position: string;
  gradeKey: 'platinum' | 'gold' | 'silver';
  gradeTitle: string;
};

export type StorefrontSurgeonDetail = StorefrontSurgeonItem & {
  detailDescription: string;
  otherCertifications: Array<{ label: string; value: string }>;
  specialties: string[];
  partnerCenters: StorefrontSurgeonPartnerCenter[];
  relatedSurgeons: StorefrontRelatedSurgeon[];
};

export type StorefrontSurgeonsListResponse = {
  locale: string;
  items: StorefrontSurgeonItem[];
};

export async function getStorefrontSurgeonsList(locale?: string): Promise<StorefrontSurgeonsListResponse> {
  return serverFetch<StorefrontSurgeonsListResponse>('/api/front/surgeons', { locale });
}

export async function getStorefrontSurgeonBySlug(
  slug: string,
  locale?: string,
): Promise<StorefrontSurgeonDetail | null> {
  try {
    return await serverFetch<StorefrontSurgeonDetail>(
      `/api/front/surgeons/${encodeURIComponent(slug)}`,
      { locale },
    );
  } catch {
    return null;
  }
}
