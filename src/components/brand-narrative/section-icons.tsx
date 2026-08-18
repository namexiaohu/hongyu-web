import type { ReactNode } from 'react';

import type { ValueCardIcon } from '@/lib/storefront-types';

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const icons: Record<ValueCardIcon, ReactNode> = {
  layers: (
    <svg {...iconProps}>
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  check: (
    <svg {...iconProps}>
      <path d="M9 12l2 2 4-4" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  ),
  users: (
    <svg {...iconProps}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  award: (
    <svg {...iconProps}>
      <circle cx="12" cy="8" r="6" />
      <path d="M8.2 13.5L7 22l5-3 5 3-1.2-8.5" />
    </svg>
  ),
  shield: (
    <svg {...iconProps}>
      <path d="M12 3l8 3v6c0 5-3.4 7.8-8 9-4.6-1.2-8-4-8-9V6l8-3z" />
    </svg>
  ),
  heart: (
    <svg {...iconProps}>
      <path d="M20.8 5.6a5 5 0 0 0-7.1 0L12 7.3l-1.7-1.7a5 5 0 0 0-7.1 7.1L12 21.3l8.8-8.6a5 5 0 0 0 0-7.1z" />
    </svg>
  ),
  globe: (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z" />
    </svg>
  ),
  clock: (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  book: (
    <svg {...iconProps}>
      <path d="M4 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H4z" />
      <path d="M20 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  flask: (
    <svg {...iconProps}>
      <path d="M9 3h6" />
      <path d="M10 3v6.2L5.2 19a2 2 0 0 0 1.7 3h10.2a2 2 0 0 0 1.7-3L14 9.2V3" />
    </svg>
  ),
  lightbulb: (
    <svg {...iconProps}>
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" />
    </svg>
  ),
  target: (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" />
    </svg>
  ),
  star: (
    <svg {...iconProps}>
      <path d="M12 3l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.8 6.8 19l1-5.8L3.6 9.1l5.8-.8z" />
    </svg>
  ),
  building: (
    <svg {...iconProps}>
      <path d="M4 21V7l8-4 8 4v14" />
      <path d="M9 21v-6h6v6" />
      <path d="M9 10h.01M15 10h.01M9 14h.01M15 14h.01" />
    </svg>
  ),
  cpu: (
    <svg {...iconProps}>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
    </svg>
  ),
  activity: (
    <svg {...iconProps}>
      <path d="M3 12h4l2.5-6 5 12 2.5-6H21" />
    </svg>
  ),
};

export function ValueCardIconSvg({ icon }: { icon: ValueCardIcon | string }) {
  return <>{icons[icon as ValueCardIcon] ?? icons.layers}</>;
}

export function CertCheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round">
      <path d="M9 12l2 2 4-4" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

export function CourseMetaIcon({ kind }: { kind: 'clock' | 'users' | 'book' }) {
  if (kind === 'clock') {
    return (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    );
  }
  if (kind === 'users') {
    return (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

export function CtaArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
