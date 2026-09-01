import type { Metadata } from 'next';

import { InsightsListPage } from '@/components/insights/insights-list-page';
import { resolveCompanyName } from '@/lib/company-display';
import { getPageTranslations, getStorefrontLocaleContext } from '@/lib/i18n-server';
import { buildInsightsCta, buildInsightsHero } from '@/lib/insights';
import {
  getStorefrontInsightsBoardCounts,
  getStorefrontInsightsList,
  getStorefrontRandomInsights,
} from '@/lib/storefront-insights-api';
import { getStorefrontCompanyProfile } from '@/lib/storefront-company-api';
import { getStorefrontWebsiteConfig } from '@/lib/storefront-website-config-api';
import { DEFAULT_SEO_TITLE } from '@/lib/site-config';

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getStorefrontLocaleContext();
  const [{ t }, company] = await Promise.all([
    getPageTranslations(locale, ['insights', 'home']),
    getStorefrontCompanyProfile(locale),
  ]);
  const companyName = resolveCompanyName(company, locale);
  return {
    title: t('insights.metaTitle'),
    description: buildInsightsHero(t, companyName).lead || DEFAULT_SEO_TITLE,
  };
}

type PageProps = {
  searchParams: Promise<{ category?: string; page?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const category = params.category?.trim() || null;
  const page = Math.max(1, Number.parseInt(params.page ?? '1', 10) || 1);
  const { locale } = await getStorefrontLocaleContext();
  const { t } = await getPageTranslations(locale, ['insights', 'home', 'breadcrumb', 'common', 'cta']);

  const [company, list, boardCounts, randomItems, websiteConfig] = await Promise.all([
    getStorefrontCompanyProfile(locale),
    getStorefrontInsightsList({ category, page, pageSize: 6, locale }),
    getStorefrontInsightsBoardCounts(locale),
    getStorefrontRandomInsights({ limit: 6, locale }).then((payload) => payload.items),
    getStorefrontWebsiteConfig(locale),
  ]);

  const companyName = resolveCompanyName(company, locale);

  return (
    <InsightsListPage
      list={list}
      boardCounts={boardCounts}
      randomItems={randomItems}
      category={category}
      page={page}
      insightsHero={buildInsightsHero(t, companyName)}
      heroBoard={websiteConfig.listHeroBoards.insights}
      listCopy={{
        breadcrumbHome: t('breadcrumb.home'),
        breadcrumbCurrent: t('insights.metaTitle'),
        allLabel: t('common.all'),
        featuredLabel: t('common.featured'),
        previousPage: t('common.previousPage'),
        nextPage: t('common.nextPage'),
        pastHighlights: t('insights.pastHighlights'),
      }}
      insightsCta={buildInsightsCta(t)}
    />
  );
}
