'use client';

import Link from 'next/link';
import { AlertTriangle, Filter, MapPin, Clock, ArrowRight, Radio } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { DemoBanner } from '@/components/DemoBanner';
import { useAppStore } from '@/lib/store';
import { DEMO_ALERTS } from '@/lib/demo-data';
import { alertTypeIcon, alertTypeLabel, severityColor, severityBorder, severityLabel, formatDate } from '@/lib/utils';

const pipelineSteps = [
  { label: 'Authorized Source', icon: '🏛️' },
  { label: 'Alert Received', icon: '📡' },
  { label: 'Severity Detection', icon: '🔍' },
  { label: 'Language Selection', icon: '🌐' },
  { label: 'Translation', icon: '🔄' },
  { label: 'Simplification', icon: '✨' },
  { label: 'Voice Generation', icon: '🔊' },
  { label: 'Citizen', icon: '👤' },
];

export default function EmergencyPage() {
  const { language } = useAppStore();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* Header */}
        <div className="mb-6 animate-fade-up">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-red-500 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-800">Emergency Center</h1>
              <p className="text-slate-500 text-sm">Verified alerts translated and simplified in your language</p>
            </div>
          </div>
          <DemoBanner />
        </div>

        {/* Pipeline visual */}
        <div className="card p-5 mb-8 animate-fade-up stagger-1">
          <h2 className="font-bold text-slate-700 text-sm mb-4 flex items-center gap-2">
            <Radio className="w-4 h-4 text-teal-600" />
            Alert Pipeline — How alerts reach you
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            {pipelineSteps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-2">
                <div className="flex flex-col items-center text-center">
                  <span className="text-xl">{step.icon}</span>
                  <span className="text-[10px] text-slate-500 mt-0.5 max-w-[70px] leading-tight">{step.label}</span>
                </div>
                {i < pipelineSteps.length - 1 && (
                  <ArrowRight className="w-3 h-3 text-slate-300 shrink-0" />
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-3 italic">
            ⚠️ Sahara never generates emergency alerts independently. All alerts originate from authorized sources.
          </p>
        </div>

        {/* Alerts grid */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-bold text-slate-800 text-lg">{DEMO_ALERTS.length} Active Alerts (Demo)</h2>
          <button className="btn-ghost text-sm">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {DEMO_ALERTS.map((alert, i) => (
            <Link
              key={alert.id}
              href={`/emergency/${alert.id}`}
              className={`card p-6 border-l-4 ${severityBorder(alert.severity)} hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 animate-fade-up`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Type + severity */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{alertTypeIcon(alert.type)}</span>
                  <div>
                    <div className="font-black text-slate-800 text-sm">{alertTypeLabel(alert.type)}</div>
                    <span className={`badge ${severityColor(alert.severity)} text-[10px] mt-0.5`}>
                      {severityLabel(alert.severity)}
                    </span>
                  </div>
                </div>
                <span className="demo-banner text-[10px]">DEMO</span>
              </div>

              {/* Location & source */}
              <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1">
                <MapPin className="w-3 h-3" />
                {alert.location}
              </div>
              <div className="text-xs text-slate-400 mb-3">{alert.source}</div>

              {/* Official message preview */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-3">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">Official Message</span>
                </div>
                <p className="text-xs text-slate-700 line-clamp-2">{alert.originalMessage}</p>
              </div>

              {/* Time */}
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
                <Clock className="w-3 h-3" />
                Issued: {formatDate(alert.issuedAt)}
              </div>

              {/* CTA */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-teal-600 font-medium">View in {LANGUAGE_MAP_LABELS[language] || 'your language'} →</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </div>
            </Link>
          ))}
        </div>

        {/* Source architecture */}
        <div className="mt-10 card p-6 animate-fade-up">
          <h2 className="font-bold text-slate-800 mb-4">Backend-Ready Alert Sources</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              { icon: '🌊', label: 'Disaster Management Authorities' },
              { icon: '🌦️', label: 'Meteorological Departments' },
              { icon: '🏛️', label: 'State Authorities' },
              { icon: '📍', label: 'District Authorities' },
              { icon: '📡', label: 'Other Authorized Sources' },
            ].map(s => (
              <div key={s.label} className="bg-slate-50 rounded-xl p-3 text-center">
                <div className="text-2xl mb-2">{s.icon}</div>
                <div className="text-xs text-slate-600 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-4 italic">
            All production alerts would be verified and ingested via authorized source connectors. Prototype uses simulated data.
          </p>
        </div>
      </main>
    </div>
  );
}

// Local helper
const LANGUAGE_MAP_LABELS: Record<string, string> = {
  en: 'English', hi: 'Hindi', mr: 'Marathi', bn: 'Bengali',
  te: 'Telugu', ta: 'Tamil', gu: 'Gujarati', kn: 'Kannada',
  ml: 'Malayalam', pa: 'Punjabi', or: 'Odia', as: 'Assamese', ur: 'Urdu',
};
