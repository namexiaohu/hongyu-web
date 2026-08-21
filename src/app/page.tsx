import type { Metadata } from 'next';

import { HomePageView } from '@/components/home/home-page-view';
import { getStorefrontLocaleContext } from '@/lib/i18n-server';
import { DEFAULT_SEO_DESCRIPTION } from '@/lib/site-config';
import { getStorefrontHomepageConfig } from '@/lib/storefront-homepage-api';
import { getStorefrontInsightsList } from '@/lib/storefront-insights-api';
import { getStorefrontPartnerCentersList } from '@/lib/storefront-partner-centers-api';
import { getStorefrontSolutionsList } from '@/lib/storefront-solutions-api';

export const metadata: Metadata = {
  description: DEFAULT_SEO_DESCRIPTION,
};

export default async function HomePage() {
  const { locale } = await getStorefrontLocaleContext();

  const [config, solutionsRes, insightsRes, centersRes] = await Promise.all([
    getStorefrontHomepageConfig(locale),
    getStorefrontSolutionsList({ page: 1, pageSize: 4, sort: 'createdAt', locale }),
    getStorefrontInsightsList({ page: 1, pageSize: 4, locale }),
    getStorefrontPartnerCentersList(locale),
  ]);

  const partnerCenters = centersRes.groups.flatMap((group) =>
    group.items.map((item) => ({
      slug: item.slug,
      name: item.name,
      location: item.location,
      region: item.region,
      badgeText: item.badgeText,
    })),
  );

  return (
    <HomePageView
      config={config}
      solutions={solutionsRes.items}
      insights={insightsRes.items}
      partnerCenters={partnerCenters}
    />
  );
}
