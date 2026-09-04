export const COOKIE_CONSENT_STORAGE_KEY = 'hongyu-cookie-consent';

export type CookieConsentPreference = {
  necessary: true;
  statistics: boolean;
  updatedAt: string;
};

export function readCookieConsent(): CookieConsentPreference | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CookieConsentPreference>;
    if (typeof parsed.statistics !== 'boolean') return null;
    return {
      necessary: true,
      statistics: parsed.statistics,
      updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function writeCookieConsent(statistics: boolean): CookieConsentPreference {
  const next: CookieConsentPreference = {
    necessary: true,
    statistics,
    updatedAt: new Date().toISOString(),
  };
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(next));
  }
  return next;
}
