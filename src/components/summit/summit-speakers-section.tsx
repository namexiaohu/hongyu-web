'use client';

import { useState } from 'react';

import { useTranslation } from '@/lib/i18n-context';
import type { SpeakerItem } from '@/lib/storefront-summits-api';

import { SummitSpeakerModal } from './summit-speaker-modal';

type SummitSpeakersSectionProps = {
  speakers: SpeakerItem[];
};

const locationPinSvg = (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export function SummitSpeakersSection({ speakers }: SummitSpeakersSectionProps) {
  const { t } = useTranslation();
  const [activeSpeaker, setActiveSpeaker] = useState<SpeakerItem | null>(null);

  if (!speakers.length) return null;

  return (
    <>
      <section className="detail-section container" id="speakers" data-od-id="speakers">
        <p className="eyebrow" style={{ marginBottom: 'var(--space-3)' }}>{t('detail.summit.speakersEyebrow')}</p>
        <h2>{t('detail.summit.speakersTitle')}</h2>
        <div className="speaker-grid">
          {speakers.map((speaker) => (
            <button
              key={speaker.id}
              type="button"
              className="speaker-card"
              onClick={() => setActiveSpeaker(speaker)}
            >
              <div className="sc-avatar">
                {speaker.avatar
                  ? <img src={speaker.avatar} alt={speaker.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : (
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  )}
              </div>
              <div className="sc-info">
                <div className="sc-name">{speaker.name}</div>
                {speaker.bio ? <div className="sc-role">{speaker.bio}</div> : null}
                {speaker.region ? (
                  <div className="sc-region">
                    {locationPinSvg}
                    {speaker.region}
                  </div>
                ) : null}
                {speaker.expertise ? <span className="sc-tag">{speaker.expertise}</span> : null}
              </div>
            </button>
          ))}
        </div>
      </section>
      <SummitSpeakerModal speaker={activeSpeaker} onClose={() => setActiveSpeaker(null)} />
    </>
  );
}
