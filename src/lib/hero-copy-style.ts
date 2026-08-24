export type HeroCopyStyle = 'light' | 'dark';

/** Storefront: unset/null/invalid → light（配合默认纯色暗色底） */
export function resolveStorefrontHeroCopyStyle(value?: string | null): HeroCopyStyle {
  return value === 'dark' ? 'dark' : 'light';
}
