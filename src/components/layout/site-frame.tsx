'use client';

import { usePathname } from 'next/navigation';
import { type ReactNode } from 'react';

import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { StaticInteractions } from '@/components/layout/static-interactions';
import type { StorefrontLanguage } from '@/lib/storefront-languages';

type SiteFrameProps = {
  children: ReactNode;
  languages: StorefrontLanguage[];
  locale: string;
};

const PAGE_CLASS: Record<string, string> = {
  '/': 'page-home',
  '/solutions': 'page-solutions-list',
  '/solutions/v-clamp': 'page-solutions',
  '/surgeons': 'page-surgeons',
  '/centers': 'page-centers',
  '/insights': 'page-article-list',
  '/education/summit': 'page-summit',
  '/education/recordings': 'page-recordings',
  '/contact': 'page-contact',
  '/partnership': 'page-partnership',
  '/company': 'page-company',
  '/media': 'page-media',
};

function pageClassFromPath(pathname: string) {
  if (pathname.startsWith('/insights/') && pathname !== '/insights') {
    return 'page-article';
  }
  return PAGE_CLASS[pathname] ?? '';
}

export function SiteFrame({ children, languages, locale }: SiteFrameProps) {
  const pathname = usePathname();
  const overlay = pathname === '/';
  const pageClass = pageClassFromPath(pathname);
  const shellClass = overlay ? 'site-shell site-shell-overlay' : 'site-shell';

  return (
    <div className={shellClass}>
      <SiteHeader overlay={overlay} languages={languages} locale={locale} />
      <main id="content" className={pageClass || undefined}>
        {children}
      </main>
      <SiteFooter />
      <StaticInteractions />
    </div>
  );
}
