'use client';

import { useState, useRef, useCallback } from 'react';
import { Mic, MicOff, Volume2, Globe, HelpCircle, FileText, AlertTriangle, CheckCircle, ChevronDown, Sparkles } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { DemoBanner } from '@/components/DemoBanner';
import { useAppStore } from '@/lib/store';
import { LANGUAGES, LANGUAGE_MAP } from '@/lib/languages';
import { cn } from '@/lib/utils';

type VoiceState = 'idle' | 'listening' | 'processing' | 'done' | 'error';

const DEMO_VOICE_COMMANDS: Array<{ input: Record<string, string>; action: string; response: Record<string, string> }> = [
  {
    input: { hi: 'मेरा नाम राहुल कुमार है', en: 'My name is Rahul Kumar', mr: 'माझे नाव राहुल कुमार आहे' },
    action: 'fill_name',
    response: { hi: 'नाम "राहुल कुमार" भरा गया है।', en: 'Name "Rahul Kumar" has been filled.', mr: '"राहुल कुमार" हे नाव भरले आहे.' },
  },
  {
    input: { hi: 'मुझे यह फॉर्म समझ नहीं आ रहा है', en: "I don't understand this form", mr: 'हा फॉर्म मला समजत नाही' },
    action: 'explain_form',
    response: { hi: 'ज़रूर। आप जिस field को समझना चाहते हैं, उसे चुनें।', en: 'Of course. Please select the field you want me to explain.', mr: 'नक्की. तुम्हाला कोणते field समजायचे आहे ते निवडा.' },
  },
  {
    input: { hi: 'मुझे बाढ़ की चेतावनी सुनाओ', en: 'Read me the flood warning', mr: 'मला पूर चेतावणी सांग' },
    action: 'read_alert',
    response: { hi: 'डेमो जिले में बाढ़ की चेतावनी: भारी बारिश से बाढ़ आ सकती है। निचले इलाके से तुरंत सुरक्षित जगह जाएं।', en: 'Demo District Flood Warning: Heavy rain may cause flooding. People in low-lying areas should move to safety immediately.', mr: 'डेमो जिल्हा पूर चेतावणी: मुसळधार पावसाने पूर येऊ शकतो. सखल भागातील लोकांनी तत्काळ सुरक्षित ठिकाणी जावे.' },
  },
];

// Check if browser supports SpeechRecognition
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getSpeechRecognition(): any | null {
  if (typeof window === 'undefined') return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  return SR ?? null;
}

