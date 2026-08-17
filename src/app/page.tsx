import type { Metadata } from 'next';

import { HomeStatic } from '@/components/home/home-static';
import { SiteFrame } from '@/components/layout/site-frame';
import { DEFAULT_SEO_DESCRIPTION, DEFAULT_SEO_TITLE } from '@/lib/site-config';

export const metadata: Metadata = {
  title: DEFAULT_SEO_TITLE,
  description: DEFAULT_SEO_DESCRIPTION,
};

export default function HomePage() {
  return (
    <SiteFrame overlay>
      <HomeStatic />
    </SiteFrame>
  );
}
