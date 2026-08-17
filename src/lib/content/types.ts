export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type StatItem = {
  value: string;
  suffix?: string;
  label: string;
};

export type FilterTab = {
  id: string;
  label: string;
};

export type CtaBlock = {
  eyebrow: string;
  title: string;
  lead: string;
  href: string;
  buttonLabel: string;
};

export type ListHero = {
  eyebrow: string;
  title: string;
  lead: string;
};

export type SplitHero = {
  eyebrow: string;
  title: string;
  lead: string;
  image: string;
  imageAlt: string;
  heroClass?: 'page-hero' | 'tr-hero';
};

export type DirHero = {
  eyebrow: string;
  title: string;
  lead: string;
};
