import Link from 'next/link';

import type { PageEntryLink, StatItem } from '@/lib/storefront-types';
import { statsBarDataAttrs, statsBarGridStyle } from '@/lib/stats-bar-layout';

type StatsBarProps = {
  stats: StatItem[];
  entries?: PageEntryLink[];
  className?: string;
};

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href);
}

function EntryLink({ entry }: { entry: PageEntryLink }) {
  if (isExternalHref(entry.href)) {
    return (
      <a className="stats-entry-link" href={entry.href}>
        {entry.title}
      </a>
    );
  }
  return (
    <Link className="stats-entry-link" href={entry.href}>
      {entry.title}
    </Link>
  );
}

export function StatsBar({ stats, entries = [], className }: StatsBarProps) {
  const visibleEntries = entries.filter((entry) => entry.title.trim() && entry.href.trim());
  if (!stats.length && !visibleEntries.length) return null;

  const metrics = stats.length ? (
    <div
      className={visibleEntries.length ? 'stats-bar-metrics' : undefined}
      {...statsBarDataAttrs(stats.length)}
      style={statsBarGridStyle(stats.length)}
    >
      {stats.map((stat) => (
        <div key={stat.label} className="stat-item">
          <div className="stat-num num">
            {stat.value}
            {stat.suffix ? <span className="stat-suffix">{stat.suffix}</span> : null}
          </div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  ) : null;

  if (!visibleEntries.length) {
    return (
      <div
        className={`stats-bar ${className ?? ''}`.trim()}
        {...statsBarDataAttrs(stats.length)}
        style={statsBarGridStyle(stats.length)}
      >
        {stats.map((stat) => (
          <div key={stat.label} className="stat-item">
            <div className="stat-num num">
              {stat.value}
              {stat.suffix ? <span className="stat-suffix">{stat.suffix}</span> : null}
            </div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`stats-bar stats-bar--with-entries ${className ?? ''}`.trim()}>
      {metrics}
      <div className="stats-entry-row">
        {visibleEntries.map((entry) => (
          <EntryLink key={entry.id || entry.href} entry={entry} />
        ))}
      </div>
    </div>
  );
}
