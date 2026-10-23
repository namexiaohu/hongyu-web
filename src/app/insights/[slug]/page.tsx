import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

import { InsightArticlePage } from '@/components/insights/insight-article-page';
import { getStorefrontLocaleContext } from '@/lib/i18n-server';
import { insightItemHref } from '@/lib/insights';
import { getStorefrontInsightBySlug } from '@/lib/storefront-insights-api';
import { DEFAULT_SEO_TITLE } from '@/lib/site-config';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { locale } = await getStorefrontLocaleContext();
  const article = await getStorefrontInsightBySlug(slug, locale);

  if (!article) {
    return { title: 'Not Found' };
  }

  return {
    title: article.seo.title?.trim() || article.title,
    description: article.seo.description?.trim() || article.summary || DEFAULT_SEO_TITLE,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const { locale } = await getStorefrontLocaleContext();
  const article = await getStorefrontInsightBySlug(slug, locale);

  if (!article) {
    notFound();
  }

  if (article.bodyLinkEnabled && article.bodyLinkUrl?.trim()) {
    redirect(insightItemHref(article));
  }

  return <InsightArticlePage article={article} />;
}
