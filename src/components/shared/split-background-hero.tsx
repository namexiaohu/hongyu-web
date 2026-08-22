import type { ReactNode } from 'react';

import type { HeroCopyStyle } from '@/lib/hero-copy-style';
import { resolveStorefrontHeroCopyStyle } from '@/lib/hero-copy-style';

export type SplitBackgroundHeroProps = {
  backgroundImage?: string;
  backgroundSolidCss?: string;
  coverImage?: string;
  coverAlt?: string;
  showCover?: boolean;
  heroCopyStyle?: HeroCopyStyle | null;
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
  coverSlot,
  className,
  children,
}: SplitBackgroundHeroProps) {
  const resolvedCopyStyle = resolveStorefrontHeroCopyStyle(heroCopyStyle);
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

  return (
    <section className={sectionClass} data-od-id="hero" data-hero-copy={resolvedCopyStyle}>
      {hasImageBg ? (
        <div className="split-bg-hero-bg">
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
