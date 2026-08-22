'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo, useState, type FormEvent } from 'react';

import {
  CONTACT_INQUIRY_TYPE,
  CONTACT_TOPIC_OPTIONS,
  buildContactInquiryMessage,
  resolveContactTopicFromQuery,
  submitStorefrontInquiry,
} from '@/lib/storefront-inquiry';

export function ContactInquiryForm() {
  const searchParams = useSearchParams();
  const initialTopic = useMemo(
    () => resolveContactTopicFromQuery(searchParams.get('topic')),
    [searchParams],
  );
  const initialBody = useMemo(() => {
    const summit = searchParams.get('summit')?.trim();
    if (!summit) return '';
    return `意向报名峰会：${summit}\n\n`;
  }, [searchParams]);

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
        inquiryType: CONTACT_INQUIRY_TYPE,
        fullName,
        email,
        phone: phone || undefined,
        company: company || undefined,
        country: country || undefined,
        jobTitle: jobTitle || undefined,
        message: buildContactInquiryMessage(selectedTopic, body),
      });
      form.reset();
      setTopic('');
      setStatus('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : '提交失败，请稍后重试');
      setStatus('error');
    }
  }

  return (
    <form data-allow-submit onSubmit={onSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="contact-full-name">姓名 <span className="required">*</span></label>
          <input id="contact-full-name" name="fullName" type="text" className="form-input" placeholder="您的姓名" required />
        </div>
        <div className="form-group">
          <label htmlFor="contact-country">国家</label>
          <input id="contact-country" name="country" type="text" className="form-input" placeholder="所在国家或地区" />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="contact-company">医院 / 机构</label>
          <input id="contact-company" name="company" type="text" className="form-input" placeholder="所在医院或机构名称" />
        </div>
        <div className="form-group">
          <label htmlFor="contact-job-title">职称</label>
          <input id="contact-job-title" name="jobTitle" type="text" className="form-input" placeholder="您的职称或职位" />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="contact-email">邮箱 <span className="required">*</span></label>
          <input id="contact-email" name="email" type="email" className="form-input" placeholder="your@email.com" required />
        </div>
        <div className="form-group">
          <label htmlFor="contact-phone">电话</label>
          <input id="contact-phone" name="phone" type="tel" className="form-input" placeholder="联系电话" />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group full">
          <label htmlFor="contact-topic">咨询类型</label>
          <select
            id="contact-topic"
            name="topic"
            className="form-input"
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
          >
            <option value="">请选择咨询类型</option>
            {CONTACT_TOPIC_OPTIONS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group full">
          <label htmlFor="contact-body">留言内容 <span className="required">*</span></label>
          <textarea
            id="contact-body"
            name="body"
            className="form-input"
            placeholder="请描述您的需求或问题..."
            defaultValue={initialBody}
            required
          />
        </div>
      </div>
      {status === 'success' ? <p className="form-note">留言已提交，我们将尽快与您联系。</p> : null}
      {status === 'error' ? <p className="form-note" style={{ color: '#ee1d36' }}>{error}</p> : null}
      <button type="submit" className="form-submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? '提交中...' : '提交留言'}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </form>
  );
}
