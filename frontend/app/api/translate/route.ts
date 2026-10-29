import { NextRequest, NextResponse } from 'next/server';
import { translateText, isGeminiConfigured } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, targetLanguage, sourceLanguage = 'en', context = 'general' } = body;

    if (!text || !targetLanguage) {
      return NextResponse.json(
        { error: 'Missing required fields: text, targetLanguage' },
        { status: 400 }
      );
    }

    const translated = await translateText(text, targetLanguage, sourceLanguage, context);

    if (translated) {
      return NextResponse.json({
        translated,
        sourceLanguage,
        targetLanguage,
        isDemo: false,
        disclaimer: 'AI-generated translation. Verify against original official content.',
      });
    }

    // Demo fallback — return the original text with a demo flag
    return NextResponse.json({
      translated: `[Demo: translation to ${targetLanguage} unavailable — API key not set]`,
      sourceLanguage,
      targetLanguage,
      isDemo: true,
      disclaimer: 'Demo fallback — GEMINI_API_KEY not configured. Set it in .env.local for live translations.',
    });
  } catch (err) {
    console.error('Translation API error:', err);
    return NextResponse.json(
      { error: 'Translation failed', isDemo: true },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    service: 'Sahara Translation API',
    geminiConfigured: isGeminiConfigured(),
    supportedLanguages: ['en', 'hi', 'mr', 'bn', 'te', 'ta', 'gu', 'kn', 'ml', 'pa', 'or', 'as', 'ur'],
  });
}
