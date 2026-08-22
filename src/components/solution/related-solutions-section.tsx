import Link from 'next/link';

import { getPageTranslations, getStorefrontLocaleContext } from '@/lib/i18n-server';
import type { StorefrontSolutionListItem } from '@/lib/storefront-solutions-api';

export async function RelatedSolutionsSection({ items }: { items: StorefrontSolutionListItem[] }) {
  if (!items.length) return null;

  const { locale } = await getStorefrontLocaleContext();
  const { t } = await getPageTranslations(locale, ['solution']);

  return (
    <section className="section" data-od-id="related">
      <div className="container">
        <div className="section-header">
          <p className="eyebrow">{t('solution.relatedEyebrow')}</p>
          <h2>{t('solution.relatedTitle')}</h2>
        </div>
        <div className="grid-4">
          {items.map((item) => (
            <Link key={item.slug} href={item.href} className="related-card">
              <div className="related-card-img">
                {item.coverImage ? (
                  <img src={item.coverImage} alt={item.largeTitle || item.title} />
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6">
                    <path d="M4 19V5a2 2 0 0 1 2-2h9l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
                  </svg>
                )}
              </div>
              <div className="related-card-body">
                <div className="rc-tag">{item.categoryLabel}</div>
                <h3>{item.largeTitle || item.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
