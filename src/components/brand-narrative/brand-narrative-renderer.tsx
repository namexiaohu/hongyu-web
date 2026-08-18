import type { BrandSection } from '@/lib/storefront-types';

import { CourseSectionView } from '@/components/brand-narrative/sections/course-section';
import { CtaSectionView } from '@/components/brand-narrative/sections/cta-section';
import { HeaderGridSectionView } from '@/components/brand-narrative/sections/header-grid-section';
import { PatentGridSectionView } from '@/components/brand-narrative/sections/patent-grid-section';
import { SplitContentSectionView } from '@/components/brand-narrative/sections/split-content-section';
import { TimelineSectionView } from '@/components/brand-narrative/sections/timeline-section';

type BrandNarrativeRendererProps = {
  sections: BrandSection[];
};

function renderSection(section: BrandSection, index: number) {
  const key = section.id ?? `${section.type}-${index}`;

  switch (section.type) {
    case 'split-content':
      return <SplitContentSectionView key={key} section={section} />;
    case 'header-grid':
      return <HeaderGridSectionView key={key} section={section} />;
    case 'patent-grid':
      return <PatentGridSectionView key={key} section={section} />;
    case 'timeline':
      return <TimelineSectionView key={key} section={section} />;
    case 'course':
      return <CourseSectionView key={key} section={section} />;
    case 'cta':
      return <CtaSectionView key={key} section={section} />;
    default:
      return null;
  }
}

export function BrandNarrativeRenderer({ sections }: BrandNarrativeRendererProps) {
  return <>{sections.map(renderSection)}</>;
}
