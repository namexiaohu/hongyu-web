'use client';

import { useEffect, useId, useState } from 'react';

import { writeCookieConsent } from '@/lib/cookie-consent';
import { useTranslation } from '@/lib/i18n-context';

type PrivacySettingsModalProps = {
  open: boolean;
  onClose: () => void;
  initialStatistics: boolean;
  onSaved: (statistics: boolean) => void;
};

function hasVisibleHtml(html: string) {
  return html.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/gi, ' ').trim().length > 0;
}

/** Ensure summary links open in a new tab safely. */
function withExternalSummaryLinks(html: string) {
  return html.replace(/<a\b([^>]*)>/gi, (_match, attrs: string) => {
    let next = attrs;
    if (!/\btarget\s*=/i.test(next)) {
      next += ' target="_blank"';
    }
    if (!/\brel\s*=/i.test(next)) {
      next += ' rel="noopener noreferrer"';
    } else if (!/noopener/i.test(next)) {
      next = next.replace(/\brel\s*=\s*(["'])(.*?)\1/i, (_relMatch, quote: string, value: string) => (
        `rel=${quote}${`${value} noopener noreferrer`.trim()}${quote}`
      ));
    }
    return `<a${next}>`;
  });
}

export function PrivacySettingsModal({
  open,
  onClose,
  initialStatistics,
  onSaved,
}: PrivacySettingsModalProps) {
  const { t } = useTranslation();
  const titleId = useId();
  const [statistics, setStatistics] = useState(initialStatistics);
  const [necessaryOpen, setNecessaryOpen] = useState(false);
  const [statisticsOpen, setStatisticsOpen] = useState(false);

  const summary = t('common.privacySummaryHtml').trim();
  const showSummary = hasVisibleHtml(summary) && summary !== 'common.privacySummaryHtml';
  const summaryHtml = showSummary ? withExternalSummaryLinks(summary) : '';

  useEffect(() => {
    if (!open) return;
    setStatistics(initialStatistics);
  }, [open, initialStatistics]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  function persist(nextStatistics: boolean) {
    writeCookieConsent(nextStatistics);
    onSaved(nextStatistics);
    onClose();
  }

  return (
    <div
      className="privacy-modal-overlay"
      role="presentation"
    >
      <div
        className="privacy-modal"
        role="dialog"
        aria-modal="false"
        aria-labelledby={titleId}
      >
        <div className="privacy-modal__header">
          <h2 id={titleId} className="privacy-modal__heading">
            {t('common.privacySettingsTitle')}
          </h2>
          <button
            type="button"
            className="privacy-modal__close"
            onClick={onClose}
            aria-label={t('common.close')}
          >
            ×
          </button>
        </div>

        <div className="privacy-modal__body">
          {showSummary ? (
            <section className="privacy-modal__section">
              <div
                className="privacy-modal__summary"
                dangerouslySetInnerHTML={{ __html: summaryHtml }}
              />
            </section>
          ) : null}

          <div className="privacy-modal__categories">
            <div className="privacy-modal__category">
              <button
                type="button"
                className="privacy-modal__category-toggle"
                onClick={() => setNecessaryOpen((prev) => !prev)}
                aria-expanded={necessaryOpen}
              >
                <span className="privacy-modal__plus" aria-hidden="true">{necessaryOpen ? '−' : '+'}</span>
                <span className="privacy-modal__category-label">{t('common.privacyNecessary')}</span>
              </button>
              <span className="privacy-modal__always">{t('common.privacyAlwaysActive')}</span>
              {necessaryOpen ? (
                <p className="privacy-modal__category-desc">{t('common.privacyNecessaryDesc')}</p>
              ) : null}
            </div>

            <div className="privacy-modal__category">
              <button
                type="button"
                className="privacy-modal__category-toggle"
                onClick={() => setStatisticsOpen((prev) => !prev)}
                aria-expanded={statisticsOpen}
              >
                <span className="privacy-modal__plus" aria-hidden="true">{statisticsOpen ? '−' : '+'}</span>
                <span className="privacy-modal__category-label">{t('common.privacyStatistics')}</span>
              </button>
              <label className="privacy-modal__switch">
                <input
                  type="checkbox"
                  checked={statistics}
                  onChange={(event) => setStatistics(event.target.checked)}
                  aria-label={t('common.privacyStatistics')}
                />
                <span className="privacy-modal__switch-ui" aria-hidden="true" />
              </label>
              {statisticsOpen ? (
                <p className="privacy-modal__category-desc">{t('common.privacyStatisticsDesc')}</p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="privacy-modal__actions">
          <button type="button" className="privacy-modal__btn privacy-modal__btn--primary" onClick={() => persist(true)}>
            {t('common.privacyAcceptAll')}
          </button>
          <button type="button" className="privacy-modal__btn privacy-modal__btn--primary" onClick={() => persist(false)}>
            {t('common.privacyRejectAll')}
          </button>
          <button type="button" className="privacy-modal__btn privacy-modal__btn--secondary" onClick={() => persist(statistics)}>
            {t('common.privacySaveSettings')}
          </button>
        </div>
      </div>
    </div>
  );
}
