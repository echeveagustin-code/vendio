from datetime import datetime, timezone

from sqlalchemy.orm import Session, joinedload

from app.models.post import Post, PostStatus, PublishMode
from app.models.post_target import PostTarget
from app.services.publishing_service import simulate_publish_post


def process_due_posts(db: Session, limit: int = 20) -> list[Post]:
    """
    Busca posts programados cuya fecha ya venció y los procesa.
    """

    now = datetime.now(timezone.utc)

    due_posts = (
        db.query(Post)
        .options(
            joinedload(Post.targets).joinedload(PostTarget.social_account),
            joinedload(Post.targets).joinedload(PostTarget.metrics),
        )
        .filter(
            Post.publish_mode == PublishMode.scheduled,
            Post.status == PostStatus.scheduled,
            Post.scheduled_at <= now,
        )
        .order_by(Post.scheduled_at.asc())
        .limit(limit)
        .all()
    )

    processed_posts = []

    for post in due_posts:
        processed_post = simulate_publish_post(db=db, post=post)
        processed_posts.append(processed_post)

    return processed_posts