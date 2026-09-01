'use client';

import type { ReactNode } from 'react';

import { OverlayMediaCarousel, type OverlayMediaSlide } from '@/components/shared/overlay-media-carousel';
import type { HeroBackgroundFitMode } from '@/lib/hero-background-fit';
import type { HeroCopyStyle } from '@/lib/hero-copy-style';

export type SplitOverlaySectionProps = {
  id?: string;
  heroCopyStyle: HeroCopyStyle;
  carouselFitMode: HeroBackgroundFitMode;
  /** left = 文字在右（原 image-left）；right = 文字在左（原 image-right） */
  imagePosition: 'left' | 'right';
  slides: OverlayMediaSlide[];
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  bullets?: string[];
  listClassName?: string;
};

export function SplitOverlaySection({
  id,
  heroCopyStyle,
  carouselFitMode,
  imagePosition,
  slides,
  eyebrow,
  title,
  body,
  bullets,
  listClassName = 'split-overlay-list',
}: SplitOverlaySectionProps) {
  const textOnRight = imagePosition === 'left';
  const sectionClass = [
    'split-overlay-hero',
    'split-bg-hero',
    textOnRight ? 'split-overlay-hero--text-right' : 'split-overlay-hero--text-left',
    heroCopyStyle === 'dark' ? 'split-bg-hero--copy-dark' : '',
  ].filter(Boolean).join(' ');

  return (
    <section className={sectionClass} data-od-id={id} data-hero-copy={heroCopyStyle}>
      <div className="split-bg-hero-bg split-overlay-hero-bg">
        <OverlayMediaCarousel slides={slides} fitMode={carouselFitMode} dotKeyPrefix={id || 'split'} />
      </div>
      <div className="split-bg-hero-overlay" aria-hidden="true" />
      <div className="container split-bg-hero-content">
        <div className="split-bg-hero-main split-overlay-hero-main">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          {title}
          {body}
          {bullets?.length ? (
            <ul className={listClassName}>
              {bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
