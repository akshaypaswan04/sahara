'use client';

import { useState, useCallback } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin, Clock, CheckCircle, Globe, Info, ChevronDown, RefreshCw, Sparkles } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { DemoBanner } from '@/components/DemoBanner';
import { TTSButton } from '@/components/TTSButton';
import { useAppStore } from '@/lib/store';
import { DEMO_ALERTS } from '@/lib/demo-data';
import { LANGUAGES, LANGUAGE_MAP } from '@/lib/languages';
import { alertTypeIcon, alertTypeLabel, severityColor, severityLabel, formatDate, cn } from '@/lib/utils';
import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('@/components/MapView'), { ssr: false, loading: () => (
  <div className="w-full h-64 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 text-sm">Loading map…</div>
)});

export default function AlertDetailPage() {
  const { id } = useParams<{ id: string }>();
  const alert = DEMO_ALERTS.find(a => a.id === id);
  if (!alert) return notFound();

  const { language, setLanguage } = useAppStore();
  const [showMap, setShowMap] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  // Live translation state
  const [liveTranslation, setLiveTranslation] = useState<string | null>(null);
  const [liveSimplified, setLiveSimplified] = useState<string | null>(null);
  const [isLiveLoading, setIsLiveLoading] = useState(false);
  const [isLiveResult, setIsLiveResult] = useState(false);

  const demoTranslation = alert.translations[language] ?? alert.translations['en']!;
  const currentLang = LANGUAGE_MAP[language];

  // Use live translation if available, otherwise demo
  const displayTranslation = liveTranslation ?? demoTranslation.translatedMessage;
  const displaySimplified = liveSimplified ?? demoTranslation.simplifiedMessage;
  const displayActionPoints = demoTranslation.actionPoints; // Action points always from demo for now

  const handleLiveTranslate = useCallback(async () => {
    setIsLiveLoading(true);
    setIsLiveResult(false);

    try {
      // Fire both requests in parallel
      const [translateRes, simplifyRes] = await Promise.all([
        fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: alert.originalMessage,
            targetLanguage: language,
            sourceLanguage: 'en',
            context: 'emergency',
          }),
        }),
        fetch('/api/simplify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: alert.originalMessage,
            language,
            context: 'emergency',
          }),
        }),
      ]);

      const translateData = await translateRes.json();
      const simplifyData = await simplifyRes.json();

      if (!translateData.isDemo && translateData.translated) {
        setLiveTranslation(translateData.translated);
        setIsLiveResult(true);
      }
      if (!simplifyData.isDemo && simplifyData.simplified) {
        setLiveSimplified(simplifyData.simplified);
        setIsLiveResult(true);
      }

      if (translateData.isDemo && simplifyData.isDemo) {
        // Both failed — stay on demo data
        setIsLiveResult(false);
      }
    } catch (err) {
      console.error('Live translate error:', err);
      setIsLiveResult(false);
    } finally {
      setIsLiveLoading(false);
    }
  }, [alert.originalMessage, language]);

  // Reset live results when language changes
  const handleLanguageChange = (code: string) => {
    setLanguage(code as typeof language);
    setLangMenuOpen(false);
    setLiveTranslation(null);
    setLiveSimplified(null);
    setIsLiveResult(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">

        {/* Back */}
        <Link href="/emergency" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Emergency Center
        </Link>

        <div className="animate-fade-up">
          {/* DEMO BANNER */}
          <DemoBanner />

          {/* Alert header */}
          <div className={`mt-4 rounded-2xl border-2 ${severityColor(alert.severity)} p-5`}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{alertTypeIcon(alert.type)}</span>
                <div>
                  <div className="font-black text-xl tracking-tight">{alertTypeLabel(alert.type)}</div>
                  <span className="badge bg-white/25 text-xs mt-1">{severityLabel(alert.severity)}</span>
                </div>
              </div>
              <div className="text-right text-xs opacity-80">
                <div>ID: {alert.id}</div>
                <div className="font-mono">{formatDate(alert.issuedAt)}</div>
              </div>
            </div>

            <div className="mt-4 grid sm:grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2 opacity-90">
                <MapPin className="w-4 h-4 shrink-0" /> {alert.location}
              </div>
              <div className="flex items-center gap-2 opacity-90">
                <Info className="w-4 h-4 shrink-0" /> {alert.sourceAuthority}
              </div>
              <div className="flex items-center gap-2 opacity-90">
                <Clock className="w-4 h-4 shrink-0" /> Valid until: {formatDate(alert.validUntil)}
              </div>
            </div>
          </div>

          {/* Official message */}
          <div className="mt-6 official-box">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">📋 Official Message</span>
              <span className="badge bg-blue-100 text-blue-600 text-[10px]">Preserved verbatim</span>
            </div>
            <p className="text-slate-700 text-sm leading-relaxed">{alert.originalMessage}</p>
          </div>

          {/* Language selector + Live translate */}
          <div className="mt-6 card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-800 flex items-center gap-2">
                <Globe className="w-4 h-4 text-teal-600" />
                Understand in my language
              </h2>
              <div className="flex items-center gap-2">
                {/* Live Translate button */}
                <button
                  onClick={handleLiveTranslate}
                  disabled={isLiveLoading}
                  className={cn(
                    'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
                    isLiveLoading
                      ? 'bg-teal-100 text-teal-600 cursor-wait'
                      : isLiveResult
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200'
                  )}
                >
                  {isLiveLoading ? (
                    <><RefreshCw className="w-3 h-3 animate-spin" /> Translating…</>
                  ) : isLiveResult ? (
                    <><Sparkles className="w-3 h-3" /> AI Live ✓</>
                  ) : (
                    <><RefreshCw className="w-3 h-3" /> Live Translate</>
                  )}
                </button>

                {/* Language picker */}
                <div className="relative">
                  <button
                    onClick={() => setLangMenuOpen(!langMenuOpen)}
                    className="btn-secondary text-sm gap-1.5 py-2"
                  >
                    {currentLang?.nativeName}
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  {langMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 max-h-72 overflow-y-auto">
                      {LANGUAGES.map(lang => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          className={cn(
                            'w-full text-left px-4 py-2.5 text-sm flex items-center justify-between transition-colors',
                            language === lang.code ? 'bg-teal-50 text-teal-700 font-semibold' : 'hover:bg-slate-50 text-slate-700'
                          )}
                        >
                          <span>{lang.nativeName}</span>
                          <span className="text-xs text-slate-400">{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Live indicator */}
            {isLiveResult && (
              <div className="mb-3">
                <DemoBanner variant="live" message="Live AI translation powered by Gemini free tier. Verify against official content." />
              </div>
            )}

            {/* Translated message */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Translated Message</span>
                  {isLiveResult && liveTranslation ? (
                    <span className="badge bg-green-100 text-green-700 text-[10px] flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> AI Live
                    </span>
                  ) : (
                    <span className="badge bg-slate-100 text-slate-500 text-[10px]">Demo</span>
                  )}
                </div>
                <TTSButton text={displayTranslation} size="sm" />
              </div>
              <p className="text-slate-800 text-sm leading-relaxed bg-slate-50 rounded-xl p-3">
                {displayTranslation}
              </p>
            </div>

            {/* AI Simplified */}
            <div className="ai-box">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">✨ Simple Explanation</span>
                  {isLiveResult && liveSimplified ? (
                    <span className="badge bg-green-100 text-green-700 text-[10px] flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> AI Live
                    </span>
                  ) : (
                    <span className="badge bg-amber-100 text-amber-700 text-[10px]">AI Explanation</span>
                  )}
                </div>
                <TTSButton text={displaySimplified} size="sm" label="Listen (Simple)" />
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">{displaySimplified}</p>
            </div>
          </div>

          {/* Action steps */}
          <div className="mt-4 card p-5">
            <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-teal-600" />
              What should I do?
            </h2>
            <div className="flex items-center gap-2 mb-4">
              <TTSButton text={displayActionPoints.join('. ')} label="Listen to all steps" />
            </div>
            <div className="space-y-3">
              {displayActionPoints.map((point, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-xl bg-green-50 border border-green-100">
                  <span className="w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-slate-700 text-sm leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Map toggle */}
          <div className="mt-4">
            <button
              onClick={() => setShowMap(!showMap)}
              className="btn-secondary w-full justify-center"
            >
              <MapPin className="w-4 h-4" />
              {showMap ? 'Hide Map' : '📍 View Emergency Map'}
            </button>
          </div>

          {showMap && (
            <div className="mt-4 animate-fade-in">
              <DemoBanner message="DEMO MAP — Locations are illustrative and NOT real emergency locations." />
              <div className="mt-3">
                <MapView
                  center={[alert.coordinates.lat, alert.coordinates.lng]}
                  radius={alert.affectedRadius}
                  shelters={alert.shelters}
                  alertType={alert.type}
                />
              </div>
              <div className="mt-3 grid sm:grid-cols-2 gap-3">
                {alert.shelters.map(s => (
                  <div key={s.name} className="card p-4 border border-green-100">
                    <div className="font-semibold text-slate-800 text-sm mb-1">🏫 {s.name}</div>
                    <div className="text-xs text-slate-500 mb-1">{s.address}</div>
                    <div className="flex gap-3 text-xs text-slate-500">
                      <span>👥 Capacity: {s.capacity}</span>
                      {s.contact && <span>📞 {s.contact}</span>}
                    </div>
                    <span className="demo-banner text-[10px] mt-2">DEMO LOCATION</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Switch language demo */}
          <div className="mt-6 card p-5">
            <h2 className="font-bold text-slate-700 mb-3 text-sm">Try this alert in another language:</h2>
            <div className="flex flex-wrap gap-2">
              {LANGUAGES.slice(0, 8).map(lang => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-sm transition-all',
                    language === lang.code
                      ? 'bg-teal-600 text-white font-semibold'
                      : 'bg-slate-100 text-slate-600 hover:bg-teal-50 hover:text-teal-700'
                  )}
                >
                  {lang.nativeName}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
