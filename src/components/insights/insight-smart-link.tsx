import Link from 'next/link';
import type { ReactNode } from 'react';

import {
  insightItemHref,
  isExternalInsightHref,
  type InsightLinkTarget,
} from '@/lib/insights';

type InsightSmartLinkProps = {
  item: InsightLinkTarget;
  className?: string;
  children: ReactNode;
};

/** Internal path → Next Link; http(s) body-link → plain anchor (new tab). */
export function InsightSmartLink({ item, className, children }: InsightSmartLinkProps) {
  const href = insightItemHref(item);
  if (isExternalInsightHref(href)) {
    return (
      <a className={className} href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
}
