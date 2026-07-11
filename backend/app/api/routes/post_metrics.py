from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.database import get_db
from app.models.post import Post
from app.models.post_metric import PostMetric
from app.models.post_target import PostTarget
from app.models.user import User
from app.models.workspace import Workspace
from app.schemas.post_metric import PostMetricCreate, PostMetricRead


router = APIRouter(prefix="/post-targets", tags=["Post Metrics"])


@router.post(
    "/{post_target_id}/metrics",
    response_model=PostMetricRead,
    status_code=status.HTTP_201_CREATED
)
def create_post_metric(
    post_target_id: int,
    payload: PostMetricCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    post_target = (
        db.query(PostTarget)
        .join(Post, Post.id == PostTarget.post_id)
        .join(Workspace, Workspace.id == Post.workspace_id)
        .filter(
            PostTarget.id == post_target_id,
            Workspace.owner_id == current_user.id
        )
        .first()
    )

    if not post_target:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post target no encontrado."
        )

    metric = PostMetric(
        post_target_id=post_target_id,
        **payload.model_dump()
    )

    db.add(metric)
    db.commit()
    db.refresh(metric)

    return metric


@router.get("/{post_target_id}/metrics", response_model=list[PostMetricRead])
def list_post_metrics(
    post_target_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    post_target = (
        db.query(PostTarget)
        .join(Post, Post.id == PostTarget.post_id)
        .join(Workspace, Workspace.id == Post.workspace_id)
        .filter(
            PostTarget.id == post_target_id,
            Workspace.owner_id == current_user.id
        )
        .first()
    )

    if not post_target:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post target no encontrado."
        )

    return (
        db.query(PostMetric)
        .filter(PostMetric.post_target_id == post_target_id)
        .order_by(PostMetric.captured_at.desc())
        .all()
    )