import type { Metadata } from 'next';

import { getStorefrontLocaleContext } from '@/lib/i18n-server';
import { DEFAULT_SEO_TITLE } from '@/lib/site-config';
import { getStorefrontCompanyProfile } from '@/lib/storefront-company-api';
import { ContactInquiryForm } from '@/components/contact/contact-inquiry-form';
import { telHref } from '@/lib/contact-display';

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getStorefrontLocaleContext();
  const isZh = locale.toLowerCase().startsWith('zh');
  return {
    title: isZh ? '联系我们' : 'Contact Us',
    description: DEFAULT_SEO_TITLE,
  };
}

export default async function Page() {
  const { locale } = await getStorefrontLocaleContext();
  const company = await getStorefrontCompanyProfile(locale);
  const phone = company.contactPhone.trim();
  const email = company.companyEmail.trim();
  const address = company.address.trim();
  const hours = company.businessHours.trim();
  const phoneLink = telHref(phone);

  return (
    <>
      <div className="breadcrumb container">
        <a href="/">首页</a>
        <span>/</span>
        <span style={{ color: 'var(--fg)' }}>联系我们</span>
      </div>

      <section className="contact-split container" data-od-id="contact">
        <div className="contact-info">
          <p className="eyebrow">Contact Us · 联系我们</p>
          <h1>与我们取得联系</h1>
          <p className="lead">无论是产品咨询、技术支持还是合作洽谈，我们的团队将在 24 小时内回复您。</p>

          {phone ? (
            <div className="ci-item">
              <div className="ci-icon">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <div className="ci-label">电话咨询</div>
                <div className="ci-value">
                  {phoneLink ? <a href={`tel:${phoneLink}`}>{phone}</a> : phone}
                </div>
              </div>
            </div>
          ) : null}

          {email ? (
            <div className="ci-item">
              <div className="ci-icon">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <div className="ci-label">邮件联系</div>
                <div className="ci-value">
                  <a href={`mailto:${email}`}>{email}</a>
                </div>
              </div>
            </div>
          ) : null}

          {address ? (
            <div className="ci-item">
              <div className="ci-icon">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <div className="ci-label">总部地址</div>
                <div className="ci-value">{address}</div>
              </div>
            </div>
          ) : null}

          {hours ? (
            <div className="ci-item">
              <div className="ci-icon">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <div>
                <div className="ci-label">工作时间</div>
                <div className="ci-value">{hours}</div>
              </div>
            </div>
          ) : null}

          <div className="office-map">
            <img src="/images/contact-map.jpg" alt="办公地点" />
          </div>
        </div>

        <div className="contact-form-wrap">
          <h2>发送消息</h2>
          <p className="cf-sub">填写以下信息，我们将尽快与您联系。</p>
          <ContactInquiryForm />
        </div>
      </section>
    </>
  );
}
