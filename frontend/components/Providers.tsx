'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/lib/store';

export function Providers({ children }: { children: React.ReactNode }) {
  const { accessibility } = useAppStore();

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('data-high-contrast', String(accessibility.highContrast));
    html.setAttribute('data-fontsize', accessibility.fontSize);
    html.lang = 'en';
  }, [accessibility]);

  return <>{children}</>;
}
