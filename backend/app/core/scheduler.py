from apscheduler.schedulers.background import BackgroundScheduler

from app.database import SessionLocal
from app.services.scheduler_service import process_due_posts


scheduler = BackgroundScheduler()


def process_due_posts_job():
    db = SessionLocal()

    try:
        processed_posts = process_due_posts(db=db)

        if processed_posts:
            print(
                "[SCHEDULER] Posts procesados:",
                [post.id for post in processed_posts],
            )

    except Exception as error:
        print("[SCHEDULER] Error procesando posts:", error)

    finally:
        db.close()


def start_scheduler():
    scheduler.add_job(
        process_due_posts_job,
        "interval",
        minutes=2,
        id="process_due_posts",
        replace_existing=True,
    )

    scheduler.start()
    print("[SCHEDULER] Worker iniciado.")