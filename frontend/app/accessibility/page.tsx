'use client';

import { Navbar } from '@/components/Navbar';
import { useAppStore } from '@/lib/store';
import { Sun, Moon, ZoomIn, ZoomOut, Volume2, VolumeX, Eye, Keyboard, Minus, Plus, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AccessibilityPage() {
  const { accessibility, setAccessibility } = useAppStore();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <div className="animate-fade-up mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">♿</span>
            <div>
              <h1 className="text-2xl font-black text-slate-800">Accessibility Settings</h1>
              <p className="text-slate-500 text-sm">Customize Sahara to suit your needs</p>
            </div>
          </div>
        </div>

        <div className="space-y-5">

          {/* High contrast */}
          <div className="card p-6 animate-fade-up stagger-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
                  {accessibility.highContrast ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-white" />}
                </div>
                <div>
                  <div className="font-bold text-slate-800">High Contrast Mode</div>
                  <div className="text-slate-500 text-sm">Stronger contrast for better readability</div>
                </div>
              </div>
              <button
                onClick={() => setAccessibility({ highContrast: !accessibility.highContrast })}
                className={cn('relative w-14 h-7 rounded-full transition-colors duration-200', accessibility.highContrast ? 'bg-teal-600' : 'bg-slate-200')}
                aria-label="Toggle high contrast"
              >
                <span className={cn('absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform duration-200', accessibility.highContrast ? 'translate-x-7' : 'translate-x-0.5')} />
              </button>
            </div>
          </div>

          {/* Font size */}
          <div className="card p-6 animate-fade-up stagger-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <ZoomIn className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="font-bold text-slate-800">Text Size</div>
                <div className="text-slate-500 text-sm">Adjust font size across the app</div>
              </div>
            </div>
            <div className="flex gap-3">
              {(['normal', 'large', 'xlarge'] as const).map(size => (
                <button
                  key={size}
                  onClick={() => setAccessibility({ fontSize: size })}
                  className={cn(
                    'flex-1 py-3 rounded-xl font-semibold transition-all border',
                    accessibility.fontSize === size
                      ? 'bg-teal-600 text-white border-teal-600'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-teal-300'
                  )}
                  style={{ fontSize: size === 'normal' ? '14px' : size === 'large' ? '16px' : '18px' }}
                >
                  {size === 'normal' ? 'Normal' : size === 'large' ? 'Large' : 'X-Large'}
                </button>
              ))}
            </div>
          </div>

          {/* TTS */}
          <div className="card p-6 animate-fade-up stagger-3">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                  {accessibility.ttsEnabled ? <Volume2 className="w-5 h-5 text-green-600" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
                </div>
                <div>
                  <div className="font-bold text-slate-800">Text-to-Speech</div>
                  <div className="text-slate-500 text-sm">Read content aloud in your language</div>
                </div>
              </div>
              <button
                onClick={() => setAccessibility({ ttsEnabled: !accessibility.ttsEnabled })}
                className={cn('relative w-14 h-7 rounded-full transition-colors duration-200', accessibility.ttsEnabled ? 'bg-teal-600' : 'bg-slate-200')}
                aria-label="Toggle TTS"
              >
                <span className={cn('absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform duration-200', accessibility.ttsEnabled ? 'translate-x-7' : 'translate-x-0.5')} />
              </button>
            </div>

            {/* TTS speed */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-600">Playback Speed</span>
                <span className="font-bold text-teal-700">{accessibility.ttsSpeed.toFixed(1)}x</span>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setAccessibility({ ttsSpeed: Math.max(0.5, accessibility.ttsSpeed - 0.1) })} className="btn-ghost p-1.5"><Minus className="w-4 h-4" /></button>
                <input
                  type="range" min="0.5" max="2" step="0.1"
                  value={accessibility.ttsSpeed}
                  onChange={e => setAccessibility({ ttsSpeed: parseFloat(e.target.value) })}
                  className="flex-1 accent-teal-600"
                />
                <button onClick={() => setAccessibility({ ttsSpeed: Math.min(2, accessibility.ttsSpeed + 0.1) })} className="btn-ghost p-1.5"><Plus className="w-4 h-4" /></button>
              </div>
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>Slow (0.5x)</span><span>Normal (1.0x)</span><span>Fast (2.0x)</span>
              </div>
            </div>
          </div>

          {/* Reduce motion */}
          <div className="card p-6 animate-fade-up stagger-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-bold text-slate-800">Reduce Motion</div>
                  <div className="text-slate-500 text-sm">Minimize animations and transitions</div>
                </div>
              </div>
              <button
                onClick={() => setAccessibility({ reduceMotion: !accessibility.reduceMotion })}
                className={cn('relative w-14 h-7 rounded-full transition-colors duration-200', accessibility.reduceMotion ? 'bg-teal-600' : 'bg-slate-200')}
                aria-label="Toggle reduce motion"
              >
                <span className={cn('absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform duration-200', accessibility.reduceMotion ? 'translate-x-7' : 'translate-x-0.5')} />
              </button>
            </div>
          </div>

          {/* Keyboard nav info */}
          <div className="card p-6 animate-fade-up stagger-4 bg-blue-50 border border-blue-100">
            <div className="flex items-center gap-3 mb-3">
              <Keyboard className="w-5 h-5 text-blue-600" />
              <div className="font-bold text-blue-800">Keyboard Navigation</div>
            </div>
            <div className="space-y-2 text-sm text-blue-700">
              <div className="flex gap-2"><kbd className="px-2 py-0.5 bg-white rounded border border-blue-200 font-mono text-xs">Tab</kbd><span>Move between interactive elements</span></div>
              <div className="flex gap-2"><kbd className="px-2 py-0.5 bg-white rounded border border-blue-200 font-mono text-xs">Enter</kbd><span>Activate buttons and links</span></div>
              <div className="flex gap-2"><kbd className="px-2 py-0.5 bg-white rounded border border-blue-200 font-mono text-xs">Space</kbd><span>Toggle checkboxes and buttons</span></div>
              <div className="flex gap-2"><kbd className="px-2 py-0.5 bg-white rounded border border-blue-200 font-mono text-xs">Esc</kbd><span>Close menus and dialogs</span></div>
            </div>
          </div>

          {/* Reset */}
          <button
            onClick={() => setAccessibility({ highContrast: false, fontSize: 'normal', ttsSpeed: 1, ttsEnabled: true, reduceMotion: false })}
            className="btn-ghost w-full justify-center gap-2 text-slate-500"
          >
            <RotateCcw className="w-4 h-4" /> Reset to defaults
          </button>
        </div>
      </main>
    </div>
  );
}
