from datetime import datetime

from pydantic import BaseModel, ConfigDict, field_validator

from app.models.post import PublishMode, PostStatus
from app.schemas.content_item import ContentItemRead
from app.schemas.post_target import PostTargetWithAccountRead


class PostCreate(BaseModel):
    workspace_id: int
    content_id: int
    caption: str | None = None
    publish_mode: PublishMode = PublishMode.now
    scheduled_at: datetime | None = None
    social_account_ids: list[int]

    @field_validator("social_account_ids")
    @classmethod
    def validate_social_account_ids(cls, value: list[int]) -> list[int]:
        if not value:
            raise ValueError("Debe seleccionar al menos una cuenta social.")
        return value


class PostUpdate(BaseModel):
    caption: str | None = None
    scheduled_at: datetime | None = None
    status: PostStatus | None = None


class PostRead(BaseModel):
    id: int
    workspace_id: int
    content_id: int
    caption: str | None = None
    publish_mode: PublishMode
    scheduled_at: datetime | None = None
    status: PostStatus
    created_at: datetime
    updated_at: datetime
    targets: list[PostTargetWithAccountRead] = []

    model_config = ConfigDict(from_attributes=True)


class PostDetailRead(PostRead):
    content: ContentItemRead