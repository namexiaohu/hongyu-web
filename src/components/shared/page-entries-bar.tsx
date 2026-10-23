import Link from 'next/link';

import type { PageEntryLink } from '@/lib/storefront-types';

type PageEntriesBarProps = {
  entries: PageEntryLink[];
  className?: string;
};

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href);
}

function EntryArrow() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

function EntryLink({ entry }: { entry: PageEntryLink }) {
  const content = (
    <>
      <span>{entry.title}</span>
      <EntryArrow />
    </>
  );

  if (isExternalHref(entry.href)) {
    return (
      <a className="page-entry-link" href={entry.href}>
        {content}
      </a>
    );
  }

  return (
    <Link className="page-entry-link" href={entry.href}>
      {content}
    </Link>
  );
}

export function PageEntriesBar({ entries, className }: PageEntriesBarProps) {
  const visible = entries.filter((entry) => entry.title.trim() && entry.href.trim());
  if (!visible.length) return null;

  return (
    <nav className={`page-entries ${className ?? ''}`.trim()} data-od-id="entries" aria-label="Page entries">
      {visible.map((entry) => (
        <EntryLink key={entry.id || entry.href} entry={entry} />
      ))}
    </nav>
  );
}
