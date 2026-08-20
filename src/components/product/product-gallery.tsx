'use client';

import { useState } from 'react';

import type { StorefrontProductImage } from '@/lib/storefront-products-api';

type ProductGalleryProps = {
  images: StorefrontProductImage[];
  alt: string;
};

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const slides = images.filter((item) => item.url?.trim());
  const [index, setIndex] = useState(0);

  if (!slides.length) {
    return (
      <div className="product-hero-img product-hero-img--empty" aria-hidden>
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      </div>
    );
  }

  const current = slides[Math.min(index, slides.length - 1)]!;
  const hasMultiple = slides.length > 1;

  function go(delta: number) {
    setIndex((prev) => (prev + delta + slides.length) % slides.length);
  }

  return (
    <div className="product-hero-gallery">
      <div className="product-hero-img">
        <img src={current.url} alt={current.alt || alt} />
      </div>
      {hasMultiple ? (
        <>
          <button type="button" className="product-gallery-nav product-gallery-nav--prev" onClick={() => go(-1)} aria-label="Previous image">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button type="button" className="product-gallery-nav product-gallery-nav--next" onClick={() => go(1)} aria-label="Next image">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          <div className="product-gallery-dots" role="tablist" aria-label="Gallery slides">
            {slides.map((slide, i) => (
              <button
                key={slide.id || `${slide.url}-${i}`}
                type="button"
                className={`product-gallery-dot${i === index ? ' is-active' : ''}`}
                aria-label={`Show image ${i + 1}`}
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
