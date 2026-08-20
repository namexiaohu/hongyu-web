import type { ReactNode } from 'react';

type SocialQrTooltipProps = {
  qrCode: string;
  label: string;
  children: ReactNode;
  placement?: 'top' | 'bottom';
  size?: 'default' | 'compact';
  className?: string;
};

const QR_SIZES = {
  default: 160,
  compact: 96,
} as const;

export function SocialQrTooltip({
  qrCode,
  label,
  children,
  placement = 'top',
  size = 'default',
  className,
}: SocialQrTooltipProps) {
  const qrSize = QR_SIZES[size];

  return (
    <div
      className={[
        'social-qr-wrap',
        placement === 'bottom' ? 'social-qr-wrap--bottom' : '',
        size === 'compact' ? 'social-qr-wrap--compact' : '',
        className ?? '',
      ].filter(Boolean).join(' ')}
    >
      {children}
      <div
        className={[
          'social-qr-tooltip',
          size === 'compact' ? 'social-qr-tooltip--compact' : '',
        ].filter(Boolean).join(' ')}
        role="tooltip"
      >
        <img
          src={qrCode}
          alt={`${label} QR`}
          width={qrSize}
          height={qrSize}
          className="social-qr-tooltip__img"
        />
      </div>
    </div>
  );
}
