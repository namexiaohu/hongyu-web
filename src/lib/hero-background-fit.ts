export type HeroBackgroundFitMode = 'contain' | 'contain-center' | 'cover';

export function resolveStorefrontHeroBackgroundFitMode(value?: string | null): HeroBackgroundFitMode {
  if (value === 'cover') return 'cover';
  if (value === 'contain-center') return 'contain-center';
  return 'contain';
}
