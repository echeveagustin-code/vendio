from fastapi import HTTPException, status
from sqlalchemy.orm import Session, joinedload

from app.models.content_item import ContentItem
from app.models.post import Post, PostStatus
from app.models.post_target import PostTarget, PostTargetStatus
from app.models.social_account import SocialAccount
from app.schemas.post import PostCreate


COMPATIBLE_PLATFORMS = {
    "reel": {"instagram", "tiktok", "facebook"},
    "post": {"instagram", "facebook"},
    "story": {"instagram", "facebook"},
}

COMPATIBLE_MEDIA_TYPES = {
    "reel": {"video"},
    "post": {"video", "image"},
    "story": {"video", "image"},
}


def create_post_with_targets(db: Session, payload: PostCreate) -> Post:
    content = (
        db.query(ContentItem)
        .filter(
            ContentItem.id == payload.content_id,
            ContentItem.workspace_id == payload.workspace_id,
        )
        .first()
    )

    if not content:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Contenido no encontrado.",
        )

    social_accounts = (
        db.query(SocialAccount)
        .filter(
            SocialAccount.id.in_(payload.social_account_ids),
            SocialAccount.workspace_id == payload.workspace_id,
        )
        .all()
    )

    if len(social_accounts) != len(payload.social_account_ids):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Una o más cuentas sociales no existen o no pertenecen al workspace.",
        )

    publication_type = getattr(
        content.publication_type,
        "value",
        content.publication_type,
    )

    media_type = getattr(
        content.type,
        "value",
        content.type,
    )

    allowed_platforms = COMPATIBLE_PLATFORMS.get(str(publication_type), set())
    allowed_media_types = COMPATIBLE_MEDIA_TYPES.get(str(publication_type), set())

    if not allowed_platforms:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Tipo de publicación inválido: {publication_type}.",
        )

    if str(media_type) not in allowed_media_types:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"{publication_type} no es compatible con contenido tipo {media_type}.",
        )

    for account in social_accounts:
        platform = getattr(account.platform, "value", account.platform)

        if str(platform) not in allowed_platforms:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"{publication_type} no es compatible con {platform}.",
            )

    post = Post(
        workspace_id=payload.workspace_id,
        content_id=payload.content_id,
        caption=payload.caption,
        publish_mode=payload.publish_mode,
        scheduled_at=payload.scheduled_at,
        status=PostStatus.scheduled,
    )

    db.add(post)
    db.flush()

    for account in social_accounts:
        target = PostTarget(
            post_id=post.id,
            social_account_id=account.id,
            status=PostTargetStatus.pending,
        )
        db.add(target)

    db.commit()
    db.refresh(post)

    return get_post_detail(db=db, post_id=post.id)


def get_post_detail(db: Session, post_id: int) -> Post:
    post = (
        db.query(Post)
        .options(
            joinedload(Post.content),
            joinedload(Post.targets).joinedload(PostTarget.social_account),
            joinedload(Post.targets).joinedload(PostTarget.metrics),
        )
        .filter(Post.id == post_id)
        .first()
    )

    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post no encontrado.",
        )

    return post