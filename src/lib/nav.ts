export type NavLink = {
  href: string;
  label: string;
};

export const headerNav: NavLink[] = [
  { href: '/solutions', label: '解决方案' },
  { href: '/insights', label: '前沿资讯' },
  { href: '/training', label: '持续教育' },
  { href: '/contact', label: '联系我们' },
];

export const footerNav = [
  {
    title: '竑宇医疗',
    links: [
      { href: '/about', label: '企业介绍' },
      { href: '/patents', label: '技术专利' },
      { href: '/history', label: '发展历程' },
    ],
  },
  {
    title: '解决方案',
    links: [
      { href: '/solutions/v-clamp', label: 'V-CLAMP' },
      { href: '/solutions?line=sports', label: '运动医学' },
      { href: '/solutions?line=cardio', label: '心脏起搏器' },
      { href: '/solutions?line=pipeline', label: '在研产品' },
    ],
  },
  {
    title: '全球布局',
    links: [
      { href: '/surgeons', label: '认证术者' },
      { href: '/centers', label: '合作中心' },
    ],
  },
  {
    title: '前沿资讯',
    links: [
      { href: '/insights?category=case', label: '病例回顾' },
      { href: '/insights?category=paper', label: '行业论文' },
      { href: '/insights?category=experience', label: '术者经验' },
    ],
  },
  {
    title: '持续教育',
    links: [
      { href: '/course', label: '录播课程' },
      { href: '/training', label: '培训计划' },
      { href: '/summit', label: '行业峰会' },
    ],
  },
  {
    title: '联系我们',
    links: [
      { href: '/company', label: '企业信息' },
      { href: '/contact', label: '联系我们' },
      { href: '/partnership', label: '商务合作' },
      { href: '/media', label: '海外媒体' },
    ],
  },
];
