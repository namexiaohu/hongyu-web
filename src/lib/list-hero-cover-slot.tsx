import type { ReactNode } from 'react';

import { ProductGallery } from '@/components/product/product-gallery';
import type { ListHeroCoverDisplay } from '@/lib/list-hero-cover-display';
import { buildHeroMediaSlides } from '@/lib/hero-media-slides';

export type ListHeroCoverBoard = {
  videoUrl: string;
  coverImage: string;
  showCoverOnBackground: boolean;
  coverDisplay: ListHeroCoverDisplay;
};

export function resolveListHeroCoverSlot(board: ListHeroCoverBoard): {
  showCover: boolean;
  coverSlot?: ReactNode;
  coverImage?: string;
} {
  if (!board.showCoverOnBackground) {
    return { showCover: false };
  }

  const slides = buildHeroMediaSlides({
    id: 'list-hero',
    name: 'hero',
    videoUrl: board.videoUrl,
    coverUrl: board.coverImage,
    coverAlt: '',
    gallery: [],
    coverDisplay: board.coverDisplay,
    includeGalleryInDisplay: false,
  });

  if (!slides.length) {
    return { showCover: false };
  }

  return {
    showCover: true,
    coverSlot: <ProductGallery slides={slides} alt="" />,
  };
}

export function listHeroBoardHasVisual(board: {
  backgroundImage?: string;
  backgroundSolidCss?: string;
  coverImage?: string;
  videoUrl?: string;
}): boolean {
  return Boolean(
    board.backgroundImage?.trim()
    || board.backgroundSolidCss?.trim()
    || board.coverImage?.trim()
    || board.videoUrl?.trim(),
  );
}
