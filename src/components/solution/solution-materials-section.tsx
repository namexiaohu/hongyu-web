import { getPageTranslations, getStorefrontLocaleContext } from '@/lib/i18n-server';
import type { StorefrontSolutionMaterial } from '@/lib/storefront-solutions-api';

export async function SolutionMaterialsSection({ materials }: { materials: StorefrontSolutionMaterial[] }) {
  if (!materials.length) return null;

  const { locale } = await getStorefrontLocaleContext();
  const { t } = await getPageTranslations(locale, ['solution']);

  return (
    <section className="section" id="product-materials" data-od-id="product-materials">
      <div className="container">
        <div className="section-header">
          <p className="eyebrow">{t('solution.materialsEyebrow')}</p>
          <h2>{t('solution.materialsTitle')}</h2>
        </div>
        <div className="sol-materials">
          {materials.map((item) => (
            <a key={item.url} className="sol-material-item" href={item.url} target="_blank" rel="noreferrer">
              <div className="sol-material-info">
                <span className="sol-material-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6" />
                  </svg>
                </span>
                <span className="sol-material-name">{item.name}</span>
              </div>
              <span className="sol-material-download">{t('solution.materialsDownload')}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
