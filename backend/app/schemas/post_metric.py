from datetime import datetime

from pydantic import BaseModel, ConfigDict


class PostMetricCreate(BaseModel):
    views: int = 0
    likes: int = 0
    comments: int = 0
    shares: int = 0
    clicks: int = 0
    ctr: float = 0


class PostMetricRead(PostMetricCreate):
    id: int
    post_target_id: int
    captured_at: datetime

    model_config = ConfigDict(from_attributes=True)