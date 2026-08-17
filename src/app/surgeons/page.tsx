import type { Metadata } from 'next';

import { DirectoryPage } from '@/components/templates/directory-page';
import { DEFAULT_SEO_TITLE } from '@/lib/site-config';

export const metadata: Metadata = {
  title: '认证术者 · 竑宇医疗',
  description: DEFAULT_SEO_TITLE,
};

const bodyHtml = `<!-- SURGEON GRID -->
    <section class="section" data-od-id="directory" style="padding-top: 0;">
      <div class="container">
        <div class="grid-3">

          <div class="surgeon-card">
            <div class="sc-header">
              <div class="sc-avatar"><img src="/images/surgeon-1.jpg" alt=""></div>
              <div class="sc-info">
                <h3>张明远</h3>
                <div class="sc-title">主任医师 · 博士</div>
              </div>
            </div>
            <div class="sc-body">
              <div class="sc-row"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>北京伴侣动物中心医院</div>
              <div class="sc-row"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/></svg>外科 · 腹腔手术</div>
              <div class="sc-row"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>认证年份：2019 · 手术量 3,200+</div>
              <div class="sc-tags"><span class="sc-tag">V-CLAMP</span><span class="sc-tag">脾脏切除</span><span class="sc-tag">肝叶切除</span></div>
              <div class="sc-badge platinum">◆ 铂金级术者</div>
            </div>
          </div>

          <div class="surgeon-card">
            <div class="sc-header">
              <div class="sc-avatar"><img src="/images/surgeon-2.jpg" alt=""></div>
              <div class="sc-info">
                <h3>Sarah Mitchell</h3>
                <div class="sc-title">DVM, DACVS</div>
              </div>
            </div>
            <div class="sc-body">
              <div class="sc-row"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>Cornell Veterinary Hospital, USA</div>
              <div class="sc-row"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/></svg>Soft Tissue Surgery</div>
              <div class="sc-row"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>Certified 2020 · 2,800+ cases</div>
              <div class="sc-tags"><span class="sc-tag">V-CLAMP</span><span class="sc-tag">Splenectomy</span></div>
              <div class="sc-badge gold">★ 金级术者</div>
            </div>
          </div>

          <div class="surgeon-card">
            <div class="sc-header">
              <div class="sc-avatar"><img src="/images/surgeon-3.jpg" alt=""></div>
              <div class="sc-info">
                <h3>田中健太</h3>
                <div class="sc-title">兽医学博士</div>
              </div>
            </div>
            <div class="sc-body">
              <div class="sc-row"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>东京小动物医疗中心</div>
              <div class="sc-row"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/></svg>运动医学 · 骨科</div>
              <div class="sc-row"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>认证年份：2021 · 手术量 1,500+</div>
              <div class="sc-tags"><span class="sc-tag">V-CLAMP</span><span class="sc-tag">关节镜</span><span class="sc-tag">韧带修复</span></div>
              <div class="sc-badge gold">★ 金级术者</div>
            </div>
          </div>

          <div class="surgeon-card">
            <div class="sc-header">
              <div class="sc-avatar"><img src="/images/surgeon-4.jpg" alt=""></div>
              <div class="sc-info">
                <h3>李明华</h3>
                <div class="sc-title">副主任医师</div>
              </div>
            </div>
            <div class="sc-body">
              <div class="sc-row"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>上海宠颐生动物医院</div>
              <div class="sc-row"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/></svg>外科 · 软组织</div>
              <div class="sc-row"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>认证年份：2022 · 手术量 980+</div>
              <div class="sc-tags"><span class="sc-tag">V-CLAMP</span><span class="sc-tag">子宫卵巢摘除</span></div>
              <div class="sc-badge silver">● 银级术者</div>
            </div>
          </div>

          <div class="surgeon-card">
            <div class="sc-header">
              <div class="sc-avatar"><img src="/images/surgeon-5.jpg" alt=""></div>
              <div class="sc-info">
                <h3>Dr. Klaus Weber</h3>
                <div class="sc-title">Dr.med.vet., DECVS</div>
              </div>
            </div>
            <div class="sc-body">
              <div class="sc-row"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>Tierklinik München, Germany</div>
              <div class="sc-row"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/></svg>Cardiovascular Surgery</div>
              <div class="sc-row"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>Certified 2021 · 1,200+ cases</div>
              <div class="sc-tags"><span class="sc-tag">V-CLAMP</span><span class="sc-tag">Cardiac</span></div>
              <div class="sc-badge platinum">◆ 铂金级术者</div>
            </div>
          </div>

          <div class="surgeon-card">
            <div class="sc-header">
              <div class="sc-avatar"><img src="/images/surgeon-6.jpg" alt=""></div>
              <div class="sc-info">
                <h3>王雪峰</h3>
                <div class="sc-title">主任医师 · 教授</div>
              </div>
            </div>
            <div class="sc-body">
              <div class="sc-row"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>中国农业大学动物医院</div>
              <div class="sc-row"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/></svg>外科 · 肿瘤外科</div>
              <div class="sc-row"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>认证年份：2018 · 手术量 4,100+</div>
              <div class="sc-tags"><span class="sc-tag">V-CLAMP</span><span class="sc-tag">肿瘤切除</span><span class="sc-tag">脾脏切除</span></div>
              <div class="sc-badge platinum">◆ 铂金级术者</div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section" id="contact" data-od-id="cta">
      <div class="container">
        <div class="cta-strip">
          <p class="eyebrow" style="color: rgba(255,255,255,0.5); margin-bottom: var(--space-4);">Join · 加入认证体系</p>
          <h2>成为竑宇认证术者</h2>
          <p class="lead">参加系统化培训与考核，获取 V-CLAMP 等产品操作认证资质。</p>
          <a href="mailto:training@hongyu-medical.com" class="btn-cta-white">
            申请认证培训
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </section>`;

export default function Page() {
  return (
    <DirectoryPage
      breadcrumbs={[{ label: '首页', href: '/' }, { label: '全球布局', href: '/surgeons' }, { label: '认证术者' }]}
      hero={{
        eyebrow: 'Certified Surgeons · 认证术者',
        title: '全球认证术者名录',
        lead: "经过竑宇医疗系统化培训与考核，掌握 V-CLAMP 等核心产品标准操作流程的认证兽医师。",
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </DirectoryPage>
  );
}
