import type { SplitContentSection } from '@/lib/storefront-types';

import { sectionStyle } from '@/components/brand-narrative/section-icons';

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

  return (
    <section className="section" data-od-id={section.id} style={sectionStyle(section.background)}>
      <div className="container">
        <div className={`content-split ${splitClass}${imageRight ? ' is-image-right' : ''}`}>
          {section.image ? (
            <div className={`content-split-img ${imageClass}`}>
              <img src={section.image} alt={section.imageAlt} />
            </div>
          ) : null}
          <div className={`content-split-text ${textClass}`}>
            <p className="eyebrow">{section.eyebrow}</p>
            <h2
              style={{ marginTop: 'var(--space-3)', marginBottom: 'var(--space-5)' }}
              dangerouslySetInnerHTML={{ __html: section.title.replace(/\n/g, '<br/>') }}
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
