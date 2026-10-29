from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List

router = APIRouter()

class AnalyzeRequest(BaseModel):
    file_type: str = "pdf"
    language: Optional[str] = "en"

class FieldExplainRequest(BaseModel):
    form_id: str
    field_id: str
    language: str

@router.get("/")
def list_forms():
    """List available demo forms"""
    return {
        "forms": [
            {"id": "FORM-001", "title": "National Scholarship Application", "fields": 7, "docs": 5},
            {"id": "FORM-002", "title": "Disaster Relief Assistance Application", "fields": 3, "docs": 4},
            {"id": "FORM-003", "title": "Government Service Request Form", "fields": 2, "docs": 3},
        ],
        "note": "DEMO FORMS — Not real government forms",
    }

@router.get("/{form_id}/fields")
def get_form_fields(form_id: str, language: str = "en"):
    """Get form fields with explanations in the requested language"""
    if form_id not in ["FORM-001", "FORM-002", "FORM-003"]:
        raise HTTPException(status_code=404, detail="Form not found")
    return {
        "form_id": form_id,
        "language": language,
        "note": "In production, this would return fields with explanations from the multilingual AI engine.",
        "status": "demo",
    }

@router.post("/analyze")
def analyze_document(request: AnalyzeRequest):
    """Simulate OCR/AI document analysis"""
    return {
        "status": "success",
        "detected_fields": [
            {"id": "f1", "name": "full_name", "type": "text", "required": True, "confidence": 0.97},
            {"id": "f2", "name": "dob", "type": "date", "required": True, "confidence": 0.95},
            {"id": "f3", "name": "permanent_address", "type": "textarea", "required": True, "confidence": 0.88},
            {"id": "f4", "name": "income", "type": "number", "required": True, "confidence": 0.91},
        ],
        "language_detected": request.language,
        "note": "DEMO: Production uses Google Cloud Vision OCR free tier for real document parsing",
        "is_demo": True,
    }

@router.post("/fields/explain")
def explain_field(request: FieldExplainRequest):
    """Get AI explanation for a specific field in the requested language"""
    return {
        "form_id": request.form_id,
        "field_id": request.field_id,
        "language": request.language,
        "explanation": f"[AI-generated explanation for field '{request.field_id}' in {request.language} would appear here]",
        "note": "DEMO: Production uses Gemini API free tier for context-aware explanations",
        "is_demo": True,
        "disclaimer": "AI Explanation — verify with the original document",
    }
