import Link from 'next/link';

import type { CtaBlock } from '@/lib/content/types';

type CtaStripProps = CtaBlock & {
  odId?: string;
  id?: string;
};

export function CtaStrip({
  eyebrow,
  title,
  lead,
  href,
  buttonLabel,
  odId = 'cta',
  id,
}: CtaStripProps) {
  return (
    <section className="section" id={id} data-od-id={odId}>
      <div className="container">
        <div className="cta-strip">
          <p
            className="eyebrow"
            style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 'var(--space-4)' }}
          >
            {eyebrow}
          </p>
          <h2>{title}</h2>
          <p className="lead">{lead}</p>
          <Link href={href} className="btn-cta-white">
            {buttonLabel}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
