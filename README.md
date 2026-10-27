# Sahara

> **"Public services that speak your language."**

A multilingual AI accessibility layer for public services in India. Hackathon prototype — September 2026.

---

## Quick Start

### Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
# Open http://localhost:3000
```

### Backend (FastAPI) — Optional for demo

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
# API docs: http://localhost:8000/docs
```

---

## API Keys (Optional — Zero Cost)

Sahara runs fully without any API keys using demo data. To enable **live AI features**, set these optional keys in `frontend/.env.local`:

| Key | Purpose | Free Tier | Required? |
|-----|---------|-----------|-----------|
| `GEMINI_API_KEY` | AI translation, simplification, field explanation | [Google AI Studio](https://aistudio.google.com/apikey) — free | Optional |
| `GOOGLE_CLOUD_VISION_API_KEY` | OCR for uploaded documents | 1,000 units/month free | Optional |

```bash
# Copy the template and add your keys
cp frontend/.env.example frontend/.env.local
```

**Without keys:** All features work with pre-written demo data, clearly labelled as "Demo".
**With keys:** Features show "AI Live" badges indicating real-time AI-powered content.

---

## Zero-Cost Architecture

This prototype is designed to run at **zero API cost** for the hackathon:

| Feature | Technology | Cost |
|---------|-----------|------|
| Speech-to-Text | Web Speech API (browser-native) | Free |
| Text-to-Speech | SpeechSynthesis API (browser-native) | Free |
| Maps | Leaflet + OpenStreetMap | Free |
| Geocoding | Nominatim (OSM) | Free |
| User Location | Browser Geolocation API | Free |
| AI Translation | Gemini API free tier | Free |
| AI Simplification | Gemini API free tier | Free |
| AI Field Explanation | Gemini API free tier | Free |
| Document OCR | Cloud Vision free tier (optional) | Free |
| Animations | CSS + Framer Motion | Free |
| Styling | Tailwind CSS | Free |
| Fonts | Google Fonts (Inter + Noto Sans) | Free |

---

## Features

- 🌐 **13 Indian Languages** — Hindi, Marathi, Bengali, Tamil, Telugu, Gujarati, Kannada, Malayalam, Punjabi, Odia, Assamese, Urdu
- 🚨 **Emergency Center** — Official alerts translated, simplified, with action steps
- 📄 **Form Assistant** — Every field explained in your language, voice input, smart validation
- 🗣️ **Voice Assistant** — Real Web Speech API for speech input, AI-powered responses
- 🔊 **Text-to-Speech** — Web Speech API, plays in your language
- ♿ **Accessibility** — High contrast, font size, TTS speed, reduce motion
- 🗺️ **Emergency Map** — Leaflet + OpenStreetMap with real geolocation + Nominatim
- 🏛️ **Admin Dashboard** — Alert management, analytics, demo alert creation
- ✨ **Live AI Translation** — Gemini-powered translation when API key is set
- 🤖 **Live AI Explanation** — Ask AI to explain any form field in your language
- 📷 **Document OCR** — Cloud Vision for uploaded form images (optional)

---

## Architecture

```
frontend/          → Next.js 16 + TypeScript + Tailwind CSS
├── app/           → App Router pages
│   └── api/       → Server-side API routes (Gemini/Vision proxy)
├── components/    → Reusable UI components  
└── lib/           → Types, store, demo data, utilities, gemini client, geocoding

backend/           → FastAPI Python (optional for demo)
├── main.py
├── routers/       → alerts, forms, translate
└── schema.sql     → PostgreSQL schema
```

---

## Demo Flow (3-5 minute hackathon demo)

### Emergency Demo
1. Open Sahara → See landing page
2. Click "Try Emergency Assistant"
3. View flood warning (DEMO-001)
4. Change language to Marathi
5. Click "Live Translate" → fresh AI translation appears (with API key) or demo text
6. Click "Listen" → TTS reads aloud in Marathi
7. Click "View Emergency Map" → Leaflet map with real geolocation + shelter locations

### Form Demo
1. Click "Try Form Assistant"
2. Upload a form image → Cloud Vision OCR detects fields (or demo fallback)
3. Select "National Scholarship Application"
4. Change language to Hindi
5. Click "What does this field mean?" → demo explanation
6. Click "Ask AI" → live Gemini explanation (with API key)
7. Click microphone → speak with real Web Speech API
8. Confirm voice input
9. Click "Check Application" → see validation
10. Click "Review & Submit" → Demo Submit → Success screen

### Voice Demo
1. Click "Voice Assistant"
2. Tap microphone → real Web Speech API listens
3. Speak in Hindi/English → real transcription appears
4. AI responds (Gemini if key set, demo otherwise)
5. Response is read aloud via TTS

---

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16, TypeScript, Tailwind CSS 4 |
| State | Zustand |
| Animation | Framer Motion |
| Maps | Leaflet + OpenStreetMap + Nominatim |
| Icons | Lucide React |
| TTS/STT | Web Speech API (browser-native, zero cost) |
| AI | Gemini 2.0 Flash free tier (translation, simplification, explanation) |
| OCR | Google Cloud Vision free tier (optional) |
| Backend | FastAPI Python (optional) |
| Database | PostgreSQL / Supabase (schema provided) |
| Fonts | Inter + Noto Sans (Indian scripts) |

---

## Important Notes

- **All data is DEMO DATA** — not real emergency alerts or government forms
- **Frontend works standalone** — backend is optional for the demo
- **No API keys required** for basic demo (all features have demo fallbacks)
- **API keys are server-side only** — never exposed to the browser
- **Demo vs Live clearly distinguished** — "Demo" and "AI Live" badges throughout
- **No paid APIs** — everything runs on free tiers and browser-native APIs

---

*Built for India · Hackathon Prototype · September 2026*
