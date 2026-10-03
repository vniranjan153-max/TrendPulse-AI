import asyncio

from fastapi import APIRouter, HTTPException, Query
from httpx import HTTPError

from ..schemas import CollectionResult, TrendOut
from ..services.github_trending import collect_github
from ..services.hackernews import collect_hackernews

router = APIRouter(prefix="/api/trends", tags=["trends"])


@router.get("/hackernews", response_model=CollectionResult)
async def hackernews(limit: int = Query(10, ge=1, le=30)):
    try:
        trends = await collect_hackernews(limit)
    except HTTPError as exc:
        raise HTTPException(status_code=502, detail="Hacker News collector unavailable") from exc
    return CollectionResult(source="Hacker News", collected=len(trends), trends=trends)


@router.get("/github", response_model=CollectionResult)
async def github(limit: int = Query(10, ge=1, le=30)):
    try:
        trends = await collect_github(limit)
    except HTTPError as exc:
        raise HTTPException(status_code=502, detail="GitHub collector unavailable") from exc
    return CollectionResult(source="GitHub", collected=len(trends), trends=trends)


@router.get("/live", response_model=list[TrendOut])
async def live(limit: int = Query(8, ge=1, le=20)):
    results = await asyncio.gather(
        collect_hackernews(limit),
        collect_github(limit),
        return_exceptions=True,
    )

    merged: list[dict] = []
    for result in results:
        if isinstance(result, list):
            merged.extend(result)

    merged.sort(key=lambda item: item["momentum"], reverse=True)
    return merged[:limit]
