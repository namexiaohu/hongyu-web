'use client';

import { useEffect, useRef } from 'react';

import { homeHtml } from '@/lib/home-html';

export function HomeStatic() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const slides = Array.from(root.querySelectorAll('.carousel-slide'));
    const dots = Array.from(root.querySelectorAll('.carousel-dot'));
    const prevBtn = root.querySelector('.carousel-prev');
    const nextBtn = root.querySelector('.carousel-next');
    const banner = root.querySelector('.hero-banner');
    let current = 0;
    let autoplay: number | undefined;

    const goToSlide = (index: number) => {
      slides[current]?.classList.remove('active');
      dots[current]?.classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current]?.classList.add('active');
      dots[current]?.classList.add('active');
      slides.forEach((slide, i) => {
        const video = slide.querySelector('video');
        if (!video) {
          return;
        }
        if (i === current) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      });
    };

    const nextSlide = () => goToSlide(current + 1);
    const prevSlide = () => goToSlide(current - 1);
    const stopAutoplay = () => {
      if (autoplay) {
        window.clearInterval(autoplay);
        autoplay = undefined;
      }
    };
    const startAutoplay = () => {
      stopAutoplay();
      autoplay = window.setInterval(nextSlide, 6000);
    };

    const onNext = () => {
      nextSlide();
      startAutoplay();
    };
    const onPrev = () => {
      prevSlide();
      startAutoplay();
    };
    nextBtn?.addEventListener('click', onNext);
    prevBtn?.addEventListener('click', onPrev);
    const dotHandlers = dots.map((dot, i) => {
      const handler = () => {
        goToSlide(i);
        startAutoplay();
      };
      dot.addEventListener('click', handler);
      return { dot, handler };
    });

    const onEnter = () => stopAutoplay();
    const onLeave = () => startAutoplay();
    banner?.addEventListener('mouseenter', onEnter);
    banner?.addEventListener('mouseleave', onLeave);

    let touchStartX = 0;
    const onTouchStart = (event: Event) => {
      const touchEvent = event as TouchEvent;
      touchStartX = touchEvent.touches[0]?.clientX ?? 0;
    };
    const onTouchEnd = (event: Event) => {
      const touchEvent = event as TouchEvent;
      const diff = touchStartX - (touchEvent.changedTouches[0]?.clientX ?? 0);
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        startAutoplay();
      }
    };
    banner?.addEventListener('touchstart', onTouchStart, { passive: true });
    banner?.addEventListener('touchend', onTouchEnd, { passive: true });
    startAutoplay();

    const aboutSlides = Array.from(root.querySelectorAll('.about-carousel-slide'));
    const aboutDots = Array.from(root.querySelectorAll('.about-dot'));
    let aboutCurrent = 0;
    let aboutAutoplay: number | undefined;
    const goAbout = (index: number) => {
      aboutSlides[aboutCurrent]?.classList.remove('active');
      aboutDots[aboutCurrent]?.classList.remove('active');
      aboutCurrent = (index + aboutSlides.length) % aboutSlides.length;
      aboutSlides[aboutCurrent]?.classList.add('active');
      aboutDots[aboutCurrent]?.classList.add('active');
    };
    const stopAbout = () => {
      if (aboutAutoplay) {
        window.clearInterval(aboutAutoplay);
        aboutAutoplay = undefined;
      }
    };
    const startAbout = () => {
      stopAbout();
      aboutAutoplay = window.setInterval(() => goAbout(aboutCurrent + 1), 4000);
    };
    const aboutDotHandlers = aboutDots.map((dot, i) => {
      const handler = () => {
        goAbout(i);
        startAbout();
      };
      dot.addEventListener('click', handler);
      return { dot, handler };
    });
    const aboutVisual = root.querySelector('.about-visual');
    aboutVisual?.addEventListener('mouseenter', stopAbout);
    aboutVisual?.addEventListener('mouseleave', startAbout);
    if (aboutSlides.length) {
      startAbout();
    }

    return () => {
      stopAutoplay();
      stopAbout();
      nextBtn?.removeEventListener('click', onNext);
      prevBtn?.removeEventListener('click', onPrev);
      dotHandlers.forEach(({ dot, handler }) => dot.removeEventListener('click', handler));
      banner?.removeEventListener('mouseenter', onEnter);
      banner?.removeEventListener('mouseleave', onLeave);
      banner?.removeEventListener('touchstart', onTouchStart);
      banner?.removeEventListener('touchend', onTouchEnd);
      aboutDotHandlers.forEach(({ dot, handler }) => dot.removeEventListener('click', handler));
      aboutVisual?.removeEventListener('mouseenter', stopAbout);
      aboutVisual?.removeEventListener('mouseleave', startAbout);
    };
  }, []);

  return <div ref={rootRef} dangerouslySetInnerHTML={{ __html: homeHtml }} />;
}
