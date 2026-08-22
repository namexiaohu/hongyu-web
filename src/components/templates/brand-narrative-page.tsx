import type { ReactNode } from 'react';

import { SplitHeroPageTemplate } from '@/components/templates/split-hero-page-template';
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
    <SplitHeroPageTemplate
      breadcrumbs={breadcrumbs}
      hero={hero}
      stats={stats}
      heroTextClassName="narrative-hero-text"
      eyebrowClassName="narrative-eyebrow"
      statsWrapClassName="container narrative-stats-wrap"
      heroMediaId="narrative"
    >
      {children}
    </SplitHeroPageTemplate>
  );
}
