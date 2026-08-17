import type { ReactNode } from 'react';

import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { StaticInteractions } from '@/components/layout/static-interactions';

type SiteFrameProps = {
  overlay?: boolean;
  children: ReactNode;
};

export function SiteFrame({ overlay = false, children }: SiteFrameProps) {
  return (
    <div className={overlay ? 'site-shell site-shell-overlay' : 'site-shell'}>
      <SiteHeader overlay={overlay} />
      <main id="content">{children}</main>
      <SiteFooter />
      <StaticInteractions />
    </div>
  );
}
