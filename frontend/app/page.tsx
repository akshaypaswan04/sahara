'use client';

import Link from 'next/link';
import { Shield, Globe, Mic, Volume2, FileText, AlertTriangle, MapPin, CheckCircle, ChevronRight, ArrowRight, Users, Building2, Heart } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { useAppStore } from '@/lib/store';

const features = [
  { icon: '🌐', title: '13 Indian Languages', desc: 'From Hindi to Malayalam, Tamil to Punjabi — speak your language.' },
  { icon: '🗣️', title: 'Voice Interaction', desc: 'Speak to fill forms. Listen to alerts. No typing required.' },
  { icon: '🔊', title: 'Text-to-Speech', desc: 'Every alert and explanation read aloud in your language.' },
  { icon: '📄', title: 'AI Form Assistant', desc: 'Understand every field of complex government forms.' },
  { icon: '🚨', title: 'Emergency Alerts', desc: 'Official alerts translated and simplified in real time.' },
  { icon: '♿', title: 'Full Accessibility', desc: 'High contrast, large text, screen reader support.' },
  { icon: '✅', title: 'Smart Validation', desc: 'Know exactly what is missing before submitting.' },
  { icon: '📍', title: 'Location-Aware', desc: 'Alerts and shelters relevant to your location.' },
];

const flow = [
  { label: 'Official Information', sub: 'From authorized sources', color: 'bg-blue-600' },
  { label: 'Understand', sub: 'What does it mean?', color: 'bg-indigo-500' },
  { label: 'Translate', sub: 'Into your language', color: 'bg-teal-600' },
  { label: 'Simplify', sub: 'Plain, clear language', color: 'bg-emerald-500' },
  { label: 'Act', sub: 'Know what to do next', color: 'bg-green-600' },
];

const langBadges = ['हिन्दी', 'मराठी', 'বাংলা', 'தமிழ்', 'తెలుగు', 'ಕನ್ನಡ', 'ગુજરાતી', 'മലയാളം', 'ਪੰਜਾਬੀ', 'ଓଡ଼ିଆ', 'অসমীয়া', 'اردو'];

