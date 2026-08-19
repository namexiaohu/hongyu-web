'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { HongyuLogoLink } from '@/components/layout/hongyu-logo';
import { LanguageSwitcher } from '@/components/layout/language-switcher';
import { headerNav } from '@/lib/nav';
import type { StorefrontLanguage } from '@/lib/storefront-languages';

type SiteHeaderProps = {
  overlay: boolean;
  dark?: boolean;
  languages: StorefrontLanguage[];
  locale: string;
};

export function SiteHeader({ overlay, dark = false, languages, locale }: SiteHeaderProps) {
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
        <HongyuLogoLink light={dark} />
        <nav>
          {headerNav.map((item) => {
            const active =
              item.href === '/training'
                ? pathname === '/training' || pathname.startsWith('/education')
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link key={item.href} href={item.href} className={active ? 'active' : undefined}>
                {item.label}
              </Link>
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
