export type HeroCopyStyle = 'light' | 'dark';

/** Storefront display: unset/null → light (legacy behavior) */
export function resolveStorefrontHeroCopyStyle(value?: string | null): HeroCopyStyle {
  return value === 'dark' ? 'dark' : 'light';
}
