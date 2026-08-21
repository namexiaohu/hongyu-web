import type { ReactNode } from 'react';

import { Breadcrumb } from '@/components/shared/breadcrumb';
import { SplitBackgroundHero } from '@/components/shared/split-background-hero';
import { StatsBar } from '@/components/shared/stats-bar';
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
  return (
    <>
      <Breadcrumb items={breadcrumbs} />
      <SplitBackgroundHero
        backgroundImage={hero.backgroundImage}
        backgroundSolidCss={hero.backgroundSolidCss}
        coverImage={hero.image}
        coverAlt={hero.imageAlt}
        showCover={hero.showCoverOnBackground}
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
