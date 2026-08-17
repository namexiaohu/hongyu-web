import Link from 'next/link';

import type { BreadcrumbItem } from '@/lib/content/types';

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  light?: boolean;
};

export function Breadcrumb({ items, light }: BreadcrumbProps) {
  return (
    <div className="breadcrumb container">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={`${item.label}-${index}`}>
            {index > 0 ? <span>/</span> : null}
            {isLast || !item.href ? (
              <span style={light ? { color: '#fff' } : { color: 'var(--fg)' }}>{item.label}</span>
            ) : (
              <Link href={item.href}>{item.label}</Link>
            )}
          </span>
        );
      })}
    </div>
  );
}
