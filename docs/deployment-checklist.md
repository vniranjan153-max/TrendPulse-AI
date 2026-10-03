# Deployment Checklist

Use this checklist before you ship TrendPulse AI.

## Backend
- [ ] Set `SECRET_KEY` in production
- [ ] Set `DATABASE_URL` to PostgreSQL
- [ ] Set `REDIS_URL` to the managed Redis endpoint
- [ ] Run database migrations
- [ ] Verify `/api/health`
- [ ] Verify `/api/trends/live`
- [ ] Verify auth endpoints

## Frontend
- [ ] Set `NEXT_PUBLIC_API_URL`
- [ ] Verify login page
- [ ] Verify register page
- [ ] Verify dashboard redirect behavior
- [ ] Verify dashboard live trends render

## GitHub Actions
- [ ] Frontend build passes
- [ ] Backend compile/test passes
- [ ] Latest commit has a green status check

## Documentation
- [ ] README updated with deployment notes
- [ ] Add screenshots or demo media
- [ ] Add production URLs when live
