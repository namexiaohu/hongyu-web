'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { HongyuLogoLink } from '@/components/layout/hongyu-logo';
import { LanguageSwitcher } from '@/components/layout/language-switcher';
import { headerNav } from '@/lib/nav';

type SiteHeaderProps = {
  overlay: boolean;
};

export function SiteHeader({ overlay }: SiteHeaderProps) {
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

  const className = ['topnav', overlay ? 'overlay' : 'solid', scrolled ? 'scrolled' : '']
    .filter(Boolean)
    .join(' ');

  const transparentOverlay = overlay && !scrolled;

  return (
    <header className={className} id="topnav">
      <div className="container topnav-inner">
        <HongyuLogoLink />
        <nav>
          {headerNav.map((item) => {
            const active =
              item.href === '/education/training'
                ? pathname.startsWith('/education')
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link key={item.href} href={item.href} className={active ? 'active' : undefined}>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="topnav-actions">
          <LanguageSwitcher transparent={transparentOverlay} />
          <Link href="/partnership" className="nav-cta">
            商务合作
          </Link>
        </div>
      </div>
    </header>
  );
}
