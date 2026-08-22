import Link from 'next/link';

import { ValueCardIconSvg, isValueCardIcon } from '@/components/brand-narrative/section-icons';
import { ProductGallery } from '@/components/product/product-gallery';
import { buildHeroMediaSlides } from '@/lib/hero-media-slides';
import type { StorefrontSolutionSection } from '@/lib/storefront-solutions-api';

function asString(value: unknown, fallback = '') {
  return typeof value === 'string' ? value : fallback;
}

function productCoverFromCard(card: Record<string, unknown>) {
  const cover = card.cover ?? card.coverImage;
  if (typeof cover === 'string') return cover;
  if (cover && typeof cover === 'object' && 'url' in cover) {
    return asString((cover as { url?: unknown }).url);
  }
  return '';
}

function splitSectionSlides(section: StorefrontSolutionSection) {
  const image = asString(section.image);
  const imageAlt = asString(section.imageAlt);
  const videoUrl = asString(section.videoUrl);
  const galleryRaw = Array.isArray(section.gallery) ? section.gallery : [];
  const gallery = galleryRaw
    .map((item) => {
      if (!item || typeof item !== 'object') return null;
      const row = item as { url?: unknown; alt?: unknown };
      const url = asString(row.url);
      if (!url) return null;
      return { url, alt: asString(row.alt, imageAlt) };
    })
    .filter((item): item is { url: string; alt: string } => Boolean(item));

  return buildHeroMediaSlides({
    id: asString(section.id, 'split'),
    name: imageAlt || asString(section.title),
    videoUrl,
    gallery: gallery.length ? gallery : image ? [{ url: image, alt: imageAlt }] : [],
  });
}

function SplitSection({ section }: { section: StorefrontSolutionSection }) {
  const bullets = Array.isArray(section.bullets) ? section.bullets.filter((item): item is string => typeof item === 'string') : [];
  const imageRight = section.imagePosition === 'right';
  const isClinical = section.type === 'clinical-split';
  const slides = splitSectionSlides(section);
  const media = slides.length ? (
    <div className="clinical-img">
      <ProductGallery slides={slides} alt={asString(section.imageAlt) || asString(section.title)} />
    </div>
  ) : null;

  if (isClinical) {
    return (
      <section className="section" data-od-id={asString(section.id, 'clinical')}>
        <div className="container">
          <div className={`clinical-split${imageRight ? ' is-image-right' : ''}`}>
            {media}
            <div className="clinical-text">
              <p className="eyebrow">{asString(section.eyebrow)}</p>
              <h2 dangerouslySetInnerHTML={{ __html: asString(section.title).replace(/\n/g, '<br/>') }} />
              <p>{asString(section.body)}</p>
              {bullets.length ? (
                <ul className="clinical-list">
                  {bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section" data-od-id={asString(section.id, 'overview')}>
      <div className="container">
        <div className={`clinical-split${imageRight ? ' is-image-right' : ''}`}>
          {media}
          <div className="clinical-text">
            <p className="eyebrow">{asString(section.eyebrow)}</p>
            <h2 dangerouslySetInnerHTML={{ __html: asString(section.title).replace(/\n/g, '<br/>') }} />
            <p>{asString(section.body)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureGridSection({ section }: { section: StorefrontSolutionSection }) {
  const cards = Array.isArray(section.cards) ? section.cards as Array<Record<string, unknown>> : [];
  const grid = asString(section.grid, 'grid-3');

  return (
    <section className="section" data-od-id={asString(section.id, 'features')} style={{ background: 'var(--border-soft)' }}>
      <div className="container">
        <div className="section-header">
          <p className="eyebrow">{asString(section.eyebrow)}</p>
          <h2>{asString(section.title)}</h2>
          {asString(section.lead) ? <p className="lead">{asString(section.lead)}</p> : null}
        </div>
        <div className={grid}>
          {cards.map((card) => {
            const iconRaw = asString(card.icon);
            const icon = isValueCardIcon(iconRaw) ? iconRaw : null;
            const image = asString(card.image);
            return (
              <div className="feature-card" key={asString(card.title)}>
                {image ? (
                  <div className="feature-card-img">
                    <img src={image} alt={asString(card.imageAlt, asString(card.title))} />
                  </div>
                ) : null}
                <div className="feature-card-body">
                  {icon ? (
                    <div className="fc-icon">
                      <ValueCardIconSvg icon={icon} />
                    </div>
                  ) : null}
                  <h3>{asString(card.title)}</h3>
                  <p>{asString(card.body)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SpecTableSection({ section }: { section: StorefrontSolutionSection }) {
  const rows = Array.isArray(section.rows) ? section.rows as Array<{ label?: string; value?: string }> : [];
  if (!rows.length) return null;

  return (
    <section className="section" data-od-id={asString(section.id, 'specs')} style={{ background: 'var(--border-soft)' }}>
      <div className="container">
        <div className="section-header">
          <p className="eyebrow">{asString(section.eyebrow)}</p>
          <h2>{asString(section.title)}</h2>
        </div>
        <table className="spec-table">
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Specification</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${row.label}-${row.value}`}>
                <td>{row.label}</td>
                <td className="spec-val">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ProductModelsSection({ section }: { section: StorefrontSolutionSection }) {
  const products = Array.isArray(section.products)
    ? (section.products as Array<Record<string, unknown>>)
    : Array.isArray(section.items)
      ? (section.items as Array<Record<string, unknown>>)
      : [];
  const cards = products.filter((card) => asString(card.slug));
  if (!cards.length) return null;
  const lead = asString(section.lead) || asString(section.body) || asString(section.description);

  return (
    <section className="section" data-od-id={asString(section.id, 'products')}>
      <div className="container">
        <div className="section-header">
          {asString(section.eyebrow) ? <p className="eyebrow">{asString(section.eyebrow)}</p> : null}
          {asString(section.title) ? <h2>{asString(section.title)}</h2> : null}
          {lead ? <p className="lead">{lead}</p> : null}
        </div>
        <div className="grid-4">
          {cards.map((card) => {
            const slug = asString(card.slug);
            const name = asString(card.name, slug);
            const cover = productCoverFromCard(card);
            const badge = asString(card.badgeText);
            const extra = asString(card.extraText);
            const desc = asString(card.shortDescription);
            return (
              <Link key={slug} href={`/products/${slug}`} className="product-item-card pic-compact">
                <div className="pic-img">
                  {cover ? <img src={cover} alt={name} /> : null}
                  {badge ? <span className="pic-badge">{badge}</span> : null}
                </div>
                <div className="pic-body">
                  <div className="pic-name">{name}</div>
                  {extra ? <div className="pic-spec">{extra}</div> : null}
                  {desc ? <div className="pic-desc">{desc}</div> : null}
                  <div className="pic-link">View details →</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function SolutionRenderer({ sections }: { sections: StorefrontSolutionSection[] }) {
  return (
    <>
      {sections.map((section, index) => {
        const key = asString(section.id, `${section.type}-${index}`);
        if (section.type === 'split-content' || section.type === 'clinical-split') {
          return <SplitSection key={key} section={section} />;
        }
        if (section.type === 'feature-grid') {
          return <FeatureGridSection key={key} section={section} />;
        }
        if (section.type === 'spec-table') {
          return <SpecTableSection key={key} section={section} />;
        }
        if (section.type === 'product-models' || section.type === 'relatedProducts') {
          return <ProductModelsSection key={key} section={section} />;
        }
        return null;
      })}
    </>
  );
}
