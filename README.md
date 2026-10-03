# TrendPulse AI

TrendPulse AI is an AI-powered trend discovery platform that aggregates signals from multiple public sources, scores momentum, and presents actionable summaries in a modern dashboard.

## Stack
- Next.js + TypeScript
- FastAPI + Python
- PostgreSQL
- Redis
- Docker Compose
- GitHub Actions

## Quick start

### Backend
```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Docker
```bash
docker compose up --build
```

Frontend: http://localhost:3000  
API docs: http://localhost:8000/docs  
Health: http://localhost:8000/api/health

## Roadmap
- [x] Project foundation
- [x] Responsive dashboard shell
- [x] FastAPI health and demo trends API
- [x] Docker development stack
- [ ] PostgreSQL models and persistence
- [ ] Authentication
- [ ] Reddit / Hacker News / GitHub collectors
- [ ] AI summaries and trend scoring
- [ ] Watchlists and alerts
- [ ] Tests and production deployment

## License
MIT
