import Link from 'next/link';

import { ProductGallery } from '@/components/product/product-gallery';
import { Breadcrumb } from '@/components/shared/breadcrumb';
import { SplitBackgroundHero } from '@/components/shared/split-background-hero';
import { buildHeroMediaSlides } from '@/lib/hero-media-slides';
import { getPageTranslations, getStorefrontLocaleContext } from '@/lib/i18n-server';
import type { TranslateFn } from '@/lib/i18n-server';
import {
  productCoverUrl,
  type StorefrontProductDetail,
} from '@/lib/storefront-products-api';

function attachmentMeta(mimeType: string, t: TranslateFn) {
  const mime = mimeType.trim().toLowerCase();
  if (mime.includes('pdf')) return t('product.attachmentTypes.pdf');
  if (mime.startsWith('image/')) return t('product.attachmentTypes.image');
  if (mime.includes('word') || mime.includes('document')) return t('product.attachmentTypes.document');
  return mimeType || t('product.attachmentTypes.file');
}

type ProductPageViewProps = {
  product: StorefrontProductDetail;
};

export async function ProductPageView({ product }: ProductPageViewProps) {
  const { locale } = await getStorefrontLocaleContext();
  const { t } = await getPageTranslations(locale, ['product', 'breadcrumb', 'common']);

  const stats = (product.stats ?? []).filter((row) => row.label?.trim() && row.value?.trim());
  const attachments = (product.attachments ?? []).filter((item) => item.url?.trim());
  const series = (product.seriesProducts ?? []).slice(0, 3);
  const cover = product.coverImage;
  const gallery = buildHeroMediaSlides({
    id: product.id,
    name: product.name,
    videoUrl: product.videoUrl,
    coverUrl: cover?.url,
    coverAlt: cover?.alt || product.name,
    coverId: cover?.id,
    gallery: product.gallery,
    coverDisplay: product.coverDisplay,
  });
  const showHeroMedia = Boolean(product.showCoverOnBackground && gallery.length);
  const solution = product.solution;

  const breadcrumbs = solution
    ? [
        { label: t('breadcrumb.home'), href: '/' },
        { label: t('breadcrumb.solutions'), href: '/solutions' },
        { label: solution.title, href: `/solutions/${solution.slug}` },
        { label: product.name },
      ]
    : [
        { label: t('breadcrumb.home'), href: '/' },
        { label: product.name },
      ];

  return (
    <>
      <Breadcrumb items={breadcrumbs} />

      <SplitBackgroundHero
        className="product-hero"
        backgroundImage={product.backgroundImage}
        backgroundSolidCss={product.backgroundSolidCss}
        heroCopyStyle={product.heroCopyStyle}
        showCover={showHeroMedia}
        coverSlot={showHeroMedia ? <ProductGallery slides={gallery} alt={product.name} /> : undefined}
      >
        <div className="product-hero-text">
          {product.badgeText?.trim() ? <div className="ph-badge">{product.badgeText}</div> : null}
          <h1>{product.name}</h1>
          {product.shortDescription?.trim() ? (
            <p className="ph-subtitle">{product.shortDescription}</p>
          ) : null}
          {product.extraText?.trim() ? (
            <div className="ph-key-specs">
              <span className="ph-key-spec">{product.extraText}</span>
            </div>
          ) : null}
          <div className="product-hero-actions">
            {stats.length ? (
              <a href="#specs" className="btn-hero-primary">
                {t('product.viewSpecifications')}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            ) : null}
            {attachments.length ? (
              <a href="#downloads" className={stats.length ? 'btn-hero-secondary' : 'btn-hero-primary'}>
                {t('product.getMaterials')}
              </a>
            ) : null}
          </div>
        </div>
      </SplitBackgroundHero>

      {product.description?.trim() ? (
        <section className="section" data-od-id="overview">
          <div className="container">
            <div className="product-rich-content">
              <p className="eyebrow" style={{ marginBottom: 'var(--space-3)' }}>
                {t('product.overviewEyebrow')}
              </p>
              <h2 style={{ marginBottom: 'var(--space-6)' }}>{product.name}</h2>
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
          </div>
        </section>
      ) : null}

      {stats.length ? (
        <section className="section section--muted" id="specs" data-od-id="specs">
          <div className="container">
            <div className="section-header">
              <p className="eyebrow">{t('product.specificationsEyebrow')}</p>
              <h2>{t('product.specificationsTitle')}</h2>
            </div>
            <table className="spec-table">
              <thead>
                <tr>
                  <th>{t('product.parameterColumn')}</th>
                  <th>{t('product.specificationColumn')}</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((row) => (
                  <tr key={`${row.label}-${row.value}`}>
                    <td>{row.label}</td>
                    <td className="spec-val">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {attachments.length ? (
        <section className="section" id="downloads" data-od-id="downloads">
          <div className="container">
            <div className="section-header">
              <p className="eyebrow">{t('product.downloadsEyebrow')}</p>
              <h2>{t('product.downloadsTitle')}</h2>
              <p>{t('product.downloadsLead', { productName: product.name })}</p>
            </div>
            <div className="download-list">
              {attachments.map((item) => (
                <a
                  key={item.id || item.url}
                  href={item.url}
                  className="download-item"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="di-left">
                    <div className="di-icon">
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                      </svg>
                    </div>
                    <div>
                      <div className="di-name">{item.name}</div>
                      <div className="di-meta">{attachmentMeta(item.mimeType, t)}</div>
                    </div>
                  </div>
                  <span className="di-btn">{t('common.downloadArrow')}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {series.length ? (
        <section className="section section--muted" data-od-id="related">
          <div className="container">
            <div className="section-header">
              <p className="eyebrow">{t('product.relatedEyebrow')}</p>
              <h2>{t('product.relatedTitle')}</h2>
            </div>
            <div className="grid-3">
              {series.map((item) => {
                const coverSrc = productCoverUrl(item.coverImage);
                return (
                  <Link key={item.id || item.slug} href={`/products/${item.slug}`} className="related-card">
                    <div className="related-card-img">
                      {coverSrc ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={coverSrc} alt={item.name} />
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round">
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                      )}
                    </div>
                    <div className="related-card-body">
                      {item.badgeText?.trim() ? <div className="rc-tag">{item.badgeText}</div> : null}
                      <h3>{item.name}</h3>
                      {item.extraText?.trim() ? (
                        <p className="rc-extra">{item.extraText}</p>
                      ) : null}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
