'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { HongyuLogoLink } from '@/components/layout/hongyu-logo';
import { LanguageSwitcher } from '@/components/layout/language-switcher';
import type { StorefrontLanguage } from '@/lib/storefront-languages';
import type { StorefrontNavColumn } from '@/lib/storefront-website-config-api';

type SiteHeaderProps = {
  overlay: boolean;
  dark?: boolean;
  languages: StorefrontLanguage[];
  locale: string;
  navColumns: StorefrontNavColumn[];
};

function pathMatchesHref(pathname: string, href: string) {
  const pathOnly = href.split('?')[0] || href;
  if (pathOnly === '/training') {
    return (
      pathname === '/training' ||
      pathname === '/course' ||
      pathname.startsWith('/course/') ||
      pathname.startsWith('/education')
    );
  }
  return pathname === pathOnly || pathname.startsWith(`${pathOnly}/`);
}

function isColumnActive(pathname: string, column: StorefrontNavColumn) {
  return column.items.some((item) => pathMatchesHref(pathname, item.href));
}

export function SiteHeader({
  overlay,
  dark = false,
  languages,
  locale,
  navColumns,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(!overlay);

  useEffect(() => {
    if (!overlay) {
      setScrolled(true);
      return;
    }

    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [overlay]);

  const className = ['topnav', dark ? 'dark' : overlay ? 'overlay' : 'solid', scrolled ? 'scrolled' : '']
    .filter(Boolean)
    .join(' ');

  const transparentOverlay = overlay && !scrolled;

  return (
    <header className={className} id="topnav">
      <div className="container topnav-inner">
        <HongyuLogoLink light={dark || transparentOverlay} />
        <nav>
          {navColumns.map((column) => {
            const active = isColumnActive(pathname, column);
            return (
              <div key={column.id} className="nav-dropdown">
                <span
                  className={['nav-dropdown-trigger', active ? 'active' : ''].filter(Boolean).join(' ')}
                  tabIndex={0}
                >
                  {column.name}
                  <svg className="nav-dropdown-caret" viewBox="0 0 12 12" aria-hidden="true">
                    <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div className="nav-dropdown-panel">
                  <div className="nav-dropdown-menu" role="menu">
                    {column.items.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        className={pathMatchesHref(pathname, item.href) ? 'active' : undefined}
                        role="menuitem"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>
        <div className="topnav-actions">
          <LanguageSwitcher languages={languages} initialLocale={locale} transparent={transparentOverlay || dark} />
          <Link href="/partnership" className="nav-cta">
            商务合作
          </Link>
        </div>
      </div>
    </header>
  );
}
