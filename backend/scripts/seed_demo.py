from datetime import datetime, timedelta, timezone
from random import randint, uniform

from app.database import SessionLocal
from app.core.security import get_password_hash

from app.models.user import User
from app.models.workspace import Workspace

from app.models.social_account import (
    SocialAccount,
    SocialPlatform,
    SocialAccountStatus,
)

from app.models.content_item import (
    ContentItem,
    ContentType,
    ContentStatus,
)

from app.models.post import (
    Post,
    PublishMode,
    PostStatus,
)

from app.models.post_target import (
    PostTarget,
    PostTargetStatus,
)

from app.models.post_metric import PostMetric


DEMO_EMAIL = "demo@vendio.app"
DEMO_PASSWORD = "Vendio123456"


def get_or_create_demo_user(db):
    user = (
        db.query(User)
        .filter(User.email == DEMO_EMAIL)
        .first()
    )

    if user:
        return user

    user = User(
        nombre="Usuario Demo",
        email=DEMO_EMAIL,
        hashed_password=get_password_hash(DEMO_PASSWORD),
        is_active=True,
    )

    db.add(user)
    db.flush()

    return user


def reset_demo_workspace_data(db, workspace: Workspace):
    """
    Limpia datos demo del workspace para poder correr el seed varias veces.
    No borra el usuario.
    """

    posts = (
        db.query(Post)
        .filter(Post.workspace_id == workspace.id)
        .all()
    )

    for post in posts:
        db.delete(post)

    content_items = (
        db.query(ContentItem)
        .filter(ContentItem.workspace_id == workspace.id)
        .all()
    )

    for content_item in content_items:
        db.delete(content_item)

    social_accounts = (
        db.query(SocialAccount)
        .filter(SocialAccount.workspace_id == workspace.id)
        .all()
    )

    for social_account in social_accounts:
        db.delete(social_account)

    db.flush()


def get_or_create_workspace(db, user: User):
    workspace = (
        db.query(Workspace)
        .filter(Workspace.owner_id == user.id)
        .order_by(Workspace.created_at.asc())
        .first()
    )

    if workspace:
        workspace.nombre = "Tienda Demo Vendio"
        db.flush()
        return workspace

    workspace = Workspace(
        nombre="Tienda Demo Vendio",
        owner_id=user.id,
    )

    db.add(workspace)
    db.flush()

    return workspace


def create_social_accounts(db, workspace: Workspace):
    accounts = [
        SocialAccount(
            workspace_id=workspace.id,
            platform=SocialPlatform.instagram,
            username="tienda.demo",
            display_name="Tienda Demo Instagram",
            status=SocialAccountStatus.connected,
            followers_count=12840,
            posts_count=96,
        ),
        SocialAccount(
            workspace_id=workspace.id,
            platform=SocialPlatform.tiktok,
            username="tienda.demo",
            display_name="Tienda Demo TikTok",
            status=SocialAccountStatus.connected,
            followers_count=24300,
            posts_count=72,
        ),
        SocialAccount(
            workspace_id=workspace.id,
            platform=SocialPlatform.facebook,
            username="tienda.demo.fb",
            display_name="Tienda Demo Facebook",
            status=SocialAccountStatus.connected,
            followers_count=6200,
            posts_count=51,
        ),
    ]

    db.add_all(accounts)
    db.flush()

    return accounts


def create_content_items(db, workspace: Workspace):
    contents = [
        ContentItem(
            workspace_id=workspace.id,
            title="Promo zapatillas urbanas",
            media_url="https://example.com/media/promo-zapatillas.mp4",
            thumbnail_url="https://example.com/thumbs/promo-zapatillas.jpg",
            original_filename="promo-zapatillas.mp4",
            file_size=18_500_000,
            duration_seconds=18,
            mime_type="video/mp4",
            type=ContentType.video,
            status=ContentStatus.uploaded,
        ),
        ContentItem(
            workspace_id=workspace.id,
            title="Nuevo ingreso camperas",
            media_url="https://example.com/media/camperas.mp4",
            thumbnail_url="https://example.com/thumbs/camperas.jpg",
            original_filename="camperas.mp4",
            file_size=22_100_000,
            duration_seconds=24,
            mime_type="video/mp4",
            type=ContentType.video,
            status=ContentStatus.uploaded,
        ),
        ContentItem(
            workspace_id=workspace.id,
            title="Descuento fin de semana",
            media_url="https://example.com/media/descuento-finde.jpg",
            thumbnail_url="https://example.com/thumbs/descuento-finde.jpg",
            original_filename="descuento-finde.jpg",
            file_size=3_200_000,
            duration_seconds=None,
            mime_type="image/jpeg",
            type=ContentType.image,
            status=ContentStatus.uploaded,
        ),
    ]

    db.add_all(contents)
    db.flush()

    return contents


