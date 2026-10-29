// Core types for Sahara

export type LanguageCode =
  | 'en' | 'hi' | 'mr' | 'bn' | 'te' | 'ta'
  | 'gu' | 'kn' | 'ml' | 'pa' | 'or' | 'as' | 'ur';

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  script: string;
  locale: string;
  rtl?: boolean;
  fontClass?: string;
}

export type AlertSeverity = 'critical' | 'high' | 'medium' | 'low';
export type AlertType = 'flood' | 'rainfall' | 'cyclone' | 'heat' | 'earthquake' | 'drought' | 'other';

export interface EmergencyAlert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  location: string;
  district: string;
  state: string;
  source: string;
  sourceAuthority: string;
  issuedAt: string;
  validUntil: string;
  originalMessage: string;
  actionPoints: string[];
  coordinates: { lat: number; lng: number };
  affectedRadius: number; // km
  shelters: Shelter[];
  translations: Partial<Record<LanguageCode, AlertTranslation>>;
}

export interface AlertTranslation {
  translatedMessage: string;
  simplifiedMessage: string;
  actionPoints: string[];
}

export interface Shelter {
  name: string;
  address: string;
  coordinates: { lat: number; lng: number };
  capacity: number;
  contact?: string;
}

export interface FormField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'date' | 'select' | 'textarea' | 'file' | 'number';
  required: boolean;
  placeholder?: string;
  options?: string[];
  explanation: Partial<Record<LanguageCode, string>>;
  legalExplanation?: string;
  exampleValue?: string;
  value?: string;
  status?: 'empty' | 'filled' | 'error' | 'warning';
  errorMessage?: string;
}

export interface DemoForm {
  id: string;
  title: string;
  source: string;
  sourceAuthority: string;
  description: string;
  purpose: string;
  fields: FormField[];
  requiredDocuments: RequiredDocument[];
}

export interface RequiredDocument {
  id: string;
  name: string;
  description: string;
  mandatory: boolean;
  uploaded?: boolean;
}

export interface UserState {
  name: string;
  preferredLanguage: LanguageCode;
  location?: string;
  highContrast: boolean;
  fontSize: 'normal' | 'large' | 'xlarge';
  ttsSpeed: number;
  isLoggedIn: boolean;
}
