import type { TranslateFn } from '@/lib/i18n-server';
import { buildPartnershipCta } from '@/lib/partnership-cta';
import type { CtaBlock } from '@/lib/storefront-types';

export type InsightsHero = {
  eyebrow: string;
  titleLine1: string;
  lead: string;
};

export function buildInsightsHero(t: TranslateFn, companyName = ''): InsightsHero {
  const org = companyName.trim();
  return {
    eyebrow: t('home.insights.eyebrow'),
    titleLine1: t('home.insights.titleLine1'),
    lead: org ? t('home.insights.leadWithCompany', { companyName: org }) : t('home.insights.leadFallback'),
  };
}

export function buildInsightsCta(t: TranslateFn): CtaBlock {
  return buildPartnershipCta(t, 'insights');
}

export function formatInsightDate(value: string | null | undefined) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}.${month}`;
}

export function formatInsightAuthor(
  author: { name: string | null; title: string | null } | null | undefined,
) {
  if (!author?.name) return '';
  return author.title ? `${author.name}, ${author.title}` : author.name;
}

export function formatInsightMeta(
  dateValue: string | null | undefined,
  author: { name: string | null; title: string | null } | null | undefined,
) {
  const parts = [formatInsightDate(dateValue), formatInsightAuthor(author)].filter(Boolean);
  return parts.join(' · ');
}

/** Matches admin HOME_TOP_BOARD_KEY / PINNED_INSIGHT_BOARD_KEY. */
export const HOME_TOP_INSIGHT_BOARD_KEY = 'home-top';

export function insightHref(slug: string) {
  return `/insights/${slug.trim()}`;
}

export type InsightLinkTarget = {
  slug: string;
  bodyLinkEnabled?: boolean;
  bodyLinkUrl?: string;
};

/** List/home cards: body-link mode uses the shared URL; otherwise the detail page. */
export function insightItemHref(item: InsightLinkTarget) {
  if (item.bodyLinkEnabled && item.bodyLinkUrl?.trim()) {
    return item.bodyLinkUrl.trim();
  }
  return insightHref(item.slug);
}

export function isExternalInsightHref(href: string) {
  return /^https?:\/\//i.test(href);
}

export function insightsListHref(input?: { category?: string | null; page?: number }) {
  const params = new URLSearchParams();
  if (input?.category?.trim()) {
    params.set('category', input.category.trim());
  }
  if (input?.page && input.page > 1) {
    params.set('page', String(input.page));
  }
  const query = params.toString();
  return query ? `/insights?${query}` : '/insights';
}
