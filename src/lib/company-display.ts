import { SITE_BRAND, SITE_NAME } from '@/lib/site-config';
import type { StorefrontCompanyProfile } from '@/lib/storefront-company';
import type { StorefrontNavColumn } from '@/lib/storefront-website-config-api';

export function resolveCompanyName(
  company: Pick<StorefrontCompanyProfile, 'companyName'>,
  locale: string,
): string {
  const name = company.companyName.trim();
  if (name) return name;
  return locale.toLowerCase().startsWith('zh') ? SITE_NAME : SITE_BRAND;
}

/** Banner / hero eyebrow when API provides a single company name. */
export function resolveCompanyEyebrow(
  company: Pick<StorefrontCompanyProfile, 'companyName'>,
  locale: string,
): string {
  const name = company.companyName.trim();
  if (name) return name;
  return locale.toLowerCase().startsWith('zh') ? `${SITE_BRAND} · ${SITE_NAME}` : SITE_BRAND;
}

export function joinCatalogTitles(
  items: Array<{ title: string }>,
  options?: { max?: number; locale?: string; fallback?: string },
): string {
  const max = options?.max ?? 2;
  const names = items.map((item) => item.title.trim()).filter(Boolean).slice(0, max);
  if (!names.length) return options?.fallback ?? '';
  if (names.length === 1) return names[0];
  const isZh = options?.locale?.toLowerCase().startsWith('zh') ?? true;
  return isZh ? `${names[0]}、${names[1]}` : `${names[0]}, ${names[1]}`;
}

export function findNavItemLabel(navColumns: StorefrontNavColumn[], href: string): string | undefined {
  const normalized = href.replace(/\/$/, '') || '/';
  for (const column of navColumns) {
    const columnPath = column.href?.split('?')[0]?.replace(/\/$/, '') || '';
    if (columnPath && columnPath === normalized) return column.name;
    for (const item of column.items) {
      const itemPath = item.href.split('?')[0]?.replace(/\/$/, '') || '/';
      if (itemPath === normalized) return item.name;
    }
  }
  return undefined;
}
