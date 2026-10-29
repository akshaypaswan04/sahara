import { Language, LanguageCode } from './types';

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', script: 'Latin', locale: 'en-IN' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', script: 'Devanagari', locale: 'hi-IN' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', script: 'Devanagari', locale: 'mr-IN' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', script: 'Bengali', locale: 'bn-IN' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', script: 'Telugu', locale: 'te-IN' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', script: 'Tamil', locale: 'ta-IN' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', script: 'Gujarati', locale: 'gu-IN' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', script: 'Kannada', locale: 'kn-IN' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', script: 'Malayalam', locale: 'ml-IN' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', script: 'Gurmukhi', locale: 'pa-IN' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', script: 'Odia', locale: 'or-IN' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', script: 'Bengali', locale: 'as-IN' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', script: 'Nastaliq', locale: 'ur-PK', rtl: true },
];

export const LANGUAGE_MAP: Record<LanguageCode, Language> = Object.fromEntries(
  LANGUAGES.map(l => [l.code, l])
) as Record<LanguageCode, Language>;

export function getLanguage(code: LanguageCode): Language {
  return LANGUAGE_MAP[code] ?? LANGUAGE_MAP['en'];
}

export function getSpeechLang(code: LanguageCode): string {
  return LANGUAGE_MAP[code]?.locale ?? 'en-IN';
}
