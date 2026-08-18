import type { ReactNode } from 'react';

import { Breadcrumb } from '@/components/shared/breadcrumb';
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
      <section className="narrative-hero" data-od-id="hero">
        <div className="container narrative-hero-content">
          <div className="narrative-hero-text">
            <div className="narrative-eyebrow">{hero.eyebrow}</div>
            <h1 dangerouslySetInnerHTML={{ __html: hero.title.replace(/\n/g, '<br/>') }} />
            <p>{hero.lead}</p>
          </div>
          {hero.image ? (
            <div className="narrative-hero-image">
              <img src={hero.image} alt={hero.imageAlt} />
            </div>
          ) : null}
        </div>
      </section>
      {stats && stats.length > 0 ? (
        <div className="container narrative-stats-wrap" data-od-id="stats">
          <StatsBar stats={stats} />
        </div>
      ) : null}
      {children}
    </>
  );
}
