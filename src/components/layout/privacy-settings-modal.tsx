'use client';

import { useId } from 'react';

import { writeCookieConsent } from '@/lib/cookie-consent';
import { useTranslation } from '@/lib/i18n-context';
import type { StorefrontPrivacyPreference } from '@/lib/storefront-website-config-api';

type PrivacySettingsModalProps = {
  open: boolean;
  onClose: () => void;
  /** Current locale’s privacy preference only — no cross-locale fallback. */
  privacyPreference: StorefrontPrivacyPreference | null;
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
  privacyPreference,
  initialStatistics: _initialStatistics,
  onSaved,
}: PrivacySettingsModalProps) {
  const { t } = useTranslation();
  const titleId = useId();

  const summary = privacyPreference?.summary?.trim() || '';
  const showSummary = hasVisibleHtml(summary);
  const summaryHtml = showSummary ? withExternalSummaryLinks(summary) : '';

  if (!open) return null;

  function persist(nextStatistics: boolean) {
    writeCookieConsent(nextStatistics);
    onSaved(nextStatistics);
    onClose();
  }

  return (
    <div className="privacy-banner" role="presentation">
      <div className="privacy-banner__mask" aria-hidden="true" />
      <div
        className="privacy-banner__panel"
        role="dialog"
        aria-modal="false"
        aria-labelledby={titleId}
      >
        <div className="privacy-banner__inner">
          <div className="privacy-banner__copy">
            <h2 id={titleId} className="privacy-banner__title">
              {t('common.privacySettingsTitle')}
            </h2>
            {showSummary ? (
              <div
                className="privacy-banner__summary"
                dangerouslySetInnerHTML={{ __html: summaryHtml }}
              />
            ) : null}
          </div>

          <div className="privacy-banner__actions">
            <button
              type="button"
              className="privacy-banner__btn privacy-banner__btn--primary"
              onClick={() => persist(true)}
            >
              {t('common.privacyAcceptAll')}
            </button>
            <button
              type="button"
              className="privacy-banner__btn privacy-banner__btn--ghost"
              onClick={() => persist(false)}
            >
              {t('common.privacyAcceptNecessary')}
            </button>
            <button
              type="button"
              className="privacy-banner__btn privacy-banner__btn--ghost"
              onClick={() => persist(false)}
            >
              {t('common.privacyRejectAll')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
