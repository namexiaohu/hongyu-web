import type { ReactNode } from 'react';

import { ProductGallery } from '@/components/product/product-gallery';
import { Breadcrumb } from '@/components/shared/breadcrumb';
import { PageEntriesBar } from '@/components/shared/page-entries-bar';
import { SplitBackgroundHero } from '@/components/shared/split-background-hero';
import { StatsBar } from '@/components/shared/stats-bar';
import { formatMultilineTitle } from '@/lib/format-multiline-title';
import { buildHeroMediaSlides } from '@/lib/hero-media-slides';
import type { BreadcrumbItem, PageEntryLink, SplitHero, StatItem } from '@/lib/storefront-types';

type SplitHeroPageTemplateProps = {
  breadcrumbs: BreadcrumbItem[];
  hero: SplitHero;
  stats?: StatItem[];
  entries?: PageEntryLink[];
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
  entries,
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
  const visibleStats = stats ?? [];
  const visibleEntries = (entries ?? []).filter((entry) => entry.title.trim() && entry.href.trim());
  const showStats = visibleStats.length > 0;
  const showEntries = visibleEntries.length > 0;

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
      {showStats ? (
        <div className={statsWrapClassName ?? 'container'} data-od-id="stats">
          <StatsBar stats={visibleStats} />
        </div>
      ) : null}
      {showEntries ? (
        <div className="container page-entries-wrap">
          <PageEntriesBar entries={visibleEntries} />
        </div>
      ) : null}
      {children}
    </>
  );
}
