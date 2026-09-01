'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { CarouselControls } from '@/components/shared/carousel-controls';
import { useTranslation } from '@/lib/i18n-context';
import type { HeroBackgroundFitMode } from '@/lib/hero-background-fit';
import { heroBackgroundFitModeClass } from '@/lib/hero-background-fit';
import type { HeroCopyStyle } from '@/lib/hero-copy-style';
import type { HomepageMediaSlide } from '@/lib/storefront-homepage-api';

type HomeBannerCarouselProps = {
  slides: HomepageMediaSlide[];
  title: string;
  subtitle: string;
  description: string;
  brandEyebrow: string;
  heroCopyStyle: HeroCopyStyle;
  carouselFitMode: HeroBackgroundFitMode;
};

function MultilineHeading({ text }: { text: string }) {
  const lines = text.split(/\n+/).map((line) => line.trim()).filter(Boolean);
  if (!lines.length) return null;
  return (
    <h1>
      {lines.map((line, index) => (
        <span key={`${line}-${index}`}>
          {index > 0 ? <br /> : null}
          {line}
        </span>
      ))}
    </h1>
  );
}

export function HomeBannerCarousel({
  slides,
  title,
  subtitle,
  description,
  brandEyebrow,
  heroCopyStyle,
  carouselFitMode,
}: HomeBannerCarouselProps) {
  const { t } = useTranslation();
  const bannerClassName = [
    'hero-banner',
    heroBackgroundFitModeClass('hero-banner', carouselFitMode),
    heroCopyStyle === 'dark' ? 'hero-banner--copy-dark' : '',
  ].filter(Boolean).join(' ');
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(0);
  const carouselSlides = slides.filter((slide) => slide.url.trim());

  useEffect(() => {
    if (carouselSlides.length <= 1 || paused) return;
    const timer = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselSlides.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [carouselSlides.length, paused]);

  useEffect(() => {
    carouselSlides.forEach((slide, index) => {
      if (slide.mediaType !== 'video') return;
      const el = document.querySelector<HTMLVideoElement>(`video[data-home-banner="${slide.id}"]`);
      if (!el) return;
      if (index === current) {
        void el.play().catch(() => undefined);
      } else {
        el.pause();
      }
    });
  }, [current, carouselSlides]);

  function goTo(index: number) {
    setCurrent((index + carouselSlides.length) % carouselSlides.length);
  }

  return (
    <section
      className={bannerClassName}
      data-od-id="hero"
      data-hero-copy={heroCopyStyle}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? 0;
      }}
      onTouchEnd={(event) => {
        const diff = touchStartX.current - (event.changedTouches[0]?.clientX ?? 0);
        if (Math.abs(diff) > 50) {
          goTo(current + (diff > 0 ? 1 : -1));
        }
      }}
    >
      {carouselSlides.length ? (
        <div className="carousel">
          {carouselSlides.map((slide, index) => (
            <div key={slide.id || `${slide.url}-${index}`} className={`carousel-slide${index === current ? ' active' : ''}`}>
              {slide.mediaType === 'video' ? (
                <video
                  data-home-banner={slide.id}
                  autoPlay={index === 0}
                  muted
                  loop
                  playsInline
                  className="carousel-media"
                >
                  <source src={slide.url} />
                </video>
              ) : (
                <img src={slide.url} alt="" className="carousel-media" />
              )}
              {index === 0 ? <div className="carousel-overlay" /> : null}
            </div>
          ))}
        </div>
      ) : null}

      <div
        className={`container hero-content${current === 0 ? '' : ' hero-content--hidden'}`}
        aria-hidden={carouselSlides.length > 0 && current !== 0}
      >
        <div className="hero-text">
          <div className="hero-eyebrow">{brandEyebrow}</div>
          <MultilineHeading text={title} />
          {subtitle ? <div className="hero-sub">{subtitle}</div> : null}
          {description ? <p className="hero-desc">{description}</p> : null}
          <div className="hero-cta-row">
            <Link href="/solutions" className="btn-hero-primary">
              {t('home.banner.exploreSolutions')}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/about" className="btn-hero-secondary">
              {t('home.banner.learnAbout')}
            </Link>
          </div>
        </div>
      </div>

      {carouselSlides.length > 1 ? (
        <CarouselControls
          count={carouselSlides.length}
          current={current}
          onPrev={() => goTo(current - 1)}
          onNext={() => goTo(current + 1)}
          onSelect={goTo}
          dotKeyPrefix="banner"
        />
      ) : null}
    </section>
  );
}
