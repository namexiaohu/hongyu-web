import type { ReactNode } from 'react';

import { Breadcrumb } from '@/components/shared/breadcrumb';
import { StatsBar } from '@/components/shared/stats-bar';
import type { BreadcrumbItem, SplitHero, StatItem } from '@/lib/content/types';

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
  const heroClass = hero.heroClass ?? 'page-hero';
  const isTraining = heroClass === 'tr-hero';

  return (
    <>
      <Breadcrumb items={breadcrumbs} />
      <section className={heroClass} data-od-id="hero">
        {isTraining ? (
          <div className="container tr-hero-inner">
            <div>
              <div className="tr-eyebrow">{hero.eyebrow}</div>
              <h1 dangerouslySetInnerHTML={{ __html: hero.title.replace(/\n/g, '<br/>') }} />
              <p>{hero.lead}</p>
            </div>
            <div className="tr-hero-img">
              <img src={hero.image} alt={hero.imageAlt} />
            </div>
          </div>
        ) : (
          <div className="container page-hero-content">
            <div className="page-hero-text">
              <div className="ph-eyebrow">{hero.eyebrow}</div>
              <h1 dangerouslySetInnerHTML={{ __html: hero.title.replace(/\n/g, '<br/>') }} />
              <p>{hero.lead}</p>
            </div>
            <div className="page-hero-img">
              <img src={hero.image} alt={hero.imageAlt} />
            </div>
          </div>
        )}
      </section>
      {stats && stats.length > 0 ? (
        <div
          className="container"
          data-od-id="stats"
          style={{
            marginTop: 'calc(-1 * var(--space-12))',
            position: 'relative',
            zIndex: 3,
          }}
        >
          <StatsBar stats={stats} />
        </div>
      ) : null}
      {children}
    </>
  );
}
