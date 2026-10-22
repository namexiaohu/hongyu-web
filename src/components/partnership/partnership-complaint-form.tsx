'use client';

import { useState, type FormEvent } from 'react';

import { useTranslation } from '@/lib/i18n-context';
import { submitStorefrontComplaint } from '@/lib/storefront-complaint';

export function PartnershipComplaintForm() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const fullName = String(data.get('fullName') ?? '').trim();
    const contact = String(data.get('contact') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    setStatus('submitting');
    setError('');
    try {
      await submitStorefrontComplaint({
        fullName: fullName || undefined,
        contact: contact || undefined,
        message,
      });
      form.reset();
      setStatus('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : t('common.submitFailed'));
      setStatus('error');
    }
  }

  return (
    <div className="complaint-card">
      <h3>{t('partnership.complaint.title')}</h3>
      <p>{t('partnership.complaint.lead')}</p>
      <form data-allow-submit onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="complaint-name">{t('partnership.complaint.name')}</label>
          <input
            id="complaint-name"
            name="fullName"
            type="text"
            className="form-input"
            placeholder={t('partnership.complaint.namePlaceholder')}
          />
        </div>
        <div className="form-group">
          <label htmlFor="complaint-contact">{t('partnership.complaint.contact')}</label>
          <input
            id="complaint-contact"
            name="contact"
            type="text"
            className="form-input"
            placeholder={t('partnership.complaint.contactPlaceholder')}
          />
        </div>
        <div className="form-group">
          <label htmlFor="complaint-message">
            {t('partnership.complaint.message')} <span className="required">{t('common.requiredMark')}</span>
          </label>
          <textarea
            id="complaint-message"
            name="message"
            className="form-input"
            placeholder={t('partnership.complaint.messagePlaceholder')}
            required
          />
        </div>
        {status === 'success' ? <p className="form-note">{t('partnership.complaint.success')}</p> : null}
        {status === 'error' ? <p className="form-note complaint-card__error">{error}</p> : null}
        <button type="submit" className="form-submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? t('common.submitting') : t('partnership.complaint.submit')}
        </button>
      </form>
    </div>
  );
}
