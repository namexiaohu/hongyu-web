import { SocialPlatformIcon } from '@/components/shared/social-platform-icon';
import { SocialQrTooltip } from '@/components/shared/social-qr-tooltip';
import { socialPlatformDisplayNames, socialPlatformMeta } from '@/lib/social-platform-meta';
import type { StorefrontSocialChannel } from '@/lib/storefront-social-media';

type FooterSocialLinksProps = {
  channels: StorefrontSocialChannel[];
  className?: string;
};

function channelLabel(channel: StorefrontSocialChannel) {
  return channel.name.trim() || socialPlatformDisplayNames[channel.type];
}

function platformName(channel: StorefrontSocialChannel) {
  return socialPlatformDisplayNames[channel.type];
}

export function FooterSocialLinks({ channels, className }: FooterSocialLinksProps) {
  const visible = channels.filter((channel) => channel.url || channel.qrCode);
  if (visible.length === 0) return null;

  return (
    <div className={`footer-social-links ${className ?? ''}`.trim()} role="list">
      {visible.map((channel) => {
        const meta = socialPlatformMeta[channel.type];
        const label = channelLabel(channel);
        const platform = platformName(channel);
        const hasLink = Boolean(channel.url && channel.url !== '#');
        const icon = (
          <span
            className={`footer-social-link footer-social-link-${channel.type}`}
            style={{
              background: meta.iconBg,
              border: meta.iconBorder ? '1px solid var(--border)' : undefined,
            }}
            aria-hidden="true"
          >
            <SocialPlatformIcon type={channel.type} size={18} />
          </span>
        );

        if (channel.qrCode) {
          return (
            <SocialQrTooltip
              key={`${channel.type}-${label}`}
              qrCode={channel.qrCode}
              label={platform}
              size="compact"
            >
              {hasLink ? (
                <a
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={platform}
                  title={platform}
                  role="listitem"
                  className="footer-social-item"
                >
                  {icon}
                </a>
              ) : (
                <span
                  aria-label={platform}
                  title={platform}
                  role="listitem"
                  tabIndex={0}
                  className="footer-social-item footer-social-item--qr"
                >
                  {icon}
                </span>
              )}
            </SocialQrTooltip>
          );
        }

        if (!hasLink) return null;

        return (
          <a
            key={`${channel.type}-${label}`}
            href={channel.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={platform}
            title={platform}
            role="listitem"
            className="footer-social-item"
          >
            {icon}
          </a>
        );
      })}
    </div>
  );
}
