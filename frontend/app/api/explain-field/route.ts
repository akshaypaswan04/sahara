import { NextRequest, NextResponse } from 'next/server';
import { explainField, isGeminiConfigured } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fieldLabel, fieldContext = '', language = 'en' } = body;

    if (!fieldLabel) {
      return NextResponse.json(
        { error: 'Missing required field: fieldLabel' },
        { status: 400 }
      );
    }

    const explanation = await explainField(fieldLabel, fieldContext, language);

    if (explanation) {
      return NextResponse.json({
        explanation,
        fieldLabel,
        language,
        isDemo: false,
        disclaimer: 'AI Explanation — verify with the original document.',
      });
    }

    // Demo fallback
    return NextResponse.json({
      explanation: `[Demo: field explanation unavailable — API key not set]`,
      fieldLabel,
      language,
      isDemo: true,
      disclaimer: 'Demo fallback — GEMINI_API_KEY not configured.',
    });
  } catch (err) {
    console.error('Field explanation API error:', err);
    return NextResponse.json(
      { error: 'Field explanation failed', isDemo: true },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    service: 'Sahara Field Explanation API',
    geminiConfigured: isGeminiConfigured(),
  });
}
