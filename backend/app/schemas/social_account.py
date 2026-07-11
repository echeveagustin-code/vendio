from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.models.social_account import SocialPlatform, SocialAccountStatus


class SocialAccountBase(BaseModel):
    workspace_id: int
    platform: SocialPlatform
    username: str
    display_name: str | None = None


class SocialAccountCreate(SocialAccountBase):
    pass


class SocialAccountUpdate(BaseModel):
    username: str | None = None
    display_name: str | None = None
    status: SocialAccountStatus | None = None
    followers_count: int | None = None
    posts_count: int | None = None


class SocialAccountRead(SocialAccountBase):
    id: int
    external_id: str | None = None
    status: SocialAccountStatus
    followers_count: int
    posts_count: int
    last_sync_at: datetime | None = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)