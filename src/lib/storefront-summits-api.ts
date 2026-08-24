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

export type SummitStat = {
  label: string;
  value: string;
};

export type SpeakerItem = {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  expertise: string;
  region: string;
  badgeText: string;
  description: string;
};

export type SponsorItem = {
  id: string;
  tier: 'diamond' | 'gold' | 'silver';
  name: string;
  logo: string;
  badgeText: string;
  intro: string;
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
  videoUrl: string;
  backgroundImage: string;
  backgroundSolidCss: string;
  showCoverOnBackground: boolean;
  coverDisplay?: import('@/lib/hero-cover-display').HeroCoverDisplay;
  heroCopyStyle?: 'light' | 'dark';
  detailDescription: string;
  stats: SummitStat[];
  venueImage: string;
  address: string;
  transportation: string;
  speakers: SpeakerItem[];
  sponsors: SponsorItem[];
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
