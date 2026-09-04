import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Montserrat } from 'next/font/google';

import { SiteFrame } from '@/components/layout/site-frame';
import { I18nProvider } from '@/lib/i18n-context';
import { getStorefrontLocaleContext } from '@/lib/i18n-server';
import { DEFAULT_SEO_DESCRIPTION, DEFAULT_SEO_TITLE, SITE_BRAND } from '@/lib/site-config';
import { getStorefrontCompanyProfile } from '@/lib/storefront-company-api';
import { getStorefrontSocialMedia } from '@/lib/storefront-social-media-api';
import { getStorefrontWebsiteConfig } from '@/lib/storefront-website-config-api';
import { fetchUiStringGroups } from '@/lib/ui-strings-client';
import { UI_STRING_PREFETCH_GROUPS } from '@/ui-strings/registry';

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
  weight: ['600', '700', '800', '900'],
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
  const [company, socialMedia, websiteConfig, uiStrings] = await Promise.all([
    getStorefrontCompanyProfile(locale),
    getStorefrontSocialMedia(locale),
    getStorefrontWebsiteConfig(locale),
    fetchUiStringGroups(locale, [...UI_STRING_PREFETCH_GROUPS]).catch((error) => {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[layout] failed to load ui strings for', locale, error);
      }
      return {} as Record<string, string>;
    }),
  ]);

  return (
    <html lang={htmlLang} dir={direction} className={`${inter.variable} ${jetbrains.variable} ${montserrat.variable}`}>
      <body>
        <I18nProvider locale={locale} initialUiStrings={uiStrings}>
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
            headerNavColumns={websiteConfig.headerNavColumns}
            footerNavColumns={websiteConfig.footerNavColumns}
            privacyPreference={websiteConfig.privacyPreference ?? null}
          >
            {children}
          </SiteFrame>
        </I18nProvider>
      </body>
    </html>
  );
}
