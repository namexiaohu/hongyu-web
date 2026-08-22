import type { ReactNode } from 'react';

import { SplitHeroPageTemplate } from '@/components/templates/split-hero-page-template';
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
    <SplitHeroPageTemplate
      breadcrumbs={breadcrumbs}
      hero={hero}
      stats={stats}
      heroTextClassName="sol-hero-text"
      eyebrowClassName="sol-eyebrow"
      heroMediaId="solution"
      heroExtra={
        materialsHref ? (
          <a href={materialsHref} className="btn-hero-primary">
            Get product materials
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        ) : null
      }
    >
      {children}
    </SplitHeroPageTemplate>
  );
}
