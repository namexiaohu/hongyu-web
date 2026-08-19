import { serverFetch } from '@/lib/api-client';

export type StorefrontSurgeonItem = {
  slug: string;
  avatar: string;
  gradeKey: 'platinum' | 'gold' | 'silver';
  name: string;
  position: string;
  institution: string;
  expertise: string;
  experience: string;
  gradeTitle: string;
  tags: string[];
};

export type StorefrontSurgeonsListResponse = {
  locale: string;
  items: StorefrontSurgeonItem[];
};

export async function getStorefrontSurgeonsList(locale?: string): Promise<StorefrontSurgeonsListResponse> {
  return serverFetch<StorefrontSurgeonsListResponse>('/api/front/surgeons', { locale });
}
