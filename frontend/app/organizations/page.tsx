'use client';

import Link from 'next/link';
import { Building2, Globe, FileText, Bell, BarChart2, CheckCircle, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/Navbar';

const customers = [
  { icon: '🏛️', label: 'Government Departments' },
  { icon: '🏙️', label: 'Municipal Bodies' },
  { icon: '🎓', label: 'Universities' },
  { icon: '🏥', label: 'Hospitals' },
  { icon: '🤝', label: 'NGOs' },
  { icon: '🏦', label: 'Banks' },
  { icon: '📋', label: 'Insurance Companies' },
  { icon: '🏢', label: 'Large Organizations' },
];

const services = [
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Multilingual API',
    desc: 'Translate and explain official information in 13+ Indian languages via a simple REST API. Drop-in integration with existing systems.',
    color: 'bg-teal-50 text-teal-600',
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: 'Form Intelligence',
    desc: 'Help citizens understand and correctly fill government forms. Reduce incomplete and incorrectly filled submissions.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: <Bell className="w-6 h-6" />,
    title: 'Emergency Communication',
    desc: 'Multilingual alerts with automatic translation, simplification, and voice notification in the citizen\'s preferred language.',
    color: 'bg-red-50 text-red-600',
  },
  {
    icon: <BarChart2 className="w-6 h-6" />,
    title: 'Analytics & Insights',
    desc: 'Understand language usage patterns, common form errors, and accessibility metrics across your citizen base.',
    color: 'bg-purple-50 text-purple-600',
  },
];

const pricing = [
  {
    name: 'Government / NGO',
    price: 'Contact us',
    priceNote: 'Subsidized rates available',
    features: [
      'Unlimited citizens (free for citizens)',
      'All 13 languages',
      'Emergency alert system',
      'Form intelligence',
      'Analytics dashboard',
      'API access',
      'Dedicated support',
    ],
    cta: 'Get in touch',
    highlight: false,
  },
  {
    name: 'Enterprise',
    price: '₹2.5L+',
    priceNote: 'per year',
    features: [
      'Everything in Government tier',
      'White-label branding',
      'Custom language models',
      'SLA guarantee',
      'On-premise deployment option',
      'Priority support',
    ],
    cta: 'Contact sales',
    highlight: true,
  },
  {
    name: 'API Usage',
    price: '₹0.50',
    priceNote: 'per translation request',
    features: [
      'Pay-as-you-go',
      'All 13 languages',
      'Simplification API',
      'Field explanation API',
      'Voice generation',
      'No minimum commitment',
    ],
    cta: 'Get API access',
    highlight: false,
  },
];

export default function OrganizationsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="gradient-brand text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(20,184,166,0.5) 0%, transparent 60%)' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="badge bg-white/10 border border-white/20 text-sm text-white mb-6">For Organizations</div>
            <h1 className="text-4xl sm:text-5xl font-black mb-4">
              Make your services accessible to <span className="text-teal-300">every citizen</span>
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Citizens use Sahara free of charge. Organizations integrate our platform to make their services universally understandable.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white text-slate-800 font-bold hover:scale-105 transition-transform shadow-lg">
                Request Demo <ArrowRight className="w-5 h-5" />
              </button>
              <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white/15 border border-white/25 text-white font-bold hover:bg-white/25 transition-all">
                View API Docs
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Customers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-800 mb-3">Who can integrate Sahara?</h2>
          <p className="text-slate-500">Any organization that communicates with Indian citizens can benefit.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {customers.map(c => (
            <div key={c.label} className="card p-5 text-center hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">{c.icon}</div>
              <div className="font-semibold text-slate-700 text-sm">{c.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-800 mb-3">Services & Integration</h2>
            <p className="text-slate-500">Modular — use only what you need.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {services.map(s => (
              <div key={s.title} className="card p-7">
                <div className={`w-12 h-12 rounded-2xl ${s.color} flex items-center justify-center mb-4`}>{s.icon}</div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{s.title}</h3>
                <p className="text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business model */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <div className="inline-block px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-sm font-medium mb-4">B2G / B2B SaaS</div>
          <h2 className="text-3xl font-bold text-slate-800 mb-3">Revenue Streams</h2>
          <p className="text-slate-500 max-w-xl mx-auto">Advertising is NOT our primary model. Organizations pay for the platform — citizens always access basic features for free.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {[
            { n: '1', label: 'Annual Enterprise Subscriptions', icon: '📅' },
            { n: '2', label: 'Government / Municipal Contracts', icon: '🏛️' },
            { n: '3', label: 'API Usage Pricing', icon: '⚡' },
            { n: '4', label: 'Per-Document Processing', icon: '📄' },
            { n: '5', label: 'Multilingual Communication Contracts', icon: '🌐' },
            { n: '6', label: 'Emergency Communication Platform', icon: '🚨' },
          ].map(r => (
            <div key={r.n} className="card p-5 flex items-center gap-4">
              <span className="text-2xl">{r.icon}</span>
              <div>
                <div className="text-xs text-slate-400 mb-0.5">Stream {r.n}</div>
                <div className="font-semibold text-slate-700 text-sm">{r.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div className="grid md:grid-cols-3 gap-6">
          {pricing.map(p => (
            <div key={p.name} className={`rounded-3xl p-8 ${p.highlight ? 'gradient-brand text-white shadow-xl' : 'card'}`}>
              <div className="font-bold text-lg mb-1">{p.name}</div>
              <div className={`text-3xl font-black mb-1 ${p.highlight ? 'text-white' : 'text-slate-800'}`}>{p.price}</div>
              <div className={`text-sm mb-6 ${p.highlight ? 'text-white/70' : 'text-slate-500'}`}>{p.priceNote}</div>
              <div className="space-y-2.5 mb-8">
                {p.features.map(f => (
                  <div key={f} className="flex gap-2.5 text-sm">
                    <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${p.highlight ? 'text-teal-300' : 'text-teal-500'}`} />
                    <span className={p.highlight ? 'text-white/90' : 'text-slate-600'}>{f}</span>
                  </div>
                ))}
              </div>
              <button className={`w-full py-3 rounded-xl font-bold transition-all ${p.highlight ? 'bg-white text-slate-800 hover:bg-white/90' : 'btn-primary justify-center'}`}>
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 py-16 text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-black text-white mb-4">Ready to make your services more accessible?</h2>
          <p className="text-slate-400 mb-8">Join Sahara in making public services understandable for every Indian citizen.</p>
          <Link href="/dashboard" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-teal-500 text-white font-bold hover:bg-teal-400 transition-colors">
            See the Demo <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
