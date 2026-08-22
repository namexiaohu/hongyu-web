import { getPageTranslations, getStorefrontLocaleContext } from '@/lib/i18n-server';
import type { TranslateFn } from '@/lib/i18n-server';
import type { SponsorItem } from '@/lib/storefront-summits-api';

type SummitSponsorsSectionProps = {
  sponsors: SponsorItem[];
};

const tierIcons = {
  diamond: '💎',
  gold: '🥇',
  silver: '🥈',
} as const;

const tierGridClasses = {
  diamond: 'sponsor-grid-diamond',
  gold: 'sponsor-grid-gold',
  silver: 'sponsor-grid-silver',
} as const;

const tierBadgeClasses = {
  diamond: 'sp-tier-diamond',
  gold: 'sp-tier-gold',
  silver: 'sp-tier-silver',
} as const;

const tierOrder: Array<keyof typeof tierIcons> = ['diamond', 'gold', 'silver'];

export async function SummitSponsorsSection({ sponsors }: SummitSponsorsSectionProps) {
  if (!sponsors.length) return null;

  const { locale } = await getStorefrontLocaleContext();
  const { t } = await getPageTranslations(locale, ['detail']);

  const grouped = tierOrder
    .map((tier) => ({
      tier,
      items: sponsors.filter((item) => item.tier === tier),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <section className="detail-section container" id="sponsors" data-od-id="sponsors">
      <p className="eyebrow" style={{ marginBottom: 'var(--space-3)' }}>{t('detail.summit.sponsorsEyebrow')}</p>
      <h2>{t('detail.summit.sponsorsTitle')}</h2>
      {grouped.map(({ tier, items }) => (
        <SponsorTierGroup key={tier} tier={tier} items={items} t={t} />
      ))}
    </section>
  );
}

function SponsorTierGroup({
  tier,
  items,
  t,
}: {
  tier: keyof typeof tierIcons;
  items: SponsorItem[];
  t: TranslateFn;
}) {
  return (
    <div className="sponsor-tier">
      <div className="sponsor-tier-label">
        <span className="st-icon">{tierIcons[tier]}</span>
        <span className="st-name">{t(`detail.summit.sponsorTiers.${tier}`)}</span>
        <span className="st-count">{t('detail.summit.sponsorCount', { count: items.length })}</span>
      </div>
      <div className={`sponsor-grid ${tierGridClasses[tier]}`}>
        {items.map((sponsor) => (
          <div key={sponsor.id} className="sponsor-card">
            <div className="sp-logo">
              {sponsor.logo
                ? <img src={sponsor.logo} alt={sponsor.name} />
                : <span className="sp-logo-placeholder">{sponsor.name.slice(0, 1)}</span>}
            </div>
            <div className="sp-body">
              <span className={`sp-tier ${tierBadgeClasses[tier]}`}>
                {sponsor.badgeText || t(`detail.summit.sponsorTierBadges.${tier}`)}
              </span>
              <div className="sp-name">{sponsor.name}</div>
              {sponsor.intro ? <div className="sp-desc">{sponsor.intro}</div> : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
