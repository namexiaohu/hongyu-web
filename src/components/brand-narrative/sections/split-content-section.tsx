import { SplitOverlaySection } from '@/components/shared/split-overlay-section';
import type { OverlayMediaSlide } from '@/components/shared/overlay-media-carousel';
import { formatMultilineTitle } from '@/lib/format-multiline-title';
import { buildHeroMediaSlides } from '@/lib/hero-media-slides';
import type { SplitContentSection } from '@/lib/storefront-types';

type SplitContentSectionViewProps = {
  section: SplitContentSection;
};

function buildOverlaySlides(section: SplitContentSection): OverlayMediaSlide[] {
  return buildHeroMediaSlides({
    id: section.id || 'split',
    name: section.imageAlt || section.title,
    videoUrl: section.videoUrl,
    gallery: section.gallery?.length
      ? section.gallery
      : section.image
        ? [{ url: section.image, alt: section.imageAlt }]
        : [],
  }).map((slide) => ({
    id: slide.id,
    url: slide.url,
    mediaType: slide.kind,
  }));
}

export function SplitContentSectionView({ section }: SplitContentSectionViewProps) {
  const isRd = section.layout === 'rd-split';
  const listClassName = isRd ? 'split-overlay-list rd-list' : 'split-overlay-list team-list';
  const slides = buildOverlaySlides(section);

  return (
    <SplitOverlaySection
      id={section.id}
      heroCopyStyle={section.heroCopyStyle}
      carouselFitMode={section.carouselFitMode}
      imagePosition={section.imagePosition}
      slides={slides}
      eyebrow={section.eyebrow}
      title={(
        <h2
          style={{ marginTop: 'var(--space-3)', marginBottom: 'var(--space-5)' }}
          dangerouslySetInnerHTML={{ __html: formatMultilineTitle(section.title) }}
        />
      )}
      body={<p>{section.body}</p>}
      bullets={section.bullets}
      listClassName={listClassName}
    />
  );
}
