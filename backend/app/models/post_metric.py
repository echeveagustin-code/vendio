from datetime import datetime

from sqlalchemy import DateTime, Float, ForeignKey, Integer, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class PostMetric(Base):
    __tablename__ = "post_metrics"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True
    )

    post_target_id: Mapped[int] = mapped_column(
        ForeignKey("post_targets.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    views: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False
    )

    likes: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False
    )

    comments: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False
    )

    shares: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False
    )

    clicks: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False
    )

    ctr: Mapped[float] = mapped_column(
        Float,
        default=0,
        nullable=False
    )

    captured_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
        index=True
    )

    post_target = relationship(
        "PostTarget",
        back_populates="metrics"
    )