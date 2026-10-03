# Backend Deployment Notes

Use this backend service setup for Render or Railway.

## Runtime
- Python 3.12+
- Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- Or use the included `Procfile`

## Required environment variables
- `SECRET_KEY` — strong random string
- `DATABASE_URL` — managed PostgreSQL connection string
- `REDIS_URL` — managed Redis connection string
- `CORS_ORIGINS` — comma-separated frontend origin(s), for example `https://your-frontend.vercel.app`
- `ACCESS_TOKEN_EXPIRE_MINUTES` — optional, defaults to `60`

## Recommended deployment steps
1. Create the backend service on Render or Railway.
2. Connect the GitHub repository.
3. Set the environment variables above.
4. Run database migrations before the first request:
   - `alembic upgrade head`
5. Confirm:
   - `GET /api/health`
   - `GET /api/ready`
   - `GET /api/trends/live`
   - auth routes under `/api/auth`

## Notes
- Keep the backend and frontend on separate services.
- Point the frontend `NEXT_PUBLIC_API_URL` at the backend service URL.
- Use PostgreSQL in production, not SQLite.
