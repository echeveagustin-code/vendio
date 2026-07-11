import os
import sys
from datetime import datetime, timezone
from random import randint, random, uniform

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.database import SessionLocal

from app.models.post import Post, PostStatus
from app.models.post_target import PostTarget, PostTargetStatus
from app.models.post_metric import PostMetric


FAIL_RATE = 0.15


def build_fake_external_url(post_id: int, platform: str, username: str) -> str:
    clean_username = username.replace("@", "")

    return f"https://vendio.fake/{platform}/{clean_username}/posts/{post_id}"


def create_fake_metric(db, post_target: PostTarget):
    metric = PostMetric(
        post_target_id=post_target.id,
        views=randint(300, 12000),
        likes=randint(20, 900),
        comments=randint(0, 80),
        shares=randint(0, 120),
        clicks=randint(0, 250),
        ctr=round(uniform(0.2, 4.5), 2),
    )

    db.add(metric)


def process_post(db, post: Post):
    print(f"Procesando Post #{post.id}...")

    post.status = PostStatus.publishing

    db.flush()

    published_count = 0
    failed_count = 0

    for target in post.targets:
        target.status = PostTargetStatus.publishing
        target.error_message = None

        db.flush()

        should_fail = random() < FAIL_RATE

        if should_fail:
            target.status = PostTargetStatus.failed
            target.error_message = "Error fake: la red social rechazó la publicación."
            failed_count += 1

            print(
                f"  ❌ Target #{target.id} falló "
                f"({target.social_account.platform.value} @{target.social_account.username})"
            )

            continue

        social_account = target.social_account

        target.status = PostTargetStatus.published
        target.external_post_id = (
            f"fake_{post.id}_{social_account.platform.value}_{target.id}"
        )
        target.external_post_url = build_fake_external_url(
            post_id=post.id,
            platform=social_account.platform.value,
            username=social_account.username,
        )
        target.published_at = datetime.now(timezone.utc)

        create_fake_metric(db, target)

        published_count += 1

        print(
            f"  ✅ Target #{target.id} publicado "
            f"({social_account.platform.value} @{social_account.username})"
        )

    if published_count > 0 and failed_count == 0:
        post.status = PostStatus.published

    elif published_count > 0 and failed_count > 0:
        post.status = PostStatus.partially_failed

    else:
        post.status = PostStatus.failed

    print(
        f"Post #{post.id} terminado. "
        f"published={published_count}, failed={failed_count}, status={post.status.value}"
    )


def run_once():
    db = SessionLocal()

    try:
        now = datetime.now(timezone.utc)

        posts = (
            db.query(Post)
            .filter(
                Post.status == PostStatus.scheduled,
                Post.scheduled_at <= now,
            )
            .all()
        )

        if not posts:
            print("No hay posts vencidos para publicar.")
            return

        print(f"Posts vencidos encontrados: {len(posts)}")

        for post in posts:
            process_post(db, post)

        db.commit()

        print("Worker fake finalizado correctamente.")

    except Exception as error:
        db.rollback()

        print("Error ejecutando worker fake:")
        print(error)

        raise

    finally:
        db.close()


if __name__ == "__main__":
    run_once()