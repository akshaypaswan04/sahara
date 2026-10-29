import { NextRequest, NextResponse } from 'next/server';
import { simplifyText, isGeminiConfigured } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, language = 'en', context = 'general' } = body;

    if (!text) {
      return NextResponse.json(
        { error: 'Missing required field: text' },
        { status: 400 }
      );
    }

    const simplified = await simplifyText(text, language, context);

    if (simplified) {
      return NextResponse.json({
        simplified,
        language,
        isDemo: false,
        disclaimer: 'AI Explanation — does not replace the original official content.',
      });
    }

    // Demo fallback
    return NextResponse.json({
      simplified: `[Demo: simplification unavailable — API key not set]`,
      language,
      isDemo: true,
      disclaimer: 'Demo fallback — GEMINI_API_KEY not configured.',
    });
  } catch (err) {
    console.error('Simplification API error:', err);
    return NextResponse.json(
      { error: 'Simplification failed', isDemo: true },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    service: 'Sahara Simplification API',
    geminiConfigured: isGeminiConfigured(),
  });
}
