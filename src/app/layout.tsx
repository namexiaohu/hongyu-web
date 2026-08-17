import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';

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

export const metadata: Metadata = {
  title: DEFAULT_SEO_TITLE,
  description: DEFAULT_SEO_DESCRIPTION,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" className={`${inter.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  );
}
