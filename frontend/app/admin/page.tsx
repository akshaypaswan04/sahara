'use client';

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { DemoBanner } from '@/components/DemoBanner';
import { DEMO_ALERTS } from '@/lib/demo-data';
import { alertTypeIcon, alertTypeLabel, severityColor, severityLabel, formatDate, cn } from '@/lib/utils';
import { Bell, Users, FileText, Globe, CheckCircle, AlertTriangle, BarChart2, Send, Eye } from 'lucide-react';
import type { AlertType, AlertSeverity } from '@/lib/types';

const stats = [
  { label: 'Active Alerts', value: DEMO_ALERTS.length, icon: <Bell className="w-5 h-5" />, color: 'text-red-500', bg: 'bg-red-50' },
  { label: 'Alerts Delivered', value: '1,247', icon: <Send className="w-5 h-5" />, color: 'text-blue-500', bg: 'bg-blue-50' },
  { label: 'Languages Used', value: '13', icon: <Globe className="w-5 h-5" />, color: 'text-teal-500', bg: 'bg-teal-50' },
  { label: 'Forms Processed', value: '384', icon: <FileText className="w-5 h-5" />, color: 'text-purple-500', bg: 'bg-purple-50' },
  { label: 'Forms Completed', value: '291', icon: <CheckCircle className="w-5 h-5" />, color: 'text-green-500', bg: 'bg-green-50' },
  { label: 'Validation Errors', value: '56', icon: <AlertTriangle className="w-5 h-5" />, color: 'text-amber-500', bg: 'bg-amber-50' },
  { label: 'Users Reached', value: '3,820', icon: <Users className="w-5 h-5" />, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { label: 'Avg. Language / User', value: '2.3', icon: <BarChart2 className="w-5 h-5" />, color: 'text-slate-500', bg: 'bg-slate-50' },
];

const ALERT_TYPES: AlertType[] = ['flood', 'rainfall', 'cyclone', 'heat'];
const ALERT_SEVERITIES: AlertSeverity[] = ['critical', 'high', 'medium', 'low'];

export default function AdminPage() {
  const [newAlert, setNewAlert] = useState({
    type: 'flood' as AlertType,
    severity: 'high' as AlertSeverity,
    location: '',
    message: '',
    source: '',
    validity: '',
  });
  const [previewStage, setPreviewStage] = useState<'form' | 'preview' | 'published'>('form');

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        <div className="mb-6 animate-fade-up">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-2xl gradient-brand flex items-center justify-center">
              <BarChart2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-800">Admin Dashboard</h1>
              <p className="text-slate-500 text-sm">For authorized organizations — prototype view</p>
            </div>
          </div>
          <DemoBanner message="PROTOTYPE — Admin dashboard for demonstration purposes only. All data is simulated." />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <div key={s.label} className={`card p-5 animate-fade-up`} style={{ animationDelay: `${i * 0.05}s` }}>
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center ${s.color} mb-3`}>{s.icon}</div>
              <div className="text-2xl font-black text-slate-800">{s.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Active alerts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="card p-6 animate-fade-up stagger-2">
            <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Bell className="w-4 h-4 text-red-500" /> Active Demo Alerts
            </h2>
            <div className="space-y-3">
              {DEMO_ALERTS.map(alert => (
                <div key={alert.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <span className="text-xl shrink-0">{alertTypeIcon(alert.type)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-800 text-sm">{alertTypeLabel(alert.type)}</span>
                      <span className={`badge ${severityColor(alert.severity)} text-[10px]`}>{alert.severity}</span>
                    </div>
                    <div className="text-xs text-slate-500 truncate">{alert.location}</div>
                    <div className="text-[10px] text-slate-400">{formatDate(alert.issuedAt)}</div>
                  </div>
                  <Eye className="w-4 h-4 text-slate-300 shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Language usage chart */}
          <div className="card p-6 animate-fade-up stagger-3">
            <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Globe className="w-4 h-4 text-teal-500" /> Language Usage (Demo)
            </h2>
            <div className="space-y-2.5">
              {[
                { lang: 'Hindi', pct: 34 },
                { lang: 'Marathi', pct: 18 },
                { lang: 'Bengali', pct: 13 },
                { lang: 'Tamil', pct: 10 },
                { lang: 'Telugu', pct: 8 },
                { lang: 'Gujarati', pct: 6 },
                { lang: 'Other', pct: 11 },
              ].map(l => (
                <div key={l.lang}>
                  <div className="flex justify-between text-xs text-slate-600 mb-1">
                    <span>{l.lang}</span><span>{l.pct}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full">
                    <div className="h-full gradient-teal rounded-full transition-all" style={{ width: `${l.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Create demo alert */}
        <div className="card p-6 animate-fade-up stagger-4">
          <h2 className="font-bold text-slate-800 mb-2">Create Demo Alert</h2>
          <p className="text-slate-500 text-sm mb-5">Prototype functionality — Preview → Translate → Simplify → Publish</p>

          {previewStage === 'form' && (
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-600 mb-1 block">Emergency Type</label>
                <select className="input" value={newAlert.type} onChange={e => setNewAlert(p => ({ ...p, type: e.target.value as AlertType }))}>
                  {ALERT_TYPES.map(t => <option key={t} value={t}>{alertTypeLabel(t as AlertType)}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600 mb-1 block">Severity</label>
                <select className="input" value={newAlert.severity} onChange={e => setNewAlert(p => ({ ...p, severity: e.target.value as AlertSeverity }))}>
                  {ALERT_SEVERITIES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600 mb-1 block">Location</label>
                <input className="input" placeholder="e.g. Demo District, State" value={newAlert.location} onChange={e => setNewAlert(p => ({ ...p, location: e.target.value }))} />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600 mb-1 block">Source</label>
                <input className="input" placeholder="e.g. Demo Authority" value={newAlert.source} onChange={e => setNewAlert(p => ({ ...p, source: e.target.value }))} />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-slate-600 mb-1 block">Official Message</label>
                <textarea className="input min-h-[80px] resize-none" placeholder="Official alert message text…" value={newAlert.message} onChange={e => setNewAlert(p => ({ ...p, message: e.target.value }))} />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600 mb-1 block">Valid Until</label>
                <input type="datetime-local" className="input" value={newAlert.validity} onChange={e => setNewAlert(p => ({ ...p, validity: e.target.value }))} />
              </div>
              <div className="flex items-end">
                <button onClick={() => setPreviewStage('preview')} className="btn-primary w-full justify-center">
                  Preview Alert <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {previewStage === 'preview' && (
            <div className="animate-fade-in space-y-4">
              <div className="official-box">
                <div className="font-bold text-blue-700 mb-2">📋 Preview — Official Message</div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{alertTypeIcon(newAlert.type)}</span>
                  <span className={`badge ${severityColor(newAlert.severity)}`}>{severityLabel(newAlert.severity)}</span>
                  <span className="text-sm text-slate-600">{newAlert.location || 'Location not specified'}</span>
                </div>
                <p className="text-slate-700 text-sm">{newAlert.message || 'No message entered.'}</p>
              </div>
              <div className="ai-box">
                <div className="font-bold text-amber-700 mb-2">✨ AI Simplification (Demo)</div>
                <p className="text-slate-700 text-sm italic">AI would generate simplified explanation and translations into all 13 languages here.</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setPreviewStage('form')} className="btn-secondary">Edit</button>
                <button onClick={() => setPreviewStage('published')} className="btn-primary">
                  <Send className="w-4 h-4" /> Publish Demo Alert
                </button>
              </div>
            </div>
          )}

          {previewStage === 'published' && (
            <div className="animate-fade-in text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-black text-slate-800 mb-2">Demo Alert Published!</h3>
              <p className="text-slate-500 mb-4">In production, this alert would be delivered to all citizens in the affected area in their preferred language.</p>
              <DemoBanner />
              <button onClick={() => { setPreviewStage('form'); setNewAlert({ type: 'flood', severity: 'high', location: '', message: '', source: '', validity: '' }); }} className="btn-secondary mt-4">Create Another</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
