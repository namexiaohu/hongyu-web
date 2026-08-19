import type { CSSProperties, ReactNode } from 'react';

import { Breadcrumb } from '@/components/shared/breadcrumb';
import type { BreadcrumbItem, FilterTab, ListHero } from '@/lib/storefront-types';

type FilterListPageProps = {
  breadcrumbs: BreadcrumbItem[];
  hero: ListHero;
  filters?: FilterTab[];
  listingOdId?: string;
  listingSectionStyle?: CSSProperties;
  children: ReactNode;
  footer?: ReactNode;
};

export function FilterListPage({
  breadcrumbs,
  hero,
  filters,
  listingOdId = 'listing',
  listingSectionStyle,
  children,
  footer,
}: FilterListPageProps) {
  return (
    <>
      <Breadcrumb items={breadcrumbs} />
      <section className="page-hero" data-od-id="hero">
        <div className="container">
          <p className="eyebrow" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {hero.eyebrow}
          </p>
          <h1>{hero.title}</h1>
          <p className="lead">{hero.lead}</p>
        </div>
      </section>
      <section className="section" data-od-id={listingOdId} style={{ paddingTop: 0, ...listingSectionStyle }}>
        <div className="container">
          {filters && filters.length > 0 ? (
            <div className="filter-tabs">
              {filters.map((tab, index) => (
                <button
                  key={tab.id}
                  type="button"
                  className={`filter-tab${index === 0 ? ' active' : ''}`}
                  data-filter={tab.id}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          ) : null}
          {children}
        </div>
      </section>
      {footer}
    </>
  );
}
