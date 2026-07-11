from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.post import Post, PostStatus
from app.models.post_metric import PostMetric
from app.models.post_target import PostTarget


def get_dashboard_summary(
    db: Session,
    workspace_id: int
) -> dict:
    total_posts = (
        db.query(func.count(Post.id))
        .filter(Post.workspace_id == workspace_id)
        .scalar()
        or 0
    )

    scheduled_posts = (
        db.query(func.count(Post.id))
        .filter(
            Post.workspace_id == workspace_id,
            Post.status == PostStatus.scheduled
        )
        .scalar()
        or 0
    )

    published_posts = (
        db.query(func.count(Post.id))
        .filter(
            Post.workspace_id == workspace_id,
            Post.status == PostStatus.published
        )
        .scalar()
        or 0
    )

    failed_posts = (
        db.query(func.count(Post.id))
        .filter(
            Post.workspace_id == workspace_id,
            Post.status.in_([
                PostStatus.failed,
                PostStatus.partially_failed
            ])
        )
        .scalar()
        or 0
    )

    metrics = (
        db.query(
            func.coalesce(func.sum(PostMetric.views), 0),
            func.coalesce(func.sum(PostMetric.likes), 0),
            func.coalesce(func.sum(PostMetric.comments), 0),
            func.coalesce(func.sum(PostMetric.shares), 0),
            func.coalesce(func.sum(PostMetric.clicks), 0),
        )
        .join(PostTarget, PostTarget.id == PostMetric.post_target_id)
        .join(Post, Post.id == PostTarget.post_id)
        .filter(Post.workspace_id == workspace_id)
        .first()
    )

    return {
        "total_posts": total_posts,
        "scheduled_posts": scheduled_posts,
        "published_posts": published_posts,
        "failed_posts": failed_posts,
        "total_views": metrics[0],
        "total_likes": metrics[1],
        "total_comments": metrics[2],
        "total_shares": metrics[3],
        "total_clicks": metrics[4],
    }