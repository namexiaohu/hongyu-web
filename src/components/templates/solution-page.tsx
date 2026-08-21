import type { ReactNode } from 'react';

import { ProductGallery } from '@/components/product/product-gallery';
import { Breadcrumb } from '@/components/shared/breadcrumb';
import { SplitBackgroundHero } from '@/components/shared/split-background-hero';
import { StatsBar } from '@/components/shared/stats-bar';
import { buildHeroMediaSlides } from '@/lib/hero-media-slides';
import type { BreadcrumbItem, SplitHero, StatItem } from '@/lib/storefront-types';

type SolutionPageProps = {
  breadcrumbs: BreadcrumbItem[];
  hero: SplitHero;
  stats?: StatItem[];
  materialsHref?: string | null;
  children: ReactNode;
};

export function SolutionPage({
  breadcrumbs,
  hero,
  stats,
  materialsHref,
  children,
}: SolutionPageProps) {
  const slides = buildHeroMediaSlides({
    id: hero.title || 'solution',
    name: hero.imageAlt || hero.title,
    videoUrl: hero.videoUrl,
    coverUrl: hero.image,
    coverAlt: hero.imageAlt,
    gallery: hero.gallery,
  });
  const showHeroMedia = Boolean(hero.showCoverOnBackground && slides.length);

  return (
    <>
      <Breadcrumb items={breadcrumbs} />
      <SplitBackgroundHero
        backgroundImage={hero.backgroundImage}
        backgroundSolidCss={hero.backgroundSolidCss}
        showCover={showHeroMedia}
        coverSlot={showHeroMedia ? <ProductGallery slides={slides} alt={hero.imageAlt || hero.title} /> : undefined}
      >
        <div className="sol-hero-text">
          <div className="sol-eyebrow">{hero.eyebrow}</div>
          <h1 dangerouslySetInnerHTML={{ __html: hero.title.replace(/\n/g, '<br/>') }} />
          <p>{hero.lead}</p>
          {materialsHref ? (
            <a href={materialsHref} className="btn-hero-primary">
              Get product materials
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          ) : null}
        </div>
      </SplitBackgroundHero>
      {stats && stats.length > 0 ? (
        <div className="container" data-od-id="stats">
          <StatsBar stats={stats} />
        </div>
      ) : null}
      {children}
    </>
  );
}
