import { BrandNarrativeRoutePage, createBrandNarrativeMetadata } from '@/components/brand-narrative/brand-narrative-route-page';

type PageProps = {
  params: Promise<{ slug: string }>;
};

/** 叙事页唯一路由：/about、/history 等均由此 slug 动态渲染，无独立 page 组件。 */
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  return createBrandNarrativeMetadata(slug);
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <BrandNarrativeRoutePage slug={slug} />;
}
