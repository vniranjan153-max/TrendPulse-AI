from datetime import datetime

from pydantic import BaseModel, ConfigDict


class TrendOut(BaseModel):
    id: int | str
    topic: str
    source: str
    category: str = "General"
    url: str | None = None
    summary: str | None = None
    momentum: float
    engagement: float = 0
    published_at: datetime | None = None

    model_config = ConfigDict(from_attributes=True)


class CollectionResult(BaseModel):
    source: str
    collected: int
    trends: list[TrendOut]
