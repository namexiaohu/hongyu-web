import type { CenterRegion } from '@/lib/storefront-partner-centers-api';

/** Map UI ids used by the homepage / centers global map. */
export type MapRegionId = 'na' | 'sa' | 'europe' | 'china' | 'apac' | 'africa';

export const MAP_REGION_TO_API: Record<MapRegionId, CenterRegion> = {
  na: 'north-america',
  sa: 'south-america',
  europe: 'europe',
  china: 'china',
  apac: 'asia-pacific',
  africa: 'africa',
};

/** UI string key for a map region label (`map.regions.na`, …). */
export function mapRegionLabelKey(mapId: MapRegionId): `map.regions.${MapRegionId}` {
  return `map.regions.${mapId}`;
}
