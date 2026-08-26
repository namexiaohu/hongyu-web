import type { Metadata } from 'next';

import { HomePageView } from '@/components/home/home-page-view';
import { resolveCompanyEyebrow, resolveCompanyName } from '@/lib/company-display';
import { getPageTranslations, getStorefrontLocaleContext } from '@/lib/i18n-server';
import { buildInsightsHero } from '@/lib/insights';
import { buildPartnershipCta } from '@/lib/partnership-cta';
import { DEFAULT_SEO_DESCRIPTION } from '@/lib/site-config';
import { getStorefrontCompanyProfile } from '@/lib/storefront-company-api';
import { getStorefrontHomepageConfig } from '@/lib/storefront-homepage-api';
import { getStorefrontInsightsList } from '@/lib/storefront-insights-api';
import { getStorefrontPartnerCentersList } from '@/lib/storefront-partner-centers-api';

export const metadata: Metadata = {
  description: DEFAULT_SEO_DESCRIPTION,
};

export default async function HomePage() {
  const { locale } = await getStorefrontLocaleContext();
  const { t } = await getPageTranslations(locale, ['home', 'common', 'cta']);

  const [company, config, insightsRes, centersRes] = await Promise.all([
    getStorefrontCompanyProfile(locale),
    getStorefrontHomepageConfig(locale),
    getStorefrontInsightsList({ page: 1, pageSize: 4, locale }),
    getStorefrontPartnerCentersList(locale),
  ]);

  const companyName = resolveCompanyName(company, locale);

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
      insights={insightsRes.items}
      partnerCenters={partnerCenters}
      brandEyebrow={resolveCompanyEyebrow(company, locale)}
      insightsHero={buildInsightsHero(t, companyName)}
      partnershipCta={buildPartnershipCta(t, 'home', { companyName })}
      homeCopy={{
        solutionsEyebrow: t('home.sections.solutionsEyebrow'),
        aboutEyebrow: t('home.sections.aboutEyebrow'),
        aboutLearnMore: t('home.sections.aboutLearnMore'),
        statsEyebrow: t('home.sections.statsEyebrow'),
        globalEyebrow: t('home.sections.globalEyebrow'),
        insightsViewAll: t('home.sections.insightsViewAll'),
        educationEyebrow: t('home.sections.educationEyebrow'),
        emptyDash: t('common.emptyDash'),
      }}
    />
  );
}
