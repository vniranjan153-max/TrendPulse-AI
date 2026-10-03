from datetime import datetime, timezone

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings

app = FastAPI(
    title=settings.app_name,
    version="0.1.0",
    description="Backend API for TrendPulse AI.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health() -> dict[str, str]:
    return {
        "status": "ok",
        "service": settings.app_name,
        "time": datetime.now(timezone.utc).isoformat(),
    }


@app.get("/api/trends")
def list_trends() -> list[dict]:
    return [
        {
            "id": "ai-agents",
            "topic": "AI Agents",
            "category": "AI",
            "momentum": 94,
            "change": 28.4,
            "summary": "Autonomous agent frameworks are accelerating across developer communities.",
        },
        {
            "id": "local-first",
            "topic": "Local-first Apps",
            "category": "Developer Tools",
            "momentum": 86,
            "change": 17.2,
            "summary": "Developers are increasingly exploring offline-capable collaborative apps.",
        },
        {
            "id": "small-models",
            "topic": "Small Language Models",
            "category": "AI",
            "momentum": 82,
            "change": 13.7,
            "summary": "Compact models are gaining attention for lower-cost private deployments.",
        },
    ]
