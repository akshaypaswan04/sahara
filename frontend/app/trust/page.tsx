'use client';

import { Shield, AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';
import { Navbar } from '@/components/Navbar';

const rules = [
  {
    icon: <Shield className="w-5 h-5 text-blue-600" />,
    title: 'Official information remains unchanged',
    desc: 'The original official message is always displayed verbatim. Sahara never modifies the source content.',
    bg: 'bg-blue-50 border-blue-200',
    badge: 'Official',
    badgeColor: 'bg-blue-100 text-blue-700',
  },
  {
    icon: <Info className="w-5 h-5 text-amber-600" />,
    title: 'AI explanations are clearly labelled',
    desc: 'Every AI-generated explanation carries a visible "AI Explanation" label, distinguishing it from official content.',
    bg: 'bg-amber-50 border-amber-200',
    badge: 'AI Explanation',
    badgeColor: 'bg-amber-100 text-amber-700',
  },
  {
    icon: <XCircle className="w-5 h-5 text-red-600" />,
    title: 'No invented information',
    desc: 'Sahara never invents emergency alerts, government requirements, eligibility criteria, shelters, deadlines, or legal requirements.',
    bg: 'bg-red-50 border-red-200',
    badge: 'Hard Rule',
    badgeColor: 'bg-red-100 text-red-700',
  },
  {
    icon: <CheckCircle className="w-5 h-5 text-green-600" />,
    title: 'Human confirmation required',
    desc: 'AI-filled form fields always require explicit user confirmation before submission. Never automatic.',
    bg: 'bg-green-50 border-green-200',
    badge: 'Always',
    badgeColor: 'bg-green-100 text-green-700',
  },
  {
    icon: <AlertTriangle className="w-5 h-5 text-orange-600" />,
    title: 'Low-confidence disclosure',
    desc: 'When the AI is uncertain, it clearly states: "I\'m not confident about this. Please verify the original document."',
    bg: 'bg-orange-50 border-orange-200',
    badge: 'Transparent',
    badgeColor: 'bg-orange-100 text-orange-700',
  },
];

export default function TrustPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="text-center mb-10 animate-fade-up">
          <div className="w-16 h-16 rounded-3xl gradient-brand flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-black text-slate-800 mb-3">Trust & Safety</h1>
          <p className="text-slate-500 max-w-lg mx-auto">
            Sahara is designed to assist citizens — not to replace or misrepresent official government authorities. Here are our core commitments.
          </p>
        </div>

        {/* Principle box */}
        <div className="card p-6 mb-8 border-2 border-slate-200 animate-fade-up stagger-1">
          <h2 className="font-bold text-slate-800 text-xl mb-3">Core Principle</h2>
          <p className="text-slate-600 leading-relaxed">
            Sahara must <strong>NOT</strong> replace official government authorities. It should:
          </p>
          <ul className="mt-3 space-y-2">
            {[
              'Consume information from authorized and official sources.',
              'Preserve the original official information verbatim.',
              'Translate and simplify it for the citizen.',
              'Clearly distinguish official content from AI-generated explanations.',
              'Never invent emergency alerts, government requirements, or legal information.',
              'Require user confirmation before submitting forms.',
            ].map(p => (
              <li key={p} className="flex gap-2.5 text-sm text-slate-700">
                <CheckCircle className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Rules */}
        <div className="space-y-4 mb-8">
          {rules.map((rule, i) => (
            <div key={rule.title} className={`rounded-2xl border p-5 ${rule.bg} animate-fade-up`} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">{rule.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-slate-800">{rule.title}</h3>
                    <span className={`badge ${rule.badgeColor} text-[10px]`}>{rule.badge}</span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{rule.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Visual example */}
        <div className="card p-6 mb-8 animate-fade-up">
          <h2 className="font-bold text-slate-800 mb-4">How content is visually distinguished</h2>
          <div className="space-y-3">
            <div className="official-box">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">📋 Official Message</span>
                <span className="badge bg-blue-100 text-blue-600 text-[10px]">Preserved verbatim</span>
              </div>
              <p className="text-slate-700 text-sm">This is the original official government text — unchanged, unedited, from the authorized source.</p>
            </div>
            <div className="ai-box">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">✨ AI Explanation</span>
                <span className="badge bg-amber-100 text-amber-700 text-[10px]">AI-generated</span>
              </div>
              <p className="text-slate-700 text-sm">This is Sahara's simplified explanation — clearly labelled as AI-generated and always based on the official content above.</p>
            </div>
          </div>
        </div>

        {/* Architecture */}
        <div className="card p-6 animate-fade-up stagger-4">
          <h2 className="font-bold text-slate-800 mb-4">System Architecture (Trust Layer)</h2>
          <div className="space-y-2">
            {[
              { label: 'Official Sources', desc: 'Authorized government, meteorological, disaster management authorities', icon: '🏛️' },
              { label: 'Source Connector', desc: 'Ingests verified alert data via authenticated APIs', icon: '📡' },
              { label: 'Verification Layer', desc: 'Validates source authenticity before processing', icon: '🔐' },
              { label: 'Multilingual AI', desc: 'Translates and simplifies — never invents', icon: '🧠' },
              { label: 'Citizen App', desc: 'Displays with clear labels distinguishing official from AI content', icon: '👤' },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <span className="text-xl shrink-0">{s.icon}</span>
                <div>
                  <div className="font-semibold text-slate-700 text-sm">{s.label}</div>
                  <div className="text-xs text-slate-500">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
