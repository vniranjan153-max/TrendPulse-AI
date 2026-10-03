# Deployment Checklist

Use this checklist before you ship TrendPulse AI.

## Frontend (Vercel)
- [ ] Connect the `frontend/` app to Vercel
- [ ] Set `NEXT_PUBLIC_API_URL` to the backend URL
- [ ] Verify login page
- [ ] Verify register page
- [ ] Verify dashboard redirect behavior
- [ ] Verify dashboard live trends render

## Backend (Managed service)
- [ ] Set `SECRET_KEY` in production
- [ ] Set `DATABASE_URL` to PostgreSQL
- [ ] Set `REDIS_URL` to the managed Redis endpoint
- [ ] Run database migrations
- [ ] Verify `/api/health`
- [ ] Verify `/api/trends/live`
- [ ] Verify auth endpoints

## GitHub Actions
- [ ] Frontend build passes
- [ ] Backend compile/test passes
- [ ] Latest commit has a green status check

## Documentation
- [ ] README updated with deployment notes
- [ ] Add screenshots or demo media
- [ ] Add production URLs when live