def create_post_with_targets(
    db,
    workspace: Workspace,
    content: ContentItem,
    social_accounts: list[SocialAccount],
    caption: str,
    publish_mode: PublishMode,
    status: PostStatus,
    scheduled_at: datetime | None,
    target_status: PostTargetStatus,
    add_metrics: bool = False,
):
    post = Post(
        workspace_id=workspace.id,
        content_id=content.id,
        caption=caption,
        publish_mode=publish_mode,
        scheduled_at=scheduled_at,
        status=status,
    )

    db.add(post)
    db.flush()

    targets = []

    for account in social_accounts:
        target = PostTarget(
            post_id=post.id,
            social_account_id=account.id,
            status=target_status,
            external_post_id=f"demo_{post.id}_{account.platform.value}_{account.id}"
            if target_status == PostTargetStatus.published
            else None,
            external_post_url=f"https://example.com/{account.platform.value}/posts/{post.id}"
            if target_status == PostTargetStatus.published
            else None,
            published_at=datetime.now(timezone.utc) - timedelta(days=randint(1, 5))
            if target_status == PostTargetStatus.published
            else None,
        )

        db.add(target)
        db.flush()

        targets.append(target)

        if add_metrics:
            metric = PostMetric(
                post_target_id=target.id,
                views=randint(800, 15000),
                likes=randint(40, 1200),
                comments=randint(2, 90),
                shares=randint(1, 150),
                clicks=randint(5, 260),
                ctr=round(uniform(0.4, 3.8), 2),
            )

            db.add(metric)

    db.flush()

    return post


def seed_demo():
    db = SessionLocal()

    try:
        user = get_or_create_demo_user(db)
        workspace = get_or_create_workspace(db, user)

        reset_demo_workspace_data(db, workspace)

        social_accounts = create_social_accounts(db, workspace)
        contents = create_content_items(db, workspace)

        now = datetime.now(timezone.utc)

        create_post_with_targets(
            db=db,
            workspace=workspace,
            content=contents[0],
            social_accounts=social_accounts,
            caption="Nuevo ingreso disponible 🔥 Envíos a todo el país.",
            publish_mode=PublishMode.scheduled,
            status=PostStatus.scheduled,
            scheduled_at=now + timedelta(days=1, hours=2),
            target_status=PostTargetStatus.pending,
            add_metrics=False,
        )

        create_post_with_targets(
            db=db,
            workspace=workspace,
            content=contents[1],
            social_accounts=social_accounts[:2],
            caption="Camperas nuevas para esta temporada. Stock limitado.",
            publish_mode=PublishMode.scheduled,
            status=PostStatus.scheduled,
            scheduled_at=now + timedelta(days=3, hours=4),
            target_status=PostTargetStatus.pending,
            add_metrics=False,
        )

        create_post_with_targets(
            db=db,
            workspace=workspace,
            content=contents[2],
            social_accounts=social_accounts,
            caption="Descuento especial este fin de semana. Aprovechá antes de que termine.",
            publish_mode=PublishMode.now,
            status=PostStatus.published,
            scheduled_at=now - timedelta(days=2),
            target_status=PostTargetStatus.published,
            add_metrics=True,
        )

        create_post_with_targets(
            db=db,
            workspace=workspace,
            content=contents[0],
            social_accounts=social_accounts[:2],
            caption="El producto más pedido volvió a entrar. Mirá todos los colores.",
            publish_mode=PublishMode.now,
            status=PostStatus.published,
            scheduled_at=now - timedelta(days=5),
            target_status=PostTargetStatus.published,
            add_metrics=True,
        )

        create_post_with_targets(
            db=db,
            workspace=workspace,
            content=contents[1],
            social_accounts=[social_accounts[0]],
            caption="Probando nuevo formato de video para Instagram.",
            publish_mode=PublishMode.now,
            status=PostStatus.failed,
            scheduled_at=now - timedelta(days=1),
            target_status=PostTargetStatus.failed,
            add_metrics=False,
        )

        db.commit()

        print("Seed demo creado correctamente.")
        print(f"Email: {DEMO_EMAIL}")
        print(f"Password: {DEMO_PASSWORD}")
        print(f"Workspace ID: {workspace.id}")

    except Exception as error:
        db.rollback()
        print("Error creando seed demo:")
        print(error)
        raise

    finally:
        db.close()


if __name__ == "__main__":
    seed_demo()