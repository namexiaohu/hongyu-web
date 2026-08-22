import type { CSSProperties } from 'react';

/** Evenly distribute N stat items in one row (no wrap). */
export function statsBarGridStyle(count: number): CSSProperties {
  const columns = Math.max(1, count);
  return {
    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
  };
}

export function statsBarDataAttrs(count: number): Record<string, string> {
  const columns = Math.max(1, count);
  return {
    'data-stats-count': String(columns),
    ...(columns >= 5 ? { 'data-stats-dense': 'true' } : {}),
  };
}
