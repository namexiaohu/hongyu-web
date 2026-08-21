import Link from 'next/link';

import { ProductGallery, type ProductGallerySlide } from '@/components/product/product-gallery';
import { Breadcrumb } from '@/components/shared/breadcrumb';
import {
  productCoverUrl,
  type StorefrontProductDetail,
} from '@/lib/storefront-products-api';

function buildGallerySlides(product: StorefrontProductDetail): ProductGallerySlide[] {
  const slides: ProductGallerySlide[] = [];
  const videoUrl = product.videoUrl?.trim();
  if (videoUrl) {
    slides.push({
      id: `${product.id}-video`,
      url: videoUrl,
      alt: `${product.name} video`,
      kind: 'video',
    });
  }

  const cover = product.coverImage;
  const coverUrl = cover?.url?.trim() || '';
  if (coverUrl) {
    slides.push({
      id: cover?.id || `${product.id}-cover`,
      url: coverUrl,
      alt: cover?.alt || product.name,
      kind: 'image',
    });
  }

  const seen = new Set(slides.map((item) => item.url));
  for (const [index, item] of (product.gallery ?? []).entries()) {
    const url = item.url?.trim();
    if (!url || seen.has(url)) continue;
    seen.add(url);
    slides.push({
      id: item.id || `${product.id}-gallery-${index}`,
      url,
      alt: item.alt || product.name,
      kind: 'image',
    });
  }

  return slides;
}

function attachmentMeta(mimeType: string) {
  const mime = mimeType.trim().toLowerCase();
  if (mime.includes('pdf')) return 'PDF';
  if (mime.startsWith('image/')) return 'Image';
  if (mime.includes('word') || mime.includes('document')) return 'Document';
  return mimeType || 'File';
}

type ProductPageViewProps = {
  product: StorefrontProductDetail;
};

export function ProductPageView({ product }: ProductPageViewProps) {
  const stats = (product.stats ?? []).filter((row) => row.label?.trim() && row.value?.trim());
  const attachments = (product.attachments ?? []).filter((item) => item.url?.trim());
  const series = (product.seriesProducts ?? []).slice(0, 3);
  const gallery = buildGallerySlides(product);
  const solution = product.solution;

  const breadcrumbs = solution
    ? [
        { label: 'Home', href: '/' },
        { label: 'Solutions', href: '/solutions' },
        { label: solution.title, href: `/solutions/${solution.slug}` },
        { label: product.name },
      ]
    : [
        { label: 'Home', href: '/' },
        { label: product.name },
      ];

  return (
    <>
      <Breadcrumb items={breadcrumbs} />

      <section className="product-hero" data-od-id="hero">
        <div className="container product-hero-content">
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
                  View specifications
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              ) : null}
              {attachments.length ? (
                <a href="#downloads" className={stats.length ? 'btn-hero-secondary' : 'btn-hero-primary'}>
                  Get product materials
                </a>
              ) : null}
            </div>
          </div>
          <ProductGallery slides={gallery} alt={product.name} />
        </div>
      </section>

      {product.description?.trim() ? (
        <section className="section" data-od-id="overview">
          <div className="container">
            <div className="product-rich-content">
              <p className="eyebrow" style={{ marginBottom: 'var(--space-3)' }}>
                Overview
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
              <p className="eyebrow">Specifications · 技术规格</p>
              <h2>Specifications</h2>
            </div>
            <table className="spec-table">
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Specification</th>
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
              <p className="eyebrow">Downloads</p>
              <h2>Downloads</h2>
              <p>Technical documents and clinical materials for {product.name}.</p>
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
                      <div className="di-meta">{attachmentMeta(item.mimeType)}</div>
                    </div>
                  </div>
                  <span className="di-btn">Download →</span>
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
              <p className="eyebrow">Related</p>
              <h2>Other models in this series</h2>
            </div>
            <div className="grid-3">
              {series.map((item) => {
                const cover = productCoverUrl(item.coverImage);
                return (
                  <Link key={item.id || item.slug} href={`/products/${item.slug}`} className="related-card">
                    <div className="related-card-img">
                      {cover ? (
                        <img src={cover} alt={item.name} />
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
