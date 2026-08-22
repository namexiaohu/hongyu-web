import type { Metadata } from 'next';
import Link from 'next/link';

import { PartnershipInquiryForm } from '@/components/partnership/partnership-inquiry-form';
import { resolveCompanyName } from '@/lib/company-display';
import { escapeHtml, telHref } from '@/lib/contact-display';
import { getStorefrontLocaleContext } from '@/lib/i18n-server';
import { DEFAULT_SEO_TITLE } from '@/lib/site-config';
import { getStorefrontCompanyProfile } from '@/lib/storefront-company-api';

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getStorefrontLocaleContext();
  const isZh = locale.toLowerCase().startsWith('zh');
  return {
    title: isZh ? '商务合作' : 'Partnership',
    description: DEFAULT_SEO_TITLE,
  };
}

const coopTypesHtml = `<div class="container" data-od-id="coop-types">
      <div class="coop-types">
        <div class="coop-card">
          <div class="cc-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
          <h3>渠道分销</h3>
          <p>成为区域授权经销商，拓展本地市场</p>
        </div>
        <div class="coop-card">
          <div class="cc-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg></div>
          <h3>学术合作</h3>
          <p>联合开展临床研究与学术推广项目</p>
        </div>
        <div class="coop-card">
          <div class="cc-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></div>
          <h3>OEM / ODM</h3>
          <p>定制化产品设计与生产制造服务</p>
        </div>
        <div class="coop-card">
          <div class="cc-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg></div>
          <h3>战略投资</h3>
          <p>面向机构投资者的股权合作机会</p>
        </div>
      </div>
    </div>`;

function partnershipContactsHtml(hotline: string, email: string) {
  const blocks: string[] = [];
  const hotlineLink = telHref(hotline);
  if (hotline) {
    const value = hotlineLink
      ? `<a href="tel:${escapeHtml(hotlineLink)}">${escapeHtml(hotline)}</a>`
      : escapeHtml(hotline);
    blocks.push(`<div class="fi-contact"><div class="fic-label">商务热线</div><div class="fic-value">${value}</div></div>`);
  }
  if (email) {
    blocks.push(`<div class="fi-contact" style="margin-top:var(--space-4);"><div class="fic-label">商务邮箱</div><div class="fic-value"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div></div>`);
  }
  return blocks.join('\n            ');
}

function partnershipFormInfoHtml(contacts: string) {
  return `<p class="eyebrow">Inquiry · 合作询盘</p>
            <h2>填写合作意向</h2>
            <p>我们的商务团队将在 2 个工作日内审阅您的信息，并由专属客户经理与您联系。</p>
            <ul class="fi-list">
              <li>提供详细的公司背景与业务需求，有助于我们更快匹配合作方案</li>
              <li>所有信息严格保密，仅用于商务沟通目的</li>
              <li>如需紧急沟通，请直接拨打商务热线</li>
            </ul>
            ${contacts}`;
}

function buildPartnershipHeroLead(companyName: string, isZh: boolean) {
  const org = companyName.trim();
  if (isZh) {
    return org
      ? `${org}开放多种合作模式，期待与全球兽医学界、产业伙伴及投资机构建立长期共赢的合作关系。`
      : '我们开放多种合作模式，期待与全球兽医学界、产业伙伴及投资机构建立长期共赢的合作关系。';
  }
  return org
    ? `${org} welcomes partnerships with veterinary institutions, industry partners, and investors worldwide.`
    : 'We welcome partnerships with veterinary institutions, industry partners, and investors worldwide.';
}

export default async function Page() {
  const { locale } = await getStorefrontLocaleContext();
  const isZh = locale.toLowerCase().startsWith('zh');
  const company = await getStorefrontCompanyProfile(locale);
  const companyName = resolveCompanyName(company, locale);
  const contacts = partnershipContactsHtml(company.businessHotline.trim(), company.businessEmail.trim());
  const pageTitle = isZh ? '商务合作' : 'Partnership';

  return (
    <>
      <div className="breadcrumb container">
        <Link href="/">首页</Link>
        <span>/</span>
        <span style={{ color: 'var(--fg)' }}>{pageTitle}</span>
      </div>

      <section className="hero-dark" data-od-id="hero">
        <div className="container hero-dark-content">
          <div>
            <div className="ph-eyebrow">Business Partnership · {pageTitle}</div>
            <h1>
              {isZh ? (
                <>携手共建宠物医疗<br />产业生态</>
              ) : (
                <>Building the future of<br />veterinary partnerships</>
              )}
            </h1>
            <p>{buildPartnershipHeroLead(companyName, isZh)}</p>
          </div>
          <div className="hero-dark-img">
            <img src="/images/partnership-handshake.jpg" alt={pageTitle} />
          </div>
        </div>
      </section>

      <div dangerouslySetInnerHTML={{ __html: coopTypesHtml }} />

      <section className="form-section" data-od-id="form">
        <div className="container">
          <div className="form-layout">
            <div
              className="form-info"
              dangerouslySetInnerHTML={{ __html: partnershipFormInfoHtml(contacts) }}
            />
            <PartnershipInquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
