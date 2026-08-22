import { ProductGallery } from '@/components/product/product-gallery';
import { formatMultilineTitle } from '@/lib/format-multiline-title';
import { buildHeroMediaSlides } from '@/lib/hero-media-slides';
import type { SplitContentSection } from '@/lib/storefront-types';

type SplitContentSectionViewProps = {
  section: SplitContentSection;
};

export function SplitContentSectionView({ section }: SplitContentSectionViewProps) {
  const isRd = section.layout === 'rd-split';
  const splitClass = isRd ? 'rd-split' : 'team-split';
  const textClass = isRd ? 'rd-text' : 'team-text';
  const imageClass = isRd ? 'rd-img' : 'team-img';
  const listClass = isRd ? 'rd-list' : 'team-list';
  const imageRight = section.imagePosition === 'right';

  const slides = buildHeroMediaSlides({
    id: section.id || 'split',
    name: section.imageAlt || section.title,
    videoUrl: section.videoUrl,
    gallery: section.gallery?.length
      ? section.gallery
      : section.image
        ? [{ url: section.image, alt: section.imageAlt }]
        : [],
  });

  return (
    <section className="section" data-od-id={section.id}>
      <div className="container">
        <div className={`content-split ${splitClass}${imageRight ? ' is-image-right' : ''}`}>
          {slides.length ? (
            <div className={`content-split-img ${imageClass}`}>
              <ProductGallery slides={slides} alt={section.imageAlt || section.title} />
            </div>
          ) : null}
          <div className={`content-split-text ${textClass}`}>
            <p className="eyebrow">{section.eyebrow}</p>
            <h2
              style={{ marginTop: 'var(--space-3)', marginBottom: 'var(--space-5)' }}
              dangerouslySetInnerHTML={{ __html: formatMultilineTitle(section.title) }}
            />
            <p>{section.body}</p>
            {section.bullets?.length ? (
              <ul className={`content-split-list ${listClass}`}>
                {section.bullets.map((item) => (
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
