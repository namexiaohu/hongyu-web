import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Montserrat } from 'next/font/google';

import { SiteFrame } from '@/components/layout/site-frame';
import { getStorefrontLocaleContext } from '@/lib/i18n-server';
import { DEFAULT_SEO_DESCRIPTION, DEFAULT_SEO_TITLE, SITE_BRAND } from '@/lib/site-config';
import { getStorefrontCompanyProfile } from '@/lib/storefront-company-api';
import { getStorefrontSocialMedia } from '@/lib/storefront-social-media-api';
import { getStorefrontWebsiteConfig } from '@/lib/storefront-website-config-api';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
  weight: ['400', '500'],
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['700', '900'],
});

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getStorefrontLocaleContext();
  const company = await getStorefrontCompanyProfile(locale);
  const name = company.companyName.trim() || SITE_BRAND;

  return {
    title: {
      default: company.companyName.trim() || DEFAULT_SEO_TITLE,
      template: `%s · ${name}`,
    },
    description: company.positioning.trim() || DEFAULT_SEO_DESCRIPTION,
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { locale, languages, htmlLang, direction } = await getStorefrontLocaleContext();
  const [company, socialMedia, websiteConfig] = await Promise.all([
    getStorefrontCompanyProfile(locale),
    getStorefrontSocialMedia(locale),
    getStorefrontWebsiteConfig(locale),
  ]);

  return (
    <html lang={htmlLang} dir={direction} className={`${inter.variable} ${jetbrains.variable} ${montserrat.variable}`}>
      <body>
        <SiteFrame
          languages={languages}
          locale={locale}
          branding={{
            companyName: company.companyName,
            positioning: company.positioning,
            copyright: company.copyright,
            icpNumber: company.icpNumber,
          }}
          socialChannels={socialMedia.socialChannels}
          navColumns={websiteConfig.navColumns}
        >
          {children}
        </SiteFrame>
      </body>
    </html>
  );
}
