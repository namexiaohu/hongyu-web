import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  env: {
    API_URL: process.env.API_URL,
    SITE_URL: process.env.SITE_URL,
  },
};

export default nextConfig;
