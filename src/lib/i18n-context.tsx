'use client';

import { createContext, useContext, useMemo, type ReactNode } from 'react';

import { createTranslateFn, type TranslationParams } from '@/lib/i18n-translate';

type I18nContextValue = {
  locale: string;
  /** Runtime UI strings for the active locale only (no en.json merge). */
  uiStrings: Record<string, string>;
  t: (key: string, params?: TranslationParams) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  children,
  locale,
  initialUiStrings = {},
}: {
  children: ReactNode;
  locale: string;
  initialUiStrings?: Record<string, string>;
}) {
  const t = useMemo(
    () => createTranslateFn(locale, initialUiStrings),
    [locale, initialUiStrings],
  );

  const value = useMemo(
    () => ({ locale, uiStrings: initialUiStrings, t }),
    [locale, initialUiStrings, t],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

const fallbackT = createTranslateFn('en', {});

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    if (process.env.NODE_ENV === 'development') {
      return { locale: 'en', uiStrings: {}, t: fallbackT };
    }
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
}

/** Strict lookup: current-locale runtime string only. No en.json / cross-locale fallback. */
export function useStrictUiString(key: string): string {
  const { uiStrings } = useTranslation();
  const value = uiStrings[key];
  return typeof value === 'string' ? value.trim() : '';
}
