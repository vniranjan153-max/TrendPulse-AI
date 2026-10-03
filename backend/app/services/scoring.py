import math
from datetime import datetime, timezone


def momentum_score(*, engagement: float, published_at: datetime | None) -> float:
    """Score a trend from 0-100 using engagement with time decay."""
    if engagement <= 0:
        return 0.0

    age_hours = 0.0
    if published_at is not None:
        now = datetime.now(timezone.utc)
        stamp = published_at
        if stamp.tzinfo is None:
            stamp = stamp.replace(tzinfo=timezone.utc)
        age_hours = max((now - stamp).total_seconds() / 3600, 0)

    freshness = math.exp(-age_hours / 36)
    engagement_component = min(math.log1p(engagement) / math.log(5001), 1.0)
    score = 100 * (0.72 * engagement_component + 0.28 * freshness)
    return round(min(max(score, 0), 100), 1)
