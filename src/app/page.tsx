import type { Metadata } from 'next';

import { HomeStatic } from '@/components/home/home-static';
import { DEFAULT_SEO_DESCRIPTION } from '@/lib/site-config';

export const metadata: Metadata = {
  description: DEFAULT_SEO_DESCRIPTION,
};

export default function HomePage() {
  return <HomeStatic />;
}
