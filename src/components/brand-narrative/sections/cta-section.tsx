import Link from 'next/link';

import type { CtaSection } from '@/lib/storefront-types';

import { CtaArrowIcon } from '@/components/brand-narrative/section-icons';

type CtaSectionViewProps = {
  section: CtaSection;
};

export function CtaSectionView({ section }: CtaSectionViewProps) {
  const isMail = section.href.startsWith('mailto:');
  const button = (
    <>
      {section.buttonLabel}
      <CtaArrowIcon />
    </>
  );

  const inner = (
    <div className="cta-strip">
      <p className="eyebrow" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 'var(--space-4)' }}>
        {section.eyebrow}
      </p>
      <h2>{section.title}</h2>
      <p className={section.containerWrap ? undefined : 'lead'}>{section.lead}</p>
      {isMail ? (
        <a href={section.href} className="btn-cta-white">
          {button}
        </a>
      ) : (
        <Link href={section.href} className="btn-cta-white">
          {button}
        </Link>
      )}
    </div>
  );

  if (section.containerWrap) {
    return (
      <section className="container" data-od-id={section.id}>
        {inner}
      </section>
    );
  }

  return (
    <section className="section" id={section.anchorId} data-od-id={section.id}>
      <div className="container">{inner}</div>
    </section>
  );
}
