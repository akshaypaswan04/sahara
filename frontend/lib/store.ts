'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LanguageCode } from './types';

interface AccessibilitySettings {
  highContrast: boolean;
  fontSize: 'normal' | 'large' | 'xlarge';
  ttsSpeed: number;
  ttsEnabled: boolean;
  reduceMotion: boolean;
}

interface AppStore {
  // Language
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;

  // Accessibility
  accessibility: AccessibilitySettings;
  setAccessibility: (s: Partial<AccessibilitySettings>) => void;

  // Auth (demo)
  isLoggedIn: boolean;
  userName: string;
  login: (name: string) => void;
  logout: () => void;

  // Form state
  currentFormValues: Record<string, string>;
  setFormValue: (fieldId: string, value: string) => void;
  clearFormValues: () => void;

  // Active alert for demo
  activeAlertId: string | null;
  setActiveAlertId: (id: string | null) => void;

  // TTS
  speak: (text: string, lang?: string) => void;
  stopSpeaking: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      language: 'en',
      setLanguage: (lang) => set({ language: lang }),

      accessibility: {
        highContrast: false,
        fontSize: 'normal',
        ttsSpeed: 1,
        ttsEnabled: true,
        reduceMotion: false,
      },
      setAccessibility: (s) =>
        set((state) => ({
          accessibility: { ...state.accessibility, ...s },
        })),

      isLoggedIn: false,
      userName: '',
      login: (name) => set({ isLoggedIn: true, userName: name }),
      logout: () => set({ isLoggedIn: false, userName: '' }),

      currentFormValues: {},
      setFormValue: (fieldId, value) =>
        set((state) => ({
          currentFormValues: { ...state.currentFormValues, [fieldId]: value },
        })),
      clearFormValues: () => set({ currentFormValues: {} }),

      activeAlertId: null,
      setActiveAlertId: (id) => set({ activeAlertId: id }),

      speak: (text, lang) => {
        if (typeof window === 'undefined') return;
        const synth = window.speechSynthesis;
        if (!synth) return;
        synth.cancel();
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = lang ?? 'en-IN';
        utter.rate = get().accessibility.ttsSpeed;
        synth.speak(utter);
      },
      stopSpeaking: () => {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }
      },
    }),
    {
      name: 'sahara-store',
      partialize: (state) => ({
        language: state.language,
        accessibility: state.accessibility,
        isLoggedIn: state.isLoggedIn,
        userName: state.userName,
      }),
    }
  )
);
