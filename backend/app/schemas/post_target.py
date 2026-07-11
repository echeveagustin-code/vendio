from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.models.post_target import PostTargetStatus
from app.schemas.social_account import SocialAccountRead
from app.schemas.post_metric import PostMetricRead


class PostTargetRead(BaseModel):
    id: int
    post_id: int
    social_account_id: int
    status: PostTargetStatus
    external_post_id: str | None = None
    external_post_url: str | None = None
    error_message: str | None = None
    published_at: datetime | None = None
    created_at: datetime
    updated_at: datetime
    metrics: list[PostMetricRead] = []

    model_config = ConfigDict(from_attributes=True)


class PostTargetWithAccountRead(PostTargetRead):
    social_account: SocialAccountRead

    model_config = ConfigDict(from_attributes=True)