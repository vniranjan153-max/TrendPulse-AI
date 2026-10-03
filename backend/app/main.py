from datetime import datetime, timezone
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api.trends import router as trends_router
from .auth.routes import router as auth_router
from .config import settings

app = FastAPI(
    title=settings.app_name,
    version="0.3.1",
    description="Backend API for TrendPulse AI.",
)

allowed_origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in allowed_origins if origin.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(trends_router)


@app.get("/api/health")
def health() -> dict[str, str]:
    return {
        "status": "ok",
        "service": settings.app_name,
        "time": datetime.now(timezone.utc).isoformat(),
    }


@app.get("/api/ready")
def ready() -> dict[str, str]:
    return {"status": "ready"}


@app.get("/api/trends/demo")
def demo_trends() -> list[dict]:
    return [
        {
            "id": "ai-agents",
            "topic": "AI Agents",
            "source": "Demo",
            "category": "AI",
            "momentum": 94,
            "engagement": 1200,
            "summary": "Autonomous agent frameworks are accelerating across developer communities.",
        },
        {
            "id": "local-first",
            "topic": "Local-first Apps",
            "source": "Demo",
            "category": "Developer Tools",
            "momentum": 86,
            "engagement": 860,
            "summary": "Developers are increasingly exploring offline-capable collaborative apps.",
        },
    ]
