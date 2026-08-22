import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Breadcrumb } from '@/components/shared/breadcrumb';
import { StatsBar } from '@/components/shared/stats-bar';
import { SplitBackgroundHero } from '@/components/shared/split-background-hero';
import { ProductGallery } from '@/components/product/product-gallery';
import { buildHeroMediaSlides } from '@/lib/hero-media-slides';
import { getStorefrontLocaleContext } from '@/lib/i18n-server';
import { DEFAULT_SEO_TITLE } from '@/lib/site-config';
import { getStorefrontPartnerCenterBySlug } from '@/lib/storefront-partner-centers-api';

type PageProps = {
  params: Promise<{ slug: string }>;
};

const locationPinSvg = `<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;

const gradeShort: Record<string, string> = {
  platinum: '铂金',
  gold: '金',
  silver: '银',
};

function formatCount(value: number) {
  return value.toLocaleString('en-US');
}

function surgeonSubtitle(input: {
  position: string;
  certificationYear: number | null;
  surgeryCount: number | null;
}) {
  const parts: string[] = [];
  if (input.position.trim()) parts.push(input.position.trim());
  if (input.certificationYear != null) parts.push(`${input.certificationYear} 年认证`);
  if (input.surgeryCount != null) parts.push(`${formatCount(input.surgeryCount)} 手术`);
  return parts.join(' · ');
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { locale } = await getStorefrontLocaleContext();
  const center = await getStorefrontPartnerCenterBySlug(slug, locale);
  if (!center) return { title: 'Not Found' };
  return {
    title: `${center.name} · 合作中心`,
    description: center.description || DEFAULT_SEO_TITLE,
  };
}

export default async function PartnerCenterDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const { locale } = await getStorefrontLocaleContext();
  const center = await getStorefrontPartnerCenterBySlug(slug, locale);
  if (!center) notFound();

  const hasContact =
    Boolean(center.address.trim())
    || Boolean(center.businessHours.trim())
    || Boolean(center.contact.trim())
    || Boolean(center.email.trim())
    || Boolean(center.website.trim());

  const websiteHref = center.website.trim()
    ? (center.website.startsWith('http') ? center.website : `https://${center.website}`)
    : '';

  const slides = buildHeroMediaSlides({
    id: center.slug,
    name: center.name,
    videoUrl: center.videoUrl,
    coverUrl: center.coverImage,
    coverAlt: center.name,
    gallery: center.gallery,
  });
  const showHeroMedia = Boolean(center.showCoverOnBackground && slides.length);

  return (
    <>
      <Breadcrumb
        items={[
          { label: '首页', href: '/' },
          { label: '合作中心', href: '/centers' },
          { label: center.name },
        ]}
      />

      <SplitBackgroundHero
        backgroundImage={center.backgroundImage}
        backgroundSolidCss={center.backgroundSolidCss}
        heroCopyStyle={center.heroCopyStyle}
        showCover={showHeroMedia}
        coverSlot={showHeroMedia ? <ProductGallery slides={slides} alt={center.name} /> : undefined}
      >
        {center.badgeText ? <div className="ch-type">{center.badgeText}</div> : null}
        <div className="ch-name">{center.name}</div>
        {center.location ? (
          <div
            className="ch-location"
            dangerouslySetInnerHTML={{ __html: `${locationPinSvg}${center.location}` }}
          />
        ) : null}
      </SplitBackgroundHero>

      {center.stats.length > 0 ? (
        <div className="container center-stats-wrap" data-od-id="stats">
          <StatsBar stats={center.stats} />
        </div>
      ) : null}

      <div className="container center-detail-body">
        <div className="two-col">
          <div className="main-content">
            {center.detailDescription.trim() ? (
              <section data-od-id="about">
                <p className="eyebrow" style={{ marginBottom: 'var(--space-3)' }}>About · 中心简介</p>
                <h2 className="center-section-title">{`关于${center.name}`}</h2>
                <div
                  className="rich-content"
                  dangerouslySetInnerHTML={{ __html: center.detailDescription }}
                />
              </section>
            ) : null}

            {center.surgeons.length > 0 ? (
              <section className="center-surgeons-section" data-od-id="surgeons">
                <p className="eyebrow" style={{ marginBottom: 'var(--space-3)' }}>Surgeons · 本中心认证术者</p>
                <h2 className="center-section-title center-section-title-tight">
                  {`${center.surgeons.length} 位认证术者`}
                </h2>
                <div className="surgeon-list">
                  {center.surgeons.map((surgeon) => {
                    const subtitle = surgeonSubtitle(surgeon);
                    return (
                      <Link key={surgeon.slug} href={`/surgeons/${surgeon.slug}`} className="surgeon-item">
                        <div className="si-avatar">
                          {surgeon.avatar ? <img src={surgeon.avatar} alt={surgeon.name} /> : null}
                        </div>
                        <div className="si-body">
                          <div className="si-name">{surgeon.name}</div>
                          {subtitle ? <div className="si-title">{subtitle}</div> : null}
                        </div>
                        {surgeon.gradeTitle || gradeShort[surgeon.gradeKey] ? (
                          <span className={`si-badge ${surgeon.gradeKey}`}>
                            {gradeShort[surgeon.gradeKey] ?? surgeon.gradeTitle}
                          </span>
                        ) : null}
                      </Link>
                    );
                  })}
                </div>
              </section>
            ) : null}
          </div>

          <aside className="sidebar" data-od-id="sidebar">
            {hasContact ? (
              <div className="sidebar-card">
                <div className="sc-label">联系方式</div>
                <div className="sc-rows">
                  {center.address.trim() ? (
                    <div>
                      <div className="sc-row-key">地址</div>
                      <div className="sc-row-value">{center.address}</div>
                    </div>
                  ) : null}
                  {center.businessHours.trim() ? (
                    <div>
                      <div className="sc-row-key">营业时间</div>
                      <div className="sc-row-value">{center.businessHours}</div>
                    </div>
                  ) : null}
                  {center.contact.trim() ? (
                    <div>
                      <div className="sc-row-key">联系方式</div>
                      <div className="sc-row-value">{center.contact}</div>
                    </div>
                  ) : null}
                  {center.email.trim() ? (
                    <div>
                      <div className="sc-row-key">邮箱</div>
                      <div className="sc-row-value">
                        <a href={`mailto:${center.email}`}>{center.email}</a>
                      </div>
                    </div>
                  ) : null}
                  {websiteHref ? (
                    <div>
                      <div className="sc-row-key">网址</div>
                      <div className="sc-row-value">
                        <a href={websiteHref} target="_blank" rel="noreferrer">
                          {center.website.replace(/^https?:\/\//, '')}
                        </a>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}

            {center.cooperationInfo.length > 0 ? (
              <div className="sidebar-card">
                <div className="sc-label">合作信息</div>
                <div className="sc-rows">
                  {center.cooperationInfo.map((row) => (
                    <div key={`${row.label}-${row.value}`}>
                      <div className="sc-row-key">{row.label}</div>
                      <div className="sc-row-value">{row.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {center.regionLabel ? (
              <div className="sidebar-card">
                <div className="sc-label">所属区域</div>
                <div className="sc-value">{center.regionLabel}</div>
              </div>
            ) : null}
          </aside>
        </div>
      </div>

      {center.relatedCenters.length > 0 ? (
        <section className="section related-centers-section" data-od-id="related">
          <div className="container">
            <p className="eyebrow" style={{ marginBottom: 'var(--space-3)' }}>Related · 同区域其他中心</p>
            <h2 className="center-section-title">
              {`${center.regionLabel}其他合作中心`}
            </h2>
            <div className="related-centers-grid">
              {center.relatedCenters.map((peer) => (
                <Link key={peer.slug} href={`/centers/${peer.slug}`} className="related-center">
                  <div className="rc-img">
                    {peer.coverImage ? <img src={peer.coverImage} alt={peer.name} /> : null}
                  </div>
                  <div className="rc-body">
                    <div className="rc-name">{peer.name}</div>
                    {peer.location ? <div className="rc-location">{peer.location}</div> : null}
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
