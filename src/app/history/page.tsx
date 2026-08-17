import type { Metadata } from 'next';

import { BrandNarrativePage } from '@/components/templates/brand-narrative-page';
import { DEFAULT_SEO_TITLE } from '@/lib/site-config';

export const metadata: Metadata = {
  title: '发展历程 · 竑宇医疗',
  description: DEFAULT_SEO_TITLE,
};

const bodyHtml = `<!-- TIMELINE -->
    <section class="section" data-od-id="timeline">
      <div class="container">
        <div class="section-header">
          <p class="eyebrow">Milestones · 关键节点</p>
          <h2>十二年发展历程</h2>
          <p class="lead">从核心技术突破到全球化布局，每一步都印证着我们对创新的坚持。</p>
        </div>

        <div class="timeline">

          <div class="timeline-item">
            <div class="tl-year">2014</div>
            <h3>公司创立，聚焦动物外科器械</h3>
            <p>竑宇医疗在上海成立，创始团队由生物医学工程与兽医学跨学科背景专家组成，确立以精密工程技术赋能宠物医疗的发展方向。</p>
            <div class="tl-tags"><span class="tl-tag">创立</span><span class="tl-tag">上海</span></div>
          </div>

          <div class="timeline-item">
            <div class="tl-year">2016</div>
            <h3>V-CLAMP 概念验证完成</h3>
            <p>首款核心产品 V-CLAMP 血管闭合系统完成原理样机开发，通过动物实验验证，关键技术指标达到预期目标。</p>
            <div class="tl-tags"><span class="tl-tag">V-CLAMP</span><span class="tl-tag">原型验证</span></div>
          </div>

          <div class="timeline-item">
            <div class="tl-year">2018</div>
            <h3>首个产品获得 CE 认证</h3>
            <p>V-CLAMP 100 系列正式获得 CE 标志认证，标志着产品达到欧盟医疗器械法规要求，开始进入欧洲市场。</p>
            <div class="tl-tags"><span class="tl-tag">CE 认证</span><span class="tl-tag">国际化</span></div>
            <div class="tl-img"><img src="/images/history-ceremony.jpg" alt="CE 认证"></div>
          </div>

          <div class="timeline-item">
            <div class="tl-year">2020</div>
            <h3>运动医学产品线发布</h3>
            <p>推出关节镜辅助手术系统、生物锚定韧带修复装置等运动医学产品，业务从血管管理拓展至骨科与运动系统。</p>
            <div class="tl-tags"><span class="tl-tag">运动医学</span><span class="tl-tag">产品线拓展</span></div>
          </div>

          <div class="timeline-item">
            <div class="tl-year">2022</div>
            <h3>全球化布局加速</h3>
            <p>产品覆盖 20+ 个国家与地区，与全球 30+ 家动物医院建立合作中心，认证术者超过 2,000 人。研发中心扩建，GMP 车间投产。</p>
            <div class="tl-tags"><span class="tl-tag">全球化</span><span class="tl-tag">GMP 车间</span></div>
            <div class="tl-img"><img src="/images/history-global.jpg" alt="全球化布局"></div>
          </div>

          <div class="timeline-item">
            <div class="tl-year">2024</div>
            <h3>心脏起搏器进入临床</h3>
            <p>微型植入式心脏起搏器完成动物实验，进入多中心临床试验阶段。同期，公司累计授权专利突破 100 项。</p>
            <div class="tl-tags"><span class="tl-tag">心脏起搏器</span><span class="tl-tag">临床试验</span><span class="tl-tag">100+ 专利</span></div>
          </div>

          <div class="timeline-item">
            <div class="tl-year">2026</div>
            <h3>新一代产品管线成型</h3>
            <p>智能手术导航系统、生物可吸收材料等下一代产品完成概念验证，V-CLAMP 累计手术案例突破 20 万例。公司启动 FDA 510(k) 注册申请。</p>
            <div class="tl-tags"><span class="tl-tag">智能导航</span><span class="tl-tag">FDA 申请</span><span class="tl-tag">200K+ 案例</span></div>
            <div class="tl-img"><img src="/images/history-office.jpg" alt="新一代研发"></div>
          </div>

        </div>
      </div>
    </section>

    <!-- FUTURE OUTLOOK -->
    <section class="section" data-od-id="outlook" style="background: var(--border-soft);">
      <div class="container">
        <div class="section-header">
          <p class="eyebrow">Outlook · 未来展望</p>
          <h2>持续创新，引领未来</h2>
          <p class="lead">竑宇医疗将继续深耕技术创新，推动宠物医疗器械行业迈向更高标准。</p>
        </div>
        <div class="grid-3">
          <div class="outlook-card">
            <div class="oc-year">2027</div>
            <h3>FDA 510(k) 获批</h3>
            <p>完成美国 FDA 上市前通知审批，正式进入北美市场，实现全球三大市场全覆盖。</p>
          </div>
          <div class="outlook-card">
            <div class="oc-year">2028</div>
            <h3>AI 辅助手术系统</h3>
            <p>基于光学追踪与机器学习的术中实时辅助系统进入临床验证，开启智能外科新纪元。</p>
          </div>
          <div class="outlook-card">
            <div class="oc-year">2030</div>
            <h3>全球认证术者突破 10,000</h3>
            <p>认证培训体系覆盖 50+ 国家，构建全球最大的宠物外科术者专业社区。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section" id="contact" data-od-id="cta">
      <div class="container">
        <div class="cta-strip">
          <p class="eyebrow" style="color: rgba(255,255,255,0.5); margin-bottom: var(--space-4);">Contact · 联系我们</p>
          <h2>与我们共同成长</h2>
          <p class="lead">无论是加入我们的团队，还是成为合作伙伴，竑宇医疗期待您的加入。</p>
          <a href="mailto:contact@hongyu-medical.com" class="btn-cta-white">
            商务合作咨询
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </section>`;

export default function Page() {
  return (
    <BrandNarrativePage
      breadcrumbs={[{ label: '首页', href: '/' }, { label: '发展历程' }]}
      hero={{
        eyebrow: 'History · 发展历程',
        title: "从实验室到全球\\n的十二年征程",
        lead: "自 2014 年创立以来，竑宇医疗始终专注于动物医疗器械的自主研发与产业化，逐步成长为行业领先的技术驱动型企业。",
        image: '/images/history-hero.jpg',
        imageAlt: '发展历程',
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </BrandNarrativePage>
  );
}
