'use client';

import { useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Mic, MicOff, HelpCircle, CheckCircle, AlertTriangle, XCircle, ChevronDown, ChevronUp, Send, Save, ArrowRight, Eye, Info, Sparkles, RefreshCw } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { DemoBanner } from '@/components/DemoBanner';
import { TTSButton } from '@/components/TTSButton';
import { useAppStore } from '@/lib/store';
import { DEMO_FORMS } from '@/lib/demo-data';
import { LANGUAGE_MAP, LANGUAGES } from '@/lib/languages';
import { cn } from '@/lib/utils';
import type { FormField, LanguageCode } from '@/lib/types';

type Stage = 'fill' | 'validate' | 'review' | 'success';

function FieldExplain({ field, lang, formTitle }: { field: FormField; lang: LanguageCode; formTitle: string }) {
  const [open, setOpen] = useState(false);
  const [liveExplanation, setLiveExplanation] = useState<string | null>(null);
  const [liveLoading, setLiveLoading] = useState(false);
  const [isLive, setIsLive] = useState(false);

  const demoExplanation = field.explanation[lang] ?? field.explanation['en'] ?? '';
  const displayExplanation = liveExplanation ?? demoExplanation;

  const askAI = async () => {
    setLiveLoading(true);
    try {
      const res = await fetch('/api/explain-field', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fieldLabel: field.label,
          fieldContext: `${formTitle} — ${field.name}`,
          language: lang,
        }),
      });
      const data = await res.json();
      if (!data.isDemo && data.explanation) {
        setLiveExplanation(data.explanation);
        setIsLive(true);
      }
    } catch {
      // Keep demo explanation
    } finally {
      setLiveLoading(false);
    }
  };

  return (
    <div className="mt-2">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 text-xs text-teal-700 hover:text-teal-900 font-medium transition-colors"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          {open ? 'Hide explanation' : 'What does this field mean?'}
          {open ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
        {open && !isLive && (
          <button
            onClick={askAI}
            disabled={liveLoading}
            className="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-md bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200 font-semibold transition-colors"
          >
            {liveLoading ? (
              <><RefreshCw className="w-3 h-3 animate-spin" /> Asking AI…</>
            ) : (
              <><Sparkles className="w-3 h-3" /> Ask AI</>
            )}
          </button>
        )}
      </div>
      {open && (
        <div className="mt-2 ai-box animate-fade-in">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">✨ AI Explanation</span>
              {isLive ? (
                <span className="badge bg-green-100 text-green-700 text-[10px] flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> AI Live
                </span>
              ) : (
                <span className="badge bg-amber-100 text-amber-700 text-[10px]">Demo</span>
              )}
            </div>
            <TTSButton text={displayExplanation} size="sm" />
          </div>
          <p className="text-slate-700 text-sm leading-relaxed">{displayExplanation}</p>
        </div>
      )}
    </div>
  );
}

