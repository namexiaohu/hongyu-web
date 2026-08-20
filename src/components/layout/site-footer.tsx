import Link from 'next/link';

import { HongyuLogo } from '@/components/layout/hongyu-logo';
import { SocialLinks } from '@/components/shared/social-links';
import { footerNav } from '@/lib/nav';
import { socialLinks } from '@/lib/social-links';
import type { StorefrontCompanyBranding } from '@/lib/storefront-company';

type SiteFooterProps = {
  dark?: boolean;
  branding?: StorefrontCompanyBranding;
};

export function SiteFooter({ dark = false, branding }: SiteFooterProps) {
  return (
    <footer className={dark ? 'pagefoot pagefoot-dark' : 'pagefoot'}>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="fb-name">
              <HongyuLogo light={dark} />
            </div>
            {branding?.positioning ? <p>{branding.positioning}</p> : null}
            <SocialLinks links={socialLinks} variant="footer" />
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
