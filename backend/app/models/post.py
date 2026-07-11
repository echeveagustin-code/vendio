import enum
from datetime import datetime

from sqlalchemy import DateTime, Enum, ForeignKey, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class PublishMode(str, enum.Enum):
    now = "now"
    scheduled = "scheduled"


class PostStatus(str, enum.Enum):
    draft = "draft"
    scheduled = "scheduled"
    publishing = "publishing"
    published = "published"
    partially_failed = "partially_failed"
    failed = "failed"
    cancelled = "cancelled"


class Post(Base):
    __tablename__ = "posts"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True
    )

    workspace_id: Mapped[int] = mapped_column(
        ForeignKey("workspaces.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    content_id: Mapped[int] = mapped_column(
        ForeignKey("content_items.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    caption: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    publish_mode: Mapped[PublishMode] = mapped_column(
        Enum(PublishMode),
        default=PublishMode.now,
        nullable=False
    )

    scheduled_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
        index=True
    )

    status: Mapped[PostStatus] = mapped_column(
        Enum(PostStatus),
        default=PostStatus.draft,
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
        back_populates="posts"
    )

    content = relationship(
        "ContentItem",
        back_populates="posts"
    )

    targets = relationship(
        "PostTarget",
        back_populates="post",
        cascade="all, delete-orphan"
    )