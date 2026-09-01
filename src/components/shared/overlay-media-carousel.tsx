'use client';

import { useEffect, useState } from 'react';

import { CarouselControls } from '@/components/shared/carousel-controls';
import type { HeroBackgroundFitMode } from '@/lib/hero-background-fit';
import { heroBackgroundFitModeClass } from '@/lib/hero-background-fit';

export type OverlayMediaSlide = {
  id: string;
  url: string;
  mediaType: 'image' | 'video';
};

type OverlayMediaCarouselProps = {
  slides: OverlayMediaSlide[];
  fitMode: HeroBackgroundFitMode;
  className?: string;
  autoplayMs?: number;
  dotKeyPrefix?: string;
};

export function OverlayMediaCarousel({
  slides,
  fitMode,
  className = 'overlay-media-carousel',
  autoplayMs = 4000,
  dotKeyPrefix = 'overlay',
}: OverlayMediaCarouselProps) {
  const [current, setCurrent] = useState(0);
  const carouselSlides = slides.filter((slide) => slide.url.trim());
  const rootClass = [
    className,
    heroBackgroundFitModeClass('overlay-media-carousel', fitMode),
  ].join(' ');

  useEffect(() => {
    setCurrent(0);
  }, [carouselSlides.map((slide) => slide.url).join('|')]);

  useEffect(() => {
    if (carouselSlides.length <= 1) return;
    const timer = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselSlides.length);
    }, autoplayMs);
    return () => window.clearInterval(timer);
  }, [carouselSlides.length, autoplayMs]);

  function goTo(index: number) {
    setCurrent((index + carouselSlides.length) % carouselSlides.length);
  }

  if (!carouselSlides.length) {
    return null;
  }

  return (
    <div className={rootClass}>
      <div className="overlay-media-carousel-track">
        {carouselSlides.map((slide, index) => (
          <div
            key={slide.id || `${slide.url}-${index}`}
            className={`overlay-media-carousel-slide${index === current ? ' active' : ''}`}
          >
            {slide.mediaType === 'video' ? (
              <video
                src={slide.url}
                className="overlay-media-carousel-media"
                autoPlay={index === current}
                muted
                loop
                playsInline
              />
            ) : (
              <img src={slide.url} alt="" className="overlay-media-carousel-media" />
            )}
          </div>
        ))}
      </div>
      <CarouselControls
        count={carouselSlides.length}
        current={current}
        onPrev={() => goTo(current - 1)}
        onNext={() => goTo(current + 1)}
        onSelect={goTo}
        dotKeyPrefix={dotKeyPrefix}
      />
    </div>
  );
}
