import type { CSSProperties } from 'react';

import type { CtaBlock, FilterTab, ListHero } from '@/lib/storefront-types';

export const solutionsHero: ListHero = {
  eyebrow: 'Solutions · 解决方案',
  title: '全产品线解决方案',
  lead: '覆盖动物外科、运动医学、心血管三大领域，从成熟产品到前沿在研管线，为宠物医疗提供完整技术支撑。',
};

export const solutionsFilters: FilterTab[] = [
  { id: 'all', label: '全部产品' },
  { id: 'surgical', label: '外科器械' },
  { id: 'sports', label: '运动医学' },
  { id: 'cardio', label: '心血管' },
  { id: 'pipeline', label: '在研管线' },
];

export type SolutionCard = {
  href: string;
  image: string;
  imageAlt: string;
  badge: string;
  badgeStyle?: CSSProperties;
  category: string;
  title: string;
  description: string;
  features: string[];
  linkLabel: string;
  filter: string;
};

export const solutionCards: SolutionCard[] = [
  {
    href: '/solutions/v-clamp',
    image: '/images/sol-hero.jpg',
    imageAlt: 'V-CLAMP',
    badge: '旗舰产品',
    category: '外科器械 · Vascular Closure',
    title: 'V-CLAMP 血管闭合系统',
    description:
      '自主研发的精密血管闭合技术，通过智能压力反馈与自适应夹持力控制，实现术中精准止血。适用于脾脏切除、肝叶切除、肾切除等多种腹腔手术场景，显著降低手术风险与术后并发症率。',
    features: ['智能压力反馈', '生物相容涂层', '快速释放机制', 'ISO 10993 认证', 'CE 标志'],
    linkLabel: '查看产品详情',
    filter: 'surgical',
  },
  {
    href: '/solutions?line=sports',
    image: '/images/sol-feature1.jpg',
    imageAlt: '运动医学',
    badge: '成熟产品线',
    category: '运动医学 · Sports Medicine',
    title: '运动医学解决方案',
    description:
      '针对犬猫关节损伤的微创修复完整产品线，涵盖关节镜辅助手术系统、生物锚定韧带修复装置、骨隧道钻等核心器械。为前十字韧带断裂、髌骨脱位等常见运动损伤提供标准化手术方案。',
    features: ['关节镜系统', '生物锚定装置', '可吸收缝线', '微创入路工具'],
    linkLabel: '查看产品线',
    filter: 'sports',
  },
  {
    href: '/solutions?line=cardio',
    image: '/images/sol-feature2.jpg',
    imageAlt: '心脏起搏器',
    badge: '临床阶段',
    category: '心血管 · Cardiac Pacemaker',
    title: '心脏起搏器',
    description:
      '微型植入式心脏节律管理设备，专为中小体型犬猫设计。采用低阻抗电极结构与长寿命电池方案，已完成动物实验验证，目前正推进多中心临床试验。目标适应症包括病态窦房结综合征、房室传导阻滞等。',
    features: ['微型化设计', '8 年+ 电池寿命', '低阻抗电极', '临床试验中'],
    linkLabel: '查看产品线',
    filter: 'cardio',
  },
  {
    href: '/solutions?line=pipeline',
    image: '/images/sol-feature3.jpg',
    imageAlt: '在研产品',
    badge: '研发管线',
    badgeStyle: { background: 'var(--accent-soft)', color: 'var(--accent)' },
    category: '在研管线 · R&D Pipeline',
    title: '在研产品',
    description:
      '布局下一代智能手术导航系统、生物可吸收材料、AI 辅助诊断等前沿方向。智能手术导航系统基于光学追踪技术，已进入概念验证阶段；PLGA 基可吸收材料完成动物实验，降解周期可控在 6-12 个月。',
    features: ['智能手术导航', '生物可吸收材料', 'AI 辅助诊断', '概念验证阶段'],
    linkLabel: '了解更多',
    filter: 'pipeline',
  },
];

export const solutionsCta: CtaBlock = {
  eyebrow: 'Solutions · 解决方案',
  title: '需要定制化的产品方案？',
  lead: '我们的技术团队可根据您的临床需求，提供专属产品选型与应用支持。',
  href: '/contact',
  buttonLabel: '联系技术顾问',
};
