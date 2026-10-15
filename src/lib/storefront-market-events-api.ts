import { serverFetch } from '@/lib/api-client';

export type MarketEventStatus = 'upcoming' | 'registering' | 'completed';

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

export type MarketEventStat = {
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

export type StorefrontMarketEventItem = {
  slug: string;
  status: MarketEventStatus;
  startDate: string | null;
  endDate: string | null;
  coverImage: string;
  title: string;
  description: string;
  scale: string;
  duration: string;
  location: string;
};

export type StorefrontMarketEventDetail = StorefrontMarketEventItem & {
  videoUrl: string;
  backgroundImage: string;
  backgroundSolidCss: string;
  showCoverOnBackground: boolean;
  coverDisplay?: import('@/lib/hero-cover-display').HeroCoverDisplay;
  heroCopyStyle: 'light' | 'dark';
  detailDescription: string;
  stats: MarketEventStat[];
  venueImage: string;
  address: string;
  transportation: string;
  speakers: SpeakerItem[];
  sponsors: SponsorItem[];
  agenda: AgendaGroup[];
};

export type StorefrontMarketEventsResponse = {
  locale: string;
  upcoming: StorefrontMarketEventItem[];
  completed: StorefrontMarketEventItem[];
};

export async function getStorefrontMarketEventsList(locale?: string): Promise<StorefrontMarketEventsResponse> {
  return serverFetch<StorefrontMarketEventsResponse>('/api/front/market-events', { locale });
}

export async function getStorefrontMarketEventDetail(slug: string, locale?: string): Promise<StorefrontMarketEventDetail | null> {
  try {
    return await serverFetch<StorefrontMarketEventDetail>(`/api/front/market-events/${slug}`, { locale });
  } catch {
    return null;
  }
}
