from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Workspace(Base):
    __tablename__ = "workspaces"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True
    )

    nombre: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    owner_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True
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

    owner = relationship(
        "User",
        back_populates="workspaces"
    )

    social_accounts = relationship(
        "SocialAccount",
        back_populates="workspace",
        cascade="all, delete-orphan"
    )

    content_items = relationship(
        "ContentItem",
        back_populates="workspace",
        cascade="all, delete-orphan"
    )

    posts = relationship(
        "Post",
        back_populates="workspace",
        cascade="all, delete-orphan"
    )