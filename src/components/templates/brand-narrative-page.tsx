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
  const hasImageBg = Boolean(hero.backgroundImage);
  const hasSolidBg = Boolean(hero.backgroundSolidCss);
  const showHeroCover = Boolean(hero.showCoverOnBackground && hero.image);
  const heroClassName = [
    'narrative-hero',
    hasSolidBg && !hasImageBg ? 'is-solid-bg' : '',
    showHeroCover ? 'has-cover' : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      <Breadcrumb items={breadcrumbs} />
      <section className={heroClassName} data-od-id="hero">
        {hasImageBg ? (
          <div className="narrative-hero-bg">
            <img src={hero.backgroundImage} alt="" />
          </div>
        ) : hasSolidBg ? (
          <div
            className="narrative-hero-bg narrative-hero-bg-solid"
            style={{ background: hero.backgroundSolidCss }}
          />
        ) : null}
        <div className="narrative-hero-overlay" />
        <div className="container narrative-hero-content">
          <div className="narrative-hero-text">
            <div className="narrative-eyebrow">{hero.eyebrow}</div>
            <h1 dangerouslySetInnerHTML={{ __html: hero.title.replace(/\n/g, '<br/>') }} />
            <p>{hero.lead}</p>
          </div>
          {showHeroCover ? (
            <div className="narrative-hero-cover">
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
