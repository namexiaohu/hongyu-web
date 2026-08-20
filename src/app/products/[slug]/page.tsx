import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ProductPageView } from '@/components/product/product-page-view';
import { getServerSitePreferences } from '@/lib/i18n-server';
import { DEFAULT_SEO_TITLE } from '@/lib/site-config';
import { getStorefrontProductBySlug } from '@/lib/storefront-products-api';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { locale } = await getServerSitePreferences();
  const product = await getStorefrontProductBySlug(slug, locale);
  if (!product) return { title: 'Not Found' };

  const title = product.seo?.title?.trim() || product.seoTitle?.trim() || product.name;
  const description =
    product.seo?.description?.trim() ||
    product.seoDescription?.trim() ||
    product.shortDescription?.trim() ||
    DEFAULT_SEO_TITLE;

  return { title, description };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const { locale } = await getServerSitePreferences();
  const product = await getStorefrontProductBySlug(slug, locale);
  if (!product) notFound();

  return <ProductPageView product={product} />;
}
