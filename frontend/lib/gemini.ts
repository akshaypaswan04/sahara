/**
 * Gemini API Client — Server-side only
 *
 * Uses the Gemini 2.0 Flash free tier for:
 *   - Translation (Indian languages)
 *   - Simplification (official → plain language)
 *   - Form field explanation
 *
 * Returns null when GEMINI_API_KEY is not set so callers can fall back to demo data.
 */

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-2.0-flash';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
}

async function callGemini(prompt: string): Promise<string | null> {
  if (!GEMINI_API_KEY) return null;

  try {
    const res = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!res.ok) {
      console.error(`Gemini API error: ${res.status} ${res.statusText}`);
      return null;
    }

    const data: GeminiResponse = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? null;
  } catch (err) {
    console.error('Gemini API call failed:', err);
    return null;
  }
}

// ── Language name map for prompts ──
const LANG_NAMES: Record<string, string> = {
  en: 'English', hi: 'Hindi', mr: 'Marathi', bn: 'Bengali',
  te: 'Telugu', ta: 'Tamil', gu: 'Gujarati', kn: 'Kannada',
  ml: 'Malayalam', pa: 'Punjabi', or: 'Odia', as: 'Assamese', ur: 'Urdu',
};

/**
 * Translate text into the target language.
 * context: "emergency" | "form" | "general"
 */
export async function translateText(
  text: string,
  targetLanguage: string,
  sourceLanguage: string = 'en',
  context: string = 'general'
): Promise<string | null> {
  const targetName = LANG_NAMES[targetLanguage] ?? targetLanguage;
  const sourceName = LANG_NAMES[sourceLanguage] ?? sourceLanguage;

  const contextHint = context === 'emergency'
    ? 'This is an official emergency alert. Preserve urgency and accuracy.'
    : context === 'form'
    ? 'This is a government form field or instruction. Be precise and clear.'
    : '';

  const prompt = `Translate the following text from ${sourceName} to ${targetName}. ${contextHint}
Return ONLY the translated text, nothing else.

Text to translate:
${text}`;

  return callGemini(prompt);
}

/**
 * Simplify complex official text into plain language.
 */
export async function simplifyText(
  text: string,
  language: string,
  context: string = 'general'
): Promise<string | null> {
  const langName = LANG_NAMES[language] ?? language;

  const contextHint = context === 'emergency'
    ? 'This is an emergency alert. Focus on what the person should DO.'
    : context === 'form'
    ? 'This is a government form instruction. Focus on what information is being asked for.'
    : '';

  const prompt = `Simplify the following official text into plain, easy-to-understand ${langName}. ${contextHint}
Use short sentences. Avoid technical terms. Write at a 6th-grade reading level.
Return ONLY the simplified text, nothing else.

Text to simplify:
${text}`;

  return callGemini(prompt);
}

/**
 * Explain a form field in the user's language.
 */
export async function explainField(
  fieldLabel: string,
  fieldContext: string,
  language: string
): Promise<string | null> {
  const langName = LANG_NAMES[language] ?? language;

  const prompt = `You are helping an Indian citizen understand a government form field.

Field label: "${fieldLabel}"
Form context: ${fieldContext}

Explain in ${langName} what this field means, what kind of information should be entered, and give one short example.
Use plain, simple language. Keep the explanation to 2-3 sentences maximum.
Return ONLY the explanation, nothing else.`;

  return callGemini(prompt);
}

/**
 * Check if the Gemini API key is configured.
 */
export function isGeminiConfigured(): boolean {
  return !!GEMINI_API_KEY;
}
