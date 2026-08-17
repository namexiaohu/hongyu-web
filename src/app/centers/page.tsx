import type { Metadata } from 'next';

import { DirectoryPage } from '@/components/templates/directory-page';
import { DEFAULT_SEO_TITLE } from '@/lib/site-config';

export const metadata: Metadata = {
  title: '合作中心 · 竑宇医疗',
  description: DEFAULT_SEO_TITLE,
};

const bodyHtml = `<!-- WORLD MAP -->
    <section class="section" data-od-id="map" style="padding-top: 0;">
      <div class="container">
        <div class="map-section">
          <div class="map-visual">
            <div class="map-dots">
              <!-- Asia Pacific -->
              <div class="map-dot large" style="top:35%;left:72%;" data-label="北京"></div>
              <div class="map-dot" style="top:42%;left:75%;" data-label="上海"></div>
              <div class="map-dot" style="top:38%;left:78%;" data-label="东京"></div>
              <div class="map-dot" style="top:40%;left:76%;" data-label="首尔"></div>
              <div class="map-dot" style="top:55%;left:74%;" data-label="新加坡"></div>
              <!-- Europe -->
              <div class="map-dot large" style="top:28%;left:48%;" data-label="慕尼黑"></div>
              <div class="map-dot" style="top:32%;left:46%;" data-label="伦敦"></div>
              <div class="map-dot" style="top:35%;left:50%;" data-label="里昂"></div>
              <div class="map-dot" style="top:30%;left:52%;" data-label="苏黎世"></div>
              <!-- North America -->
              <div class="map-dot large" style="top:30%;left:22%;" data-label="纽约"></div>
              <div class="map-dot" style="top:35%;left:18%;" data-label="洛杉矶"></div>
              <div class="map-dot" style="top:28%;left:25%;" data-label="多伦多"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ASIA PACIFIC -->
    <section class="region-section" data-od-id="region-apac">
      <div class="container">
        <div class="region-header">
          <h2>亚太地区</h2>
          <span class="rh-count">24 家合作中心</span>
        </div>
        <div class="center-grid">
          <div class="center-card">
            <div class="cc-img">
              <img src="/images/center-1.jpg" alt="">
              <span class="cc-type-badge">临床合作</span>
            </div>
            <div class="cc-body">
              <div class="cc-name">北京伴侣动物中心医院</div>
              <div class="cc-location"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>中国 · 北京</div>
              <div class="cc-desc">国内领先的伴侣动物专科医院，年手术量 5,000+ 台，竑宇 V-CLAMP 核心临床基地。</div>
              <div class="cc-tags"><span class="cc-tag">V-CLAMP</span><span class="cc-tag">外科</span><span class="cc-tag">培训</span></div>
            </div>
          </div>
          <div class="center-card">
            <div class="cc-img">
              <img src="/images/center-2.jpg" alt="">
              <span class="cc-type-badge">研究中心</span>
            </div>
            <div class="cc-body">
              <div class="cc-name">中国农业大学动物医院</div>
              <div class="cc-location"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>中国 · 北京</div>
              <div class="cc-desc">国家重点学科依托单位，承担多项宇产品临床试验与学术研究项目。</div>
              <div class="cc-tags"><span class="cc-tag">临床研究</span><span class="cc-tag">学术</span></div>
            </div>
          </div>
          <div class="center-card">
            <div class="cc-img">
              <img src="/images/center-3.jpg" alt="">
              <span class="cc-type-badge">培训基地</span>
            </div>
            <div class="cc-body">
              <div class="cc-name">东京小动物医疗中心</div>
              <div class="cc-location"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>日本 · 东京</div>
              <div class="cc-desc">日本最大的小动物外科培训中心，竑宇亚太区认证术者培训指定基地。</div>
              <div class="cc-tags"><span class="cc-tag">认证培训</span><span class="cc-tag">运动医学</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- EUROPE -->
    <section class="region-section" data-od-id="region-eu">
      <div class="container">
        <div class="region-header">
          <h2>欧洲</h2>
          <span class="rh-count">18 家合作中心</span>
        </div>
        <div class="center-grid">
          <div class="center-card">
            <div class="cc-img">
              <img src="/images/center-4.jpg" alt="">
              <span class="cc-type-badge">临床合作</span>
            </div>
            <div class="cc-body">
              <div class="cc-name">Tierklinik München</div>
              <div class="cc-location"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>德国 · 慕尼黑</div>
              <div class="cc-desc">德国顶级动物外科医院，竑宇产品 CE 认证关键临床验证基地，年 V-CLAMP 手术量 800+。</div>
              <div class="cc-tags"><span class="cc-tag">V-CLAMP</span><span class="cc-tag">心血管</span></div>
            </div>
          </div>
          <div class="center-card">
            <div class="cc-img">
              <img src="/images/center-5.jpg" alt="">
              <span class="cc-type-badge">研究中心</span>
            </div>
            <div class="cc-body">
              <div class="cc-name">Royal Veterinary College</div>
              <div class="cc-location"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>英国 · 伦敦</div>
              <div class="cc-desc">欧洲顶尖兽医学院，与竑宇联合开展运动医学产品多中心临床试验。</div>
              <div class="cc-tags"><span class="cc-tag">临床试验</span><span class="cc-tag">学术合作</span></div>
            </div>
          </div>
          <div class="center-card">
            <div class="cc-img">
              <img src="/images/center-6.jpg" alt="">
              <span class="cc-type-badge">培训基地</span>
            </div>
            <div class="cc-body">
              <div class="cc-name">VetAgro Sup</div>
              <div class="cc-location"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>法国 · 里昂</div>
              <div class="cc-desc">法国国立兽医学院，竑宇欧洲区认证术者培训与 ECVIM 学术会议合作机构。</div>
              <div class="cc-tags"><span class="cc-tag">ECVIM</span><span class="cc-tag">认证培训</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- NORTH AMERICA -->
    <section class="region-section" data-od-id="region-na">
      <div class="container">
        <div class="region-header">
          <h2>北美</h2>
          <span class="rh-count">16 家合作中心</span>
        </div>
        <div class="center-grid">
          <div class="center-card">
            <div class="cc-img">
              <img src="/images/center-1.jpg" alt="">
              <span class="cc-type-badge">临床合作</span>
            </div>
            <div class="cc-body">
              <div class="cc-name">Cornell Veterinary Hospital</div>
              <div class="cc-location"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>美国 · 纽约州</div>
              <div class="cc-desc">康奈尔大学兽医学院附属医院，竑宇北美 FDA 注册关键临床数据合作机构。</div>
              <div class="cc-tags"><span class="cc-tag">FDA</span><span class="cc-tag">V-CLAMP</span></div>
            </div>
          </div>
          <div class="center-card">
            <div class="cc-img">
              <img src="/images/center-4.jpg" alt="">
              <span class="cc-type-badge">研究中心</span>
            </div>
            <div class="cc-body">
              <div class="cc-name">UC Davis Veterinary Medical Center</div>
              <div class="cc-location"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>美国 · 加州</div>
              <div class="cc-desc">全美排名前列的兽医学院，与竑宇联合开展心脏起搏器临床前研究。</div>
              <div class="cc-tags"><span class="cc-tag">心脏起搏器</span><span class="cc-tag">临床研究</span></div>
            </div>
          </div>
          <div class="center-card">
            <div class="cc-img">
              <img src="/images/center-2.jpg" alt="">
              <span class="cc-type-badge">培训基地</span>
            </div>
            <div class="cc-body">
              <div class="cc-name">Ontario Veterinary College</div>
              <div class="cc-location"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>加拿大 · 安大略</div>
              <div class="cc-desc">加拿大最大兽医学院，宇北美区认证培训与学术交流核心合作伙伴。</div>
              <div class="cc-tags"><span class="cc-tag">认证培训</span><span class="cc-tag">学术</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section" id="contact" data-od-id="cta">
      <div class="container">
        <div class="cta-strip">
          <p class="eyebrow" style="color: rgba(255,255,255,0.5); margin-bottom: var(--space-4);">Partner · 成为合作伙伴</p>
          <h2>加入全球合作网络</h2>
          <p class="lead">如果您的医院或研究机构希望与竑宇医疗建立合作，欢迎联系我们。</p>
          <a href="mailto:partnerships@hongyu-medical.com" class="btn-cta-white">
            申请合作
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </section>`;

export default function Page() {
  return (
    <DirectoryPage
      breadcrumbs={[{ label: '首页', href: '/' }, { label: '全球布局', href: '/centers' }, { label: '合作中心' }]}
      hero={{
        eyebrow: 'Partner Centers · 合作中心',
        title: '全球合作医院与研究中心',
        lead: "与全球顶尖动物医院及研究机构共建临床合作网络，推动循证医学与技术创新。",
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </DirectoryPage>
  );
}
