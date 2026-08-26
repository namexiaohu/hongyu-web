'use client';

import { usePathname } from 'next/navigation';
import { Suspense, type ReactNode } from 'react';

import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { StaticInteractions } from '@/components/layout/static-interactions';
import { findNavItemLabel } from '@/lib/company-display';
import type { StorefrontCompanyBranding } from '@/lib/storefront-company';
import { PARTNERSHIP_HREF } from '@/lib/partnership-cta';
import type { StorefrontLanguage } from '@/lib/storefront-languages';
import type { StorefrontSocialChannel } from '@/lib/storefront-social-media';
import type { StorefrontNavColumn } from '@/lib/storefront-website-config-api';

type SiteFrameProps = {
  children: ReactNode;
  languages: StorefrontLanguage[];
  locale: string;
  branding?: StorefrontCompanyBranding;
  socialChannels?: StorefrontSocialChannel[];
  headerNavColumns: StorefrontNavColumn[];
  footerNavColumns: StorefrontNavColumn[];
};

const PAGE_CLASS: Record<string, string> = {
  '/': 'page-home',
  '/surgeons': 'page-surgeons',
  '/centers': 'page-centers',
  '/solutions': 'page-solutions-list',
  '/insights': 'page-article-list',
  '/summit': 'page-summit',
  '/course': 'page-recordings',
  '/contact': 'page-contact',
  '/partnership': 'page-partnership',
  '/company': 'page-company',
  '/media': 'page-media',
};

function pageClassFromPath(pathname: string) {
  if (pathname.startsWith('/insights/') && pathname !== '/insights') {
    return 'page-article';
  }
  if (pathname.startsWith('/solutions/') && pathname !== '/solutions') {
    return 'page-solutions';
  }
  if (pathname.startsWith('/products/') && pathname !== '/products') {
    return 'page-products';
  }
  if (pathname.startsWith('/surgeons/') && pathname !== '/surgeons') {
    return 'page-surgeons';
  }
  if (pathname.startsWith('/centers/') && pathname !== '/centers') {
    return 'page-centers';
  }
  if (pathname === '/summit' || pathname.startsWith('/summit/')) return 'page-summit';
  return PAGE_CLASS[pathname] ?? '';
}

export function SiteFrame({
  children,
  languages,
  locale,
  branding,
  socialChannels = [],
  headerNavColumns,
  footerNavColumns,
}: SiteFrameProps) {
  const pathname = usePathname();
  const overlay = pathname === '/';
  const dark =
    pathname === '/summit' ||
    pathname.startsWith('/summit/') ||
    pathname === '/media';
  const pageClass = pageClassFromPath(pathname);
  const shellClass = [
    'site-shell',
    overlay ? 'site-shell-overlay' : '',
    dark ? 'site-shell-dark' : '',
  ].filter(Boolean).join(' ');

  const partnershipCtaLabel = findNavItemLabel(headerNavColumns, PARTNERSHIP_HREF);

  return (
    <div className={shellClass}>
      <Suspense fallback={null}>
        <SiteHeader
          overlay={overlay}
          dark={dark}
          languages={languages}
          locale={locale}
          headerNavColumns={headerNavColumns}
          partnershipCtaLabel={partnershipCtaLabel}
        />
      </Suspense>
      <main id="content" className={pageClass || undefined}>
        {children}
      </main>
      <SiteFooter dark={dark} branding={branding} socialChannels={socialChannels} footerNavColumns={footerNavColumns} />
      <StaticInteractions />
    </div>
  );
}
