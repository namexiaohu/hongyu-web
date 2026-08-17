'use client';

import { useEffect, useRef, useState } from 'react';

import {
  defaultLocale,
  getLocaleOption,
  localeStorageKey,
  locales,
  type LocaleCode,
} from '@/lib/i18n/locales';

type LanguageSwitcherProps = {
  /** 首页 overlay 顶栏未滚动时为 true，用于样式适配 */
  transparent?: boolean;
};

function readStoredLocale(): LocaleCode {
  if (typeof window === 'undefined') return defaultLocale;
  const stored = window.localStorage.getItem(localeStorageKey);
  if (stored === 'zh' || stored === 'en' || stored === 'es') return stored;
  return defaultLocale;
}

export function LanguageSwitcher({ transparent = false }: LanguageSwitcherProps) {
  const [locale, setLocale] = useState<LocaleCode>(defaultLocale);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = readStoredLocale();
    setLocale(stored);
    document.documentElement.lang = getLocaleOption(stored).htmlLang;
  }, []);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const current = getLocaleOption(locale);

  const selectLocale = (code: LocaleCode) => {
    setLocale(code);
    setOpen(false);
    window.localStorage.setItem(localeStorageKey, code);
    document.documentElement.lang = getLocaleOption(code).htmlLang;
    window.dispatchEvent(new CustomEvent('hongyu:locale-change', { detail: { locale: code } }));
  };

  return (
    <div
      ref={rootRef}
      className={`lang-switcher${transparent ? ' lang-switcher-transparent' : ''}${open ? ' is-open' : ''}`}
    >
      <button
        type="button"
        className="lang-switcher-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`语言切换，当前 ${current.nativeName}`}
        onClick={() => setOpen((value) => !value)}
      >
        <svg
          className="lang-switcher-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span className="lang-switcher-current">{current.label}</span>
        <svg
          className="lang-switcher-chevron"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open ? (
        <ul className="lang-switcher-menu" role="listbox" aria-label="选择语言">
          {locales.map((item) => (
            <li key={item.code} role="option" aria-selected={item.code === locale}>
              <button
                type="button"
                className={`lang-switcher-option${item.code === locale ? ' is-active' : ''}`}
                onClick={() => selectLocale(item.code)}
              >
                <span className="lang-switcher-option-code">{item.label}</span>
                <span className="lang-switcher-option-name">{item.nativeName}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
