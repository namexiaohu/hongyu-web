import type { ReactNode } from 'react';

import { SplitHeroPageTemplate } from '@/components/templates/split-hero-page-template';
import type { BreadcrumbItem, PageEntryLink, SplitHero, StatItem } from '@/lib/storefront-types';

type BrandNarrativePageProps = {
  breadcrumbs: BreadcrumbItem[];
  hero: SplitHero;
  stats?: StatItem[];
  entries?: PageEntryLink[];
  children: ReactNode;
};

export function BrandNarrativePage({
  breadcrumbs,
  hero,
  stats,
  entries,
  children,
}: BrandNarrativePageProps) {
  return (
    <SplitHeroPageTemplate
      breadcrumbs={breadcrumbs}
      hero={hero}
      stats={stats}
      entries={entries}
      heroTextClassName="narrative-hero-text"
      eyebrowClassName="narrative-eyebrow"
      statsWrapClassName="container narrative-stats-wrap"
      heroMediaId="narrative"
    >
      {children}
    </SplitHeroPageTemplate>
  );
}
