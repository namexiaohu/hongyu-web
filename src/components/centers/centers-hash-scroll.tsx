'use client';

import { useEffect } from 'react';

function scrollToHashTarget() {
  const hash = window.location.hash.replace(/^#/, '').trim();
  if (!hash) return;
  const target = document.getElementById(hash);
  if (!target) return;
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/** Scrolls to /centers#region-… or #center-… after mount and on hashchange. */
export function CentersHashScroll() {
  useEffect(() => {
    const run = () => {
      // Wait a frame so layout (map/images) can settle before measuring.
      requestAnimationFrame(() => {
        scrollToHashTarget();
      });
    };

    run();
    // Map load can shift layout; retry briefly after paint.
    const retryA = window.setTimeout(run, 400);
    const retryB = window.setTimeout(run, 1200);
    window.addEventListener('hashchange', run);
    return () => {
      window.clearTimeout(retryA);
      window.clearTimeout(retryB);
      window.removeEventListener('hashchange', run);
    };
  }, []);

  return null;
}
