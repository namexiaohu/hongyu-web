'use client';

import { useEffect, useState } from 'react';

import type { SpeakerItem } from '@/lib/storefront-summits-api';

type SummitSpeakerModalProps = {
  speaker: SpeakerItem | null;
  onClose: () => void;
};

const locationPinSvg = (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export function SummitSpeakerModal({ speaker, onClose }: SummitSpeakerModalProps) {
  const [open, setOpen] = useState(Boolean(speaker));

  useEffect(() => {
    setOpen(Boolean(speaker));
  }, [speaker]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!speaker || !open) return null;

  return (
    <div className="speaker-modal-overlay active" onClick={onClose} role="presentation">
      <div className="speaker-modal" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label={speaker.name}>
        <button type="button" className="sm-close" onClick={onClose} aria-label="关闭">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
        <div className="sm-header">
          <div className="sm-avatar">
            {speaker.avatar
              ? <img src={speaker.avatar} alt={speaker.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : (
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              )}
          </div>
          <div className="sm-title">
            {speaker.badgeText ? <span className="sm-badge">{speaker.badgeText}</span> : null}
            <div className="sm-name">{speaker.name}</div>
            {speaker.bio ? <div className="sm-role">{speaker.bio}</div> : null}
            <div className="sm-meta">
              {speaker.region ? (
                <span className="sm-region">
                  {locationPinSvg}
                  {speaker.region}
                </span>
              ) : null}
              {speaker.expertise ? <span className="sm-tag">{speaker.expertise}</span> : null}
            </div>
          </div>
        </div>
        {speaker.description ? (
          <div className="sm-body">
            <div className="sm-section">
              <div className="sm-label">嘉宾简介</div>
              <div
                className="sm-desc cms-article-content"
                dangerouslySetInnerHTML={{ __html: speaker.description }}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
