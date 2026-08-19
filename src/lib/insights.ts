import type { CtaBlock } from '@/lib/storefront-types';

export const insightsCta: CtaBlock = {
  eyebrow: 'Partnership · 临床合作',
  title: '探索临床研究合作与中心共建',
  lead: '与竑宇医疗携手推进微创外科培训、真实世界数据与区域中心能力建设。',
  href: '/partnership',
  buttonLabel: '洽谈合作',
};

export const insightsHero = {
  eyebrow: 'Insights & News · 前沿资讯',
  titleLine1: '技术前沿与',
  titleLine2: '临床实践',
  lead: '来自竑宇医疗研发中心、合作医院及行业会议的最新技术动态、临床研究成果与术者实践经验。',
};

export type InsightBoardKey = 'case' | 'paper' | 'experience';

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
