from datetime import datetime, timezone
from random import randint, random

from sqlalchemy.orm import Session

from app.models.post import Post, PostStatus
from app.models.post_metric import PostMetric
from app.models.post_target import PostTargetStatus


def simulate_publish_post(db: Session, post: Post) -> Post:
    """
    Simula la publicación de un post en todos sus targets pendientes.
    Más adelante este servicio se reemplaza por integración real con Instagram/TikTok/Facebook.
    """

    publishable_targets = [
        target for target in post.targets
        if target.status == PostTargetStatus.pending
    ]

    if not publishable_targets:
        post.status = PostStatus.failed
        db.commit()
        db.refresh(post)
        return post

    post.status = PostStatus.publishing

    for target in publishable_targets:
        target.status = PostTargetStatus.publishing
        target.error_message = None

    db.commit()
    db.refresh(post)

    published_count = 0
    failed_count = 0

    for target in publishable_targets:
        success = random() > 0.1

        if success:
            target.status = PostTargetStatus.published
            target.external_post_id = f"demo_post_{post.id}_target_{target.id}"
            target.external_post_url = (
                f"https://vendio.demo/posts/{post.id}/targets/{target.id}"
            )
            target.error_message = None
            target.published_at = datetime.now(timezone.utc)

            metric = PostMetric(
                post_target_id=target.id,
                views=randint(100, 5000),
                likes=randint(5, 600),
                comments=randint(0, 80),
                shares=randint(0, 40),
                clicks=randint(0, 300),
                ctr=round(random() * 5, 2),
            )

            db.add(metric)
            published_count += 1

        else:
            target.status = PostTargetStatus.failed
            target.error_message = "Error simulado de publicación."
            failed_count += 1

    if published_count > 0 and failed_count == 0:
        post.status = PostStatus.published
    elif published_count > 0 and failed_count > 0:
        post.status = PostStatus.partially_failed
    else:
        post.status = PostStatus.failed

    db.commit()
    db.refresh(post)

    return post