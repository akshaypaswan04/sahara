'use client';

import { Volume2, VolumeX } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { getLocaleSpeechCode } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface TTSButtonProps {
  text: string;
  className?: string;
  label?: string;
  size?: 'sm' | 'md';
}

export function TTSButton({ text, className, label = 'Listen', size = 'md' }: TTSButtonProps) {
  const { language, speak, stopSpeaking, accessibility } = useAppStore();

  const handleClick = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis?.speaking) {
      stopSpeaking();
    } else {
      speak(text, getLocaleSpeechCode(language));
    }
  };

  const isSpeaking = typeof window !== 'undefined' && window.speechSynthesis?.speaking;

  return (
    <button
      onClick={handleClick}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg font-medium transition-all duration-150',
        size === 'sm'
          ? 'px-3 py-1.5 text-xs'
          : 'px-4 py-2 text-sm',
        isSpeaking
          ? 'bg-teal-600 text-white'
          : 'bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200',
        className
      )}
      aria-label={label}
      title={label}
    >
      {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      {size !== 'sm' && <span>{isSpeaking ? 'Stop' : label}</span>}
    </button>
  );
}
