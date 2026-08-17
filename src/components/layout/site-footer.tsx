import Link from 'next/link';

import { HongyuLogo } from '@/components/layout/hongyu-logo';
import { SocialLinks } from '@/components/shared/social-links';
import { footerNav } from '@/lib/nav';
import { socialLinks } from '@/lib/social-links';

export function SiteFooter() {
  return (
    <footer className="pagefoot">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="fb-name">
              <HongyuLogo />
            </div>
            <p>引领宠物医疗器械创新，以工程技术守护动物生命健康。</p>
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
          <span>© 2026 竑宇医疗 HONGYU Medical. All rights reserved.</span>
          <span>沪 ICP 备 XXXXXXXX 号</span>
        </div>
      </div>
    </footer>
  );
}
