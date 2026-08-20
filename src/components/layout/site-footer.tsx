import Link from 'next/link';

import { HongyuLogo } from '@/components/layout/hongyu-logo';
import { FooterSocialLinks } from '@/components/shared/footer-social-links';
import { footerNav } from '@/lib/nav';
import type { StorefrontCompanyBranding } from '@/lib/storefront-company';
import type { StorefrontSocialChannel } from '@/lib/storefront-social-media';

type SiteFooterProps = {
  dark?: boolean;
  branding?: StorefrontCompanyBranding;
  socialChannels?: StorefrontSocialChannel[];
};

export function SiteFooter({ dark = false, branding, socialChannels = [] }: SiteFooterProps) {
  return (
    <footer className={dark ? 'pagefoot pagefoot-dark' : 'pagefoot'}>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="fb-name">
              <HongyuLogo light={dark} />
            </div>
            {branding?.positioning ? <p>{branding.positioning}</p> : null}
            <FooterSocialLinks channels={socialChannels} />
          </div>
          {footerNav.map((column) => (
            <div className="footer-col" key={column.title}>
              <h4>{column.title}</h4>
              <ul>
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          {branding?.copyright ? <span>{branding.copyright}</span> : <span />}
          {branding?.icpNumber ? <span>{branding.icpNumber}</span> : null}
        </div>
      </div>
    </footer>
  );
}
