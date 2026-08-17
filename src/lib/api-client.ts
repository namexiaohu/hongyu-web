const ACCESS_TOKEN_KEY = 'hongyu_front_token';
const CART_TOKEN_KEY = 'hongyu_cart_token';

export const AUTH_TOKEN_CHANGED_EVENT = 'hongyu-auth-token-changed';

function notifyAuthTokenChanged(): void {
  if (typeof window === 'undefined') {
    return;
  }
  window.dispatchEvent(new Event(AUTH_TOKEN_CHANGED_EVENT));
}

export function getApiBaseUrl(): string {
  const url = process.env.API_URL?.trim();
  if (!url) {
    throw new Error('API_URL is not configured');
  }

  return url;
}

function joinUrl(path: string): string {
  const base = getApiBaseUrl().replace(/\/+$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

type FetchOptions = RequestInit & {
  locale?: string;
};

async function parseJsonResponse<T>(response: Response, requestUrl?: string): Promise<T> {
  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    const message =
      payload && typeof payload === 'object' && 'message' in payload ? String(payload.message) : response.statusText;
    const target = requestUrl ? ` ${requestUrl}` : '';
    throw new Error(message ? `${message} (${response.status})${target}` : `Request failed (${response.status})${target}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(token: string): void {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
  notifyAuthTokenChanged();
}

export function clearAccessToken(): void {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  notifyAuthTokenChanged();
}

export function getCartToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  return window.localStorage.getItem(CART_TOKEN_KEY);
}

export function setCartToken(token: string): void {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(CART_TOKEN_KEY, token);
}

/** Stub: pages in this phase do not call the admin API. */
export async function serverFetch<T>(path: string, init?: FetchOptions): Promise<T> {
  const url = joinUrl(path);
  const response = await fetch(url, init);
  return parseJsonResponse<T>(response, url);
}

/** Stub: pages in this phase do not call the admin API. */
export async function apiFetch<T>(path: string, init?: FetchOptions): Promise<T> {
  const url = joinUrl(path);
  const response = await fetch(url, { ...init, cache: init?.cache ?? 'no-store' });
  return parseJsonResponse<T>(response, url);
}
