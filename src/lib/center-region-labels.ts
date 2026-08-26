import type { CenterRegion } from '@/lib/storefront-partner-centers-api';

/** Map UI ids used by the homepage global map. */
export type MapRegionId = 'na' | 'sa' | 'europe' | 'china' | 'apac' | 'africa';

export const MAP_REGION_TO_API: Record<MapRegionId, CenterRegion> = {
  na: 'north-america',
  sa: 'south-america',
  europe: 'europe',
  china: 'china',
  apac: 'asia-pacific',
  africa: 'africa',
};

export const centerRegionLabelsZh: Record<CenterRegion, string> = {
  'north-america': '北美',
  'south-america': '南美',
  europe: '欧洲',
  china: '中国',
  'asia-pacific': '亚太',
  africa: '非洲',
};

export const centerRegionLabelsEn: Record<CenterRegion, string> = {
  'north-america': 'North America',
  'south-america': 'South America',
  europe: 'Europe',
  china: 'China',
  'asia-pacific': 'Asia Pacific',
  africa: 'Africa',
};

export const centerRegionLabelsEs: Record<CenterRegion, string> = {
  'north-america': 'América del Norte',
  'south-america': 'América del Sur',
  europe: 'Europa',
  china: 'China',
  'asia-pacific': 'Asia-Pacífico',
  africa: 'África',
};

export function centerRegionLabelForLocale(region: CenterRegion, locale: string): string {
  const normalized = locale.trim().toLowerCase();
  if (normalized.startsWith('zh')) return centerRegionLabelsZh[region];
  if (normalized.startsWith('es')) return centerRegionLabelsEs[region];
  return centerRegionLabelsEn[region];
}

export function mapRegionLabelForLocale(mapId: MapRegionId, locale: string): string {
  return centerRegionLabelForLocale(MAP_REGION_TO_API[mapId], locale);
}
