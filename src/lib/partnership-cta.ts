import type { CtaBlock } from '@/lib/storefront-types';
import type { TranslateFn } from '@/lib/i18n-server';

export const PARTNERSHIP_HREF = '/partnership';

export type PartnershipCtaVariant = 'default' | 'home' | 'centers' | 'surgeons' | 'summit' | 'insights';

export function buildPartnershipCta(
  t: TranslateFn,
  variant: PartnershipCtaVariant,
  params?: { companyName?: string },
): CtaBlock {
  const shell = {
    eyebrow: t('cta.partnership.eyebrow'),
    buttonLabel: t('cta.partnership.button'),
    href: PARTNERSHIP_HREF,
  };
  const companyName = params?.companyName?.trim() ?? '';

  switch (variant) {
    case 'home':
      return {
        ...shell,
        title: t('cta.home.title'),
        lead: t('cta.home.lead'),
      };
    case 'centers':
      return {
        ...shell,
        title: t('cta.centers.title'),
        lead: t('cta.centers.lead'),
      };
    case 'surgeons':
      return {
        ...shell,
        title: companyName
          ? t('cta.surgeons.title', { companyName })
          : t('cta.surgeons.titleFallback'),
        lead: t('cta.surgeons.lead'),
      };
    case 'summit':
      return {
        ...shell,
        title: t('cta.summit.title'),
        lead: t('cta.summit.lead'),
      };
    case 'insights':
      return {
        ...shell,
        title: t('cta.insights.title'),
        lead: t('cta.insights.lead'),
      };
    default:
      return {
        ...shell,
        title: t('cta.default.title'),
        lead: t('cta.default.lead'),
      };
  }
}
