import type { StatItem } from '@/lib/content/types';

type StatsBarProps = {
  stats: StatItem[];
  className?: string;
};

export function StatsBar({ stats, className }: StatsBarProps) {
  return (
    <div className={`stats-bar ${className ?? ''}`.trim()}>
      {stats.map((stat) => (
        <div key={stat.label}>
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
