import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AlertSeverity, AlertType, LanguageCode } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Kolkata',
  });
}

export function severityColor(s: AlertSeverity): string {
  switch (s) {
    case 'critical': return 'bg-red-600 text-white';
    case 'high': return 'bg-orange-500 text-white';
    case 'medium': return 'bg-yellow-500 text-white';
    case 'low': return 'bg-green-500 text-white';
  }
}

export function severityBorder(s: AlertSeverity): string {
  switch (s) {
    case 'critical': return 'border-red-500';
    case 'high': return 'border-orange-500';
    case 'medium': return 'border-yellow-500';
    case 'low': return 'border-green-500';
  }
}

export function severityLabel(s: AlertSeverity): string {
  switch (s) {
    case 'critical': return '🔴 CRITICAL';
    case 'high': return '🟠 HIGH';
    case 'medium': return '🟡 MEDIUM';
    case 'low': return '🟢 LOW';
  }
}

export function alertTypeIcon(t: AlertType): string {
  switch (t) {
    case 'flood': return '🌊';
    case 'rainfall': return '🌧️';
    case 'cyclone': return '🌀';
    case 'heat': return '🌡️';
    case 'earthquake': return '📳';
    case 'drought': return '☀️';
    default: return '⚠️';
  }
}

export function alertTypeLabel(t: AlertType): string {
  switch (t) {
    case 'flood': return 'FLOOD WARNING';
    case 'rainfall': return 'HEAVY RAINFALL';
    case 'cyclone': return 'CYCLONE WARNING';
    case 'heat': return 'HEAT WAVE';
    case 'earthquake': return 'EARTHQUAKE';
    case 'drought': return 'DROUGHT';
    default: return 'EMERGENCY ALERT';
  }
}

export function getLocaleSpeechCode(lang: LanguageCode): string {
  const map: Record<LanguageCode, string> = {
    en: 'en-IN', hi: 'hi-IN', mr: 'mr-IN', bn: 'bn-IN',
    te: 'te-IN', ta: 'ta-IN', gu: 'gu-IN', kn: 'kn-IN',
    ml: 'ml-IN', pa: 'pa-IN', or: 'or-IN', as: 'as-IN', ur: 'ur-PK',
  };
  return map[lang] ?? 'en-IN';
}
