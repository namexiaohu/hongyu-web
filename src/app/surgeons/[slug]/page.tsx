import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Breadcrumb } from '@/components/shared/breadcrumb';
import { getStorefrontLocaleContext } from '@/lib/i18n-server';
import { DEFAULT_SEO_TITLE } from '@/lib/site-config';
import { getStorefrontSurgeonBySlug } from '@/lib/storefront-surgeons-api';

type PageProps = {
  params: Promise<{ slug: string }>;
};

const badgeSymbols: Record<string, string> = {
  platinum: '◆',
  gold: '★',
  silver: '●',
};

function formatCount(value: number) {
  return value.toLocaleString('en-US');
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { locale } = await getStorefrontLocaleContext();
  const surgeon = await getStorefrontSurgeonBySlug(slug, locale);
  if (!surgeon) return { title: 'Not Found' };
  return {
    title: `${surgeon.name} · 认证术者`,
    description: surgeon.expertise || surgeon.experience || DEFAULT_SEO_TITLE,
  };
}

export default async function SurgeonDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const { locale } = await getStorefrontLocaleContext();
  const surgeon = await getStorefrontSurgeonBySlug(slug, locale);
  if (!surgeon) notFound();

  const titleLine = [surgeon.position, surgeon.institution].filter(Boolean).join(' · ');
  const hasStats = surgeon.certificationYear != null || surgeon.surgeryCount != null;
  const hasCertInfo =
    Boolean(surgeon.gradeTitle)
    || surgeon.certificationYear != null
    || surgeon.surgeryCount != null
    || surgeon.otherCertifications.length > 0;
  const firstCenter = surgeon.partnerCenters[0] ?? null;

  return (
    <>
      <Breadcrumb
        items={[
          { label: '首页', href: '/' },
          { label: '认证术者', href: '/surgeons' },
          { label: surgeon.name },
        ]}
      />

      <section className="profile-hero container" data-od-id="hero">
        <div className="profile-hero-inner">
          {surgeon.avatar ? (
            <div className="profile-avatar">
              <img src={surgeon.avatar} alt={surgeon.name} />
            </div>
          ) : null}
          <div className="profile-info">
            <div className="pi-name">{surgeon.name}</div>
            {titleLine ? <div className="pi-title">{titleLine}</div> : null}
            {surgeon.gradeTitle ? (
              <div className={`pi-badge ${surgeon.gradeKey}`}>
                {badgeSymbols[surgeon.gradeKey] ?? ''} {surgeon.gradeTitle}
              </div>
            ) : null}
            {hasStats ? (
              <div className="pi-stats">
                {surgeon.certificationYear != null ? (
                  <div className="pi-stat">
                    <span className="ps-num">{surgeon.certificationYear}</span>
                    <span className="ps-label">认证年份</span>
                  </div>
                ) : null}
                {surgeon.surgeryCount != null ? (
                  <div className="pi-stat">
                    <span className="ps-num">{formatCount(surgeon.surgeryCount)}</span>
                    <span className="ps-label">累计手术</span>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <div className="container surgeon-detail-body">
        <div className="two-col">
          <div className="main-content">
            {surgeon.detailDescription.trim() ? (
              <section data-od-id="about">
                <p className="eyebrow" style={{ marginBottom: 'var(--space-3)' }}>About · 术者简介</p>
                <h2 className="surgeon-section-title">个人简介</h2>
                <div
                  className="rich-content"
                  dangerouslySetInnerHTML={{ __html: surgeon.detailDescription }}
                />
              </section>
            ) : null}
          </div>

          <aside className="sidebar" data-od-id="sidebar">
            {surgeon.partnerCenters.length > 0 ? (
              <div className="sidebar-card">
                <div className="sc-label">从属合作中心</div>
                <div className="sc-centers">
                  {surgeon.partnerCenters.map((center) => (
                    <div key={center.slug} className="sc-center-item">
                      <div className="sc-value">
                        <Link href={`/centers/${center.slug}`}>{center.name}</Link>
                      </div>
                      {center.badgeText ? <div className="sc-meta">{center.badgeText}</div> : null}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {hasCertInfo ? (
              <div className="sidebar-card">
                <div className="sc-label">认证信息</div>
                <div className="sc-cert-rows">
                  {surgeon.gradeTitle ? (
                    <div className="sc-cert-row">
                      <span className="sc-cert-key">认证等级</span>
                      <span className={`pi-badge ${surgeon.gradeKey} pi-badge-sm`}>
                        {surgeon.gradeTitle}
                      </span>
                    </div>
                  ) : null}
                  {surgeon.certificationYear != null ? (
                    <div className="sc-cert-row">
                      <span className="sc-cert-key">认证年份</span>
                      <span className="sc-cert-value">{surgeon.certificationYear}</span>
                    </div>
                  ) : null}
                  {surgeon.surgeryCount != null ? (
                    <div className="sc-cert-row">
                      <span className="sc-cert-key">累计手术</span>
                      <span className="sc-cert-value">{formatCount(surgeon.surgeryCount)}</span>
                    </div>
                  ) : null}
                  {surgeon.otherCertifications.map((row) => (
                    <div key={`${row.label}-${row.value}`} className="sc-cert-row">
                      <span className="sc-cert-key">{row.label}</span>
                      <span className="sc-cert-value">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {surgeon.specialties.length > 0 ? (
              <div className="sidebar-card">
                <div className="sc-label">专业方向</div>
                <div className="sc-specialty-tags">
                  {surgeon.specialties.map((item) => (
                    <span key={item} className="sc-specialty-tag">{item}</span>
                  ))}
                </div>
              </div>
            ) : null}

            {firstCenter ? (
              <div className="sidebar-card sidebar-card-muted">
                <div className="sc-label">联系术者</div>
                <p className="sc-contact-copy">
                  如需预约手术咨询或学术交流，请通过所属医院联系。
                </p>
                <Link href={`/centers/${firstCenter.slug}`} className="sc-contact-link">
                  前往医院主页 →
                </Link>
              </div>
            ) : null}
          </aside>
        </div>
      </div>

      {surgeon.relatedSurgeons.length > 0 ? (
        <section className="section related-surgeons-section" data-od-id="related">
          <div className="container">
            <p className="eyebrow" style={{ marginBottom: 'var(--space-3)' }}>Related · 同中心术者</p>
            <h2 className="surgeon-section-title">
              {firstCenter ? `${firstCenter.name}其他术者` : '同中心其他术者'}
            </h2>
            <div className="related-surgeons-grid">
              {surgeon.relatedSurgeons.map((peer) => (
                <Link key={peer.slug} href={`/surgeons/${peer.slug}`} className="related-surgeon">
                  <div className="rs-avatar">
                    {peer.avatar ? <img src={peer.avatar} alt={peer.name} /> : null}
                  </div>
                  <div>
                    <div className="rs-name">{peer.name}</div>
                    {peer.position ? <div className="rs-title">{peer.position}</div> : null}
                    {peer.gradeTitle ? (
                      <div className={`pi-badge ${peer.gradeKey} pi-badge-sm rs-grade`}>
                        {badgeSymbols[peer.gradeKey] ?? ''} {peer.gradeTitle}
                      </div>
                    ) : null}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
