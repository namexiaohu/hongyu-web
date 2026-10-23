import type { StatItem } from '@/lib/storefront-types';
import { statsBarDataAttrs, statsBarGridStyle } from '@/lib/stats-bar-layout';

type StatsBarProps = {
  stats: StatItem[];
  className?: string;
};

export function StatsBar({ stats, className }: StatsBarProps) {
  if (!stats.length) return null;

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
