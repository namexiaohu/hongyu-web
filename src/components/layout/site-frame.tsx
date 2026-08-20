'use client';

import { usePathname } from 'next/navigation';
import { type ReactNode } from 'react';

import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { StaticInteractions } from '@/components/layout/static-interactions';
import type { StorefrontCompanyBranding } from '@/lib/storefront-company';
import type { StorefrontLanguage } from '@/lib/storefront-languages';
import type { StorefrontSocialChannel } from '@/lib/storefront-social-media';
import type { StorefrontNavColumn } from '@/lib/storefront-website-config-api';

type SiteFrameProps = {
  children: ReactNode;
  languages: StorefrontLanguage[];
  locale: string;
  branding?: StorefrontCompanyBranding;
  socialChannels?: StorefrontSocialChannel[];
  navColumns: StorefrontNavColumn[];
};

const PAGE_CLASS: Record<string, string> = {
  '/': 'page-home',
  '/solutions': 'page-solutions-list',
  '/surgeons': 'page-surgeons',
  '/centers': 'page-centers',
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
  if (pathname === '/summit' || pathname.startsWith('/summit/')) return 'page-summit';
  return PAGE_CLASS[pathname] ?? '';
}

export function SiteFrame({
  children,
  languages,
  locale,
  branding,
  socialChannels = [],
  navColumns,
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

  return (
    <div className={shellClass}>
      <SiteHeader
        overlay={overlay}
        dark={dark}
        languages={languages}
        locale={locale}
        navColumns={navColumns}
      />
      <main id="content" className={pageClass || undefined}>
        {children}
      </main>
      <SiteFooter dark={dark} branding={branding} socialChannels={socialChannels} navColumns={navColumns} />
      <StaticInteractions />
    </div>
  );
}