export default function FormFillingPage() {
  const { id } = useParams<{ id: string }>();
  const form = DEMO_FORMS.find(f => f.id === id);

  const { language, setLanguage, currentFormValues, setFormValue, clearFormValues } = useAppStore();
  const [stage, setStage] = useState<Stage>('fill');
  const [listening, setListening] = useState<string | null>(null);
  const [voiceTranscript, setVoiceTranscript] = useState<Record<string, { raw: string; detected: string; confirmed: boolean }>>({});
  const [expandedField, setExpandedField] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState<Set<string>>(new Set());
  const recognitionRef = useRef<unknown>(null);

  if (!form) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <p className="text-2xl font-bold text-slate-400">Form not found</p>
          <Link href="/forms" className="btn-primary mt-6">Back to forms</Link>
        </div>
      </div>
    );
  }

  const currentLang = LANGUAGE_MAP[language];
  const allFields = form.fields;

  // Voice input
  const startListening = (fieldId: string) => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = (window as unknown as Record<string, unknown>).SpeechRecognition || (window as unknown as Record<string, unknown>).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      const val = prompt(`Voice input demo — type your answer for this field:`);
      if (val) {
        setVoiceTranscript(p => ({ ...p, [fieldId]: { raw: val, detected: currentLang?.name || 'English', confirmed: false } }));
      }
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recog = new (SpeechRecognition as any)();
    recog.lang = currentLang?.locale || 'hi-IN';
    recog.interimResults = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recog.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      setVoiceTranscript((p: Record<string, { raw: string; detected: string; confirmed: boolean }>) => ({ ...p, [fieldId]: { raw: transcript, detected: currentLang?.name || 'Hindi', confirmed: false } }));
      setListening(null);
    };
    recog.onend = () => setListening(null);
    recognitionRef.current = recog;
    recog.start();
    setListening(fieldId);
  };

  const confirmVoice = (fieldId: string) => {
    const vt = voiceTranscript[fieldId];
    if (vt) {
      setFormValue(fieldId, vt.raw);
      setVoiceTranscript(p => ({ ...p, [fieldId]: { ...vt, confirmed: true } }));
    }
  };

  // Validation
  const getValidationIssues = () => {
    const issues: Array<{ fieldId: string; label: string; type: 'error' | 'warning'; message: string }> = [];
    for (const field of allFields) {
      if (field.required && !currentFormValues[field.id]) {
        issues.push({ fieldId: field.id, label: field.label, type: 'error', message: 'This required field is empty.' });
      }
    }
    const missingDocs = form.requiredDocuments.filter(d => d.mandatory && !uploadedDocs.has(d.id));
    if (missingDocs.length > 0) {
      issues.push({ fieldId: 'docs', label: 'Required Documents', type: 'warning', message: `${missingDocs.length} required document(s) not uploaded: ${missingDocs.map(d => d.name).join(', ')}.` });
    }
    return issues;
  };

  const issues = getValidationIssues();
  const filledCount = allFields.filter(f => currentFormValues[f.id]).length;
  const progress = Math.round((filledCount / allFields.length) * 100);

  if (stage === 'success') {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="max-w-xl mx-auto px-4 py-20 text-center animate-fade-up">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h1 className="text-3xl font-black text-slate-800 mb-3">Application Submitted!</h1>
          <p className="text-slate-500 mb-2">Reference ID: <strong className="text-teal-700 font-mono">DEMO-{Date.now().toString().slice(-8)}</strong></p>
          <div className="demo-banner justify-center mb-8">This is a demo submission. No real data was sent.</div>
          <div className="flex gap-4 justify-center">
            <Link href="/forms" className="btn-secondary">Fill Another Form</Link>
            <Link href="/dashboard" className="btn-primary">Go to Dashboard</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">

        {/* Back + header */}
        <Link href="/forms" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Forms
        </Link>

        <div className="animate-fade-up mb-6">
          <DemoBanner message="DEMO FORM — This is an illustrative sample. Not a real government form." variant="info" />
          <div className="mt-4 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-xl font-black text-slate-800">{form.title}</h1>
              <p className="text-slate-500 text-sm mt-1">{form.source}</p>
            </div>
            {/* Language selector */}
            <div className="relative shrink-0">
              <button onClick={() => setLangOpen(!langOpen)} className="btn-secondary text-sm gap-1.5 py-2">
                <span>{currentLang?.nativeName}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 max-h-72 overflow-y-auto">
                  {LANGUAGES.map(lang => (
                    <button key={lang.code} onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                      className={cn('w-full text-left px-4 py-2.5 text-sm flex items-center justify-between', language === lang.code ? 'bg-teal-50 text-teal-700 font-semibold' : 'hover:bg-slate-50 text-slate-700')}>
                      <span>{lang.nativeName}</span><span className="text-xs text-slate-400">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
              <span>{filledCount}/{allFields.length} fields filled</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Stage tabs */}
          <div className="mt-4 flex gap-2 bg-slate-100 rounded-2xl p-1">
            {(['fill', 'validate', 'review'] as Stage[]).map(s => (
              <button key={s} onClick={() => setStage(s)} className={cn('flex-1 py-2 rounded-xl text-sm font-semibold capitalize transition-all', stage === s ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700')}>
                {s === 'fill' ? '📝 Fill' : s === 'validate' ? '✅ Check' : '👁 Review'}
              </button>
            ))}
          </div>
        </div>

        {/* FILL stage */}
        {stage === 'fill' && (
          <div className="space-y-4 animate-fade-up">
            {allFields.map(field => {
              const vt = voiceTranscript[field.id];
              const val = currentFormValues[field.id] ?? '';

              return (
                <div key={field.id} className="card p-5">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <label className="font-semibold text-slate-700 text-sm flex items-center gap-1.5">
                      {field.label}
                      {field.required && <span className="text-red-500 text-xs">*</span>}
                    </label>
                    <div className="flex items-center gap-2 shrink-0">
                      {val && <span className="badge bg-green-100 text-green-700 text-[10px]">✓ Filled</span>}
                    </div>
                  </div>

                  {/* Input */}
                  {field.type === 'textarea' ? (
                    <textarea
                      className="input resize-none min-h-[80px]"
                      placeholder={field.placeholder}
                      value={val}
                      onChange={e => setFormValue(field.id, e.target.value)}
                    />
                  ) : field.type === 'select' ? (
                    <select className="input" value={val} onChange={e => setFormValue(field.id, e.target.value)}>
                      <option value="">Select…</option>
                      {field.options?.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : field.type === 'file' ? (
                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center cursor-pointer hover:border-teal-300 transition-colors" onClick={() => setFormValue(field.id, 'document_uploaded.pdf')}>
                      {val ? (
                        <span className="text-green-600 text-sm font-medium">✓ {val}</span>
                      ) : (
                        <span className="text-slate-400 text-sm">Click to upload file</span>
                      )}
                    </div>
                  ) : (
                    <input
                      type={field.type}
                      className="input"
                      placeholder={field.placeholder || field.exampleValue}
                      value={val}
                      onChange={e => setFormValue(field.id, e.target.value)}
                    />
                  )}

                  {/* Voice input */}
                  {field.type !== 'file' && field.type !== 'select' && (
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => listening === field.id ? setListening(null) : startListening(field.id)}
                        className={cn('inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium transition-all',
                          listening === field.id ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200')}
                      >
                        {listening === field.id ? <MicOff className="w-3 h-3" /> : <Mic className="w-3 h-3" />}
                        {listening === field.id ? 'Listening…' : `Speak in ${currentLang?.name}`}
                      </button>
                      {field.exampleValue && (
                        <span className="text-xs text-slate-400">e.g. {field.exampleValue}</span>
                      )}
                    </div>
                  )}

                  {/* Voice transcript confirm */}
                  {vt && !vt.confirmed && (
                    <div className="mt-3 bg-purple-50 border border-purple-200 rounded-xl p-3 animate-fade-in">
                      <div className="text-xs font-bold text-purple-700 mb-1">🎤 Voice Input Detected</div>
                      <div className="text-xs text-slate-500 mb-1">Detected language: <strong>{vt.detected}</strong></div>
                      <div className="font-medium text-slate-800 text-sm mb-3">"{vt.raw}"</div>
                      <div className="flex gap-2">
                        <button onClick={() => confirmVoice(field.id)} className="btn-primary text-xs py-1.5 px-3">Confirm</button>
                        <button onClick={() => { setVoiceTranscript(p => { const n = {...p}; delete n[field.id]; return n; }); }} className="btn-secondary text-xs py-1.5 px-3">Edit</button>
                        <button onClick={() => startListening(field.id)} className="btn-ghost text-xs py-1.5 px-3">Speak Again</button>
                      </div>
                    </div>
                  )}

                  {/* Field explanation */}
                  <FieldExplain field={field} lang={language} formTitle={form.title} />
                </div>
              );
            })}

            {/* Documents */}
            <div className="card p-5">
              <h3 className="font-bold text-slate-800 mb-4">Required Documents</h3>
              <div className="space-y-3">
                {form.requiredDocuments.map(doc => (
                  <div key={doc.id} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50">
                    <div className="flex-1">
                      <div className="font-medium text-slate-700 text-sm flex items-center gap-2">
                        {doc.name}
                        {doc.mandatory ? <span className="badge bg-red-100 text-red-600 text-[10px]">Required</span> : <span className="badge bg-slate-200 text-slate-500 text-[10px]">Optional</span>}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">{doc.description}</div>
                    </div>
                    <button
                      onClick={() => setUploadedDocs(s => { const n = new Set(s); n.has(doc.id) ? n.delete(doc.id) : n.add(doc.id); return n; })}
                      className={cn('btn-secondary text-xs py-1.5 px-3 shrink-0', uploadedDocs.has(doc.id) ? 'bg-green-50 border-green-200 text-green-700' : '')}
                    >
                      {uploadedDocs.has(doc.id) ? '✓ Uploaded' : 'Upload'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStage('validate')} className="btn-primary flex-1 justify-center">
                Check Application <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* VALIDATE stage */}
        {stage === 'validate' && (
          <div className="animate-fade-up space-y-4">
            <div className="card p-6">
              <h2 className="font-bold text-slate-800 mb-5 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-teal-600" /> Application Health Check
              </h2>

              <div className="space-y-3 mb-6">
                {allFields.map(field => {
                  const filled = !!currentFormValues[field.id];
                  return (
                    <div key={field.id} className={cn('flex items-center gap-3 p-3 rounded-xl', filled ? 'bg-green-50' : field.required ? 'bg-red-50' : 'bg-slate-50')}>
                      {filled ? <CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> : field.required ? <XCircle className="w-4 h-4 text-red-500 shrink-0" /> : <AlertTriangle className="w-4 h-4 text-slate-400 shrink-0" />}
                      <div className="flex-1 text-sm">
                        <span className={cn('font-medium', filled ? 'text-green-700' : field.required ? 'text-red-700' : 'text-slate-500')}>{field.label}</span>
                        {!filled && field.required && <p className="text-xs text-red-600 mt-0.5">Required — please fill this field</p>}
                      </div>
                      {!filled && (
                        <button onClick={() => setStage('fill')} className="text-xs text-teal-600 hover:underline font-medium">Fix Now</button>
                      )}
                    </div>
                  );
                })}

                {/* Docs */}
                {form.requiredDocuments.map(doc => {
                  const uploaded = uploadedDocs.has(doc.id);
                  if (!doc.mandatory) return null;
                  return (
                    <div key={doc.id} className={cn('flex items-center gap-3 p-3 rounded-xl', uploaded ? 'bg-green-50' : 'bg-amber-50')}>
                      {uploaded ? <CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> : <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />}
                      <div className="flex-1 text-sm">
                        <span className={cn('font-medium', uploaded ? 'text-green-700' : 'text-amber-700')}>{doc.name}</span>
                        {!uploaded && <p className="text-xs text-amber-600 mt-0.5">Required document not uploaded</p>}
                      </div>
                      {!uploaded && <button onClick={() => setStage('fill')} className="text-xs text-teal-600 hover:underline font-medium">Upload</button>}
                    </div>
                  );
                })}
              </div>

              {issues.length > 0 ? (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                  <div className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" /> {issues.length} issue{issues.length > 1 ? 's' : ''} found
                  </div>
                  <p className="text-amber-700 text-sm">Please fix the issues above before proceeding.</p>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
                  <div className="font-semibold text-green-800 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> All fields complete! Ready to review.
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={() => setStage('fill')} className="btn-secondary">Edit Form</button>
                <button onClick={() => setStage('review')} className="btn-primary flex-1 justify-center">
                  <Eye className="w-4 h-4" /> Review & Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* REVIEW stage */}
        {stage === 'review' && (
          <div className="animate-fade-up space-y-4">
            <div className="card p-6">
              <h2 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-600" /> Review Your Application
              </h2>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-5 flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-amber-800 text-sm">Please verify all information before submission. AI-assisted entries may contain errors.</p>
              </div>

              <div className="space-y-3 mb-6">
                {allFields.map(field => (
                  <div key={field.id} className="flex items-start justify-between gap-3 py-2 border-b border-slate-100 last:border-0">
                    <span className="text-slate-500 text-sm w-40 shrink-0">{field.label}</span>
                    <span className={cn('text-sm font-medium flex-1 text-right', currentFormValues[field.id] ? 'text-slate-800' : 'text-slate-300 italic')}>
                      {currentFormValues[field.id] || '(empty)'}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStage('fill')} className="btn-secondary">Edit</button>
                <button className="btn-secondary">
                  <Save className="w-4 h-4" /> Save Draft
                </button>
                <button onClick={() => setStage('success')} className="btn-primary flex-1 justify-center">
                  <Send className="w-4 h-4" /> Demo Submit
                </button>
              </div>
              <p className="text-xs text-slate-400 text-center mt-3">This is a prototype — no real data will be submitted.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
