from datetime import datetime, timedelta, timezone

import httpx

from .scoring import momentum_score


async def collect_github(limit: int = 10) -> list[dict]:
    limit = max(1, min(limit, 30))
    since = (datetime.now(timezone.utc) - timedelta(days=14)).date().isoformat()
    params = {
        "q": f"created:>{since}",
        "sort": "stars",
        "order": "desc",
        "per_page": limit,
    }

    headers = {
        "Accept": "application/vnd.github+json",
        "User-Agent": "TrendPulse-AI",
    }

    async with httpx.AsyncClient(timeout=10, headers=headers) as client:
        response = await client.get("https://api.github.com/search/repositories", params=params)
        response.raise_for_status()
        items = response.json().get("items", [])

    trends: list[dict] = []
    for repo in items:
        published_at = datetime.fromisoformat(repo["created_at"].replace("Z", "+00:00"))
        engagement = float(repo.get("stargazers_count", 0) + repo.get("forks_count", 0) * 2)
        language = repo.get("language") or "Developer Tools"
        trends.append(
            {
                "id": f"github-{repo['id']}",
                "topic": repo["full_name"],
                "source": "GitHub",
                "category": language,
                "url": repo["html_url"],
                "summary": repo.get("description") or "Fast-growing GitHub repository.",
                "momentum": momentum_score(
                    engagement=engagement, published_at=published_at
                ),
                "engagement": engagement,
                "published_at": published_at,
            }
        )

    return sorted(trends, key=lambda item: item["momentum"], reverse=True)
