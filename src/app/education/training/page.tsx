import type { Metadata } from 'next';

import { BrandNarrativePage } from '@/components/templates/brand-narrative-page';
import { DEFAULT_SEO_TITLE } from '@/lib/site-config';

export const metadata: Metadata = {
  title: '培训计划 · 竑宇医疗',
  description: DEFAULT_SEO_TITLE,
};

const bodyHtml = `<!-- PROGRAMS -->
    <section class="section-header container" data-od-id="programs">
      <p class="eyebrow">Courses · 培训课程</p>
      <h2>分级培训课程</h2>
      <p>根据术者经验与专业方向，提供从基础到高级的完整培训路径。</p>
    </section>

    <section class="container" style="padding-bottom: var(--space-16);">
      <div class="program-grid">

        <div class="program-card">
          <div class="pc-banner">
            <img src="/images/edu-1.jpg" alt="">
            <span class="pc-level">基础级</span>
          </div>
          <div class="pc-body">
            <div class="pc-title">V-CLAMP 标准操作入门</div>
            <div class="pc-desc">面向初次接触 V-CLAMP 的兽医师，系统讲解产品原理、操作步骤与并发症处理。包含在线理论学习与模拟实操。</div>
            <div class="pc-meta">
              <span class="pc-meta-item"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>8 课时</span>
              <span class="pc-meta-item"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>线上 + 线下</span>
              <span class="pc-meta-item"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>3 天</span>
            </div>
          </div>
        </div>

        <div class="program-card">
          <div class="pc-banner">
            <img src="/images/edu-2.jpg" alt="">
            <span class="pc-level">进阶级</span>
          </div>
          <div class="pc-body">
            <div class="pc-title">认证术者工作坊</div>
            <div class="pc-desc">线下实操训练 + 病例讨论，由资深术者带教。完成考核后获得竑宇医疗认证术者资质，可独立开展 V-CLAMP 手术。</div>
            <div class="pc-meta">
              <span class="pc-meta-item"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>16 课时</span>
              <span class="pc-meta-item"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>线下实操</span>
              <span class="pc-meta-item"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>5 天</span>
            </div>
          </div>
        </div>

        <div class="program-card">
          <div class="pc-banner">
            <img src="/images/edu-3.jpg" alt="">
            <span class="pc-level">高级</span>
          </div>
          <div class="pc-body">
            <div class="pc-title">铂金术者导师计划</div>
            <div class="pc-desc">面向已认证术者的进阶培养，培养区域培训导师。参与课程开发、带教新术者，并代表竑宇出席行业会议。</div>
            <div class="pc-meta">
              <span class="pc-meta-item"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>24 课时</span>
              <span class="pc-meta-item"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>导师带教</span>
              <span class="pc-meta-item"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>持续</span>
            </div>
          </div>
        </div>

        <div class="program-card">
          <div class="pc-banner">
            <img src="/images/sol-feature1.jpg" alt="">
            <span class="pc-level">专题</span>
          </div>
          <div class="pc-body">
            <div class="pc-title">运动医学专项培训</div>
            <div class="pc-desc">针对关节镜手术、韧带修复等运动医学产品的专项技能培训，包含设备操作、手术入路选择与术后康复指导。</div>
            <div class="pc-meta">
              <span class="pc-meta-item"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>12 课时</span>
              <span class="pc-meta-item"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>线下实操</span>
              <span class="pc-meta-item"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>4 天</span>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- TIMELINE -->
    <section class="timeline-section container" data-od-id="schedule">
      <div class="section-header" style="padding-top:0;">
        <p class="eyebrow">Schedule · 近期排期</p>
        <h2>2026 年培训计划</h2>
      </div>
      <div class="timeline">
        <div class="timeline-item">
          <div class="tl-date">2026.09 · 上海</div>
          <h3>V-CLAMP 认证术者工作坊（第 28 期）</h3>
          <p>名额 20 人，剩余 6 席</p>
        </div>
        <div class="timeline-item">
          <div class="tl-date">2026.10 · 慕尼黑</div>
          <h3>欧洲区 V-CLAMP 培训（英文）</h3>
          <p>名额 15 人，剩余 11 席</p>
        </div>
        <div class="timeline-item">
          <div class="tl-date">2026.11 · 东京</div>
          <h3>运动医学专项培训（日文）</h3>
          <p>名额 12 人，剩余 8 席</p>
        </div>
        <div class="timeline-item">
          <div class="tl-date">2026.12 · 北京</div>
          <h3>铂金术者导师计划（第 3 期）</h3>
          <p>名额 8 人，剩余 3 席</p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="container" data-od-id="cta">
      <div class="cta-strip">
        <p class="eyebrow" style="color: rgba(255,255,255,0.5); margin-bottom: var(--space-4);">Apply · 申请培训</p>
        <h2>成为竑宇认证术者</h2>
        <p>填写申请信息，我们的培训协调员将在 3 个工作日内与您联系。</p>
        <a href="/contact" class="btn-cta-white">
          申请参加培训
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    </section>`;

export default function Page() {
  return (
    <BrandNarrativePage
      breadcrumbs={[{ label: '首页', href: '/' }, { label: '培训计划' }]}
      hero={{
        eyebrow: 'Training Program · 培训计划',
        title: "认证术者\\n培训体系",
        lead: "从理论学习到实操考核，系统化培养掌握 V-CLAMP 等核心产品标准操作流程的专业兽医师。",
        image: '/images/edu-2.jpg',
        imageAlt: '培训计划',
        heroClass: 'tr-hero',
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </BrandNarrativePage>
  );
}
