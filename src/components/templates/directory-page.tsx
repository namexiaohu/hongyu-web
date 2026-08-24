import type { ReactNode } from 'react';

import { Breadcrumb } from '@/components/shared/breadcrumb';
import { ListPageHero } from '@/components/shared/list-page-hero';
import type { BreadcrumbItem, DirHero } from '@/lib/storefront-types';
import type { StorefrontListHeroBoard } from '@/lib/storefront-website-config-api';

type DirectoryPageProps = {
  breadcrumbs: BreadcrumbItem[];
  hero: DirHero;
  heroBoard?: StorefrontListHeroBoard;
  heroOdId?: string;
  children: ReactNode;
  footer?: ReactNode;
};

function DirectoryHeroText({ hero }: { hero: DirHero }) {
  return (
    <>
      <p className="eyebrow">{hero.eyebrow}</p>
      <h1>{hero.title}</h1>
      <p className="lead">{hero.lead}</p>
    </>
  );
}

export function DirectoryPage({
  breadcrumbs,
  hero,
  heroBoard,
  heroOdId = 'hero',
  children,
  footer,
}: DirectoryPageProps) {
  return (
    <>
      <Breadcrumb items={breadcrumbs} />
      {heroBoard ? (
        <ListPageHero
          board={heroBoard}
          fallback={(
            <section className="dir-hero" data-od-id={heroOdId}>
              <div className="container">
                <DirectoryHeroText hero={hero} />
              </div>
            </section>
          )}
        >
          <DirectoryHeroText hero={hero} />
        </ListPageHero>
      ) : (
        <section className="dir-hero" data-od-id={heroOdId}>
          <div className="container">
            <DirectoryHeroText hero={hero} />
          </div>
        </section>
      )}
      {children}
      {footer}
    </>
  );
}
