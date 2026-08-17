'use client';

import { useEffect } from 'react';

export function StaticInteractions() {
  useEffect(() => {
    const onSubmit = (event: Event) => {
      event.preventDefault();
    };

    const forms = Array.from(document.querySelectorAll('form'));
    forms.forEach((form) => form.addEventListener('submit', onSubmit));

    const tabs = Array.from(document.querySelectorAll('.filter-tab'));
    const onTabClick = (event: Event) => {
      const target = event.currentTarget as HTMLElement;
      tabs.forEach((tab) => tab.classList.toggle('active', tab === target));
    };
    tabs.forEach((tab) => tab.addEventListener('click', onTabClick));

    return () => {
      forms.forEach((form) => form.removeEventListener('submit', onSubmit));
      tabs.forEach((tab) => tab.removeEventListener('click', onTabClick));
    };
  }, []);

  return null;
}
