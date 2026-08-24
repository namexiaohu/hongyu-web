import type { ReactNode } from 'react';

import { applyListHeroBackgroundDefaults } from '@/lib/list-hero-board-defaults';
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
  const resolvedBoard = applyListHeroBackgroundDefaults(board);
  const hasBackground = Boolean(
    resolvedBoard.backgroundImage?.trim() || resolvedBoard.backgroundSolidCss?.trim(),
  );

  if (!hasBackground) {
    return fallback ?? null;
  }

  const cover = resolveListHeroCoverSlot(resolvedBoard);

  return (
    <SplitBackgroundHero
      className={className}
      backgroundImage={resolvedBoard.backgroundImage}
      backgroundSolidCss={resolvedBoard.backgroundSolidCss}
      heroCopyStyle={resolvedBoard.heroCopyStyle}
      backgroundFitMode={resolvedBoard.backgroundFitMode}
      showCover={cover.showCover}
      coverSlot={cover.coverSlot}
      coverImage={cover.coverImage}
    >
      {children}
    </SplitBackgroundHero>
  );
}
