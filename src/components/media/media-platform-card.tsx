import { SocialQrTooltip } from '@/components/shared/social-qr-tooltip';
import { socialPlatformDisplayNames, socialPlatformMeta } from '@/lib/social-platform-meta';
import type { StorefrontSocialChannel } from '@/lib/storefront-social-media';

type MediaPlatformCardProps = {
  channel: StorefrontSocialChannel;
  qrHint: string;
};

function displayHandle(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, '');
}

function secondaryText(channel: StorefrontSocialChannel, qrHint: string, hasLink: boolean) {
  const accountName = channel.name.trim();
  if (accountName) return accountName;
  if (channel.qrCode) return qrHint;
  if (hasLink) return displayHandle(channel.url);
  return '';
}

export function MediaPlatformCard({ channel, qrHint }: MediaPlatformCardProps) {
  const meta = socialPlatformMeta[channel.type];
  const platformName = socialPlatformDisplayNames[channel.type];
  const accountName = channel.name.trim();
  const hasLink = Boolean(channel.url && channel.url !== '#');
  const subtitle = secondaryText(channel, qrHint, hasLink);
  const CardTag = hasLink ? 'a' : 'div';
  const cardProps = hasLink
    ? { href: channel.url, target: '_blank' as const, rel: 'noopener noreferrer' as const }
    : {};

  const iconNode = (
    <div
      className="pmd-pc-icon"
      style={{
        background: meta.iconBg,
        border: meta.iconBorder ? '1px solid var(--border)' : undefined,
      }}
    >
      {meta.icon}
    </div>
  );

  return (
    <CardTag
      className={`pmd-platform-card pmd-pc-${channel.type}${channel.qrCode ? ' pmd-platform-card--has-qr' : ''}`}
      {...cardProps}
    >
      {channel.qrCode ? (
        <SocialQrTooltip qrCode={channel.qrCode} label={accountName || platformName} className="pmd-pc-icon-wrap">
          {iconNode}
        </SocialQrTooltip>
      ) : (
        iconNode
      )}
      <div className="pmd-pc-info">
        <div className="pmd-pc-name">{platformName}</div>
        {subtitle ? (
          <div className={`pmd-pc-handle${channel.qrCode && !accountName ? ' pmd-pc-qr-hint' : ''}`}>
            {subtitle}
          </div>
        ) : null}
      </div>
      {hasLink ? <span className="pmd-pc-arrow">→</span> : null}
    </CardTag>
  );
}
