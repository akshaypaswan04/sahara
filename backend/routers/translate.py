from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

SUPPORTED_LANGUAGES = [
    "en", "hi", "mr", "bn", "te", "ta", "gu", "kn", "ml", "pa", "or", "as", "ur"
]

class TranslateRequest(BaseModel):
    text: str
    source_language: str = "en"
    target_language: str
    context: Optional[str] = None  # "emergency", "form_field", "general"

class SimplifyRequest(BaseModel):
    text: str
    language: str
    reading_level: Optional[str] = "simple"  # "simple", "medium"

@router.post("/")
def translate(request: TranslateRequest):
    """Translate text to the target language"""
    if request.target_language not in SUPPORTED_LANGUAGES:
        return {"error": f"Language '{request.target_language}' not supported", "supported": SUPPORTED_LANGUAGES}
    return {
        "original": request.text,
        "translated": f"[Translation of text to {request.target_language} would appear here]",
        "source_language": request.source_language,
        "target_language": request.target_language,
        "confidence": 0.92,
        "is_demo": True,
        "note": "DEMO: Production uses Gemini API free tier for translation. Set GEMINI_API_KEY for live translations.",
        "disclaimer": "AI-generated translation. Verify against original official content.",
    }

@router.post("/simplify")
def simplify(request: SimplifyRequest):
    """Simplify complex official text into plain language"""
    return {
        "original": request.text,
        "simplified": f"[Simplified version in {request.language} would appear here]",
        "language": request.language,
        "reading_level": request.reading_level,
        "is_demo": True,
        "note": "DEMO: Production uses Gemini API free tier for simplification.",
        "disclaimer": "AI Explanation — does not replace the original official content.",
    }

@router.get("/languages")
def get_supported_languages():
    """Return list of supported languages"""
    return {
        "languages": [
            {"code": "en", "name": "English", "native": "English", "status": "production-ready"},
            {"code": "hi", "name": "Hindi", "native": "हिन्दी", "status": "production-ready"},
            {"code": "mr", "name": "Marathi", "native": "मराठी", "status": "production-ready"},
            {"code": "bn", "name": "Bengali", "native": "বাংলা", "status": "production-ready"},
            {"code": "te", "name": "Telugu", "native": "తెలుగు", "status": "production-ready"},
            {"code": "ta", "name": "Tamil", "native": "தமிழ்", "status": "production-ready"},
            {"code": "gu", "name": "Gujarati", "native": "ગુજરાતી", "status": "beta"},
            {"code": "kn", "name": "Kannada", "native": "ಕನ್ನಡ", "status": "beta"},
            {"code": "ml", "name": "Malayalam", "native": "മലയാളം", "status": "beta"},
            {"code": "pa", "name": "Punjabi", "native": "ਪੰਜਾਬੀ", "status": "beta"},
            {"code": "or", "name": "Odia", "native": "ଓଡ଼ିଆ", "status": "beta"},
            {"code": "as", "name": "Assamese", "native": "অসমীয়া", "status": "beta"},
            {"code": "ur", "name": "Urdu", "native": "اردو", "status": "beta"},
        ],
        "note": "Language status indicates readiness in the production system. All languages have demo translations in the prototype."
    }
