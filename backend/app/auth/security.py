from datetime import datetime, timedelta, timezone
from hashlib import sha256
import hmac
import os

SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-change-me")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60"))
REFRESH_TOKEN_EXPIRE_DAYS = int(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS", "14"))


def _sign(payload: str) -> str:
    return hmac.new(SECRET_KEY.encode(), payload.encode(), sha256).hexdigest()


def create_token(subject: str, expires_delta: timedelta) -> str:
    expires = datetime.now(timezone.utc) + expires_delta
    payload = f"{subject}:{int(expires.timestamp())}"
    return f"{payload}.{_sign(payload)}"


def create_access_token(subject: str) -> str:
    return create_token(subject, timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))


def create_refresh_token(subject: str) -> str:
    return create_token(subject, timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS))


def verify_token(token: str) -> str | None:
    try:
        payload, signature = token.rsplit(".", 1)
        if _sign(payload) != signature:
            return None
        subject, exp_raw = payload.rsplit(":", 1)
        if datetime.now(timezone.utc).timestamp() > int(exp_raw):
            return None
        return subject
    except Exception:
        return None
