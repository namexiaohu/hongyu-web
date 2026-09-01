'use client';

import { useTranslation } from '@/lib/i18n-context';

type CarouselControlsProps = {
  count: number;
  current: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
  dotKeyPrefix?: string;
};

export function CarouselControls({
  count,
  current,
  onPrev,
  onNext,
  onSelect,
  dotKeyPrefix = 'slide',
}: CarouselControlsProps) {
  const { t } = useTranslation();

  if (count <= 1) return null;

  return (
    <div className="carousel-controls">
      <button
        type="button"
        className="carousel-arrow carousel-prev"
        aria-label={t('home.banner.prevSlide')}
        onClick={onPrev}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <div className="carousel-dots">
        {Array.from({ length: count }, (_, index) => (
          <button
            key={`${dotKeyPrefix}-${index}`}
            type="button"
            className={`carousel-dot${index === current ? ' active' : ''}`}
            aria-label={t('home.banner.slideN', { index: index + 1 })}
            onClick={() => onSelect(index)}
          />
        ))}
      </div>
      <button
        type="button"
        className="carousel-arrow carousel-next"
        aria-label={t('home.banner.nextSlide')}
        onClick={onNext}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}
