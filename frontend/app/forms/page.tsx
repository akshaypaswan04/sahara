'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';
import { Upload, FileText, Camera, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { DemoBanner } from '@/components/DemoBanner';
import { DEMO_FORMS } from '@/lib/demo-data';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';

interface OcrField {
  id: string;
  name: string;
  label: string;
  type: string;
  required: boolean;
  confidence: number;
}

export default function FormsPage() {
  const { clearFormValues } = useAppStore();
  const [dragging, setDragging] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [ocrFields, setOcrFields] = useState<OcrField[]>([]);
  const [ocrIsDemo, setOcrIsDemo] = useState(true);
  const [ocrText, setOcrText] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file?: File) => {
    setAnalyzing(true);
    setUploaded(false);
    setOcrFields([]);
    setOcrText('');

    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/ocr', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (data.fields) {
          setOcrFields(data.fields);
          setOcrIsDemo(data.isDemo ?? true);
          setOcrText(data.text ?? '');
        }
      } catch (err) {
        console.error('OCR upload error:', err);
        setOcrIsDemo(true);
      }
    } else {
      // No file — simulate with demo fallback
      await new Promise(resolve => setTimeout(resolve, 1500));
      setOcrIsDemo(true);
    }

    setAnalyzing(false);
    setUploaded(true);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    handleFile(f);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files?.[0];
    handleFile(f);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">

        {/* Header */}
        <div className="mb-6 animate-fade-up">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500 flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-800">Form Assistant</h1>
              <p className="text-slate-500 text-sm">Upload a government form and get every field explained in your language</p>
            </div>
          </div>
          <DemoBanner message="DEMO DATA — All forms are illustrative samples, not real government forms." variant="info" />
        </div>

        {/* Upload zone */}
        <div className="card p-6 mb-8 animate-fade-up stagger-1">
          <h2 className="font-bold text-slate-800 mb-4">Upload a Form</h2>

          <div
            className={cn(
              'border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-200 cursor-pointer',
              dragging ? 'border-teal-400 bg-teal-50' : 'border-slate-200 hover:border-teal-300 hover:bg-slate-50'
            )}
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            onClick={() => fileRef.current?.click()}
          >
            <input ref={fileRef} type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={onFileChange} />
            {analyzing ? (
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full border-4 border-teal-200 border-t-teal-600 animate-spin" />
                <p className="text-teal-600 font-semibold">AI Analyzing Document…</p>
                <p className="text-slate-400 text-sm">Detecting fields, language, and structure</p>
              </div>
            ) : uploaded ? (
              <div className="flex flex-col items-center gap-3">
                <CheckCircle className="w-12 h-12 text-green-500" />
                <p className="text-green-700 font-semibold">Analysis Complete!</p>
                {ocrIsDemo ? (
                  <p className="text-slate-500 text-sm">Demo fallback — select a demo form below to continue</p>
                ) : (
                  <p className="text-green-600 text-sm flex items-center gap-1">
                    <Sparkles className="w-4 h-4" /> OCR detected {ocrFields.length} fields via Cloud Vision
                  </p>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <Upload className="w-10 h-10 text-slate-300" />
                <p className="font-semibold text-slate-600">Drop a PDF or image here</p>
                <p className="text-slate-400 text-sm">or click to browse</p>
                <div className="flex gap-3 mt-2">
                  <span className="tag">PDF</span>
                  <span className="tag">JPG</span>
                  <span className="tag">PNG</span>
                </div>
              </div>
            )}
          </div>

          {/* OCR results */}
          {uploaded && ocrFields.length > 0 && (
            <div className="mt-4 animate-fade-in">
              <DemoBanner
                variant={ocrIsDemo ? 'fallback' : 'live'}
                message={ocrIsDemo
                  ? 'OCR demo fallback — Cloud Vision API key not set. Showing sample fields.'
                  : `OCR powered by Google Cloud Vision free tier. ${ocrFields.length} fields detected.`
                }
              />
              <div className="mt-3 space-y-2">
                {ocrFields.map(f => (
                  <div key={f.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <span className="text-xl">📝</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-slate-700 text-sm">{f.label}</div>
                      <div className="text-xs text-slate-400">Type: {f.type} · {f.required ? 'Required' : 'Optional'} · Confidence: {(f.confidence * 100).toFixed(0)}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mobile camera option */}
          <div className="mt-4 flex gap-3">
            <button onClick={() => { fileRef.current?.setAttribute('capture', 'environment'); fileRef.current?.click(); }} className="btn-secondary flex-1 justify-center text-sm">
              <Camera className="w-4 h-4" /> Take Photo
            </button>
            <button onClick={() => fileRef.current?.click()} className="btn-secondary flex-1 justify-center text-sm">
              <Upload className="w-4 h-4" /> Browse Files
            </button>
          </div>
        </div>

        {/* Demo forms */}
        <div className="animate-fade-up stagger-2">
          <h2 className="font-bold text-slate-800 mb-4">Or select a demo form:</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {DEMO_FORMS.map((form, i) => (
              <Link
                key={form.id}
                href={`/forms/${form.id}`}
                onClick={() => clearFormValues()}
                className="card-hover p-6 border border-transparent hover:border-blue-100 animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl mb-4">📋</div>
                <div className="font-bold text-slate-800 mb-1">{form.title}</div>
                <div className="text-xs text-slate-500 mb-3">{form.source}</div>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed line-clamp-2">{form.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <span className="tag">{form.fields.length} fields</span>
                    <span className="tag">{form.requiredDocuments.filter(d => d.mandatory).length} docs</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* OCR info */}
        <div className="mt-8 card p-5 animate-fade-up stagger-3">
          <h3 className="font-bold text-slate-800 mb-3">AI Document Analysis</h3>
          <div className="grid sm:grid-cols-4 gap-3">
            {[
              { icon: '🔍', label: 'Field Detection', desc: 'Automatically detects all form fields' },
              { icon: '📝', label: 'Type Recognition', desc: 'Identifies text, date, select fields' },
              { icon: '⭐', label: 'Required Fields', desc: 'Marks mandatory vs optional' },
              { icon: '📄', label: 'Document List', desc: 'Lists required supporting documents' },
            ].map(f => (
              <div key={f.label} className="bg-slate-50 rounded-xl p-3 text-center">
                <div className="text-2xl mb-2">{f.icon}</div>
                <div className="text-xs font-semibold text-slate-700">{f.label}</div>
                <div className="text-[10px] text-slate-500 mt-1">{f.desc}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-3 italic">
            Live OCR uses Google Cloud Vision free tier (1000 units/month). Falls back to demo data when API key is not set.
          </p>
        </div>
      </main>
    </div>
  );
}
