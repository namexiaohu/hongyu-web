import type { ReactNode } from 'react';

import type { HeroBackgroundFitMode } from '@/lib/hero-background-fit';
import { resolveStorefrontHeroBackgroundFitMode } from '@/lib/hero-background-fit';
import type { HeroCopyStyle } from '@/lib/hero-copy-style';
import { resolveStorefrontHeroCopyStyle } from '@/lib/hero-copy-style';

export type SplitBackgroundHeroProps = {
  backgroundImage?: string;
  backgroundSolidCss?: string;
  coverImage?: string;
  coverAlt?: string;
  showCover?: boolean;
  heroCopyStyle?: HeroCopyStyle | null;
  backgroundFitMode?: HeroBackgroundFitMode | null;
  /** Custom right-side content (e.g. product gallery). When set, replaces the default cover image. */
  coverSlot?: ReactNode;
  /** Extra class on the section (e.g. page-specific hooks) */
  className?: string;
  children: ReactNode;
};

export function SplitBackgroundHero({
  backgroundImage,
  backgroundSolidCss,
  coverImage,
  coverAlt = '',
  showCover = false,
  heroCopyStyle,
  backgroundFitMode,
  coverSlot,
  className,
  children,
}: SplitBackgroundHeroProps) {
  const resolvedCopyStyle = resolveStorefrontHeroCopyStyle(heroCopyStyle);
  const resolvedFitMode = backgroundFitMode != null
    ? resolveStorefrontHeroBackgroundFitMode(backgroundFitMode)
    : null;
  const hasImageBg = Boolean(backgroundImage);
  const hasSolidBg = Boolean(backgroundSolidCss);
  const showHeroCover = Boolean(showCover && (coverSlot || coverImage));
  const sectionClass = [
    'split-bg-hero',
    hasSolidBg && !hasImageBg ? 'is-solid-bg' : '',
    showHeroCover ? 'has-cover' : '',
    resolvedCopyStyle === 'dark' ? 'split-bg-hero--copy-dark' : '',
    className ?? '',
  ].filter(Boolean).join(' ');

  const bgClass = [
    'split-bg-hero-bg',
    hasImageBg && resolvedFitMode === 'contain' ? 'split-bg-hero-bg--fit-contain' : '',
    hasImageBg && resolvedFitMode === 'contain-center' ? 'split-bg-hero-bg--fit-contain-center' : '',
    hasImageBg && resolvedFitMode === 'cover' ? 'split-bg-hero-bg--fit-fill' : '',
  ].filter(Boolean).join(' ');

  return (
    <section className={sectionClass} data-od-id="hero" data-hero-copy={resolvedCopyStyle}>
      {hasImageBg ? (
        <div className={bgClass}>
          <img src={backgroundImage} alt="" />
        </div>
      ) : hasSolidBg ? (
        <div
          className="split-bg-hero-bg split-bg-hero-bg-solid"
          style={{ background: backgroundSolidCss }}
        />
      ) : null}
      <div className="split-bg-hero-overlay" />
      <div className="container split-bg-hero-content">
        <div className="split-bg-hero-main">{children}</div>
        {showHeroCover ? (
          <div className={`split-bg-hero-cover${coverSlot ? ' has-slot' : ''}`}>
            {coverSlot ?? <img src={coverImage} alt={coverAlt} />}
          </div>
        ) : null}
      </div>
    </section>
  );
}
