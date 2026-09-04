import { unstable_cache } from 'next/cache';

import { getApiBaseUrl } from '@/lib/api-client';

const UI_STRINGS_CACHE_TAG = 'ui-strings';

const UI_STRINGS_REVALIDATE_SECONDS =
  process.env.NODE_ENV === 'development' ? 30 : 60 * 60;

type FetchUiStringsOptions = {
  locale: string;
  keys?: string[];
  groups?: string[];
};

type UiStringsResponse = {
  locale: string;
  strings: Record<string, string>;
};

function buildCacheKey(options: FetchUiStringsOptions) {
  const keys = options.keys?.slice().sort().join(',') ?? '';
  const groups = options.groups?.slice().sort().join(',') ?? '';
  return `${options.locale}|k:${keys}|g:${groups}`;
}

async function fetchUiStringsFromApi(options: FetchUiStringsOptions): Promise<Record<string, string>> {
  const params = new URLSearchParams({ locale: options.locale });
  if (options.keys?.length) {
    params.set('keys', options.keys.join(','));
  }
  if (options.groups?.length) {
    params.set('groups', options.groups.join(','));
  }

  const base = getApiBaseUrl().replace(/\/+$/, '');
  const url = `${base}/api/front/ui-strings?${params.toString()}`;
  const isDev = process.env.NODE_ENV === 'development';

  const response = await fetch(url, {
    // Dev: always hit API so locale/translation edits show up immediately.
    // Prod: short Next fetch cache; empty/error results are never written to unstable_cache.
    ...(isDev
      ? { cache: 'no-store' as const }
      : { next: { revalidate: UI_STRINGS_REVALIDATE_SECONDS, tags: [UI_STRINGS_CACHE_TAG] } }),
  });

  if (!response.ok) {
    throw new Error(`UI strings request failed (${response.status}) ${url}`);
  }

  const payload = (await response.json()) as UiStringsResponse;
  const strings = payload.strings ?? {};

  // Prefetch by groups should never be empty when the API is healthy.
  // Avoid caching a transient empty payload as "successful" English fallback fuel.
  if ((options.groups?.length || options.keys?.length) && Object.keys(strings).length === 0) {
    throw new Error(`UI strings empty for locale=${options.locale}`);
  }

  return strings;
}

export async function fetchUiStrings(options: FetchUiStringsOptions): Promise<Record<string, string>> {
  const cacheKey = buildCacheKey(options);
  const isDev = process.env.NODE_ENV === 'development';

  if (isDev) {
    return fetchUiStringsFromApi(options);
  }

  try {
    return await unstable_cache(
      async () => fetchUiStringsFromApi(options),
      ['ui-strings', cacheKey],
      { revalidate: UI_STRINGS_REVALIDATE_SECONDS, tags: [UI_STRINGS_CACHE_TAG] },
    )();
  } catch (error) {
    // Do not stick a failed/empty payload in the Data Cache — retry once uncached.
    if (process.env.NODE_ENV === 'development') {
      console.warn('[ui-strings] cache path failed, retrying uncached', error);
    }
    return fetchUiStringsFromApi(options);
  }
}

export async function fetchUiStringGroups(locale: string, groups: string[]) {
  return fetchUiStrings({ locale, groups });
}
