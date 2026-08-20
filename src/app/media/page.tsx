import type { Metadata } from 'next';
import Link from 'next/link';

import { DEFAULT_SEO_TITLE } from '@/lib/site-config';

export const metadata: Metadata = {
  title: '海外社媒',
  description: DEFAULT_SEO_TITLE,
};

const platforms = [
  {
    key: 'linkedin',
    name: 'LinkedIn',
    handle: '@hongyu-medical',
    href: 'https://www.linkedin.com/company/hongyu-medical',
    icon: (
      <svg viewBox="0 0 24 24" fill="#fff" width="26" height="26">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    iconBg: '#0A66C2',
  },
  {
    key: 'youtube',
    name: 'YouTube',
    handle: '@HONGYUMedical',
    href: 'https://www.youtube.com/@hongyumedical',
    icon: (
      <svg viewBox="0 0 24 24" fill="#fff" width="26" height="26">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    iconBg: '#FF0000',
  },
  {
    key: 'facebook',
    name: 'Facebook',
    handle: '/HONGYUMedical',
    href: 'https://www.facebook.com/hongyumedical',
    icon: (
      <svg viewBox="0 0 24 24" fill="#fff" width="26" height="26">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    iconBg: '#1877F2',
  },
  {
    key: 'instagram',
    name: 'Instagram',
    handle: '@hongyu_medical',
    href: 'https://www.instagram.com/hongyumedical',
    icon: (
      <svg viewBox="0 0 24 24" fill="#fff" width="26" height="26">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
    iconBg: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
  },
  {
    key: 'twitter',
    name: 'X (Twitter)',
    handle: '@HONGYUMedical',
    href: 'https://twitter.com/hongyumedical',
    icon: (
      <svg viewBox="0 0 24 24" fill="#fff" width="26" height="26">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    iconBg: '#0f172a',
    iconBorder: true,
  },
  {
    key: 'wechat',
    name: '微信公众号',
    handle: '竑宇医疗 HONGYU',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="#fff" width="26" height="26">
        <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm3.31 4.244c-1.797-.082-3.618.436-5.06 1.632-1.373 1.14-2.28 2.992-2.046 5.076.234 2.084 1.706 3.795 3.582 4.568.67.276 1.38.422 2.098.422a7.2 7.2 0 001.95-.27.72.72 0 01.598.082l1.58.926a.272.272 0 00.14.045c.133 0 .241-.11.241-.245 0-.06-.024-.12-.04-.178l-.325-1.233a.492.492 0 01.178-.554C20.22 19.026 21.34 17.328 21.34 15.43c0-3.292-2.987-5.115-6.432-5.195zm-2.09 3.038c.534 0 .967.44.967.982a.975.975 0 01-.967.983.975.975 0 01-.967-.983c0-.542.433-.982.967-.982zm4.844 0c.534 0 .967.44.967.982a.975.975 0 01-.967.983.975.975 0 01-.967-.983c0-.542.433-.982.967-.982z" />
      </svg>
    ),
    iconBg: '#07C160',
  },
];

const contacts = [
  {
    region: '欧洲区',
    sub: 'Europe · 慕尼黑办事处',
    items: [
      { label: '邮箱', value: 'europe@hongyu-medical.com', href: 'mailto:europe@hongyu-medical.com' },
      { label: '电话', value: '+49 89 XXXX XXXX' },
      { label: '地址', value: 'Munich, Germany' },
    ],
  },
  {
    region: '北美区',
    sub: 'North America · 纽约办事处',
    items: [
      { label: '邮箱', value: 'na@hongyu-medical.com', href: 'mailto:na@hongyu-medical.com' },
      { label: '电话', value: '+1 212 XXX XXXX' },
      { label: '地址', value: 'New York, USA' },
    ],
  },
  {
    region: '亚太区',
    sub: 'Asia Pacific · 东京办事处',
    items: [
      { label: '邮箱', value: 'apac@hongyu-medical.com', href: 'mailto:apac@hongyu-medical.com' },
      { label: '电话', value: '+81 3 XXXX XXXX' },
      { label: '地址', value: 'Tokyo, Japan' },
    ],
  },
  {
    region: '全球商务合作',
    sub: 'Global Partnership',
    items: [
      { label: '邮箱', value: 'partnerships@hongyu-medical.com', href: 'mailto:partnerships@hongyu-medical.com' },
      { label: '响应时间', value: '3 个工作日内回复' },
      { label: '工作语言', value: 'English / 中文 / Deutsch / 日本語' },
    ],
  },
];

const posts = [
  {
    platform: 'LinkedIn',
    title: '竑宇医疗亮相 EuroTier 2025，展示新一代 V-CLAMP 产品',
    date: '2025.11',
    image: '/images/media-camera.jpg',
  },
  {
    platform: 'YouTube',
    title: 'V-CLAMP 操作教学视频 — 标准闭合流程演示',
    date: '2025.10',
    image: '/images/partnership-meeting.jpg',
  },
  {
    platform: 'Instagram',
    title: 'CFVC 2025 回顾 — 来自全球术者的精彩瞬间',
    date: '2025.08',
    image: '/images/history-ceremony.jpg',
  },
];

export default function Page() {
  return (
    <div className="page-media-dark" style={{ background: '#0f172a', color: '#f1f5f9', minHeight: '100vh' }}>

      {/* Hero（面包屑在内部，与 summit 保持一致） */}
      <section className="pmd-hero">
        <div className="pmd-breadcrumb container">
          <Link href="/">首页</Link>
          <span>/</span>
          <span>海外社媒</span>
        </div>
        <div className="pmd-hero-inner">
          <div className="pmd-hero-icon">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="32" height="32" stroke="currentColor">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>
          <div className="pmd-hero-eyebrow">Social Media · 海外社媒</div>
          <h1>关注竑宇医疗</h1>
          <p>在各大海外社交平台关注我们，获取最新产品动态、临床案例分享与行业会议资讯。</p>
        </div>
      </section>

      <div className="container">

        {/* Platforms */}
        <section className="pmd-section">
          <p className="pmd-eyebrow">Follow Us · 社交平台</p>
          <h2>海外社交媒体</h2>
          <p className="pmd-sub">选择您常用的平台，与我们保持连接。</p>
          <div className="pmd-platform-grid">
            {platforms.map((p) => (
              <a
                key={p.key}
                href={p.href}
                className={`pmd-platform-card pmd-pc-${p.key}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  className="pmd-pc-icon"
                  style={{
                    background: p.iconBg,
                    border: p.iconBorder ? '1px solid var(--border)' : undefined,
                  }}
                >
                  {p.icon}
                </div>
                <div className="pmd-pc-info">
                  <div className="pmd-pc-name">{p.name}</div>
                  <div className="pmd-pc-handle">{p.handle}</div>
                </div>
                <span className="pmd-pc-arrow">→</span>
              </a>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="pmd-section pmd-section-border">
          <p className="pmd-eyebrow">Contact · 海外联系</p>
          <h2>海外业务联系方式</h2>
          <p className="pmd-sub">按区域联系对应办事处，或直接发送邮件至全球商务合作邮箱。</p>
          <div className="pmd-contact-grid">
            {contacts.map((c) => (
              <div key={c.region} className="pmd-contact-card">
                <h3>{c.region}</h3>
                <div className="pmd-cc-region">{c.sub}</div>
                {c.items.map((item) => (
                  <div key={item.label} className="pmd-cc-item">
                    <div className="pmd-cc-label">{item.label}</div>
                    <div className="pmd-cc-value">
                      {item.href ? <a href={item.href}>{item.value}</a> : item.value}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* Recent Posts */}
        <section className="pmd-section pmd-section-border">
          <p className="pmd-eyebrow">Recent · 最新动态</p>
          <h2>社媒精选内容</h2>
          <p className="pmd-sub">来自各平台的最新精彩内容。</p>
          <div className="pmd-posts-grid">
            {posts.map((post) => (
              <div key={post.title} className="pmd-post-card">
                <div className="pmd-post-img">
                  <img src={post.image} alt="" />
                  <span className="pmd-post-badge">{post.platform}</span>
                </div>
                <div className="pmd-post-body">
                  <div className="pmd-post-title">{post.title}</div>
                  <div className="pmd-post-date">{post.date}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="pmd-cta-section">
          <div className="pmd-cta-inner">
            <p className="pmd-eyebrow" style={{ marginBottom: 'var(--space-4)' }}>Partnership · 商务合作</p>
            <h2>成为我们的海外合作伙伴</h2>
            <p>无论您是经销商、学术机构还是产业伙伴，我们都期待与您建立长期合作。</p>
            <Link href="/partnership" className="pmd-btn-cta">
              洽谈合作
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
