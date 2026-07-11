from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload

from app.api.deps import get_current_user
from app.database import get_db
from app.models.post import Post, PostStatus
from app.models.post_target import PostTarget
from app.models.post_metric import PostMetric
from app.models.user import User
from app.models.workspace import Workspace
from app.schemas.post import PostCreate, PostDetailRead, PostRead, PostUpdate
from app.services.post_service import create_post_with_targets, get_post_detail


router = APIRouter(prefix="/posts", tags=["Posts"])


@router.post("/", response_model=PostDetailRead, status_code=status.HTTP_201_CREATED)
def create_post(
    payload: PostCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    workspace = (
        db.query(Workspace)
        .filter(
            Workspace.id == payload.workspace_id,
            Workspace.owner_id == current_user.id
        )
        .first()
    )

    if not workspace:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Workspace no encontrado."
        )

    return create_post_with_targets(db=db, payload=payload)


@router.get("/", response_model=list[PostRead])
def list_posts(
    workspace_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return (
        db.query(Post)
        .options(
            joinedload(Post.targets).joinedload(PostTarget.social_account),
            joinedload(Post.targets).joinedload(PostTarget.metrics),
        )
        .join(Workspace, Workspace.id == Post.workspace_id)
        .filter(
            Post.workspace_id == workspace_id,
            Workspace.owner_id == current_user.id
        )
        .order_by(Post.created_at.desc())
        .all()
    )


@router.get("/calendar", response_model=list[PostDetailRead])
def get_calendar_posts(
    workspace_id: int,
    date_from: datetime,
    date_to: datetime,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    workspace = (
        db.query(Workspace)
        .filter(
            Workspace.id == workspace_id,
            Workspace.owner_id == current_user.id
        )
        .first()
    )

    if not workspace:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Workspace no encontrado."
        )

    return (
        db.query(Post)
        .options(
            joinedload(Post.content),
            joinedload(Post.targets).joinedload(PostTarget.social_account),
            joinedload(Post.targets).joinedload(PostTarget.metrics),
        )
        .filter(
            Post.workspace_id == workspace_id,
            Post.scheduled_at >= date_from,
            Post.scheduled_at <= date_to,
            Post.status.in_([
                PostStatus.scheduled,
                PostStatus.publishing,
                PostStatus.published,
                PostStatus.failed,
                PostStatus.partially_failed,
            ])
        )
        .order_by(Post.scheduled_at.asc())
        .all()
    )


@router.get("/{post_id}", response_model=PostDetailRead)
def read_post(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    post = get_post_detail(db=db, post_id=post_id)

    if post.workspace.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tenés acceso a este post."
        )

    return post


@router.patch("/{post_id}", response_model=PostRead)
def update_post(
    post_id: int,
    payload: PostUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    post = (
        db.query(Post)
        .join(Workspace, Workspace.id == Post.workspace_id)
        .filter(
            Post.id == post_id,
            Workspace.owner_id == current_user.id
        )
        .first()
    )

    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post no encontrado."
        )

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(post, field, value)

    db.commit()
    db.refresh(post)

    return post


@router.patch("/{post_id}/cancel", response_model=PostRead)
def cancel_post(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    post = (
        db.query(Post)
        .join(Workspace, Workspace.id == Post.workspace_id)
        .filter(
            Post.id == post_id,
            Workspace.owner_id == current_user.id
        )
        .first()
    )

    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post no encontrado."
        )

    post.status = PostStatus.cancelled

    db.commit()
    db.refresh(post)

    return post