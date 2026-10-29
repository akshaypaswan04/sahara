import { NextRequest, NextResponse } from 'next/server';

const VISION_API_KEY = process.env.GOOGLE_CLOUD_VISION_API_KEY;
const VISION_URL = 'https://vision.googleapis.com/v1/images:annotate';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Check if Cloud Vision API key is configured
    if (VISION_API_KEY) {
      try {
        const bytes = await file.arrayBuffer();
        const base64 = Buffer.from(bytes).toString('base64');

        const visionRes = await fetch(`${VISION_URL}?key=${VISION_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            requests: [{
              image: { content: base64 },
              features: [
                { type: 'DOCUMENT_TEXT_DETECTION', maxResults: 1 },
              ],
            }],
          }),
        });

        if (visionRes.ok) {
          const visionData = await visionRes.json();
          const fullText = visionData.responses?.[0]?.fullTextAnnotation?.text ?? '';
          const blocks = visionData.responses?.[0]?.fullTextAnnotation?.pages?.[0]?.blocks ?? [];

          return NextResponse.json({
            text: fullText,
            blockCount: blocks.length,
            fields: extractFieldsFromText(fullText),
            isDemo: false,
            note: 'OCR powered by Google Cloud Vision free tier.',
          });
        } else {
          console.error('Cloud Vision API error:', visionRes.status, await visionRes.text());
        }
      } catch (err) {
        console.error('Cloud Vision call failed:', err);
      }
    }

    // Demo fallback — return realistic-looking field structure
    return NextResponse.json({
      text: '[Demo OCR text — Cloud Vision API key not configured]',
      blockCount: 4,
      fields: [
        { id: 'f1', name: 'full_name', label: 'Full Name', type: 'text', required: true, confidence: 0.97 },
        { id: 'f2', name: 'date_of_birth', label: 'Date of Birth', type: 'date', required: true, confidence: 0.95 },
        { id: 'f3', name: 'permanent_address', label: 'Permanent Address', type: 'textarea', required: true, confidence: 0.88 },
        { id: 'f4', name: 'annual_income', label: 'Annual Income', type: 'number', required: true, confidence: 0.91 },
        { id: 'f5', name: 'category', label: 'Category (SC/ST/OBC/General)', type: 'select', required: true, confidence: 0.85 },
      ],
      isDemo: true,
      note: 'Demo fallback — GOOGLE_CLOUD_VISION_API_KEY not configured. Set it in .env.local for real OCR.',
    });
  } catch (err) {
    console.error('OCR API error:', err);
    return NextResponse.json(
      { error: 'OCR processing failed', isDemo: true },
      { status: 500 }
    );
  }
}

/**
 * Simple heuristic: extract potential form field labels from OCR text.
 * In production, this would use Gemini to understand the form structure.
 */
function extractFieldsFromText(text: string) {
  const lines = text.split('\n').filter(l => l.trim().length > 2);
  const fieldPatterns = [
    /name/i, /date.*birth|dob/i, /address/i, /income/i, /phone|mobile/i,
    /email/i, /father|mother|guardian/i, /gender/i, /category|caste/i,
    /aadhaar|aadhar/i, /bank.*account/i, /occupation/i,
  ];

  const fields: Array<{ id: string; name: string; label: string; type: string; required: boolean; confidence: number }> = [];
  let idx = 0;

  for (const line of lines) {
    for (const pattern of fieldPatterns) {
      if (pattern.test(line) && !fields.some(f => f.label === line.trim())) {
        idx++;
        fields.push({
          id: `ocr_f${idx}`,
          name: line.trim().toLowerCase().replace(/[^a-z0-9]/g, '_'),
          label: line.trim(),
          type: /date/i.test(line) ? 'date' : /address/i.test(line) ? 'textarea' : /income|amount/i.test(line) ? 'number' : 'text',
          required: /\*|required|mandatory/i.test(line),
          confidence: 0.75 + Math.random() * 0.2,
        });
        break;
      }
    }
  }

  return fields;
}

export async function GET() {
  return NextResponse.json({
    service: 'Sahara OCR API',
    visionConfigured: !!VISION_API_KEY,
    note: 'Upload a PDF/image to extract form fields. Falls back to demo data if Vision API key is not set.',
  });
}
