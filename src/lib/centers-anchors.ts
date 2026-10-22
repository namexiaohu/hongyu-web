import type { CenterRegion } from '@/lib/storefront-partner-centers-api';

export function centersRegionHash(region: CenterRegion): string {
  return `region-${region}`;
}

export function centersCenterHash(slug: string): string {
  return `center-${slug}`;
}

export function centersRegionHref(region: CenterRegion): string {
  return `/centers#${centersRegionHash(region)}`;
}

export function centersCenterHref(slug: string): string {
  return `/centers#${centersCenterHash(slug)}`;
}
