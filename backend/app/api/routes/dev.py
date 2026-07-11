from fastapi import APIRouter, Depends

from app.api.deps import get_current_user
from app.models.user import User
from workers.fake_publisher import run_once


router = APIRouter(prefix="/dev", tags=["Dev"])


@router.post("/run-fake-publisher")
def run_fake_publisher(
    current_user: User = Depends(get_current_user),
):
    run_once()

    return {
        "status": "ok",
        "message": "Fake publisher ejecutado correctamente."
    }