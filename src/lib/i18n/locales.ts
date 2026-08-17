export type LocaleCode = 'zh' | 'en' | 'es';

export type LocaleOption = {
  code: LocaleCode;
  label: string;
  nativeName: string;
  htmlLang: string;
};

export const locales: LocaleOption[] = [
  { code: 'zh', label: '中文', nativeName: '简体中文', htmlLang: 'zh-CN' },
  { code: 'en', label: 'EN', nativeName: 'English', htmlLang: 'en' },
  { code: 'es', label: 'ES', nativeName: 'Español', htmlLang: 'es' },
];

export const defaultLocale: LocaleCode = 'zh';

export const localeStorageKey = 'hongyu-locale';

export function getLocaleOption(code: LocaleCode): LocaleOption {
  return locales.find((item) => item.code === code) ?? locales[0];
}
