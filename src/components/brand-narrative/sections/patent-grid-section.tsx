import type { PatentGridSection } from '@/lib/storefront-types';

type PatentGridSectionViewProps = {
  section: PatentGridSection;
};

export function PatentGridSectionView({ section }: PatentGridSectionViewProps) {
  return (
    <section className="section" data-od-id={section.id}>
      <div className="container">
        <div className="section-header">
          <p className="eyebrow">{section.eyebrow}</p>
          <h2>{section.title}</h2>
          <p className="lead">{section.lead}</p>
        </div>
        <div className="grid-3">
          {section.items.map((item) => (
            <div className="patent-card" key={`${item.patentId}-${item.title}`}>
              <div className="pc-id">{item.patentId}</div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <div className="pc-tags">
                {item.tags.map((tag) => (
                  <span className="pc-tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
