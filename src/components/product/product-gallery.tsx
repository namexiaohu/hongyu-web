'use client';

import { useEffect, useState } from 'react';

import { useTranslation } from '@/lib/i18n-context';

export type ProductGallerySlide = {
  id: string;
  url: string;
  alt: string;
  kind: 'image' | 'video';
};

type ProductGalleryProps = {
  slides: ProductGallerySlide[];
  alt: string;
};

export function ProductGallery({ slides, alt }: ProductGalleryProps) {
  const { t } = useTranslation();
  const items = slides.filter((item) => item.url?.trim());
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [items.map((item) => item.url).join('|')]);

  if (!items.length) {
    return (
      <div className="product-hero-img product-hero-img--empty" aria-hidden>
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      </div>
    );
  }

  const current = items[Math.min(index, items.length - 1)]!;
  const hasMultiple = items.length > 1;

  function go(delta: number) {
    setIndex((prev) => (prev + delta + items.length) % items.length);
  }

  return (
    <div className="product-hero-gallery">
      <div className={`product-hero-img${current.kind === 'video' ? ' product-hero-img--video' : ''}`}>
        {current.kind === 'video' ? (
          <video
            key={current.url}
            src={current.url}
            controls
            autoPlay
            muted
            playsInline
            loop
            preload="metadata"
            aria-label={current.alt || alt}
          />
        ) : (
          <img src={current.url} alt={current.alt || alt} />
        )}
      </div>
      {hasMultiple ? (
        <>
          <button type="button" className="product-gallery-nav product-gallery-nav--prev" onClick={() => go(-1)} aria-label={t('product.gallery.previous')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button type="button" className="product-gallery-nav product-gallery-nav--next" onClick={() => go(1)} aria-label={t('product.gallery.next')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          <div className="product-gallery-dots" role="tablist" aria-label={t('product.gallery.slidesAria')}>
            {items.map((slide, i) => (
              <button
                key={slide.id || `${slide.kind}-${slide.url}-${i}`}
                type="button"
                className={`product-gallery-dot${i === index ? ' is-active' : ''}${slide.kind === 'video' ? ' is-video' : ''}`}
                aria-label={slide.kind === 'video' ? t('product.gallery.showVideo') : t('product.gallery.showImageN', { index: i + 1 })}
                aria-selected={i === index}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
