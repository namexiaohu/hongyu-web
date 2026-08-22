import { apiFetch } from '@/lib/api-client';
import type { TranslateFn } from '@/lib/i18n-server';

export const CONTACT_INQUIRY_TYPE_KEY = 'contact';
export const PARTNERSHIP_INQUIRY_TYPE_KEY = 'partnership';

export const CONTACT_TOPIC_SUMMIT_QUERY = 'summit';

export const CONTACT_TOPIC_KEYS = [
  'product',
  'technical',
  'training',
  'afterSales',
  'summit',
  'other',
] as const;

export type ContactTopicKey = (typeof CONTACT_TOPIC_KEYS)[number];

export function contactTopicLabel(t: TranslateFn, key: string) {
  if (!key) return '';
  const lookup = `inquiry.topics.${key}` as const;
  const label = t(lookup);
  return label === lookup ? key : label;
}

export function resolveContactTopicFromQuery(t: TranslateFn, raw: string | null | undefined): string {
  const value = raw?.trim() ?? '';
  if (!value) return '';
  if (value === CONTACT_TOPIC_SUMMIT_QUERY) return 'summit';
  return CONTACT_TOPIC_KEYS.includes(value as ContactTopicKey) ? value : '';
}

export function buildContactHref(options?: { topic?: typeof CONTACT_TOPIC_SUMMIT_QUERY | string; summit?: string }) {
  const params = new URLSearchParams();
  if (options?.topic) params.set('topic', options.topic);
  if (options?.summit?.trim()) params.set('summit', options.summit.trim());
  const query = params.toString();
  return query ? `/contact?${query}` : '/contact';
}

export function buildContactInquiryMessage(t: TranslateFn, topicKey: string, body: string) {
  const topic = contactTopicLabel(t, topicKey);
  const messageBody = body.trim() || t('common.notProvided');
  return t('inquiry.messages.contactTemplate', { topic, body: messageBody });
}

export function buildPartnershipInquiryMessage(
  t: TranslateFn,
  coopType: string,
  scale: string,
  detail: string,
) {
  return t('inquiry.messages.partnershipTemplate', {
    coopType: coopType.trim() || t('common.notProvided'),
    scale: scale.trim() || t('common.notProvided'),
    detail: detail.trim() || t('common.notProvided'),
  });
}

export type StorefrontInquiryPayload = {
  inquiryType: string;
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  country?: string;
  jobTitle?: string;
  companyWebsite?: string;
  companySize?: string;
  message: string;
};

export async function submitStorefrontInquiry(payload: StorefrontInquiryPayload) {
  try {
    await apiFetch('/api/front/inquiries', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : '';
    throw new Error(message.replace(/\s*\(\d+\)\s+\S+$/, '') || 'Submission failed');
  }
}

export const PARTNERSHIP_SIZE_KEYS = ['1-10', '11-50', '51-200', '201-1000', '1000+'] as const;
export const PARTNERSHIP_COOP_KEYS = ['distribution', 'academic', 'oem', 'investment', 'other'] as const;
export const PARTNERSHIP_SCALE_KEYS = ['pilot', 'annual', 'longTerm'] as const;
