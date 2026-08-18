import type { HeaderGridSection } from '@/lib/storefront-types';

import { sectionStyle, ValueCardIconSvg } from '@/components/brand-narrative/section-icons';

type HeaderGridSectionViewProps = {
  section: HeaderGridSection;
};

export function HeaderGridSectionView({ section }: HeaderGridSectionViewProps) {
  return (
    <section className="section" data-od-id={section.id} style={sectionStyle(section.background)}>
      <div className="container">
        <div className="section-header">
          <p className="eyebrow">{section.eyebrow}</p>
          <h2>{section.title}</h2>
          {section.lead ? <p className="lead">{section.lead}</p> : null}
        </div>
        <div className={section.grid}>
          {section.cards.map((card) => {
            if (card.cardStyle === 'value') {
              return (
                <div className="value-card" key={`${card.title}-${card.icon}`}>
                  <div className="vc-icon">
                    <ValueCardIconSvg icon={card.icon} />
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </div>
              );
            }
            if (card.cardStyle === 'cert') {
              return (
                <div className="cert-card" key={`${card.title}-${card.icon}`}>
                  <div className="cc-icon">
                    <ValueCardIconSvg icon={card.icon} />
                  </div>
                  <div>
                    <h3>{card.title}</h3>
                    <p>{card.body}</p>
                  </div>
                </div>
              );
            }
            if (card.cardStyle === 'outlook') {
              return (
                <div className="outlook-card" key={card.title}>
                  <div className="oc-year">{card.year}</div>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </div>
              );
            }
            return (
              <div className="innovation-card" key={card.title}>
                {card.image ? (
                  <div className="innovation-card-img">
                    <img src={card.image} alt={card.imageAlt ?? ''} />
                  </div>
                ) : null}
                <div className="innovation-card-body">
                  <div className="ic-year">{card.year}</div>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
