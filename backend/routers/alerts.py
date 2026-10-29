from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

# Demo translation responses
TRANSLATIONS = {
    "hi": {
        "flood": "डेमो जिले के निचले इलाकों में रहने वाले लोगों को भारी बारिश और बाढ़ के कारण तुरंत सुरक्षित स्थान पर जाने की सलाह दी जाती है।",
        "simplified": "भारी बारिश से बाढ़ आ सकती है। निचले इलाके के लोग तुरंत सुरक्षित जगह जाएं।",
    },
    "mr": {
        "flood": "डेमो जिल्ह्यातील सखल भागात राहणाऱ्या रहिवाशांना मुसळधार पाऊस आणि पूरामुळे तातडीने सुरक्षित ठिकाणी जाण्याचा सल्ला देण्यात येतो.",
        "simplified": "मुसळधार पाऊसामुळे पूर येऊ शकतो. निचल भागातील लोकांनी लगेच सुरक्षित ठिकाण जावे.",
    },
}

class TranslateAlertRequest(BaseModel):
    alert_id: str
    language: str
    include_simplified: bool = True

@router.get("/")
def list_alerts():
    """List all demo alerts (metadata only)"""
    return {
        "alerts": [
            {"id": "DEMO-001", "type": "flood", "severity": "critical", "location": "Demo District, Maharashtra"},
            {"id": "DEMO-002", "type": "rainfall", "severity": "high", "location": "Demo City, Karnataka"},
            {"id": "DEMO-003", "type": "cyclone", "severity": "critical", "location": "Demo Coast, Odisha"},
            {"id": "DEMO-004", "type": "heat", "severity": "high", "location": "Demo Region, Rajasthan"},
        ],
        "note": "DEMO DATA — Not real emergency alerts",
    }

@router.get("/{alert_id}")
def get_alert(alert_id: str):
    """Get a single demo alert"""
    if alert_id not in ["DEMO-001", "DEMO-002", "DEMO-003", "DEMO-004"]:
        raise HTTPException(status_code=404, detail="Alert not found")
    return {
        "id": alert_id,
        "note": "Full alert data is served from frontend demo-data.ts in the prototype. Production would fetch from this endpoint.",
        "status": "demo",
    }

@router.post("/{alert_id}/translate")
def translate_alert(alert_id: str, request: TranslateAlertRequest):
    """Translate and simplify an alert into the requested language"""
    lang = request.language
    translation = TRANSLATIONS.get(lang, {})
    return {
        "alert_id": alert_id,
        "language": lang,
        "translated_message": translation.get("flood", f"[Translation for {lang} would appear here in production]"),
        "simplified_message": translation.get("simplified", f"[Simplified {lang} version would appear here]") if request.include_simplified else None,
        "note": "DEMO: Production would use a multilingual LLM/translation API",
        "disclaimer": "AI-generated content. Original official message takes precedence.",
    }
