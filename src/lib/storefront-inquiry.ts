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
  const response = await fetch('/api/inquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = (await response.json().catch(() => null)) as { message?: string } | null;
  if (!response.ok) {
    throw new Error(data?.message || '提交失败，请稍后重试');
  }
}
