import type { SocialLink, SocialPlatform } from '@/lib/social-links';

const platformLabels: Record<SocialPlatform, string> = {
  facebook: 'f',
  linkedin: 'in',
  youtube: '▶',
  instagram: '◎',
  whatsapp: '☎',
};

type SocialLinksProps = {
  links: SocialLink[];
  variant?: 'footer' | 'page';
  className?: string;
};

export function SocialLinks({ links, variant = 'footer', className }: SocialLinksProps) {
  if (variant === 'page') {
    return (
      <div className={`social-channel-list ${className ?? ''}`.trim()}>
        {links.map((link) => (
          <a
            key={link.platform}
            className={`social-channel-item social-channel-${link.platform}`}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="social-channel-icon" aria-hidden="true">
              {platformLabels[link.platform]}
            </span>
            <span className="social-channel-body">
              <span className="social-channel-name">{link.label}</span>
              {link.description ? (
                <span className="social-channel-desc">{link.description}</span>
              ) : null}
            </span>
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className={`social-links ${className ?? ''}`.trim()} role="list">
      {links.map((link) => (
        <a
          key={link.platform}
          className={`social-link social-link-${link.platform}`}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          title={link.label}
          role="listitem"
        >
          <span aria-hidden="true">{platformLabels[link.platform]}</span>
        </a>
      ))}
    </div>
  );
}
