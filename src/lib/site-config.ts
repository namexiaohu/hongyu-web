function resolveSiteUrl() {
  const siteUrl = process.env.SITE_URL?.trim().replace(/\/$/, '');
  if (!siteUrl) {
    throw new Error('SITE_URL is not configured');
  }

  return siteUrl;
}

export const SITE_NAME = '竑宇医疗';
export const SITE_BRAND = 'HONGYU Medical';
export const SITE_URL = resolveSiteUrl();

export const DEFAULT_SEO_TITLE = '竑宇医疗 HONGYU Medical · 引领宠物医疗创新';
export const DEFAULT_SEO_DESCRIPTION =
  '专注于动物外科器械研发与制造，以精密工程技术赋能全球兽医学发展，为伴侣动物生命健康提供可靠保障。';
