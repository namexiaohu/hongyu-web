import type { CSSProperties } from 'react';
import Link from 'next/link';

import type { StorefrontSolutionListItem } from '@/lib/storefront-solutions-api';

type SolutionCardItemProps = {
  card: StorefrontSolutionListItem;
  linkLabel?: string;
  badgeStyle?: CSSProperties;
};

export function SolutionCardItem({ card, linkLabel = 'View details', badgeStyle }: SolutionCardItemProps) {
  return (
    <Link href={card.href} className="sol-card" data-filter={card.categorySlug}>
      <div className="sol-card-img">
        {card.coverImage ? <img src={card.coverImage} alt={card.largeTitle || card.title} /> : null}
        {card.badgeText ? (
          <span className="sol-badge" style={badgeStyle}>
            {card.badgeText}
          </span>
        ) : null}
      </div>
      <div className="sol-card-body">
        <div className="sc-category">{card.categoryLabel}</div>
        <h2>{card.largeTitle || card.title}</h2>
        <p>{card.description}</p>
        {card.tags.length ? (
          <div className="sc-features">
            {card.tags.map((feature) => (
              <span className="sc-feature" key={feature}>
                {feature}
              </span>
            ))}
          </div>
        ) : null}
        <span className="sc-link">
          {linkLabel}
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
