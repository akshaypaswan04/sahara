'use client';

import Link from 'next/link';
import { AlertTriangle, FileText, Mic, Globe, Bell, Clock, CheckCircle, ArrowRight, Shield } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { useAppStore } from '@/lib/store';
import { DEMO_ALERTS, DEMO_FORMS } from '@/lib/demo-data';
import { LANGUAGE_MAP } from '@/lib/languages';
import { alertTypeIcon, alertTypeLabel, severityColor, formatDate } from '@/lib/utils';

export default function DashboardPage() {
  const { language, userName, isLoggedIn, login } = useAppStore();
  const currentLang = LANGUAGE_MAP[language];

  const greeting = {
    en: 'Good day',
    hi: 'नमस्ते',
    mr: 'नमस्कार',
    bn: 'নমস্কার',
    ta: 'வணக்கம்',
    te: 'నమస్కారం',
    gu: 'નમસ્તે',
    kn: 'ನಮಸ್ಕಾರ',
    ml: 'നമസ്കാരം',
    pa: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ',
    or: 'ନମସ୍କାର',
    as: 'নমস্কাৰ',
    ur: 'آداب',
  }[language] ?? 'Good day';

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="max-w-md mx-auto px-4 py-20 text-center">
          <div className="w-20 h-20 rounded-3xl gradient-brand flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-black text-slate-800 mb-3">Sign in to Sahara</h1>
          <p className="text-slate-500 mb-8">Access your dashboard, saved forms, and alerts.</p>
          <button onClick={() => login('Demo User')} className="btn-primary text-base px-8 py-3 w-full justify-center">
            Sign In (Demo) <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-xs text-slate-400 mt-4">This is a demo — no real account required.</p>
        </div>
      </div>
    );
  }

  const mainCards = [
    {
      href: '/emergency',
      icon: '🚨',
      iconBg: 'bg-red-50',
      label: 'Emergency Center',
      sub: 'View alerts relevant to you',
      badge: `${DEMO_ALERTS.length} active alerts`,
      badgeColor: 'bg-red-100 text-red-700',
      border: 'hover:border-red-200',
    },
    {
      href: '/forms',
      icon: '📄',
      iconBg: 'bg-blue-50',
      label: 'Form Assistant',
      sub: 'Understand and fill official forms',
      badge: `${DEMO_FORMS.length} demo forms`,
      badgeColor: 'bg-blue-100 text-blue-700',
      border: 'hover:border-blue-200',
    },
    {
      href: '/voice',
      icon: '🗣️',
      iconBg: 'bg-purple-50',
      label: 'Voice Assistant',
      sub: 'Speak instead of typing',
      badge: 'Beta',
      badgeColor: 'bg-purple-100 text-purple-700',
      border: 'hover:border-purple-200',
    },
    {
      href: '/accessibility',
      icon: '♿',
      iconBg: 'bg-green-50',
      label: 'Accessibility',
      sub: 'Large text · High contrast · TTS',
      badge: 'Settings',
      badgeColor: 'bg-green-100 text-green-700',
      border: 'hover:border-green-200',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* Header */}
        <div className="mb-8 animate-fade-up">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm mb-1">{greeting},</p>
              <h1 className="text-3xl font-black text-slate-800">{userName || 'Welcome'} 👋</h1>
              <p className="text-slate-500 mt-1">
                Language: <span className="font-semibold text-teal-700">{currentLang?.nativeName}</span>
              </p>
            </div>
            <div className="hidden sm:flex flex-col items-end text-sm text-slate-400">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })}
              </div>
            </div>
          </div>
        </div>

        {/* Active alert strip */}
        <div className="mb-6 animate-fade-up stagger-1">
          <Link href="/emergency/DEMO-001" className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl hover:bg-red-100 transition-colors group">
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-500 text-white text-xl shrink-0">🌊</span>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-red-800 text-sm">🔴 Active: FLOOD WARNING — Demo District, Maharashtra</div>
              <div className="text-red-600 text-xs mt-0.5 truncate">Tap to view translated alert and action steps</div>
            </div>
            <ArrowRight className="w-5 h-5 text-red-400 group-hover:text-red-600 transition-colors shrink-0" />
          </Link>
        </div>

        {/* Main cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {mainCards.map((card, i) => (
            <Link
              key={card.href}
              href={card.href}
              className={`card-hover p-5 border border-transparent ${card.border} animate-fade-up`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className={`w-12 h-12 rounded-2xl ${card.iconBg} flex items-center justify-center text-2xl mb-4`}>
                {card.icon}
              </div>
              <div className="font-bold text-slate-800 text-sm mb-1">{card.label}</div>
              <div className="text-slate-500 text-xs mb-3 leading-relaxed">{card.sub}</div>
              <span className={`badge ${card.badgeColor} text-xs`}>{card.badge}</span>
            </Link>
          ))}
        </div>

        {/* Activity */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Recent Alerts */}
          <div className="card p-6 animate-fade-up stagger-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-800 flex items-center gap-2">
                <Bell className="w-4 h-4 text-red-500" /> Recent Alerts
              </h2>
              <Link href="/emergency" className="text-xs text-teal-600 hover:underline">View all</Link>
            </div>
            <div className="space-y-3">
              {DEMO_ALERTS.slice(0, 3).map(alert => (
                <Link key={alert.id} href={`/emergency/${alert.id}`} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                  <span className="text-xl shrink-0">{alertTypeIcon(alert.type)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-800 text-sm truncate">{alertTypeLabel(alert.type)}</span>
                      <span className={`badge ${severityColor(alert.severity)} text-[10px]`}>{alert.severity.toUpperCase()}</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5 truncate">{alert.location}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors shrink-0 mt-0.5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Demo Forms */}
          <div className="card p-6 animate-fade-up stagger-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-800 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-500" /> Demo Forms
              </h2>
              <Link href="/forms" className="text-xs text-teal-600 hover:underline">All forms</Link>
            </div>
            <div className="space-y-3">
              {DEMO_FORMS.map(form => (
                <Link key={form.id} href={`/forms/${form.id}`} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                  <span className="text-xl shrink-0">📄</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-slate-800 text-sm">{form.title}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{form.source}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors shrink-0 mt-0.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="mt-6 grid sm:grid-cols-3 gap-4 animate-fade-up stagger-4">
          {[
            { href: '/trust', icon: <Shield className="w-5 h-5" />, label: 'Trust & Safety', color: 'text-blue-600' },
            { href: '/admin', icon: <Globe className="w-5 h-5" />, label: 'Admin Dashboard', color: 'text-purple-600' },
            { href: '/organizations', icon: <CheckCircle className="w-5 h-5" />, label: 'For Organizations', color: 'text-teal-600' },
          ].map(a => (
            <Link key={a.href} href={a.href} className="card p-4 flex items-center gap-3 hover:shadow-md transition-shadow">
              <span className={a.color}>{a.icon}</span>
              <span className="font-medium text-slate-700 text-sm">{a.label}</span>
              <ArrowRight className="w-4 h-4 text-slate-300 ml-auto" />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
