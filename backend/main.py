from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import alerts, forms, translate

app = FastAPI(
    title="Sahara API",
    description="Multilingual AI public-service accessibility platform",
    version="1.0.0-prototype",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(alerts.router, prefix="/alerts", tags=["Alerts"])
app.include_router(forms.router, prefix="/forms", tags=["Forms"])
app.include_router(translate.router, prefix="/translate", tags=["Translation"])

@app.get("/", tags=["Health"])
def root():
    return {
        "service": "Sahara API",
        "status": "running",
        "version": "1.0.0-prototype",
        "note": "This is a hackathon prototype. All data is simulated.",
        "endpoints": ["/alerts", "/forms", "/translate", "/docs"],
    }

@app.get("/health", tags=["Health"])
def health():
    return {"status": "ok"}
