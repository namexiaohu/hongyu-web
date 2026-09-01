export type HeroBackgroundFitMode = 'contain' | 'contain-center' | 'cover';

export function heroBackgroundFitModeClassSuffix(mode: HeroBackgroundFitMode): string {
  if (mode === 'cover') return 'fit-fill';
  if (mode === 'contain-center') return 'fit-contain-center';
  return 'fit-contain';
}

export function heroBackgroundFitModeClass(prefix: string, mode: HeroBackgroundFitMode): string {
  return `${prefix}--${heroBackgroundFitModeClassSuffix(mode)}`;
}
