export type ArticleTocItem = {
  id: string;
  text: string;
  level: 2 | 3 | 4;
};

function slugifyHeading(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'section';
}

function pickHeadingLevel(html: string): 2 | 3 | 4 | null {
  if (/<h2[\s>]/i.test(html)) return 2;
  if (/<h3[\s>]/i.test(html)) return 3;
  if (/<h4[\s>]/i.test(html)) return 4;
  return null;
}

function stripTags(value: string) {
  return value.replace(/<[^>]+>/g, '').trim();
}

export function prepareArticleBody(html: string) {
  const level = pickHeadingLevel(html);
  if (!level) {
    return { html, toc: [] as ArticleTocItem[] };
  }

  const tag = `h${level}`;
  const regex = new RegExp(`<${tag}([^>]*)>([\\s\\S]*?)<\\/${tag}>`, 'gi');
  const usedIds = new Set<string>();
  const toc: ArticleTocItem[] = [];

  const enriched = html.replace(regex, (match, attrs: string, inner: string) => {
    const text = stripTags(inner);
    if (!text) return match;

    const idMatch = /\bid=(["'])(.*?)\1/i.exec(attrs);
    let id = idMatch?.[2]?.trim() ?? slugifyHeading(text);
    if (!id || usedIds.has(id)) {
      let suffix = 2;
      const base = id || slugifyHeading(text);
      id = base;
      while (usedIds.has(id)) {
        id = `${base}-${suffix}`;
        suffix += 1;
      }
    }
    usedIds.add(id);
    toc.push({ id, text, level });

    if (idMatch) {
      return match;
    }

    const trimmedAttrs = attrs?.trim() ? ` ${attrs.trim()}` : '';
    return `<${tag}${trimmedAttrs} id="${id}">${inner}</${tag}>`;
  });

  return { html: enriched, toc };
}
