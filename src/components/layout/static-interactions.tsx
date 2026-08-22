'use client';

import { useEffect } from 'react';

export function StaticInteractions() {
  useEffect(() => {
    const onSubmit = (event: Event) => {
      const form = event.currentTarget as HTMLFormElement;
      if (form.matches('[data-allow-submit]')) {
        return;
      }
      event.preventDefault();
    };

    const forms = Array.from(document.querySelectorAll('form'));
    forms.forEach((form) => form.addEventListener('submit', onSubmit));

    return () => {
      forms.forEach((form) => form.removeEventListener('submit', onSubmit));
    };
  }, []);

  return null;
}
