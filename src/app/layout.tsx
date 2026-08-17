import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Montserrat } from 'next/font/google';

import { SiteFrame } from '@/components/layout/site-frame';
import { DEFAULT_SEO_DESCRIPTION, DEFAULT_SEO_TITLE } from '@/lib/site-config';

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

export const metadata: Metadata = {
  title: DEFAULT_SEO_TITLE,
  description: DEFAULT_SEO_DESCRIPTION,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" className={`${inter.variable} ${jetbrains.variable} ${montserrat.variable}`}>
      <body>
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
