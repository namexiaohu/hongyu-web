import type { ReactNode } from 'react';

import { Breadcrumb } from '@/components/shared/breadcrumb';
import type { BreadcrumbItem, DirHero } from '@/lib/storefront-types';

type DirectoryPageProps = {
  breadcrumbs: BreadcrumbItem[];
  hero: DirHero;
  heroOdId?: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function DirectoryPage({
  breadcrumbs,
  hero,
  heroOdId = 'hero',
  children,
  footer,
}: DirectoryPageProps) {
  return (
    <>
      <Breadcrumb items={breadcrumbs} />
      <section className="dir-hero" data-od-id={heroOdId}>
        <div className="container">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1>{hero.title}</h1>
          <p className="lead">{hero.lead}</p>
        </div>
      </section>
      {children}
      {footer}
    </>
  );
}
