'use client';

import { useState, type FormEvent } from 'react';

import {
  PARTNERSHIP_INQUIRY_TYPE,
  buildPartnershipInquiryMessage,
  submitStorefrontInquiry,
} from '@/lib/storefront-inquiry';

const SIZE_OPTIONS = ['1–10 人', '11–50 人', '51–200 人', '201–1000 人', '1000 人以上'];
const COOP_OPTIONS = ['渠道分销 / 代理', '学术合作 / 临床研究', 'OEM / ODM 定制', '战略投资', '其他'];
const SCALE_OPTIONS = ['初期试合作', '年度框架合作', '长期战略合作'];

export function PartnershipInquiryForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const company = String(data.get('company') ?? '').trim();
    const companyWebsite = String(data.get('companyWebsite') ?? '').trim();
    const country = String(data.get('country') ?? '').trim();
    const companySize = String(data.get('companySize') ?? '').trim();
    const fullName = String(data.get('fullName') ?? '').trim();
    const jobTitle = String(data.get('jobTitle') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    const coopType = String(data.get('coopType') ?? '').trim();
    const scale = String(data.get('scale') ?? '').trim();
    const detail = String(data.get('detail') ?? '').trim();

    setStatus('submitting');
    setError('');
    try {
      await submitStorefrontInquiry({
        inquiryType: PARTNERSHIP_INQUIRY_TYPE,
        fullName,
        email,
        phone,
        company,
        country,
        jobTitle: jobTitle || undefined,
        companyWebsite: companyWebsite || undefined,
        companySize: companySize || undefined,
        message: buildPartnershipInquiryMessage(coopType, scale, detail),
      });
      form.reset();
      setStatus('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : '提交失败，请稍后重试');
      setStatus('error');
    }
  }

  return (
    <div className="form-card">
      <h3>商务合作意向表</h3>
      <p className="fc-sub">带 <span style={{ color: '#ee1d36' }}>*</span> 的为必填项</p>
      <form data-allow-submit onSubmit={onSubmit}>
        <div className="form-section-title">企业信息</div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="partner-company">公司名称 <span className="required">*</span></label>
            <input id="partner-company" name="company" type="text" className="form-input" placeholder="公司全称" required />
          </div>
          <div className="form-group">
            <label htmlFor="partner-website">公司网站</label>
            <input id="partner-website" name="companyWebsite" type="url" className="form-input" placeholder="https://" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="partner-country">所在国家 / 地区 <span className="required">*</span></label>
            <input id="partner-country" name="country" type="text" className="form-input" placeholder="所在国家或地区" required />
          </div>
          <div className="form-group">
            <label htmlFor="partner-size">公司规模</label>
            <select id="partner-size" name="companySize" className="form-input">
              <option value="">请选择</option>
              {SIZE_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-divider" />
        <div className="form-section-title">联系人信息</div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="partner-name">联系人姓名 <span className="required">*</span></label>
            <input id="partner-name" name="fullName" type="text" className="form-input" placeholder="您的姓名" required />
          </div>
          <div className="form-group">
            <label htmlFor="partner-title">职位</label>
            <input id="partner-title" name="jobTitle" type="text" className="form-input" placeholder="您的职位" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="partner-email">工作邮箱 <span className="required">*</span></label>
            <input id="partner-email" name="email" type="email" className="form-input" placeholder="your@company.com" required />
          </div>
          <div className="form-group">
            <label htmlFor="partner-phone">联系电话 <span className="required">*</span></label>
            <input id="partner-phone" name="phone" type="tel" className="form-input" placeholder="+86" required />
          </div>
        </div>

        <div className="form-divider" />
        <div className="form-section-title">合作意向</div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="partner-coop">合作类型 <span className="required">*</span></label>
            <select id="partner-coop" name="coopType" className="form-input" required>
              <option value="">请选择合作类型</option>
              {COOP_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="partner-scale">预计合作规模</label>
            <select id="partner-scale" name="scale" className="form-input">
              <option value="">请选择</option>
              {SCALE_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group full">
            <label htmlFor="partner-detail">合作需求描述 <span className="required">*</span></label>
            <textarea id="partner-detail" name="detail" className="form-input" placeholder="请描述您的合作需求、预期目标及时间规划..." required />
          </div>
        </div>

        {status === 'success' ? <p className="form-note">合作意向已提交，商务团队将尽快与您联系。</p> : null}
        {status === 'error' ? <p className="form-note" style={{ color: '#ee1d36' }}>{error}</p> : null}

        <button type="submit" className="form-submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? '提交中...' : '提交合作意向'}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
        <p className="form-note">提交即表示您同意我们的隐私政策，您的信息将被严格保密。</p>
      </form>
    </div>
  );
}
