import type { ReactNode } from 'react';

import { Breadcrumb } from '@/components/shared/breadcrumb';
import { SplitBackgroundHero } from '@/components/shared/split-background-hero';
import { StatsBar } from '@/components/shared/stats-bar';
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
