import { apiFetch } from '@/lib/api-client';

export const CONTACT_INQUIRY_TYPE = '联系我们';
export const PARTNERSHIP_INQUIRY_TYPE = '商务合作';

function filled(value: string) {
  return value.trim() || '未填写';
}

export function buildContactInquiryMessage(topic: string, body: string) {
  return `咨询类型：${filled(topic)}\n留言内容：\n${body.trim() || '未填写'}`;
}

export function buildPartnershipInquiryMessage(coopType: string, scale: string, detail: string) {
  return `合作类型：${filled(coopType)}\n预计合作规模：${filled(scale)}\n合作需求描述：\n${detail.trim() || '未填写'}`;
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
    const message = error instanceof Error ? error.message : '提交失败，请稍后重试';
    // apiFetch 会附带 "(status) url"，表单侧只展示可读文案
    throw new Error(message.replace(/\s*\(\d+\)\s+\S+$/, '') || '提交失败，请稍后重试');
  }
}