export default function VoicePage() {
  const { language, setLanguage, speak } = useAppStore();
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [responseIsDemo, setResponseIsDemo] = useState(true);
  const [langOpen, setLangOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const currentLang = LANGUAGE_MAP[language];

  const hasSpeechRecognition = typeof window !== 'undefined' && getSpeechRecognition() !== null;

  // Send transcript to AI for a response
  const getAIResponse = useCallback(async (userText: string) => {
    try {
      const res = await fetch('/api/simplify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `The user said: "${userText}". Respond helpfully in the same language. If they asked about a form, offer to explain it. If they asked about an emergency, provide guidance. Keep response to 1-2 sentences.`,
          language,
          context: 'general',
        }),
      });

      const data = await res.json();
      if (data.simplified && !data.isDemo) {
        setResponse(data.simplified);
        setResponseIsDemo(false);
        speak(data.simplified, currentLang?.locale);
        return;
      }
    } catch {
      // Fall through to demo fallback
    }

    // Demo fallback — try to match a demo command
    const matched = DEMO_VOICE_COMMANDS.find(cmd => {
      const cmdText = cmd.input[language] ?? cmd.input['en'] ?? '';
      return userText.toLowerCase().includes(cmdText.toLowerCase().slice(0, 10));
    });

    const fallbackResponse = matched
      ? (matched.response[language] ?? matched.response['en'] ?? '')
      : (language === 'hi'
        ? `आपने कहा: "${userText}". मैं Sahara हूँ, मैं आपकी मदद कर सकता हूँ।`
        : language === 'mr'
        ? `तुम्ही म्हणालात: "${userText}". मी Sahara आहे, मी तुमची मदत करू शकतो.`
        : `You said: "${userText}". I'm Sahara, I can help you with emergency alerts and government forms.`);

    setResponse(fallbackResponse);
    setResponseIsDemo(true);
    speak(fallbackResponse, currentLang?.locale);
  }, [language, currentLang?.locale, speak]);

  const startListening = useCallback(() => {
    const SpeechRecognitionClass = getSpeechRecognition();

    if (!SpeechRecognitionClass) {
      // Prompt fallback for browsers without SpeechRecognition
      const val = prompt('Voice input (browser does not support SpeechRecognition — type your input):');
      if (val) {
        setTranscript(val);
        setVoiceState('processing');
        getAIResponse(val).then(() => setVoiceState('done'));
      }
      return;
    }

    // Stop any previous recognition
    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch { /* ignore */ }
    }

    const recognition = new SpeechRecognitionClass();
    recognition.lang = currentLang?.locale || 'hi-IN';
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setVoiceState('listening');
      setErrorMessage('');
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
      setVoiceState('processing');
      getAIResponse(result).then(() => setVoiceState('done'));
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onerror = (event: any) => {
      console.warn('SpeechRecognition error:', event.error);
      if (event.error === 'no-speech') {
        setErrorMessage('No speech detected. Please try again.');
      } else if (event.error === 'not-allowed') {
        setErrorMessage('Microphone access denied. Please allow microphone permissions.');
      } else {
        setErrorMessage(`Speech recognition error: ${event.error}`);
      }
      setVoiceState('error');
    };

    recognition.onend = () => {
      if (voiceState === 'listening') {
        // Recognition ended without a result
        setVoiceState('idle');
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
    setVoiceState('listening');
  }, [currentLang?.locale, getAIResponse, voiceState]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch { /* ignore */ }
    }
    setVoiceState('idle');
  }, []);

  const reset = () => {
    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch { /* ignore */ }
    }
    setVoiceState('idle');
    setTranscript('');
    setResponse('');
    setResponseIsDemo(true);
    setErrorMessage('');
  };

  const voiceActions = [
    { icon: <HelpCircle className="w-5 h-5" />, label: 'Explain field', desc: 'Ask what a form field means' },
    { icon: <Globe className="w-5 h-5" />, label: 'Translate', desc: 'Get translation in your language' },
    { icon: <Volume2 className="w-5 h-5" />, label: 'Read aloud', desc: 'Listen to alert or form content' },
    { icon: <AlertTriangle className="w-5 h-5" />, label: 'Explain alert', desc: 'Understand an emergency alert' },
    { icon: <FileText className="w-5 h-5" />, label: 'Find missing field', desc: 'Check what fields are empty' },
    { icon: <CheckCircle className="w-5 h-5" />, label: 'Change language', desc: 'Switch to a different language' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <div className="text-center mb-8 animate-fade-up">
          <h1 className="text-3xl font-black text-slate-800 mb-2">Voice Assistant</h1>
          <p className="text-slate-500">Speak in your language. Sahara understands.</p>
        </div>

        {/* Browser support notice */}
        {!hasSpeechRecognition && (
          <DemoBanner
            variant="fallback"
            message="Your browser does not support Web Speech API. Voice input will use a text prompt fallback."
          />
        )}
        {hasSpeechRecognition && (
          <div className="mb-4 animate-fade-up">
            <DemoBanner
              variant="live"
              message="Voice input powered by browser-native Web Speech API — no API cost."
            />
          </div>
        )}

        {/* Language selector */}
        <div className="flex justify-center mb-8 animate-fade-up stagger-1">
          <div className="relative">
            <button onClick={() => setLangOpen(!langOpen)} className="btn-secondary gap-2">
              <Globe className="w-4 h-4" />
              Speaking in: <strong>{currentLang?.nativeName}</strong>
              <ChevronDown className="w-3 h-3" />
            </button>
            {langOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 max-h-72 overflow-y-auto">
                {LANGUAGES.map(l => (
                  <button key={l.code} onClick={() => { setLanguage(l.code); setLangOpen(false); }}
                    className={cn('w-full text-left px-4 py-2.5 text-sm flex justify-between', language === l.code ? 'bg-teal-50 text-teal-700 font-semibold' : 'hover:bg-slate-50 text-slate-700')}>
                    <span>{l.nativeName}</span><span className="text-xs text-slate-400">{l.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mic button */}
        <div className="flex justify-center mb-8 animate-fade-up stagger-2">
          <button
            onClick={
              voiceState === 'listening' ? stopListening
              : (voiceState === 'idle' || voiceState === 'done' || voiceState === 'error') ? startListening
              : undefined
            }
            disabled={voiceState === 'processing'}
            className={cn(
              'w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none',
              voiceState === 'listening'
                ? 'bg-red-500 shadow-2xl shadow-red-400/50 scale-110 animate-pulse-ring'
                : voiceState === 'processing'
                ? 'bg-teal-500 shadow-lg cursor-wait'
                : voiceState === 'done'
                ? 'bg-green-500 shadow-lg hover:scale-105'
                : voiceState === 'error'
                ? 'bg-amber-500 shadow-lg hover:scale-105'
                : 'gradient-teal shadow-lg hover:scale-105 hover:shadow-xl'
            )}
            aria-label={voiceState === 'listening' ? 'Listening…' : 'Speak'}
          >
            {voiceState === 'listening' ? (
              <MicOff className="w-12 h-12 text-white" />
            ) : voiceState === 'processing' ? (
              <div className="w-10 h-10 rounded-full border-4 border-white/40 border-t-white animate-spin" />
            ) : voiceState === 'done' ? (
              <CheckCircle className="w-12 h-12 text-white" />
            ) : voiceState === 'error' ? (
              <AlertTriangle className="w-12 h-12 text-white" />
            ) : (
              <Mic className="w-12 h-12 text-white" />
            )}
          </button>
        </div>

        <div className="text-center text-slate-500 text-sm mb-8">
          {voiceState === 'idle' && 'Tap the microphone and speak'}
          {voiceState === 'listening' && <span className="text-red-600 font-semibold">🔴 Listening… speak now</span>}
          {voiceState === 'processing' && <span className="text-teal-600 font-semibold">Processing your input…</span>}
          {voiceState === 'done' && <button onClick={reset} className="text-teal-600 hover:underline font-medium">Tap to speak again</button>}
          {voiceState === 'error' && <span className="text-amber-600 font-semibold">{errorMessage || 'An error occurred. Tap to try again.'}</span>}
        </div>

        {/* Transcript + response */}
        {(transcript || response) && (
          <div className="space-y-4 mb-8 animate-fade-up">
            {transcript && (
              <div className="card p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Mic className="w-4 h-4 text-purple-500" />
                  <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">You said</span>
                  <span className="badge bg-purple-100 text-purple-600 text-[10px]">{currentLang?.name} detected</span>
                </div>
                <p className="text-slate-800 font-medium">&quot;{transcript}&quot;</p>
              </div>
            )}

            {response && voiceState === 'done' && (
              <div className="ai-box">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Sahara says</span>
                    {responseIsDemo ? (
                      <span className="badge bg-amber-100 text-amber-700 text-[10px]">Demo Response</span>
                    ) : (
                      <span className="badge bg-green-100 text-green-700 text-[10px] flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> AI Live
                      </span>
                    )}
                  </div>
                  <button onClick={() => speak(response, currentLang?.locale)} className="text-xs text-teal-600 hover:underline">🔊 Listen</button>
                </div>
                <p className="text-slate-700">{response}</p>

                <div className="mt-4 flex gap-3">
                  <button onClick={startListening} className="btn-secondary text-sm py-2">
                    <Mic className="w-3 h-3" /> Speak Again
                  </button>
                  <button onClick={reset} className="btn-ghost text-sm py-2">Clear</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Demo commands */}
        <div className="card p-5 mb-6 animate-fade-up stagger-3">
          <h3 className="font-bold text-slate-700 text-sm mb-3">Try saying (demo examples):</h3>
          <div className="space-y-2">
            {DEMO_VOICE_COMMANDS.map((cmd, i) => (
              <button
                key={i}
                onClick={() => {
                  const t = cmd.input[language] ?? cmd.input['en'] ?? '';
                  setTranscript(t);
                  setVoiceState('processing');
                  getAIResponse(t).then(() => setVoiceState('done'));
                }}
                className="w-full text-left px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-teal-50 text-sm text-slate-700 hover:text-teal-700 transition-colors"
              >
                🎤 &quot;{cmd.input[language] ?? cmd.input['en']}&quot;
              </button>
            ))}
          </div>
        </div>

        {/* Voice actions */}
        <div className="card p-5 animate-fade-up stagger-4">
          <h3 className="font-bold text-slate-800 mb-4">Voice Assistant can help with:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {voiceActions.map(a => (
              <div key={a.label} className="bg-slate-50 rounded-xl p-3 text-center">
                <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center mx-auto mb-2 text-teal-600">{a.icon}</div>
                <div className="text-xs font-semibold text-slate-700">{a.label}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{a.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
