import { apiFetch } from '@/lib/api-client';

export type StorefrontComplaintPayload = {
  fullName?: string;
  contact?: string;
  message: string;
};

export async function submitStorefrontComplaint(payload: StorefrontComplaintPayload) {
  try {
    await apiFetch('/api/front/complaints', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : '';
    throw new Error(message.replace(/\s*\(\d+\)\s+\S+$/, '') || 'Submission failed');
  }
}
