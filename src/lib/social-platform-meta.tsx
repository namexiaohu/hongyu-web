import type { ReactNode } from 'react';

import { SocialPlatformIcon } from '@/components/shared/social-platform-icon';

export type SocialPlatformType =
  | 'facebook'
  | 'instagram'
  | 'x'
  | 'linkedin'
  | 'whatsapp'
  | 'youtube'
  | 'wechat';

export type SocialPlatformMeta = {
  icon: ReactNode;
  iconBg: string;
  iconBorder?: boolean;
};

export const socialPlatformMeta: Record<SocialPlatformType, SocialPlatformMeta> = {
  linkedin: {
    iconBg: '#0A66C2',
    icon: <SocialPlatformIcon type="linkedin" size={28} />,
  },
  youtube: {
    iconBg: '#FF0000',
    icon: <SocialPlatformIcon type="youtube" size={28} />,
  },
  facebook: {
    iconBg: '#1877F2',
    icon: <SocialPlatformIcon type="facebook" size={28} />,
  },
  instagram: {
    iconBg: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
    icon: <SocialPlatformIcon type="instagram" size={28} />,
  },
  x: {
    iconBg: '#0f172a',
    iconBorder: true,
    icon: <SocialPlatformIcon type="x" size={28} />,
  },
  wechat: {
    iconBg: '#07C160',
    icon: <SocialPlatformIcon type="wechat" size={28} />,
  },
  whatsapp: {
    iconBg: '#25D366',
    icon: <SocialPlatformIcon type="whatsapp" size={28} />,
  },
};

export const socialPlatformDisplayNames: Record<SocialPlatformType, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  x: 'X (Twitter)',
  linkedin: 'LinkedIn',
  whatsapp: 'WhatsApp',
  youtube: 'YouTube',
  wechat: 'WeChat',
};
