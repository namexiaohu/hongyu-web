import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { OtherContentPageView } from '@/components/pages/other-content-page-view';
import { getStorefrontLocaleContext } from '@/lib/i18n-server';
import { getStorefrontOtherContentBySlug } from '@/lib/storefront-pages-api';
import { DEFAULT_SEO_TITLE } from '@/lib/site-config';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { locale } = await getStorefrontLocaleContext();
  const page = await getStorefrontOtherContentBySlug(slug, locale);

  if (!page) {
    return { title: 'Not Found' };
  }

  return {
    title: page.seo.title?.trim() || page.title,
    description: page.seo.description?.trim() || page.summary || DEFAULT_SEO_TITLE,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const { locale } = await getStorefrontLocaleContext();
  const page = await getStorefrontOtherContentBySlug(slug, locale);

  if (!page) {
    notFound();
  }

  return <OtherContentPageView page={page} />;
}
