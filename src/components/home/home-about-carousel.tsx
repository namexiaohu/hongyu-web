'use client';

import { useEffect, useState } from 'react';

import { useTranslation } from '@/lib/i18n-context';
import type { HomepageMediaSlide } from '@/lib/storefront-homepage-api';

type HomeAboutCarouselProps = {
  slides: HomepageMediaSlide[];
};

export function HomeAboutCarousel({ slides }: HomeAboutCarouselProps) {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const safeSlides = slides.filter((slide) => slide.url);

  useEffect(() => {
    if (safeSlides.length <= 1) return;
    const timer = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % safeSlides.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [safeSlides.length]);

  if (!safeSlides.length) {
    return <div className="about-visual" />;
  }

  return (
    <div className="about-visual">
      <div className="about-carousel">
        {safeSlides.map((slide, index) => (
          <div
            key={slide.id || `${slide.url}-${index}`}
            className={`about-carousel-slide${index === current ? ' active' : ''}`}
          >
            {slide.mediaType === 'video' ? (
              <video
                src={slide.url}
                className="about-carousel-img"
                autoPlay={index === current}
                muted
                loop
                playsInline
              />
            ) : (
              <img src={slide.url} alt="" className="about-carousel-img" />
            )}
          </div>
        ))}
      </div>
      {safeSlides.length > 1 ? (
        <div className="about-carousel-dots">
          {safeSlides.map((slide, index) => (
            <button
              key={`about-dot-${slide.id || index}`}
              type="button"
              className={`about-dot${index === current ? ' active' : ''}`}
              aria-label={t('home.aboutCarousel.slideN', { index: index + 1 })}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
