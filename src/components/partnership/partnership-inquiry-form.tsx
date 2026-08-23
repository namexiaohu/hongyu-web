'use client';

import { useState, type FormEvent } from 'react';

import { useTranslation } from '@/lib/i18n-context';
import {
  PARTNERSHIP_COOP_KEYS,
  PARTNERSHIP_INQUIRY_TYPE_KEY,
  PARTNERSHIP_SCALE_KEYS,
  PARTNERSHIP_SIZE_KEYS,
  buildPartnershipInquiryMessage,
  submitStorefrontInquiry,
} from '@/lib/storefront-inquiry';

export function PartnershipInquiryForm() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const company = String(data.get('company') ?? '').trim();
    const companyWebsite = String(data.get('companyWebsite') ?? '').trim();
    const country = String(data.get('country') ?? '').trim();
    const companySizeKey = String(data.get('companySize') ?? '').trim();
    const fullName = String(data.get('fullName') ?? '').trim();
    const jobTitle = String(data.get('jobTitle') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    const coopTypeKey = String(data.get('coopType') ?? '').trim();
    const scaleKey = String(data.get('scale') ?? '').trim();
    const detail = String(data.get('detail') ?? '').trim();

    const companySize = companySizeKey
      ? t(`forms.partnership.sizeOptions.${companySizeKey}`)
      : '';
    const coopType = coopTypeKey ? t(`forms.partnership.coopOptions.${coopTypeKey}`) : '';
    const scale = scaleKey ? t(`forms.partnership.scaleOptions.${scaleKey}`) : '';

    setStatus('submitting');
    setError('');
    try {
      await submitStorefrontInquiry({
        inquiryType: t(`inquiry.types.${PARTNERSHIP_INQUIRY_TYPE_KEY}`),
        fullName,
        email,
        phone,
        company,
        country,
        jobTitle: jobTitle || undefined,
        companyWebsite: companyWebsite || undefined,
        companySize: companySize || undefined,
        message: buildPartnershipInquiryMessage(t, coopType, scale, detail),
      });
      form.reset();
      setStatus('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : t('common.submitFailed'));
      setStatus('error');
    }
  }

  return (
    <div className="form-card">
      <h3>{t('forms.partnership.title')}</h3>
      <p className="fc-sub">
        {t('common.requiredHint').split('*')[0]}
        <span style={{ color: '#ee1d36' }}>{t('common.requiredMark')}</span>
        {t('common.requiredHint').split('*')[1] ?? ''}
      </p>
      <form data-allow-submit onSubmit={onSubmit}>
        <div className="form-section-title">{t('forms.partnership.companySection')}</div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="partner-company">
              {t('forms.partnership.companyName')} <span className="required">{t('common.requiredMark')}</span>
            </label>
            <input
              id="partner-company"
              name="company"
              type="text"
              className="form-input"
              placeholder={t('forms.partnership.companyNamePlaceholder')}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="partner-website">{t('forms.partnership.companyWebsite')}</label>
            <input
              id="partner-website"
              name="companyWebsite"
              type="text"
              className="form-input"
              placeholder={t('forms.partnership.companyWebsitePlaceholder')}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="partner-country">
              {t('forms.partnership.country')} <span className="required">{t('common.requiredMark')}</span>
            </label>
            <input
              id="partner-country"
              name="country"
              type="text"
              className="form-input"
              placeholder={t('forms.partnership.countryPlaceholder')}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="partner-size">{t('forms.partnership.companySize')}</label>
            <select id="partner-size" name="companySize" className="form-input">
              <option value="">{t('forms.partnership.selectPlaceholder')}</option>
              {PARTNERSHIP_SIZE_KEYS.map((key) => (
                <option key={key} value={key}>
                  {t(`forms.partnership.sizeOptions.${key}`)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-divider" />
        <div className="form-section-title">{t('forms.partnership.contactSection')}</div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="partner-name">
              {t('forms.partnership.contactName')} <span className="required">{t('common.requiredMark')}</span>
            </label>
            <input
              id="partner-name"
              name="fullName"
              type="text"
              className="form-input"
              placeholder={t('forms.partnership.contactNamePlaceholder')}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="partner-title">{t('forms.partnership.contactTitle')}</label>
            <input
              id="partner-title"
              name="jobTitle"
              type="text"
              className="form-input"
              placeholder={t('forms.partnership.contactTitlePlaceholder')}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="partner-email">
              {t('forms.partnership.workEmail')} <span className="required">{t('common.requiredMark')}</span>
            </label>
            <input
              id="partner-email"
              name="email"
              type="email"
              className="form-input"
              placeholder={t('forms.partnership.workEmailPlaceholder')}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="partner-phone">
              {t('forms.partnership.phone')} <span className="required">{t('common.requiredMark')}</span>
            </label>
            <input
              id="partner-phone"
              name="phone"
              type="tel"
              className="form-input"
              placeholder={t('forms.partnership.phonePlaceholder')}
              required
            />
          </div>
        </div>

        <div className="form-divider" />
        <div className="form-section-title">{t('forms.partnership.intentSection')}</div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="partner-coop">
              {t('forms.partnership.coopType')} <span className="required">{t('common.requiredMark')}</span>
            </label>
            <select id="partner-coop" name="coopType" className="form-input" required>
              <option value="">{t('forms.partnership.coopTypePlaceholder')}</option>
              {PARTNERSHIP_COOP_KEYS.map((key) => (
                <option key={key} value={key}>
                  {t(`forms.partnership.coopOptions.${key}`)}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="partner-scale">{t('forms.partnership.scale')}</label>
            <select id="partner-scale" name="scale" className="form-input">
              <option value="">{t('forms.partnership.selectPlaceholder')}</option>
              {PARTNERSHIP_SCALE_KEYS.map((key) => (
                <option key={key} value={key}>
                  {t(`forms.partnership.scaleOptions.${key}`)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group full">
            <label htmlFor="partner-detail">
              {t('forms.partnership.detail')} <span className="required">{t('common.requiredMark')}</span>
            </label>
            <textarea
              id="partner-detail"
              name="detail"
              className="form-input"
              placeholder={t('forms.partnership.detailPlaceholder')}
              required
            />
          </div>
        </div>

        {status === 'success' ? <p className="form-note">{t('forms.partnership.success')}</p> : null}
        {status === 'error' ? <p className="form-note" style={{ color: '#ee1d36' }}>{error}</p> : null}

        <button type="submit" className="form-submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? t('common.submitting') : t('forms.partnership.submit')}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
        <p className="form-note">{t('common.privacyNotice')}</p>
      </form>
    </div>
  );
}
