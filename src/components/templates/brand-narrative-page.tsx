import type { ReactNode } from 'react';

import { ProductGallery } from '@/components/product/product-gallery';
import { Breadcrumb } from '@/components/shared/breadcrumb';
import { SplitBackgroundHero } from '@/components/shared/split-background-hero';
import { StatsBar } from '@/components/shared/stats-bar';
import { buildHeroMediaSlides } from '@/lib/hero-media-slides';
import type { BreadcrumbItem, SplitHero, StatItem } from '@/lib/storefront-types';

type BrandNarrativePageProps = {
  breadcrumbs: BreadcrumbItem[];
  hero: SplitHero;
  stats?: StatItem[];
  children: ReactNode;
};

export function BrandNarrativePage({
  breadcrumbs,
  hero,
  stats,
  children,
}: BrandNarrativePageProps) {
  const slides = buildHeroMediaSlides({
    id: hero.title || 'narrative',
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
        <div className="narrative-hero-text">
          <div className="narrative-eyebrow">{hero.eyebrow}</div>
          <h1 dangerouslySetInnerHTML={{ __html: hero.title.replace(/\n/g, '<br/>') }} />
          <p>{hero.lead}</p>
        </div>
      </SplitBackgroundHero>
      {stats && stats.length > 0 ? (
        <div className="container narrative-stats-wrap" data-od-id="stats">
          <StatsBar stats={stats} />
        </div>
      ) : null}
      {children}
    </>
  );
}
