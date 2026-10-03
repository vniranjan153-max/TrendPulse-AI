from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr

from .security import create_access_token, verify_token

router = APIRouter(prefix="/api/auth", tags=["auth"])


class RegisterIn(BaseModel):
    name: str
    email: EmailStr
    password: str


class LoginIn(BaseModel):
    email: EmailStr
    password: str


class TokenOut(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


FAKE_USER_STORE: dict[str, dict[str, str]] = {}


@router.post("/register", response_model=TokenOut)
def register(payload: RegisterIn) -> TokenOut:
    if payload.email in FAKE_USER_STORE:
        raise HTTPException(status_code=400, detail="User already exists")
    FAKE_USER_STORE[payload.email] = {
        "name": payload.name,
        "email": payload.email,
        "password": payload.password,
    }
    return TokenOut(
        access_token=create_access_token(payload.email),
        refresh_token=create_access_token(payload.email),
    )


@router.post("/login", response_model=TokenOut)
def login(payload: LoginIn) -> TokenOut:
    user = FAKE_USER_STORE.get(payload.email)
    if not user or user["password"] != payload.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return TokenOut(
        access_token=create_access_token(payload.email),
        refresh_token=create_access_token(payload.email),
    )


@router.get("/me")
def me(authorization: str | None = None) -> dict[str, str]:
    token = authorization.replace("Bearer ", "") if authorization else ""
    subject = verify_token(token)
    if not subject:
        raise HTTPException(status_code=401, detail="Not authenticated")
    user = FAKE_USER_STORE.get(subject)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"name": user["name"], "email": user["email"]}
