import type { ReactNode } from 'react';

import type { ListHeroCoverDisplay } from '@/lib/list-hero-cover-display';

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

  const { coverDisplay } = board;
  const videoUrl = board.videoUrl?.trim();
  const coverImage = board.coverImage?.trim();

  // Priority: video → cover → gallery (list pages have no gallery)
  if (coverDisplay.video && videoUrl) {
    return {
      showCover: true,
      coverSlot: (
        <video src={videoUrl} autoPlay muted loop playsInline />
      ),
    };
  }

  if (coverDisplay.cover && coverImage) {
    return {
      showCover: true,
      coverImage,
    };
  }

  return { showCover: false };
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
