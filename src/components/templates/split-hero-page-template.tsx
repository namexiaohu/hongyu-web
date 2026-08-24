import type { ReactNode } from 'react';

import { ProductGallery } from '@/components/product/product-gallery';
import { Breadcrumb } from '@/components/shared/breadcrumb';
import { SplitBackgroundHero } from '@/components/shared/split-background-hero';
import { StatsBar } from '@/components/shared/stats-bar';
import { formatMultilineTitle } from '@/lib/format-multiline-title';
import { buildHeroMediaSlides } from '@/lib/hero-media-slides';
import type { BreadcrumbItem, SplitHero, StatItem } from '@/lib/storefront-types';

type SplitHeroPageTemplateProps = {
  breadcrumbs: BreadcrumbItem[];
  hero: SplitHero;
  stats?: StatItem[];
  heroTextClassName: string;
  eyebrowClassName: string;
  statsWrapClassName?: string;
  heroMediaId: string;
  heroExtra?: ReactNode;
  children: ReactNode;
};

export function SplitHeroPageTemplate({
  breadcrumbs,
  hero,
  stats,
  heroTextClassName,
  eyebrowClassName,
  statsWrapClassName,
  heroMediaId,
  heroExtra,
  children,
}: SplitHeroPageTemplateProps) {
  const slides = buildHeroMediaSlides({
    id: hero.title || heroMediaId,
    name: hero.imageAlt || hero.title,
    videoUrl: hero.videoUrl,
    coverUrl: hero.image,
    coverAlt: hero.imageAlt,
    gallery: hero.gallery,
    coverDisplay: hero.coverDisplay,
  });
  const showHeroMedia = Boolean(hero.showCoverOnBackground && slides.length);

  return (
    <>
      <Breadcrumb items={breadcrumbs} />
      <SplitBackgroundHero
        backgroundImage={hero.backgroundImage}
        backgroundSolidCss={hero.backgroundSolidCss}
        heroCopyStyle={hero.heroCopyStyle}
        showCover={showHeroMedia}
        coverSlot={showHeroMedia ? <ProductGallery slides={slides} alt={hero.imageAlt || hero.title} /> : undefined}
      >
        <div className={heroTextClassName}>
          <div className={eyebrowClassName}>{hero.eyebrow}</div>
          <h1 dangerouslySetInnerHTML={{ __html: formatMultilineTitle(hero.title) }} />
          <p>{hero.lead}</p>
          {heroExtra}
        </div>
      </SplitBackgroundHero>
      {stats && stats.length > 0 ? (
        <div className={statsWrapClassName ?? 'container'} data-od-id="stats">
          <StatsBar stats={stats} />
        </div>
      ) : null}
      {children}
    </>
  );
}
