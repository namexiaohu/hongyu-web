'use client';

import { usePathname } from 'next/navigation';
import { type ReactNode } from 'react';

import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { StaticInteractions } from '@/components/layout/static-interactions';

type SiteFrameProps = {
  children: ReactNode;
};

const PAGE_CLASS: Record<string, string> = {
  '/': 'page-home',
  '/about': 'page-about',
  '/patents': 'page-patents',
  '/history': 'page-history',
  '/solutions': 'page-solutions-list',
  '/solutions/v-clamp': 'page-solutions',
  '/surgeons': 'page-surgeons',
  '/centers': 'page-centers',
  '/insights': 'page-article-list',
  '/insights/v-clamp-splenectomy': 'page-article',
  '/education/training': 'page-training',
  '/education/summit': 'page-summit',
  '/education/recordings': 'page-recordings',
  '/contact': 'page-contact',
  '/partnership': 'page-partnership',
  '/company': 'page-company',
  '/media': 'page-media',
};

function pageClassFromPath(pathname: string) {
  return PAGE_CLASS[pathname] ?? 'page-home';
}

export function SiteFrame({ children }: SiteFrameProps) {
  const pathname = usePathname();
  const overlay = pathname === '/';
  const pageClass = pageClassFromPath(pathname);
  const shellClass = overlay ? 'site-shell site-shell-overlay' : 'site-shell';

  return (
    <div className={shellClass}>
      <SiteHeader overlay={overlay} />
      <main id="content" className={pageClass}>
        {children}
      </main>
      <SiteFooter />
      <StaticInteractions />
    </div>
  );
}
