# TrendPulse AI

TrendPulse AI is an AI-powered trend discovery platform that aggregates signals from multiple public sources, scores momentum, and presents actionable summaries in a modern dashboard.

[![CI](https://img.shields.io/github/actions/workflow/status/vniranjan153-max/TrendPulse-AI/ci.yml?branch=main)](https://github.com/vniranjan153-max/TrendPulse-AI/actions)
[![License](https://img.shields.io/github/license/vniranjan153-max/TrendPulse-AI)](LICENSE)

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

## Production checklist
- Deploy frontend to Vercel
- Deploy backend to Render/Railway/Fly.io
- Use managed PostgreSQL
- Set `NEXT_PUBLIC_API_URL` to the deployed backend URL
- Add screenshots and a demo GIF to the README
- Add automated tests for backend and frontend build checks

## Roadmap
- [x] Project foundation
- [x] Responsive dashboard shell
- [x] FastAPI health and demo trends API
- [x] Docker development stack
- [x] PostgreSQL-backed auth flow
- [x] Live trend dashboard
- [ ] Deployed production environment
- [ ] Additional automated tests
- [ ] Demo media and screenshots

## License
MIT
