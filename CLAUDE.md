# hongyu-web

[根目录](../CLAUDE.md) > **hongyu-web**

## 变更记录 (Changelog)

| 时间 | 说明 |
|------|------|
| 2026-10-19T10:14:00+08:00 | 模块级扫描：路由矩阵、storefront API、i18n、与 admin 数据流（覆盖既有 AGENTS 占位） |

## 模块职责

**HONGYU Medical 公司官网**（Next.js App Router）。运行 **http://localhost:5000**。面向访客与潜在客户：品牌与产品展示、合作网络、峰会/市场活动、Insights、联系询盘；多语言 UI 文案由 admin 下发。

不持有数据库；通过 `API_URL`（默认 admin `:5100`）调用 `/api/front/*`。

## 入口与启动

```bash
pnpm install && cp .env.example .env
# API_URL=http://localhost:5100
# SITE_URL=http://localhost:5000
pnpm dev    # next dev -p 5000 --webpack
pnpm build && pnpm start
```

- 入口布局：`src/app/layout.tsx`（字体、I18n、SiteFrame、预取 company/social/website-config/ui-strings）
- 配置：`next.config.ts`（注入 `API_URL`/`SITE_URL`；教育路径 redirect）
- 本地文案种子：`src/locales/en.json`；远程组：`src/ui-strings/`

## 对外接口（页面路由）

| 路由 | 职责 |
|------|------|
| `/` | 首页（homepage config + 组件编排） |
| `/products/[slug]` | 产品详情 |
| `/solutions`, `/solutions/[slug]` | 解决方案列表/详情 |
| `/surgeons`, `/surgeons/[slug]` | 认证术者 |
| `/centers`, `/centers/[slug]` | 合作中心（含全球地图组件） |
| `/summit`, `/summit/[slug]` | 行业峰会 |
| `/market-events`, `/market-events/[slug]` | 市场活动 |
| `/insights`, `/insights/[slug]` | 博客/洞察 |
| `/company` | 企业信息 |
| `/media` | 社交媒体聚合 |
| `/partnership` | 合作询盘 |
| `/contact` | 联系询盘 |
| `/pages/[slug]` | 其他 CMS 页（隐私等） |
| `/[slug]` | 品牌叙事等动态 slug |
| `/course` | 课程入口占位（coming soon，链到 training/summit） |
| `/api/ui-strings/manifest` | 本地 manifest（配合翻译同步） |

## 关键依赖与配置

| 依赖 | 用途 |
|------|------|
| next 16 / react 19 | App Router SSR |
| antd / icons | 局部交互组件 |
| d3 + topojson-client | 合作中心全球地图 |

环境：`API_URL`、`SITE_URL`。无 DB、无服务端密钥（除间接通过 admin）。

## 数据流

1. **SSR**：`serverFetch` → admin Front API（开发环境 no-store + 重试；生产 revalidate 60s）。
2. **浏览器**：`apiFetch` 可带 `hongyu_front_token` Bearer 与 `hongyu_cart_token`（电商遗产字段，官网主路径少用）。
3. **语言**：cookie + 请求头 `x-vex-locale`；`I18nProvider` + `fetchUiStringGroups`。
4. **询盘**：`storefront-inquiry` / partnership / contact 表单 POST `/api/front/inquiries`。

封装集中在 `src/lib/storefront-*-api.ts`、`api-client.ts`、`i18n-*.ts`。

## 数据模型

本应用无本地持久化模型；消费 admin 领域的只读 DTO（见 `storefront-types.ts`）：产品、方案、术者、中心、峰会、活动、homepage sections、website nav/privacy 等。

## 测试与质量

- `pnpm lint` / `typecheck` / `check`
- 无独立单元测试目录；依赖类型与联调 admin

## 常见问题 (FAQ)

**Q: `/course` 是否跳转课程站？**  
A: 当前为 coming-soon 页，未硬链到 `:5001`；课程产品形态在 `hongyu-course`。

**Q: 状态管理？**  
A: 无全局 store；仅 `I18nContext` + 页面级 props/state。

**Q: README 与代码不一致？**  
A: README 仍写「静态不对接」；实现已对接 CMS API，以代码为准。

## 相关文件清单

| 路径 | 说明 |
|------|------|
| `src/lib/api-client.ts` | serverFetch / apiFetch / token |
| `src/lib/storefront-*.ts` | 各域 API 与展示辅助 |
| `src/components/layout/*` | SiteFrame / header / footer / privacy |
| `src/components/home/*` | 首页轮播、地图、about |
| `src/ui-strings/registry.ts` | 预取文案组 |
| `src/app/globals.css` | 站点视觉 |
| `AGENTS.md` | Next 16 agent 提示（工具生成） |
