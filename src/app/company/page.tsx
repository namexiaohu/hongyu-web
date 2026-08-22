import type { Metadata } from 'next';

import { Breadcrumb } from '@/components/shared/breadcrumb';
import { resolveCompanyName } from '@/lib/company-display';
import { getStorefrontLocaleContext } from '@/lib/i18n-server';
import { DEFAULT_SEO_DESCRIPTION } from '@/lib/site-config';
import { getStorefrontCompanyProfile } from '@/lib/storefront-company-api';

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getStorefrontLocaleContext();
  const data = await getStorefrontCompanyProfile(locale);
  const isZh = locale.toLowerCase().startsWith('zh');
  return {
    title: isZh ? '企业信息' : 'Company Information',
    description: data.positioning || DEFAULT_SEO_DESCRIPTION,
  };
}

const pinSvg = (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const phoneSvg = (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const mailSvg = (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const userSvg = (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const fileSvg = (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

export default async function Page() {
  const { locale } = await getStorefrontLocaleContext();
  const data = await getStorefrontCompanyProfile(locale);
  const hasTeam = data.executives.length > 0 || data.managers.length > 0;
  const isZh = locale.toLowerCase().startsWith('zh');
  const companyName = resolveCompanyName(data, locale);
  const heroEyebrow = isZh ? 'Corporate Information · 企业信息' : 'Corporate Information';
  const heroTitle = isZh ? '企业信息' : 'Company Information';
  const heroLead = isZh
    ? `${companyName}工商注册信息、组织架构与公开文件。`
    : `Business registration, organizational structure, and public documents for ${companyName}.`;

  return (
    <>
      <Breadcrumb
        items={[
          { label: isZh ? '首页' : 'Home', href: '/' },
          { label: isZh ? '联系我们' : 'Contact Us', href: '/contact' },
          { label: heroTitle },
        ]}
      />
      <section className="page-hero" data-od-id="hero">
        <div className="container">
          <p className="eyebrow">{heroEyebrow}</p>
          <h1>{heroTitle}</h1>
          <p className="lead">{heroLead}</p>
        </div>
      </section>

      {data.basicInfo.length > 0 ? (
        <section className="section" data-od-id="registration">
          <div className="container">
            <div className="section-header">
              <p className="eyebrow">Registration</p>
              <h2>Company profile</h2>
            </div>
            <table className="info-table">
              <tbody>
                {data.basicInfo.map((row) => (
                  <tr key={`${row.label}-${row.value}`}>
                    <th>{row.label}</th>
                    <td>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {hasTeam ? (
        <section className="section" data-od-id="org" style={{ background: 'var(--border-soft)' }}>
          <div className="container">
            <div className="section-header">
              <p className="eyebrow">Organization</p>
              <h2>Leadership team</h2>
            </div>
            <div className="org-chart">
              {data.executives.length > 0 ? (
                <div className="org-level">
                  {data.executives.map((member) => (
                    <div className="org-node primary" key={`${member.title}-${member.name}`}>
                      <div className="on-title">{member.title}</div>
                      <div className="on-name">{member.name}</div>
                    </div>
                  ))}
                </div>
              ) : null}
              {data.managers.length > 0 ? (
                <div className="org-level">
                  {data.managers.map((member) => (
                    <div className="org-node" key={`${member.title}-${member.name}`}>
                      <div className="on-title">{member.title}</div>
                      <div className="on-name">{member.name}</div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {data.offices.length > 0 ? (
        <section className="section" data-od-id="offices">
          <div className="container">
            <div className="section-header">
              <p className="eyebrow">Offices</p>
              <h2>Global offices</h2>
            </div>
            <div className="grid-3">
              {data.offices.map((office) => (
                <div className="office-card" key={`${office.name}-${office.location}`}>
                  {office.coverImage ? (
                    <div className="office-card-img">
                      <img src={office.coverImage} alt={office.name} />
                    </div>
                  ) : null}
                  <div className="office-card-body">
                    {office.name ? <h3>{office.name}</h3> : null}
                    {office.location ? (
                      <div className="oc-row">{pinSvg}{office.location}</div>
                    ) : null}
                    {office.phone ? (
                      <div className="oc-row">{phoneSvg}{office.phone}</div>
                    ) : null}
                    {office.contactPerson ? (
                      <div className="oc-row">{userSvg}{office.contactPerson}</div>
                    ) : null}
                    {office.email ? (
                      <div className="oc-row">{mailSvg}{office.email}</div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {data.publicFiles.length > 0 ? (
        <section className="section" data-od-id="documents" style={{ background: 'var(--border-soft)' }}>
          <div className="container">
            <div className="section-header">
              <p className="eyebrow">Documents</p>
              <h2>Public documents</h2>
            </div>
            <div className="doc-list">
              {data.publicFiles.map((file) => (
                <div className="doc-item" key={`${file.name}-${file.url}`}>
                  <div className="di-info">
                    <div className="di-icon">{fileSvg}</div>
                    <div>
                      <div className="di-name">{file.name || 'Document'}</div>
                    </div>
                  </div>
                  <a href={file.url} className="di-download" target="_blank" rel="noreferrer">
                    Download →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
