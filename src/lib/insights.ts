import type { TranslateFn } from '@/lib/i18n-server';
import { buildPartnershipCta } from '@/lib/partnership-cta';
import type { CtaBlock } from '@/lib/storefront-types';

export type InsightsHero = {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  lead: string;
};

export function buildInsightsHero(t: TranslateFn, companyName = ''): InsightsHero {
  const org = companyName.trim();
  return {
    eyebrow: t('home.insights.eyebrow'),
    titleLine1: t('home.insights.titleLine1'),
    titleLine2: t('home.insights.titleLine2'),
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

export function insightHref(slug: string) {
  return `/insights/${slug.trim()}`;
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
