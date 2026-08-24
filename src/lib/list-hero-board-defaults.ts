import type { StorefrontListHeroBoard } from '@/lib/storefront-website-config-api';

/** Matches admin PARTNER_CENTER_SOLID_PRESETS[0] (品牌蓝) for empty-background fallback. */
export const DEFAULT_LIST_HERO_SOLID_CSS =
  'linear-gradient(135deg, color-mix(in oklch, #1e3a5f, black 72%) 0%, #1e3a5f 100%)';

export function applyListHeroBackgroundDefaults(board: StorefrontListHeroBoard): StorefrontListHeroBoard {
  if (board.backgroundImage?.trim() || board.backgroundSolidCss?.trim()) {
    return board;
  }
  return {
    ...board,
    backgroundMode: 'solid',
    backgroundSolidCss: DEFAULT_LIST_HERO_SOLID_CSS,
  };
}
