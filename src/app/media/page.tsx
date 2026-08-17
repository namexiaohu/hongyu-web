import type { Metadata } from 'next';

import { Breadcrumb } from '@/components/shared/breadcrumb';
import { SocialLinks } from '@/components/shared/social-links';
import { socialLinks } from '@/lib/social-links';
import { DEFAULT_SEO_TITLE } from '@/lib/site-config';

export const metadata: Metadata = {
  title: '海外媒体 · 竑宇医疗',
  description: DEFAULT_SEO_TITLE,
};

const pressReleases = [
  {
    date: '2026.07',
    title: '竑宇医疗 V-CLAMP 获 FDA 510(k) 受理通知',
    excerpt:
      '美国 FDA 正式受理 V-CLAMP 血管闭合系统的 510(k) 上市前通知申请，标志着产品进入北美市场的关键一步。',
    tag: '产品注册',
  },
  {
    date: '2026.06',
    title: '竑宇医疗亮相 ECVIM 2024 里昂展会',
    excerpt:
      '在第 33 届欧洲兽医内科学大会上，竑宇医疗展示了 V-CLAMP 最新一代产品及运动医学完整解决方案。',
    tag: '展会活动',
  },
  {
    date: '2026.05',
    title: '竑宇医疗与 Cornell 兽医学院签署临床研究协议',
    excerpt:
      '双方将联合开展 V-CLAMP 在犬脾脏切除术中的多中心随机对照试验，预计 2027 年公布初步结果。',
    tag: '学术合作',
  },
  {
    date: '2026.04',
    title: '竑宇医疗完成 B 轮融资，估值超 10 亿元',
    excerpt: '本轮融资由知名医疗产业基金领投，资金将用于新产品研发、国际注册及市场拓展。',
    tag: '企业融资',
  },
  {
    date: '2026.03',
    title: '竑宇医疗心脏起搏器进入多中心临床试验',
    excerpt:
      '专为中小体型犬猫设计的微型植入式心脏起搏器正式启动临床试验，首批入组 30 例。',
    tag: '产品进展',
  },
];

export default function Page() {
  return (
    <>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: '海外媒体' }]} />
      <section className="press-hero container" data-od-id="hero">
        <p className="eyebrow">Press & Media · 海外媒体</p>
        <h1>媒体中心</h1>
        <p className="lead">竑宇医疗新闻稿、媒体报道、品牌素材及媒体联络信息。</p>
      </section>

      <section className="section" data-od-id="social" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Social Media · 海外社媒</p>
            <h2>关注竑宇医疗</h2>
            <p className="lead">通过以下官方海外社交媒体账号，获取产品动态、学术分享与行业资讯。</p>
          </div>
          <SocialLinks links={socialLinks} variant="page" />
        </div>
      </section>

      <section className="section" data-od-id="releases">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Press Releases · 新闻稿</p>
            <h2>最新动态</h2>
          </div>
          <div className="press-list">
            {pressReleases.map((item) => (
              <div className="press-item" key={item.title}>
                <div className="pi-date">{item.date}</div>
                <div>
                  <div className="pi-title">{item.title}</div>
                  <div className="pi-excerpt">{item.excerpt}</div>
                </div>
                <div className="pi-tag">{item.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" data-od-id="media-kit">
        <div className="container">
          <div className="media-kit">
            <div className="mk-grid">
              <div className="mk-info">
                <p className="eyebrow">Media Kit · 品牌素材</p>
                <h2>媒体资源包下载</h2>
                <p>包含竑宇医疗品牌标识、产品图片、企业介绍等媒体素材，供新闻报导与学术引用使用。</p>
                <div className="mk-downloads">
                  {[
                    ['品牌标识包（Logo + 规范）', 'ZIP · 12 MB'],
                    ['产品图片集（V-CLAMP 系列）', 'ZIP · 45 MB'],
                    ['企业介绍（中英文版）', 'PDF · 3.2 MB'],
                  ].map(([name, size]) => (
                    <div className="mk-dl-item" key={name}>
                      <div className="mdi-left">
                        <div className="mdi-icon">
                          <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                          </svg>
                        </div>
                        <div>
                          <div className="mdi-name">{name}</div>
                          <div className="mdi-size">{size}</div>
                        </div>
                      </div>
                      <a href="/media" className="mdi-dl">
                        下载 →
                      </a>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mk-preview">
                <img src="/images/media-camera.jpg" alt="Media Kit Preview" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" data-od-id="press-contact">
        <div className="container">
          <div className="section-header">
            <p className="eyebrow">Press Contact · 媒体联络</p>
            <h2>媒体问询</h2>
            <p className="lead">媒体采访、新闻稿索取或品牌授权事宜，请联系以下媒体专员。</p>
          </div>
          <div className="press-contact">
            <div className="pc-card">
              <h3>中文媒体</h3>
              <div className="pc-row">
                <div className="pc-icon">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div>
                  <div className="pc-label">媒体专员</div>
                  <div className="pc-value">周某某</div>
                </div>
              </div>
              <div className="pc-row">
                <div className="pc-icon">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <div className="pc-label">邮箱</div>
                  <div className="pc-value">
                    <a href="mailto:press-cn@hongyu-medical.com">press-cn@hongyu-medical.com</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="pc-card">
              <h3>International Media</h3>
              <div className="pc-row">
                <div className="pc-icon">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div>
                  <div className="pc-label">Press Officer</div>
                  <div className="pc-value">Sarah Mitchell</div>
                </div>
              </div>
              <div className="pc-row">
                <div className="pc-icon">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <div className="pc-label">Email</div>
                  <div className="pc-value">
                    <a href="mailto:press-intl@hongyu-medical.com">press-intl@hongyu-medical.com</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
