'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo, useState, type FormEvent } from 'react';

import { useTranslation } from '@/lib/i18n-context';
import {
  CONTACT_INQUIRY_TYPE_KEY,
  CONTACT_TOPIC_KEYS,
  buildContactInquiryMessage,
  contactTopicLabel,
  resolveContactTopicFromQuery,
  submitStorefrontInquiry,
} from '@/lib/storefront-inquiry';

export function ContactInquiryForm() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const initialTopic = useMemo(
    () => resolveContactTopicFromQuery(t, searchParams.get('topic')),
    [searchParams, t],
  );
  const initialBody = useMemo(() => {
    const summit = searchParams.get('summit')?.trim();
    if (!summit) return '';
    return t('forms.contact.summitPrefill', { summit });
  }, [searchParams, t]);

  const [topic, setTopic] = useState(initialTopic);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const fullName = String(data.get('fullName') ?? '').trim();
    const country = String(data.get('country') ?? '').trim();
    const company = String(data.get('company') ?? '').trim();
    const jobTitle = String(data.get('jobTitle') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    const selectedTopic = String(data.get('topic') ?? '').trim();
    const body = String(data.get('body') ?? '').trim();

    setStatus('submitting');
    setError('');
    try {
      await submitStorefrontInquiry({
        inquiryType: t(`inquiry.types.${CONTACT_INQUIRY_TYPE_KEY}`),
        fullName,
        email,
        phone: phone || undefined,
        company: company || undefined,
        country: country || undefined,
        jobTitle: jobTitle || undefined,
        message: buildContactInquiryMessage(t, selectedTopic, body),
      });
      form.reset();
      setTopic('');
      setStatus('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : t('common.submitFailed'));
      setStatus('error');
    }
  }

  return (
    <form data-allow-submit onSubmit={onSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="contact-full-name">
            {t('forms.contact.fullName')} <span className="required">{t('common.requiredMark')}</span>
          </label>
          <input
            id="contact-full-name"
            name="fullName"
            type="text"
            className="form-input"
            placeholder={t('forms.contact.fullNamePlaceholder')}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact-country">{t('forms.contact.country')}</label>
          <input
            id="contact-country"
            name="country"
            type="text"
            className="form-input"
            placeholder={t('forms.contact.countryPlaceholder')}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="contact-company">{t('forms.contact.company')}</label>
          <input
            id="contact-company"
            name="company"
            type="text"
            className="form-input"
            placeholder={t('forms.contact.companyPlaceholder')}
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact-job-title">{t('forms.contact.jobTitle')}</label>
          <input
            id="contact-job-title"
            name="jobTitle"
            type="text"
            className="form-input"
            placeholder={t('forms.contact.jobTitlePlaceholder')}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="contact-email">
            {t('forms.contact.email')} <span className="required">{t('common.requiredMark')}</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            className="form-input"
            placeholder={t('forms.contact.emailPlaceholder')}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact-phone">{t('forms.contact.phone')}</label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            className="form-input"
            placeholder={t('forms.contact.phonePlaceholder')}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group full">
          <label htmlFor="contact-topic">{t('forms.contact.topic')}</label>
          <select
            id="contact-topic"
            name="topic"
            className="form-input"
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
          >
            <option value="">{t('forms.contact.topicPlaceholder')}</option>
            {CONTACT_TOPIC_KEYS.map((key) => (
              <option key={key} value={key}>
                {contactTopicLabel(t, key)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group full">
          <label htmlFor="contact-body">
            {t('forms.contact.body')} <span className="required">{t('common.requiredMark')}</span>
          </label>
          <textarea
            id="contact-body"
            name="body"
            className="form-input"
            placeholder={t('forms.contact.bodyPlaceholder')}
            defaultValue={initialBody}
            required
          />
        </div>
      </div>
      {status === 'success' ? <p className="form-note">{t('forms.contact.success')}</p> : null}
      {status === 'error' ? <p className="form-note" style={{ color: '#ee1d36' }}>{error}</p> : null}
      <button type="submit" className="form-submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? t('common.submitting') : t('forms.contact.submit')}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </form>
  );
}
