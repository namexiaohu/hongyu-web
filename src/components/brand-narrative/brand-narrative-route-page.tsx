import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { BrandNarrativeRenderer } from '@/components/brand-narrative/brand-narrative-renderer';
import { BrandNarrativePage } from '@/components/templates/brand-narrative-page';
import { getServerSitePreferences } from '@/lib/i18n-server';
import { getStorefrontBrandNarrativeBySlug } from '@/lib/storefront-brand-narratives-api';
export async function createBrandNarrativeMetadata(slug: string): Promise<Metadata> {
  const { locale } = await getServerSitePreferences();
  const data = await getStorefrontBrandNarrativeBySlug(slug, locale);
  if (!data) {
    return { title: 'Not Found' };
  }
  return {
    title: data.seo.title,
    description: data.seo.description,
  };
}

/** 唯一叙事页入口：按 slug 拉取 CMS 数据，区块组合决定页面形态。 */
export async function BrandNarrativeRoutePage({ slug }: { slug: string }) {
  const { locale } = await getServerSitePreferences();
  const data = await getStorefrontBrandNarrativeBySlug(slug, locale);
  if (!data) {
    notFound();
  }

  return (
    <div className="brand-narrative-page">
      <BrandNarrativePage
        breadcrumbs={data.breadcrumbs}
        hero={data.hero}
        stats={data.stats ?? undefined}
      >
        <BrandNarrativeRenderer sections={data.sections} />
      </BrandNarrativePage>
    </div>
  );
}
