import Link from 'next/link';

import type { SolutionCard } from '@/lib/content/solutions-data';

export function SolutionCardItem({ card }: { card: SolutionCard }) {
  return (
    <Link href={card.href} className="sol-card" data-filter={card.filter}>
      <div className="sol-card-img">
        <img src={card.image} alt={card.imageAlt} />
        <span className="sol-badge" style={card.badgeStyle}>
          {card.badge}
        </span>
      </div>
      <div className="sol-card-body">
        <div className="sc-category">{card.category}</div>
        <h2>{card.title}</h2>
        <p>{card.description}</p>
        <div className="sc-features">
          {card.features.map((feature) => (
            <span className="sc-feature" key={feature}>
              {feature}
            </span>
          ))}
        </div>
        <span className="sc-link">
          {card.linkLabel}
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
