import type { SponsorItem } from '@/lib/storefront-summits-api';

type SummitSponsorsSectionProps = {
  sponsors: SponsorItem[];
};

const tierConfig = {
  diamond: {
    label: '钻石级赞助商',
    icon: '💎',
    gridClass: 'sponsor-grid-diamond',
    badgeClass: 'sp-tier-diamond',
    defaultBadge: 'Diamond Sponsor',
  },
  gold: {
    label: '金牌赞助商',
    icon: '🥇',
    gridClass: 'sponsor-grid-gold',
    badgeClass: 'sp-tier-gold',
    defaultBadge: 'Gold Sponsor',
  },
  silver: {
    label: '银牌赞助商',
    icon: '🥈',
    gridClass: 'sponsor-grid-silver',
    badgeClass: 'sp-tier-silver',
    defaultBadge: 'Silver Sponsor',
  },
} as const;

const tierOrder: Array<keyof typeof tierConfig> = ['diamond', 'gold', 'silver'];

export function SummitSponsorsSection({ sponsors }: SummitSponsorsSectionProps) {
  if (!sponsors.length) return null;

  const grouped = tierOrder
    .map((tier) => ({
      tier,
      items: sponsors.filter((item) => item.tier === tier),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <section className="detail-section container" id="sponsors" data-od-id="sponsors">
      <p className="eyebrow" style={{ marginBottom: 'var(--space-3)' }}>SPONSORS · 赞助支持</p>
      <h2>大会赞助商</h2>
      {grouped.map(({ tier, items }) => {
        const config = tierConfig[tier];
        return (
          <div key={tier} className="sponsor-tier">
            <div className="sponsor-tier-label">
              <span className="st-icon">{config.icon}</span>
              <span className="st-name">{config.label}</span>
              <span className="st-count">{items.length} 家</span>
            </div>
            <div className={`sponsor-grid ${config.gridClass}`}>
              {items.map((sponsor) => (
                <div key={sponsor.id} className="sponsor-card">
                  <div className="sp-logo">
                    {sponsor.logo
                      ? <img src={sponsor.logo} alt={sponsor.name} />
                      : <span className="sp-logo-placeholder">{sponsor.name.slice(0, 1)}</span>}
                  </div>
                  <div className="sp-body">
                    <span className={`sp-tier ${config.badgeClass}`}>
                      {sponsor.badgeText || config.defaultBadge}
                    </span>
                    <div className="sp-name">{sponsor.name}</div>
                    {sponsor.intro ? <div className="sp-desc">{sponsor.intro}</div> : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
