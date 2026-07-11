import enum
from datetime import datetime

from sqlalchemy import DateTime, Enum, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class SocialPlatform(str, enum.Enum):
    instagram = "instagram"
    tiktok = "tiktok"
    facebook = "facebook"


class SocialAccountStatus(str, enum.Enum):
    connected = "connected"
    expired = "expired"
    error = "error"
    disconnected = "disconnected"


class SocialAccount(Base):
    __tablename__ = "social_accounts"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True
    )

    workspace_id: Mapped[int] = mapped_column(
        ForeignKey("workspaces.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    platform: Mapped[SocialPlatform] = mapped_column(
        Enum(SocialPlatform),
        nullable=False
    )

    username: Mapped[str] = mapped_column(
        String(150),
        nullable=False
    )

    display_name: Mapped[str | None] = mapped_column(
        String(150),
        nullable=True
    )

    external_id: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True
    )

    access_token: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    refresh_token: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    token_expires_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True
    )

    status: Mapped[SocialAccountStatus] = mapped_column(
        Enum(SocialAccountStatus),
        default=SocialAccountStatus.connected,
        nullable=False
    )

    followers_count: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False
    )

    posts_count: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False
    )

    last_sync_at: Mapped[datetime | None] = mapped_column(
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

    workspace = relationship(
        "Workspace",
        back_populates="social_accounts"
    )

    post_targets = relationship(
        "PostTarget",
        back_populates="social_account",
        cascade="all, delete-orphan"
    )