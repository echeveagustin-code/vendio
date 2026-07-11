import enum
from datetime import datetime

from sqlalchemy import DateTime, Enum, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class ContentType(str, enum.Enum):
    video = "video"
    image = "image"


class ContentStatus(str, enum.Enum):
    uploaded = "uploaded"
    used = "used"
    archived = "archived"

class PublicationType(str, enum.Enum):
    reel = "reel"
    post = "post"
    story = "story"

class ContentItem(Base):
    __tablename__ = "content_items"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True
    )

    workspace_id: Mapped[int] = mapped_column(
        ForeignKey("workspaces.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    title: Mapped[str] = mapped_column(
        String(150),
        nullable=False
    )

    media_url: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    thumbnail_url: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    original_filename: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True
    )

    file_size: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True
    )

    duration_seconds: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True
    )

    mime_type: Mapped[str | None] = mapped_column(
        String(100),
        nullable=True
    )

    type: Mapped[ContentType] = mapped_column(
        Enum(ContentType),
        default=ContentType.video,
        nullable=False
    )

    publication_type: Mapped[PublicationType] = mapped_column(
        Enum(PublicationType),
        default=PublicationType.reel,
        nullable=False
    )

    status: Mapped[ContentStatus] = mapped_column(
        Enum(ContentStatus),
        default=ContentStatus.uploaded,
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False
    )

    workspace = relationship(
        "Workspace",
        back_populates="content_items"
    )

    posts = relationship(
        "Post",
        back_populates="content",
        cascade="all, delete-orphan"
    )