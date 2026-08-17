export type SocialPlatform =
  | 'facebook'
  | 'linkedin'
  | 'youtube'
  | 'instagram'
  | 'whatsapp';

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  href: string;
  description?: string;
};

/** 海外社媒 — 页脚与 /media 页共用 */
export const socialLinks: SocialLink[] = [
  {
    platform: 'facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/hongyumedical',
    description: 'Follow us for product updates and industry news.',
  },
  {
    platform: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/hongyu-medical',
    description: 'Connect with our team and explore career opportunities.',
  },
  {
    platform: 'youtube',
    label: 'YouTube',
    href: 'https://www.youtube.com/@hongyumedical',
    description: 'Surgical technique videos and product demonstrations.',
  },
  {
    platform: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/hongyumedical',
    description: 'Behind-the-scenes from conferences and training events.',
  },
  {
    platform: 'whatsapp',
    label: 'WhatsApp',
    href: 'https://wa.me/862100000000',
    description: 'Direct messaging for international business inquiries.',
  },
];
