import type { Metadata } from 'next';

import { HomePageView } from '@/components/home/home-page-view';
import { getStorefrontLocaleContext } from '@/lib/i18n-server';
import { DEFAULT_SEO_DESCRIPTION } from '@/lib/site-config';
import { getStorefrontHomepageConfig } from '@/lib/storefront-homepage-api';
import { getStorefrontInsightsList } from '@/lib/storefront-insights-api';
import { getStorefrontSolutionsList } from '@/lib/storefront-solutions-api';

export const metadata: Metadata = {
  description: DEFAULT_SEO_DESCRIPTION,
};

export default async function HomePage() {
  const { locale } = await getStorefrontLocaleContext();

  const [config, solutionsRes, insightsRes] = await Promise.all([
    getStorefrontHomepageConfig(locale),
    getStorefrontSolutionsList({ page: 1, pageSize: 4, sort: 'createdAt', locale }).catch(() => ({
      items: [] as Awaited<ReturnType<typeof getStorefrontSolutionsList>>['items'],
    })),
    getStorefrontInsightsList({ page: 1, pageSize: 4, locale }).catch(() => ({
      items: [] as Awaited<ReturnType<typeof getStorefrontInsightsList>>['items'],
    })),
  ]);

  return (
    <HomePageView
      config={config}
      solutions={solutionsRes.items}
      insights={insightsRes.items}
    />
  );
}
