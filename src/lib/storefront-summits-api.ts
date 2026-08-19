import { serverFetch } from '@/lib/api-client';

export type SummitStatus = 'upcoming' | 'registering' | 'completed';

export type AgendaItem = {
  id: string;
  startTime: string;
  endTime: string;
  title: string;
  desc: string;
  speaker: string;
};

export type AgendaGroup = {
  id: string;
  dayLabel: string;
  groupTitle: string;
  items: AgendaItem[];
};

export type SpeakerItem = {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  expertise: string;
};

export type StorefrontSummitItem = {
  slug: string;
  status: SummitStatus;
  startDate: string | null;
  endDate: string | null;
  coverImage: string;
  title: string;
  description: string;
  scale: string;
  duration: string;
  location: string;
};

export type StorefrontSummitDetail = StorefrontSummitItem & {
  venueImage: string;
  address: string;
  transportation: string;
  speakers: SpeakerItem[];
  agenda: AgendaGroup[];
};

export type StorefrontSummitsResponse = {
  locale: string;
  upcoming: StorefrontSummitItem[];
  completed: StorefrontSummitItem[];
};

export async function getStorefrontSummitsList(locale?: string): Promise<StorefrontSummitsResponse> {
  return serverFetch<StorefrontSummitsResponse>('/api/front/summits', { locale });
}

export async function getStorefrontSummitDetail(slug: string, locale?: string): Promise<StorefrontSummitDetail | null> {
  try {
    return await serverFetch<StorefrontSummitDetail>(`/api/front/summits/${slug}`, { locale });
  } catch {
    return null;
  }
}
