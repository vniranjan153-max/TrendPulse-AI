from datetime import datetime, timezone

import httpx

from .scoring import momentum_score

HN_BASE = "https://hacker-news.firebaseio.com/v0"


async def collect_hackernews(limit: int = 10) -> list[dict]:
    limit = max(1, min(limit, 30))
    async with httpx.AsyncClient(timeout=10) as client:
        ids_response = await client.get(f"{HN_BASE}/topstories.json")
        ids_response.raise_for_status()
        story_ids = ids_response.json()[:limit]

        trends: list[dict] = []
        for story_id in story_ids:
            response = await client.get(f"{HN_BASE}/item/{story_id}.json")
            response.raise_for_status()
            item = response.json() or {}
            if not item.get("title"):
                continue

            published_at = datetime.fromtimestamp(
                item.get("time", 0), tz=timezone.utc
            )
            engagement = float(item.get("score", 0) + item.get("descendants", 0))

            trends.append(
                {
                    "id": f"hn-{story_id}",
                    "topic": item["title"],
                    "source": "Hacker News",
                    "category": "Technology",
                    "url": item.get("url")
                    or f"https://news.ycombinator.com/item?id={story_id}",
                    "summary": f"{item.get('score', 0)} points and {item.get('descendants', 0)} comments.",
                    "momentum": momentum_score(
                        engagement=engagement, published_at=published_at
                    ),
                    "engagement": engagement,
                    "published_at": published_at,
                }
            )

        return sorted(trends, key=lambda item: item["momentum"], reverse=True)
