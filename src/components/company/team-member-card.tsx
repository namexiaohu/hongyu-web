import type { CompanyTeamMember } from '@/lib/storefront-company';

const phoneSvg = (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const mailSvg = (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

type TeamMemberCardProps = {
  member: CompanyTeamMember;
  size?: 'lg' | 'md' | 'sm';
  primary?: boolean;
};

export function TeamMemberCard({ member, size = 'sm', primary = false }: TeamMemberCardProps) {
  const region = member.region.trim();
  const title = member.title.trim();
  const contact = member.contact.trim();
  const email = member.email.trim();
  const avatarUrl = member.avatarUrl.trim();

  const classNames = [
    'team-card',
    size === 'lg' ? 'card-lg' : '',
    size === 'md' ? 'card-md' : '',
    primary ? 'primary' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      <div className="tc-avatar">
        {avatarUrl ? <img src={avatarUrl} alt={member.name} /> : null}
        {region ? <span className="tc-badge">{region}</span> : null}
      </div>
      <div className="tc-body">
        <div className="tc-name">{member.name}</div>
        {title ? <div className="tc-role">{title}</div> : null}
        {contact || email ? (
          <div className="tc-info">
            {contact ? (
              <div className="tc-row">{phoneSvg}{contact}</div>
            ) : null}
            {email ? (
              <div className="tc-row">
                {mailSvg}
                <a href={`mailto:${email}`} title={email}>{email}</a>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
