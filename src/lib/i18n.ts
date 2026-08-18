export const SUPPORTED_LOCALES = ['zh', 'en', 'es'] as const;
export const SUPPORTED_CURRENCIES = ['USD', 'EUR', 'GBP'] as const;
export const SUPPORTED_UNIT_SYSTEMS = ['imperial', 'metric'] as const;

export type Locale = string;
export type LocaleCode = Locale;
export type Currency = (typeof SUPPORTED_CURRENCIES)[number];
export type UnitSystem = (typeof SUPPORTED_UNIT_SYSTEMS)[number];

export const DEFAULT_LOCALE: Locale = 'zh';
export const defaultLocale = DEFAULT_LOCALE;
export const LOCALE_COOKIE_NAME = 'hongyu-locale';
export const localeStorageKey = LOCALE_COOKIE_NAME;
export const CURRENCY_COOKIE_NAME = 'site_currency';
export const UNIT_SYSTEM_COOKIE_NAME = 'site_unit_system';
export const PREFERENCE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
export const LOCALE_REQUEST_HEADER = 'x-vex-locale';

export type LocaleOption = {
  code: Locale;
  label: string;
  nativeName: string;
  htmlLang: string;
};

export const locales: LocaleOption[] = [
  { code: 'zh', label: '中文', nativeName: '简体中文', htmlLang: 'zh-CN' },
  { code: 'en', label: 'EN', nativeName: 'English', htmlLang: 'en' },
  { code: 'es', label: 'ES', nativeName: 'Español', htmlLang: 'es' },
];

const localeDefaults: Record<string, { currency: Currency; unitSystem: UnitSystem; label: string }> = {
  zh: { currency: 'USD', unitSystem: 'metric', label: '中文' },
  'zh-CN': { currency: 'USD', unitSystem: 'metric', label: '中文' },
  en: { currency: 'USD', unitSystem: 'imperial', label: 'English' },
  es: { currency: 'EUR', unitSystem: 'metric', label: 'Español' },
};

export type SitePreferences = {
  locale: Locale;
  currency: Currency;
  unitSystem: UnitSystem;
};

export function isSupportedLocale(value: string | null | undefined): boolean {
  return Boolean(value?.trim());
}

export function normalizeLocale(value: string | null | undefined, fallback: Locale = DEFAULT_LOCALE): Locale {
  const trimmed = value?.trim();
  return trimmed || fallback;
}

export function normalizeCurrency(value: string | null | undefined): Currency | null {
  return value && SUPPORTED_CURRENCIES.includes(value as Currency) ? (value as Currency) : null;
}

export function normalizeUnitSystem(value: string | null | undefined): UnitSystem | null {
  return value && SUPPORTED_UNIT_SYSTEMS.includes(value as UnitSystem) ? (value as UnitSystem) : null;
}

export function getLocaleOption(code: Locale): LocaleOption {
  return locales.find((item) => item.code === code)
    ?? locales.find((item) => item.code === code.split('-')[0])
    ?? locales[0];
}

export function getMarketDefaults(locale: Locale) {
  return localeDefaults[locale]
    ?? localeDefaults[locale.split('-')[0]]
    ?? localeDefaults[DEFAULT_LOCALE];
}

export function getLocaleLabel(locale: Locale) {
  return getMarketDefaults(locale).label;
}

export function toPreferenceCookie(name: string, value: string, maxAge = PREFERENCE_COOKIE_MAX_AGE) {
  return `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}
