import Link from 'next/link';

type HongyuLogoProps = {
  className?: string;
};

export function HongyuLogo({ className }: HongyuLogoProps) {
  return (
    <span className={className ?? 'logo-mark'}>
      <svg viewBox="0 0 94.4 32.5" xmlns="http://www.w3.org/2000/svg" aria-label="HONGYU MEDICAL">
        <style>{`.st0{fill:#212D5D}.st1{font-family:var(--font-montserrat),'Montserrat',sans-serif;font-weight:900}.st2{font-size:19.5815px}.st3{font-family:var(--font-montserrat),'Montserrat',sans-serif;font-weight:700}.st4{font-size:10px}`}</style>
        <text transform="matrix(1 0 0 1 -0.009 32.2519)" className="st0 st1 st2">
          HONGYU
        </text>
        <text transform="matrix(1 0 0 1 42.2355 12.5244)" className="st0 st3 st4">
          MEDICAL
        </text>
        <path
          className="st0"
          d="M94.4,0.1v5.8h-0.4c-0.4,0-0.8-0.4-0.8-0.8V1.2h-3.8c-0.5,0-0.8-0.4-0.8-0.8V0.1H94.4z"
        />
      </svg>
    </span>
  );
}

export function HongyuLogoLink({ className }: { className?: string }) {
  return (
    <Link href="/" className={className ?? 'logo'}>
      <HongyuLogo />
    </Link>
  );
}
