import Link from 'next/link';

type HongyuLogoProps = {
  className?: string;
};

type HongyuLogoFullProps = HongyuLogoProps & { light?: boolean };

export function HongyuLogo({ className, light = false }: HongyuLogoFullProps) {
  const fill = light ? '#fff' : '#212D5D';
  return (
    <span className={className ?? 'logo-mark'}>
      <svg viewBox="0 0 94.4 32.5" xmlns="http://www.w3.org/2000/svg" aria-label="HONGYU MEDICAL">
        <text
          transform="matrix(1 0 0 1 -0.009 32.2519)"
          style={{ fill, fontFamily: "var(--font-montserrat),'Montserrat',sans-serif", fontWeight: 900, fontSize: '19.5815px' }}
        >
          HONGYU
        </text>
        <text
          transform="matrix(1 0 0 1 42.2355 12.5244)"
          style={{ fill, fontFamily: "var(--font-montserrat),'Montserrat',sans-serif", fontWeight: 700, fontSize: '10px' }}
        >
          MEDICAL
        </text>
        <path
          style={{ fill }}
          d="M94.4,0.1v5.8h-0.4c-0.4,0-0.8-0.4-0.8-0.8V1.2h-3.8c-0.5,0-0.8-0.4-0.8-0.8V0.1H94.4z"
        />
      </svg>
    </span>
  );
}

export function HongyuLogoLink({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <Link href="/" className={className ?? 'logo'}>
      <HongyuLogo light={light} />
    </Link>
  );
}
