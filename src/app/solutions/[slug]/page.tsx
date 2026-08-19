import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { RelatedSolutionsSection } from '@/components/solution/related-solutions-section';
import { SolutionMaterialsSection } from '@/components/solution/solution-materials-section';
import { SolutionRenderer } from '@/components/solution/solution-renderer';
import { SolutionPage } from '@/components/templates/solution-page';
import { getServerSitePreferences } from '@/lib/i18n-server';
import { getStorefrontSolutionBySlug } from '@/lib/storefront-solutions-api';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { locale } = await getServerSitePreferences();
  const data = await getStorefrontSolutionBySlug(slug, locale);
  if (!data) return { title: 'Not Found' };
  return {
    title: data.seo.title,
    description: data.seo.description,
  };
}

export default async function SolutionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const { locale } = await getServerSitePreferences();
  const data = await getStorefrontSolutionBySlug(slug, locale);
  if (!data) notFound();

  const hasMaterials = data.materials.length > 0;

  return (
    <SolutionPage
      breadcrumbs={data.breadcrumbs}
      hero={data.hero}
      stats={data.stats ?? undefined}
      materialsHref={hasMaterials ? '#product-materials' : null}
    >
      <SolutionRenderer sections={data.sections} />
      {hasMaterials ? <SolutionMaterialsSection materials={data.materials} /> : null}
      <RelatedSolutionsSection items={data.related} />
    </SolutionPage>
  );
}
