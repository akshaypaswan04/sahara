'use client';

import { AlertTriangle, CheckCircle, Sparkles } from 'lucide-react';

interface DemoBannerProps {
  message?: string;
  variant?: 'alert' | 'info' | 'live' | 'fallback';
}

export function DemoBanner({ message, variant = 'alert' }: DemoBannerProps) {
  const styles = {
    alert: 'bg-amber-50 border border-amber-200 text-amber-800',
    info: 'bg-blue-50 border border-blue-200 text-blue-800',
    live: 'bg-green-50 border border-green-200 text-green-800',
    fallback: 'bg-slate-50 border border-slate-200 text-slate-600',
  };

  const icons = {
    alert: <AlertTriangle className="w-4 h-4 shrink-0" />,
    info: <AlertTriangle className="w-4 h-4 shrink-0" />,
    live: <Sparkles className="w-4 h-4 shrink-0" />,
    fallback: <CheckCircle className="w-4 h-4 shrink-0" />,
  };

  const defaults: Record<string, string> = {
    alert: 'DEMO DATA — NOT A REAL EMERGENCY ALERT. This is a prototype demonstration only.',
    info: 'DEMO DATA — This information is for demonstration purposes only.',
    live: 'AI LIVE — Powered by Gemini API free tier. Verify against original official content.',
    fallback: 'API unavailable — showing demo data. Set API keys in .env.local for live features.',
  };

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold ${styles[variant]}`}
      role="status"
    >
      {icons[variant]}
      <span>{message ?? defaults[variant]}</span>
    </div>
  );
}
