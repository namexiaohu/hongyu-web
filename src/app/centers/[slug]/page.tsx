import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Breadcrumb } from '@/components/shared/breadcrumb';
import { getStorefrontLocaleContext } from '@/lib/i18n-server';
import { DEFAULT_SEO_TITLE } from '@/lib/site-config';
import { getStorefrontPartnerCenterBySlug } from '@/lib/storefront-partner-centers-api';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { locale } = await getStorefrontLocaleContext();
  const center = await getStorefrontPartnerCenterBySlug(slug, locale);
  if (!center) return { title: 'Not Found' };
  return {
    title: `${center.name} · 合作中心`,
    description: center.description || DEFAULT_SEO_TITLE,
  };
}

export default async function PartnerCenterDetailPlaceholderPage({ params }: PageProps) {
  const { slug } = await params;
  const { locale } = await getStorefrontLocaleContext();
  const center = await getStorefrontPartnerCenterBySlug(slug, locale);
  if (!center) notFound();

  return (
    <>
      <Breadcrumb
        items={[
          { label: '首页', href: '/' },
          { label: '合作中心', href: '/centers' },
          { label: center.name },
        ]}
      />
      <section className="section container">
        <p className="eyebrow" style={{ marginBottom: 'var(--space-3)' }}>Partner Center · 合作中心</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 700 }}>
          {center.name}
        </h1>
        {center.badgeText ? (
          <p style={{ marginTop: 'var(--space-3)', color: 'var(--muted)' }}>{center.badgeText}</p>
        ) : null}
        {center.location ? (
          <p style={{ marginTop: 'var(--space-2)', color: 'var(--meta)', fontSize: 14 }}>{center.location}</p>
        ) : null}
      </section>
    </>
  );
}
