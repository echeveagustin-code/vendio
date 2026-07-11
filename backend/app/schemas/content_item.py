from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.models.content_item import ContentType, ContentStatus, PublicationType


class ContentItemBase(BaseModel):
    workspace_id: int
    title: str
    media_url: str
    thumbnail_url: str | None = None
    type: ContentType = ContentType.video
    publication_type: PublicationType = PublicationType.reel


class ContentItemCreate(ContentItemBase):
    original_filename: str | None = None
    file_size: int | None = None
    duration_seconds: int | None = None
    mime_type: str | None = None


class ContentItemUpdate(BaseModel):
    title: str | None = None
    media_url: str | None = None
    thumbnail_url: str | None = None
    type: ContentType | None = None
    publication_type: PublicationType | None = None
    status: ContentStatus | None = None


class ContentItemRead(ContentItemBase):
    id: int
    original_filename: str | None = None
    file_size: int | None = None
    duration_seconds: int | None = None
    mime_type: str | None = None
    status: ContentStatus
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)