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
  /** Cover image URL (right side when showCoverOnBackground) */
  image: string;
  imageAlt: string;
  backgroundImage?: string;
  backgroundSolidCss?: string;
  showCoverOnBackground?: boolean;
  heroCopyStyle?: 'light' | 'dark';
  videoUrl?: string;
  gallery?: Array<{ url: string; alt?: string }>;
};

export type DirHero = {
  eyebrow: string;
  title: string;
  lead: string;
};

export const brandNarrativeSlugs = ['about', 'patents', 'history', 'training'] as const;
export type BrandNarrativeSlug = string;

export type BrandNarrativeBreadcrumb = BreadcrumbItem;
export type BrandNarrativeStat = StatItem;

export type BrandNarrativeHero = SplitHero;

export type SplitContentSection = {
  type: 'split-content';
  id?: string;
  background?: 'default' | 'soft';
  layout: 'team-split' | 'rd-split';
  imagePosition: 'left' | 'right';
  eyebrow: string;
  title: string;
  body: string;
  bullets?: string[];
  image: string;
  imageAlt: string;
  videoUrl?: string;
  gallery?: Array<{ url: string; alt?: string }>;
};

export type ValueCardIcon =
  | 'layers'
  | 'check'
  | 'users'
  | 'award'
  | 'shield'
  | 'heart'
  | 'globe'
  | 'clock'
  | 'book'
  | 'flask'
  | 'lightbulb'
  | 'target'
  | 'star'
  | 'building'
  | 'cpu'
  | 'activity';

export type HeaderGridCard =
  | { cardStyle: 'value'; icon: ValueCardIcon | null; title: string; body: string }
  | { cardStyle: 'cert'; icon: ValueCardIcon | null; title: string; body: string }
  | { cardStyle: 'outlook'; year: string; title: string; body: string }
  | {
      cardStyle: 'innovation';
      year: string;
      title: string;
      body: string;
      image: string;
      imageAlt?: string;
      icon?: ValueCardIcon | null;
    };

export type HeaderGridSection = {
  type: 'header-grid';
  id?: string;
  background?: 'default' | 'soft';
  grid: 'grid-2' | 'grid-3';
  eyebrow: string;
  title: string;
  lead?: string;
  cards: HeaderGridCard[];
};

export type PatentGridSection = {
  type: 'patent-grid';
  id?: string;
  background?: 'default' | 'soft';
  eyebrow: string;
  title: string;
  lead: string;
  items: Array<{ patentId: string; title: string; body: string; tags: string[] }>;
};

export type TimelineSection = {
  type: 'timeline';
  id?: string;
  background?: 'default' | 'soft';
  eyebrow: string;
  title: string;
  lead?: string;
  items: Array<{
    year: string;
    title: string;
    body: string;
    tags?: string[];
    image?: string;
    imageAlt?: string;
  }>;
};

export type CourseSection = {
  type: 'course';
  id?: string;
  background?: 'default' | 'soft';
  eyebrow: string;
  title: string;
  lead?: string;
  courses: Array<{
    badge: string;
    kicker: string;
    title: string;
    description: string;
    image: string;
    meta: string[];
  }>;
};

export type CtaSection = {
  type: 'cta';
  id?: string;
  anchorId?: string;
  containerWrap?: boolean;
  eyebrow: string;
  title: string;
  lead: string;
  href: string;
  buttonLabel: string;
};

export type BrandSection =
  | SplitContentSection
  | HeaderGridSection
  | PatentGridSection
  | TimelineSection
  | CourseSection
  | CtaSection;

export type StorefrontBrandNarrativeDetail = {
  slug: BrandNarrativeSlug;
  locale: string;
  seo: { title: string; description: string };
  breadcrumbs: BrandNarrativeBreadcrumb[];
  hero: BrandNarrativeHero;
  stats?: BrandNarrativeStat[] | null;
  sections: BrandSection[];
};
