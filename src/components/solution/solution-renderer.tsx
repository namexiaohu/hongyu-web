import { ValueCardIconSvg } from '@/components/brand-narrative/section-icons';
import type { StorefrontSolutionSection } from '@/lib/storefront-solutions-api';
import type { ValueCardIcon } from '@/lib/storefront-types';

function asString(value: unknown, fallback = '') {
  return typeof value === 'string' ? value : fallback;
}

function SplitSection({ section }: { section: StorefrontSolutionSection }) {
  const image = asString(section.image);
  const bullets = Array.isArray(section.bullets) ? section.bullets.filter((item): item is string => typeof item === 'string') : [];
  const imageRight = section.imagePosition === 'right';
  const isClinical = section.type === 'clinical-split';

  if (isClinical) {
    return (
      <section className="section" data-od-id={asString(section.id, 'clinical')}>
        <div className="container">
          <div className={`clinical-split${imageRight ? ' is-image-right' : ''}`}>
            {image ? (
              <div className="clinical-img">
                <img src={image} alt={asString(section.imageAlt)} />
              </div>
            ) : null}
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
          {image ? (
            <div className="clinical-img">
              <img src={image} alt={asString(section.imageAlt)} />
            </div>
          ) : null}
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
            const icon = asString(card.icon, 'layers') as ValueCardIcon;
            const image = asString(card.image);
            return (
              <div className="feature-card" key={asString(card.title)}>
                {image ? (
                  <div className="feature-card-img">
                    <img src={image} alt={asString(card.imageAlt, asString(card.title))} />
                  </div>
                ) : null}
                <div className="feature-card-body">
                  <div className="fc-icon">
                    <ValueCardIconSvg icon={icon} />
                  </div>
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
        return null;
      })}
    </>
  );
}
