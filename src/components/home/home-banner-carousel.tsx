'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { useTranslation } from '@/lib/i18n-context';
import type { HomepageMediaSlide } from '@/lib/storefront-homepage-api';

type HomeBannerCarouselProps = {
  slides: HomepageMediaSlide[];
  title: string;
  subtitle: string;
  description: string;
  brandEyebrow: string;
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

export function HomeBannerCarousel({ slides, title, subtitle, description, brandEyebrow }: HomeBannerCarouselProps) {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(0);
  const safeSlides = slides.length ? slides : [{ id: 'empty', url: '', mediaType: 'image' as const }];

  useEffect(() => {
    if (safeSlides.length <= 1 || paused) return;
    const timer = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % safeSlides.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [safeSlides.length, paused]);

  useEffect(() => {
    safeSlides.forEach((slide, index) => {
      if (slide.mediaType !== 'video' || !slide.url) return;
      const el = document.querySelector<HTMLVideoElement>(`video[data-home-banner="${slide.id}"]`);
      if (!el) return;
      if (index === current) {
        void el.play().catch(() => undefined);
      } else {
        el.pause();
      }
    });
  }, [current, safeSlides]);

  function goTo(index: number) {
    setCurrent((index + safeSlides.length) % safeSlides.length);
  }

  return (
    <section
      className="hero-banner"
      data-od-id="hero"
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
      <div className="carousel">
        {safeSlides.map((slide, index) => (
          <div key={slide.id || `${slide.url}-${index}`} className={`carousel-slide${index === current ? ' active' : ''}`}>
            {slide.url ? (
              slide.mediaType === 'video' ? (
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
              )
            ) : (
              <div className="carousel-media" style={{ background: 'var(--accent)' }} />
            )}
            {/* 左侧遮罩仅挂在第一屏，随该 slide 显隐 */}
            {index === 0 ? <div className="carousel-overlay" /> : null}
          </div>
        ))}
      </div>

      <div
        className={`container hero-content${current === 0 ? '' : ' hero-content--hidden'}`}
        aria-hidden={current !== 0}
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

      {safeSlides.length > 1 ? (
        <div className="carousel-controls">
          <button type="button" className="carousel-arrow carousel-prev" aria-label={t('home.banner.prevSlide')} onClick={() => goTo(current - 1)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div className="carousel-dots">
            {safeSlides.map((slide, index) => (
              <button
                key={`dot-${slide.id || index}`}
                type="button"
                className={`carousel-dot${index === current ? ' active' : ''}`}
                aria-label={t('home.banner.slideN', { index: index + 1 })}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
          <button type="button" className="carousel-arrow carousel-next" aria-label={t('home.banner.nextSlide')} onClick={() => goTo(current + 1)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      ) : null}
    </section>
  );
}
