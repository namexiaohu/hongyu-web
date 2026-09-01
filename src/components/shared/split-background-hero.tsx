import type { ReactNode } from 'react';

import type { HeroBackgroundFitMode } from '@/lib/hero-background-fit';
import type { HeroCopyStyle } from '@/lib/hero-copy-style';

export type SplitBackgroundHeroProps = {
  backgroundImage?: string;
  backgroundSolidCss?: string;
  coverImage?: string;
  coverAlt?: string;
  showCover?: boolean;
  heroCopyStyle: HeroCopyStyle;
  backgroundFitMode?: HeroBackgroundFitMode;
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
  const hasImageBg = Boolean(backgroundImage);
  const hasSolidBg = Boolean(backgroundSolidCss);
  const showHeroCover = Boolean(showCover && (coverSlot || coverImage));
  const sectionClass = [
    'split-bg-hero',
    hasSolidBg && !hasImageBg ? 'is-solid-bg' : '',
    showHeroCover ? 'has-cover' : '',
    heroCopyStyle === 'dark' ? 'split-bg-hero--copy-dark' : '',
    className ?? '',
  ].filter(Boolean).join(' ');

  const bgClass = [
    'split-bg-hero-bg',
    hasImageBg && backgroundFitMode === 'contain' ? 'split-bg-hero-bg--fit-contain' : '',
    hasImageBg && backgroundFitMode === 'contain-center' ? 'split-bg-hero-bg--fit-contain-center' : '',
    hasImageBg && backgroundFitMode === 'cover' ? 'split-bg-hero-bg--fit-fill' : '',
  ].filter(Boolean).join(' ');

  return (
    <section className={sectionClass} data-od-id="hero" data-hero-copy={heroCopyStyle}>
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
