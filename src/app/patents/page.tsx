import type { Metadata } from 'next';

import { BrandNarrativePage } from '@/components/templates/brand-narrative-page';
import { DEFAULT_SEO_TITLE } from '@/lib/site-config';

export const metadata: Metadata = {
  title: '技术专利 · 竑宇医疗',
  description: DEFAULT_SEO_TITLE,
};

const bodyHtml = `<div class="stat-label">授权发明专利</div>
        </div>
        <div>
          <div class="stat-num num">45<span class="stat-suffix">+</span></div>
          <div class="stat-label">PCT 国际专利</div>
        </div>
        <div>
          <div class="stat-num num">15<span class="stat-suffix">%</span></div>
          <div class="stat-label">年营收研发投入占比</div>
        </div>
        <div>
          <div class="stat-num num">60<span class="stat-suffix">%+</span></div>
          <div class="stat-label">研发团队硕士以上占比</div>
        </div>
      </div>
    </div>

    <!-- KEY PATENTS -->
    <section class="section" data-od-id="patents">
      <div class="container">
        <div class="section-header">
          <p class="eyebrow">Core Patents · 核心专利</p>
          <h2>关键技术布局</h2>
          <p class="lead">覆盖血管闭合、微创器械、生物材料、智能控制四大技术方向。</p>
        </div>
        <div class="grid-3">
          <div class="patent-card">
            <div class="pc-id">CN 2024 1 XXXXXX.X</div>
            <h3>自适应压力反馈血管闭合装置</h3>
            <p>基于微型压力传感器的实时夹持力调节技术，实现血管闭合过程中损伤最小化。</p>
            <div class="pc-tags">
              <span class="pc-tag">V-CLAMP</span>
              <span class="pc-tag">发明专利</span>
              <span class="pc-tag">已授权</span>
            </div>
          </div>
          <div class="patent-card">
            <div class="pc-id">CN 2023 1 XXXXXX.X</div>
            <h3>生物相容性钛合金涂层制备方法</h3>
            <p>医用级 Ti-6Al-4V 涂层工艺，通过 ISO 10993 细胞毒性测试，降低组织排异反应。</p>
            <div class="pc-tags">
              <span class="pc-tag">材料科学</span>
              <span class="pc-tag">发明专利</span>
              <span class="pc-tag">已授权</span>
            </div>
          </div>
          <div class="patent-card">
            <div class="pc-id">CN 2023 2 XXXXXX.X</div>
            <h3>单手快速释放血管夹持机构</h3>
            <p>单手操作一键释放设计，闭合后 3 秒内完成器械撤出，提升手术效率。</p>
            <div class="pc-tags">
              <span class="pc-tag">机械设计</span>
              <span class="pc-tag">实用新型</span>
              <span class="pc-tag">已授权</span>
            </div>
          </div>
          <div class="patent-card">
            <div class="pc-id">CN 2024 1 XXXXXX.X</div>
            <h3>可吸收性外科缝合锚钉系统</h3>
            <p>生物可吸收材料制成的关节固定锚钉，术后无需二次取出，6-12 个月完全降解。</p>
            <div class="pc-tags">
              <span class="pc-tag">运动医学</span>
              <span class="pc-tag">发明专利</span>
              <span class="pc-tag">申请中</span>
            </div>
          </div>
          <div class="patent-card">
            <div class="pc-id">CN 2024 1 XXXXXX.X</div>
            <h3>微型植入式心脏起搏器电极设计</h3>
            <p>专为中小体型犬猫设计的低阻抗电极结构，延长电池寿命至 8 年以上。</p>
            <div class="pc-tags">
              <span class="pc-tag">心血管</span>
              <span class="pc-tag">发明专利</span>
              <span class="pc-tag">申请中</span>
            </div>
          </div>
          <div class="patent-card">
            <div class="pc-id">PCT/CN2024/XXXXXX</div>
            <h3>智能手术导航定位系统</h3>
            <p>基于光学追踪的术中实时导航，辅助术者精确定位病灶与血管走向。</p>
            <div class="pc-tags">
              <span class="pc-tag">智能控制</span>
              <span class="pc-tag">PCT 国际</span>
              <span class="pc-tag">申请中</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- R&D CAPABILITIES -->
    <section class="section" data-od-id="rd" style="background: var(--border-soft);">
      <div class="container">
        <div class="rd-split">
          <div class="rd-img">
            <img src="/images/patent-lab.jpg" alt="研发中心">
          </div>
          <div class="rd-text">
            <p class="eyebrow">R&D · 研发能力</p>
            <h2 style="margin-top: var(--space-3); margin-bottom: var(--space-5);">从概念到临床的<br/>完整创新链条</h2>
            <p>宇医疗拥有独立的研发中心与 GMP 标准生产车间，建立了从基础研究、工程开发、注册申报到临床转化的全周期创新体系。</p>
            <ul class="rd-list">
              <li>生物医学工程实验室：材料表征、力学测试、生物相容性评价</li>
              <li>精密机械加工车间：CNC 五轴加工、激光焊接、表面处理</li>
              <li>洁净装配车间：ISO 7 级洁净环境，满足无菌器械装配要求</li>
              <li>临床前研究平台：动物实验中心，支持产品性能验证与安全性评价</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- INNOVATION HIGHLIGHTS -->
    <section class="section" data-od-id="innovation">
      <div class="container">
        <div class="section-header">
          <p class="eyebrow">Innovation · 创新亮点</p>
          <h2>技术突破与行业认可</h2>
          <p class="lead">每一项创新都来自对临床痛点的深度洞察与工程突破。</p>
        </div>
        <div class="grid-3">
          <div class="innovation-card">
            <div class="innovation-card-img"><img src="/images/patent-microscope.jpg" alt=""></div>
            <div class="innovation-card-body">
              <div class="ic-year">2024</div>
              <h3>智能压力反馈技术获行业创新奖</h3>
              <p>V-CLAMP 核心专利技术获 2024 中国宠物医疗科技创新奖，被评为"年度最具临床价值技术"。</p>
            </div>
          </div>
          <div class="innovation-card">
            <div class="innovation-card-img"><img src="/images/patent-engineer.jpg" alt=""></div>
            <div class="innovation-card-body">
              <div class="ic-year">2024</div>
              <h3>产学研合作基地落户</h3>
              <p>与 3 所重点高校共建产学研合作基地，联合培养医疗器械领域高层次技术人才。</p>
            </div>
          </div>
          <div class="innovation-card">
            <div class="innovation-card-img"><img src="/images/patent-lab.jpg" alt=""></div>
            <div class="innovation-card-body">
              <div class="ic-year">2025</div>
              <h3>新一代生物可吸收材料研发突破</h3>
              <p>自主研发的 PLGA 基可吸收材料完成动物实验，降解周期可控在 6-12 个月范围内。</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section" id="contact" data-od-id="cta">
      <div class="container">
        <div class="cta-strip">
          <p class="eyebrow" style="color: rgba(255,255,255,0.5); margin-bottom: var(--space-4);">Contact · 联系我们</p>
          <h2>了解技术合作机会</h2>
          <p class="lead">无论是技术授权、联合研发还是学术交流，我们都开放对话。</p>
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
      breadcrumbs={[{ label: '首页', href: '/' }, { label: '技术专利' }]}
      hero={{
        eyebrow: 'Technology · 技术专利',
        title: "120+ 项核心专利\\n构筑技术壁垒",
        lead: "竑宇医疗持续投入研发创新，在血管闭合、微创手术、生物材料等领域建立了完整的自主知识产权体系。",
        image: '/images/patent-hero.jpg',
        imageAlt: '技术研发',
      }}
      stats={[{"value":"120","suffix":"+","label":"授权发明专利"},{"value":"45","suffix":"+","label":"PCT 国际专利"},{"value":"15","suffix":"%","label":"年营收研发投入占比"},{"value":"60","suffix":"%+","label":"研发团队硕士以上占比"}]}

    >
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </BrandNarrativePage>
  );
}
