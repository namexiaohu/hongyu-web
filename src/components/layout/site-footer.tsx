import Link from 'next/link';
import type { CSSProperties } from 'react';

import { HongyuLogo } from '@/components/layout/hongyu-logo';
import { FooterSocialLinks } from '@/components/shared/footer-social-links';
import type { StorefrontCompanyBranding } from '@/lib/storefront-company';
import type { StorefrontSocialChannel } from '@/lib/storefront-social-media';
import type { StorefrontNavColumn } from '@/lib/storefront-website-config-api';

type SiteFooterProps = {
  dark?: boolean;
  branding?: StorefrontCompanyBranding;
  socialChannels?: StorefrontSocialChannel[];
  navColumns: StorefrontNavColumn[];
};

export function SiteFooter({ dark = false, branding, socialChannels = [], navColumns }: SiteFooterProps) {
  const columnCount = Math.max(navColumns.length, 1);
  const gridStyle = {
    '--footer-nav-count': String(columnCount),
  } as CSSProperties;

  return (
    <footer className={dark ? 'pagefoot pagefoot-dark' : 'pagefoot'}>
      <div className="container">
        <div className="footer-grid" style={gridStyle}>
          <div className="footer-brand">
            <div className="fb-name">
              <HongyuLogo light={dark} />
            </div>
            {branding?.positioning ? <p>{branding.positioning}</p> : null}
            <FooterSocialLinks channels={socialChannels} />
          </div>
          {navColumns.map((column) => (
            <div className="footer-col" key={column.id}>
              <h4>{column.name}</h4>
              <ul>
                {column.items.map((item) => (
                  <li key={item.id}>
                    <Link href={item.href}>{item.name}</Link>
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
