import type { TimelineSection } from '@/lib/storefront-types';

type TimelineSectionViewProps = {
  section: TimelineSection;
};

export function TimelineSectionView({ section }: TimelineSectionViewProps) {
  return (
    <section className="section" data-od-id={section.id}>
      <div className="container">
        <div className="section-header">
          <p className="eyebrow">{section.eyebrow}</p>
          <h2>{section.title}</h2>
          {section.lead ? <p className="lead">{section.lead}</p> : null}
        </div>
        <div className="timeline">
          {section.items.map((item) => (
            <div className="timeline-item" key={`${item.year}-${item.title}`}>
              <div className="tl-year">{item.year}</div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              {item.tags?.length ? (
                <div className="tl-tags">
                  {item.tags.map((tag) => (
                    <span className="tl-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
              {item.image ? (
                <div className="tl-img">
                  <img src={item.image} alt={item.imageAlt ?? ''} />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
