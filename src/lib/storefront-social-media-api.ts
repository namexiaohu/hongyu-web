import { serverFetch } from '@/lib/api-client';
import { EMPTY_SOCIAL_MEDIA_PROFILE, type StorefrontSocialMediaProfile } from '@/lib/storefront-social-media';

export async function getStorefrontSocialMedia(locale?: string): Promise<StorefrontSocialMediaProfile> {
  try {
    return await serverFetch<StorefrontSocialMediaProfile>('/api/front/social-media', { locale });
  } catch {
    return { ...EMPTY_SOCIAL_MEDIA_PROFILE, locale: locale ?? '' };
  }
}
