import enum
from datetime import datetime

from sqlalchemy import DateTime, Enum, ForeignKey, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class PostTargetStatus(str, enum.Enum):
    pending = "pending"
    publishing = "publishing"
    published = "published"
    failed = "failed"
    cancelled = "cancelled"


class PostTarget(Base):
    __tablename__ = "post_targets"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True
    )

    post_id: Mapped[int] = mapped_column(
        ForeignKey("posts.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    social_account_id: Mapped[int] = mapped_column(
        ForeignKey("social_accounts.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    status: Mapped[PostTargetStatus] = mapped_column(
        Enum(PostTargetStatus),
        default=PostTargetStatus.pending,
        nullable=False
    )

    external_post_id: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True
    )

    external_post_url: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    error_message: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    published_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True
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

    post = relationship(
        "Post",
        back_populates="targets"
    )

    social_account = relationship(
        "SocialAccount",
        back_populates="post_targets"
    )

    metrics = relationship(
        "PostMetric",
        back_populates="post_target",
        cascade="all, delete-orphan"
    )