/**
 * List hero boards: video + cover only (no gallery).
 */
import {
  defaultHeroCoverDisplayNoGallery,
  resolveStorefrontHeroCoverDisplay,
  type HeroCoverDisplayWithoutGallery,
} from '@/lib/hero-cover-display';

export type ListHeroCoverDisplay = HeroCoverDisplayWithoutGallery;

export function defaultListHeroCoverDisplay(): ListHeroCoverDisplay {
  return defaultHeroCoverDisplayNoGallery();
}

export function resolveStorefrontListHeroCoverDisplay(
  input?: Partial<ListHeroCoverDisplay> | null,
): ListHeroCoverDisplay {
  const full = resolveStorefrontHeroCoverDisplay(input, false);
  return { video: full.video, cover: full.cover };
}
