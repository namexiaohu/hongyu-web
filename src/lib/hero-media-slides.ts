import type { ProductGallerySlide } from '@/components/product/product-gallery';
import type { HeroCoverDisplay } from '@/lib/hero-cover-display';
import { resolveStorefrontHeroCoverDisplay } from '@/lib/hero-cover-display';

export type HeroMediaGalleryItem = {
  id?: string;
  url?: string | null;
  alt?: string | null;
};

export type HeroMediaInput = {
  id: string;
  name: string;
  videoUrl?: string | null;
  coverUrl?: string | null;
  coverAlt?: string | null;
  coverId?: string | null;
  gallery?: HeroMediaGalleryItem[] | null;
  /** When set, only checked sources with media are included (non-exclusive). */
  coverDisplay?: Partial<HeroCoverDisplay> | null;
  /** Pass false for list/summit (no gallery). Default true. */
  includeGalleryInDisplay?: boolean;
};

/** Build hero slides in order: video → cover → gallery (deduped by url), filtered by coverDisplay. */
export function buildHeroMediaSlides(input: HeroMediaInput): ProductGallerySlide[] {
  const includeGallery = input.includeGalleryInDisplay !== false;
  const display = resolveStorefrontHeroCoverDisplay(input.coverDisplay, includeGallery);
  const slides: ProductGallerySlide[] = [];

  const videoUrl = input.videoUrl?.trim();
  if (display.video && videoUrl) {
    slides.push({
      id: `${input.id}-video`,
      url: videoUrl,
      alt: `${input.name} video`,
      kind: 'video',
    });
  }

  const coverUrl = input.coverUrl?.trim() || '';
  if (display.cover && coverUrl) {
    slides.push({
      id: input.coverId || `${input.id}-cover`,
      url: coverUrl,
      alt: input.coverAlt?.trim() || input.name,
      kind: 'image',
    });
  }

  if (display.gallery) {
    const seen = new Set(slides.map((item) => item.url));
    for (const [index, item] of (input.gallery ?? []).entries()) {
      const url = item.url?.trim();
      if (!url || seen.has(url)) continue;
      seen.add(url);
      slides.push({
        id: item.id || `${input.id}-gallery-${index}`,
        url,
        alt: item.alt?.trim() || input.name,
        kind: 'image',
      });
    }
  }

  return slides;
}
