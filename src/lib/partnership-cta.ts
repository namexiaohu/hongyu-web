import type { CtaBlock } from '@/lib/storefront-types';

export const PARTNERSHIP_HREF = '/partnership';

const SHELL = {
  eyebrow: 'Partnership · 商务合作',
  buttonLabel: '商务合作咨询',
  href: PARTNERSHIP_HREF,
} as const;

export type PartnershipCtaVariant = 'default' | 'home' | 'centers' | 'surgeons' | 'summit' | 'insights';

export function buildPartnershipCta(variant: PartnershipCtaVariant, companyName = ''): CtaBlock {
  switch (variant) {
    case 'home':
      return {
        ...SHELL,
        title: '期待与您携手同行',
        lead: '无论您希望探讨产品合作、市场拓展还是联合推广，欢迎与我们交流。',
      };
    case 'centers':
      return {
        ...SHELL,
        title: '共建区域合作中心',
        lead: '欢迎医院与研究机构洽谈合作中心共建，拓展区域服务与交流能力。',
      };
    case 'surgeons':
      return {
        ...SHELL,
        title: companyName ? `加入${companyName}专业合作网络` : '加入专业合作网络',
        lead: '欢迎临床机构与术者与我们建立合作，共同推进专业交流与产品落地。',
      };
    case 'summit':
      return {
        ...SHELL,
        title: '欢迎洽谈会议合作',
        lead: '如需联合办会、赞助支持或品牌合作，欢迎与我们交流，共同促进行业沟通与交流。',
      };
    case 'insights':
      return {
        ...SHELL,
        title: '欢迎交流合作机会',
        lead: '如需内容转载、联合发布或开展临床与市场合作，欢迎与我们进一步沟通。',
      };
    default:
      return {
        ...SHELL,
        title: '欢迎交流合作机会',
        lead: '如需产品合作、市场拓展或联合推广，欢迎与我们交流。',
      };
  }
}
