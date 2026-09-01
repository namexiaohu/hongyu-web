import type { ReactNode } from 'react';

import { SplitBackgroundHero } from '@/components/shared/split-background-hero';
import { resolveListHeroCoverSlot } from '@/lib/list-hero-cover-slot';
import type { StorefrontListHeroBoard } from '@/lib/storefront-website-config-api';

type ListPageHeroProps = {
  board: StorefrontListHeroBoard;
  fallback?: ReactNode;
  className?: string;
  children: ReactNode;
};

export function ListPageHero({ board, fallback, className, children }: ListPageHeroProps) {
  const hasBackground = Boolean(
    board.backgroundImage?.trim() || board.backgroundSolidCss?.trim(),
  );

  if (!hasBackground) {
    return fallback ?? null;
  }

  const cover = resolveListHeroCoverSlot(board);

  return (
    <SplitBackgroundHero
      className={className}
      backgroundImage={board.backgroundImage}
      backgroundSolidCss={board.backgroundSolidCss}
      heroCopyStyle={board.heroCopyStyle}
      backgroundFitMode={board.backgroundFitMode}
      showCover={cover.showCover}
      coverSlot={cover.coverSlot}
      coverImage={cover.coverImage}
    >
      {children}
    </SplitBackgroundHero>
  );
}
