import Link from 'next/link';

import { ArticleToc } from '@/components/insights/article-toc';
import { prepareArticleBody } from '@/lib/article-toc';
import { getPageTranslations, getStorefrontLocaleContext } from '@/lib/i18n-server';
import type { StorefrontOtherContentDetail } from '@/lib/storefront-pages-api';

type OtherContentPageViewProps = {
  page: StorefrontOtherContentDetail;
};

export async function OtherContentPageView({ page }: OtherContentPageViewProps) {
  const { locale } = await getStorefrontLocaleContext();
  const { t } = await getPageTranslations(locale, ['breadcrumb']);
  const { html: bodyHtml, toc } = prepareArticleBody(page.body);

  return (
    <>
      <link rel="stylesheet" href="/cms-article-content.css" />

      <div className="breadcrumb container">
        <Link href="/">{t('breadcrumb.home')}</Link>
        <span>/</span>
        <span style={{ color: 'var(--fg)' }}>{page.title}</span>
      </div>

      <section className="art-hero" data-od-id="page-hero">
        <div className="container">
          <div className="art-hero-inner">
            <h1>{page.title}</h1>
            {page.summary ? <p className="art-lead">{page.summary}</p> : null}
          </div>
          {page.coverImage ? (
            <div className="art-hero-cover">
              <img src={page.coverImage} alt={page.title} />
            </div>
          ) : null}
        </div>
      </section>

      <div className="container">
        <div className="art-body-layout">
          <article
            className="art-body cms-article-content"
            data-od-id="page-body"
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />

          {toc.length > 0 ? (
            <aside className="art-sidebar" data-od-id="page-sidebar">
              <ArticleToc items={toc} />
            </aside>
          ) : null}
        </div>
      </div>
    </>
  );
}
