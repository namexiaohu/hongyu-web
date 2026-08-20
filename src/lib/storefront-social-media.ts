export type SocialPlatformType =
  | 'facebook'
  | 'instagram'
  | 'x'
  | 'linkedin'
  | 'whatsapp'
  | 'youtube'
  | 'wechat';

export type StorefrontSocialChannel = {
  type: SocialPlatformType;
  url: string;
  qrCode: string;
  name: string;
};

export type StorefrontOverseasContact = {
  region: string;
  regionLabel: string;
  location: string;
  phone: string;
  contactPerson: string;
  email: string;
  address: string;
};

export type StorefrontFeaturedPost = {
  coverImage: string;
  badgeText: string;
  title: string;
  description: string;
  url: string;
};

export type StorefrontSocialMediaProfile = {
  locale: string;
  socialChannels: StorefrontSocialChannel[];
  overseasContacts: StorefrontOverseasContact[];
  featuredPosts: StorefrontFeaturedPost[];
};

export const EMPTY_SOCIAL_MEDIA_PROFILE: StorefrontSocialMediaProfile = {
  locale: '',
  socialChannels: [],
  overseasContacts: [],
  featuredPosts: [],
};
