import type { ReactNode } from 'react';

import { SplitHeroPageTemplate } from '@/components/templates/split-hero-page-template';
import { getPageTranslations, getStorefrontLocaleContext } from '@/lib/i18n-server';
import type { BreadcrumbItem, SplitHero, StatItem } from '@/lib/storefront-types';

type SolutionPageProps = {
  breadcrumbs: BreadcrumbItem[];
  hero: SplitHero;
  stats?: StatItem[];
  materialsHref?: string | null;
  children: ReactNode;
};

export async function SolutionPage({
  breadcrumbs,
  hero,
  stats,
  materialsHref,
  children,
}: SolutionPageProps) {
  const { locale } = await getStorefrontLocaleContext();
  const { t } = await getPageTranslations(locale, ['solution']);

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
            {t('solution.getMaterials')}
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
