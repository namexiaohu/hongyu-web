import { NextResponse } from 'next/server';

import { getApiBaseUrl } from '@/lib/api-client';

export async function POST(request: Request) {
  const body = await request.json();
  const url = `${getApiBaseUrl().replace(/\/+$/, '')}/api/front/inquiries`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store',
  });
  const payload = await response.json().catch(() => null);
  return NextResponse.json(payload ?? { message: 'Inquiry submit failed' }, { status: response.status });
}