export default function LandingPage() {
  const { login, isLoggedIn } = useAppStore();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── Hero ── */}
      <section className="gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(20,184,166,0.4) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(59,130,246,0.3) 0%, transparent 50%)',
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-8 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              Hackathon Prototype · September 2026
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-4 animate-fade-up stagger-1">
              Sahara
            </h1>

            <p className="text-xl sm:text-2xl font-light text-white/90 mb-4 animate-fade-up stagger-2">
              Public services that speak your language.
            </p>

            <p className="text-base sm:text-lg text-white/70 mb-10 max-w-2xl animate-fade-up stagger-3">
              Understand emergency alerts. Understand official forms. Take the right action —
              in the language you understand best.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-up stagger-4">
              <Link href="/emergency" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold text-base transition-all hover:scale-105 shadow-lg shadow-red-500/30">
                <AlertTriangle className="w-5 h-5" />
                Try Emergency Assistant
              </Link>
              <Link href="/forms" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/25 text-white font-bold text-base transition-all hover:scale-105 backdrop-blur-sm">
                <FileText className="w-5 h-5" />
                Try Form Assistant
              </Link>
            </div>

            {/* Language badges */}
            <div className="mt-10 flex flex-wrap gap-2 animate-fade-up stagger-5">
              {langBadges.map(l => (
                <span key={l} className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-sm text-white/80">
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* ── Problem ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="tag mb-4">The Problem</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-6">
              Important public information should not become inaccessible because of language.
            </h2>
            <div className="space-y-4 text-slate-600">
              {[
                'Emergency alerts are difficult to understand quickly in unfamiliar languages.',
                'Government instructions use complex terminology that confuses citizens.',
                'Forms contain fields that most people do not understand.',
                'People make mistakes while filling forms due to unclear instructions.',
                'Critical information is available but inaccessible in the citizen\'s preferred language.',
              ].map((p, i) => (
                <div key={i} className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">✗</span>
                  <p>{p}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8">
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">🇮🇳</div>
              <p className="text-slate-600 text-sm">India has <strong>22 scheduled languages</strong> and hundreds of dialects. Most official communication is in English or formal Hindi.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { n: '1.4B+', l: 'Citizens' },
                { n: '22+', l: 'Scheduled Languages' },
                { n: '780+', l: 'Dialects' },
                { n: '~43%', l: 'Prefer regional language' },
              ].map(s => (
                <div key={s.l} className="bg-white rounded-xl p-3 text-center shadow-sm">
                  <div className="text-2xl font-black text-teal-600">{s.n}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Solution Flow ── */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-block px-3 py-1 rounded-full bg-teal-400/20 border border-teal-400/30 text-teal-300 text-sm font-medium mb-4">The Solution</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Official information → Understandable action
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Sahara acts as an accessibility layer — preserving original official content while making it understandable and actionable for every citizen.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0">
            {flow.map((step, i) => (
              <div key={step.label} className="flex items-center gap-3 sm:gap-0">
                <div className={`${step.color} rounded-2xl px-6 py-4 text-center text-white min-w-[140px] shadow-lg`}>
                  <div className="font-bold text-base">{step.label}</div>
                  <div className="text-xs text-white/70 mt-0.5">{step.sub}</div>
                </div>
                {i < flow.length - 1 && (
                  <ChevronRight className="w-6 h-6 text-slate-500 shrink-0 sm:rotate-0 rotate-90 sm:mx-1" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 grid sm:grid-cols-3 gap-6">
            {[
              { icon: '🌐', title: 'Translate', desc: 'From English/formal language to the citizen\'s preferred language' },
              { icon: '✨', title: 'Simplify', desc: 'Complex government language into plain, everyday words' },
              { icon: '🗣️', title: 'Speak', desc: 'Read every piece of information aloud in the right language' },
            ].map(c => (
              <div key={c.title} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="text-3xl mb-3">{c.icon}</div>
                <div className="font-bold text-white mb-2">{c.title}</div>
                <div className="text-sm text-slate-400">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Everything you need</h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Sahara combines translation, simplification, voice, and accessibility into one platform.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="card-hover p-6 animate-fade-up"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <div className="font-bold text-slate-800 mb-1.5">{f.title}</div>
              <div className="text-sm text-slate-500 leading-relaxed">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Modules ── */}
      <section className="bg-gradient-to-br from-teal-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Two connected modules</h2>
            <p className="text-slate-500">Powered by the same multilingual AI engine.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Emergency */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-red-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-5">
                <AlertTriangle className="w-7 h-7 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">🚨 Emergency Communication</h3>
              <p className="text-slate-600 mb-5 leading-relaxed">
                Official disaster and weather alerts translated and simplified into your language. With voice playback, emergency maps, and clear action steps.
              </p>
              <ul className="space-y-2 mb-6">
                {['Flood, cyclone, heat wave alerts', 'Translated + simplified messages', 'Voice playback in your language', 'Emergency maps with shelters', 'Clear action steps'].map(i => (
                  <li key={i} className="flex gap-2 text-sm text-slate-600">
                    <CheckCircle className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />{i}
                  </li>
                ))}
              </ul>
              <Link href="/emergency" className="btn-danger w-full justify-center">
                Open Emergency Center <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Form */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-5">
                <FileText className="w-7 h-7 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">📄 Local-Language Form Assistant</h3>
              <p className="text-slate-600 mb-5 leading-relaxed">
                Upload a government form and get every field explained in your language. Voice input, smart validation, and step-by-step guidance.
              </p>
              <ul className="space-y-2 mb-6">
                {['AI field detection (OCR)', 'Explained in your language', 'Voice input per field', '"What does this mean?" feature', 'Smart validation before submit'].map(i => (
                  <li key={i} className="flex gap-2 text-sm text-slate-600">
                    <CheckCircle className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />{i}
                  </li>
                ))}
              </ul>
              <Link href="/forms" className="btn-primary w-full justify-center">
                Open Form Assistant <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── USP Banner ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="gradient-brand rounded-3xl p-10 sm:p-14 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            Not just translation.
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Sahara combines <strong className="text-white">Translate + Simplify + Explain + Voice + Context + Accessibility</strong> into one public-service platform.
          </p>
          <p className="text-white/70 max-w-2xl mx-auto mb-10 text-base">
            "We don't just translate official information. We make it understandable and actionable in the citizen's preferred language and format."
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {isLoggedIn ? (
              <Link href="/dashboard" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-slate-800 font-bold text-base hover:scale-105 transition-transform shadow-lg">
                Go to Dashboard <ArrowRight className="w-5 h-5" />
              </Link>
            ) : (
              <button
                onClick={() => login('Demo User')}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-slate-800 font-bold text-base hover:scale-105 transition-transform shadow-lg"
              >
                Get Started Free <ArrowRight className="w-5 h-5" />
              </button>
            )}
            <Link href="/organizations" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/15 border border-white/25 text-white font-bold text-base hover:bg-white/25 transition-all">
              <Building2 className="w-5 h-5" /> For Organizations
            </Link>
          </div>
        </div>
      </section>

      {/* ── For Organizations ── */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <div className="tag mb-3">For Organizations</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Government · Hospitals · Universities · NGOs</h3>
              <p className="text-slate-500">Integrate Sahara into your existing systems via API. Citizens use the service free of charge.</p>
            </div>
            <Link href="/organizations" className="btn-secondary shrink-0">
              Learn More <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-black text-white">Sahara</div>
                <div className="text-xs text-slate-500">Public services that speak your language.</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <Link href="/emergency" className="hover:text-white transition-colors">Emergency</Link>
              <Link href="/forms" className="hover:text-white transition-colors">Form Assistant</Link>
              <Link href="/trust" className="hover:text-white transition-colors">Trust & Safety</Link>
              <Link href="/accessibility" className="hover:text-white transition-colors">Accessibility</Link>
              <Link href="/admin" className="hover:text-white transition-colors">Admin</Link>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-800 text-xs text-center text-slate-600">
            Sahara is a hackathon prototype. All demo data is for demonstration purposes only. Not affiliated with any government authority.
            <br />Built with ❤️ for India · September 2026
          </div>
        </div>
      </footer>
    </div>
  );
}
