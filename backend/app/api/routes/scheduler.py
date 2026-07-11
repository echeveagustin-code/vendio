from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.database import get_db
from app.models.user import User
from app.services.scheduler_service import process_due_posts


router = APIRouter(prefix="/scheduler", tags=["Scheduler"])


@router.post("/process-due-posts")
def process_due_posts_endpoint(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    processed_posts = process_due_posts(db=db)

    return {
        "processed": len(processed_posts),
        "post_ids": [post.id for post in processed_posts],
    }