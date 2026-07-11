from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.database import get_db
from app.models.social_account import SocialAccount
from app.models.user import User
from app.models.workspace import Workspace
from app.schemas.social_account import (
    SocialAccountCreate,
    SocialAccountRead,
    SocialAccountUpdate,
)


router = APIRouter(prefix="/social-accounts", tags=["Social Accounts"])


@router.post("/", response_model=SocialAccountRead, status_code=status.HTTP_201_CREATED)
def create_social_account(
    payload: SocialAccountCreate,
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

    social_account = SocialAccount(**payload.model_dump())

    db.add(social_account)
    db.commit()
    db.refresh(social_account)

    return social_account


@router.get("/", response_model=list[SocialAccountRead])
def list_social_accounts(
    workspace_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return (
        db.query(SocialAccount)
        .join(Workspace, Workspace.id == SocialAccount.workspace_id)
        .filter(
            SocialAccount.workspace_id == workspace_id,
            Workspace.owner_id == current_user.id
        )
        .all()
    )


@router.patch("/{social_account_id}", response_model=SocialAccountRead)
def update_social_account(
    social_account_id: int,
    payload: SocialAccountUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    social_account = (
        db.query(SocialAccount)
        .join(Workspace, Workspace.id == SocialAccount.workspace_id)
        .filter(
            SocialAccount.id == social_account_id,
            Workspace.owner_id == current_user.id
        )
        .first()
    )

    if not social_account:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cuenta social no encontrada."
        )

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(social_account, field, value)

    db.commit()
    db.refresh(social_account)

    return social_account


@router.delete("/{social_account_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_social_account(
    social_account_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    social_account = (
        db.query(SocialAccount)
        .join(Workspace, Workspace.id == SocialAccount.workspace_id)
        .filter(
            SocialAccount.id == social_account_id,
            Workspace.owner_id == current_user.id
        )
        .first()
    )

    if not social_account:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cuenta social no encontrada."
        )

    db.delete(social_account)
    db.commit()

    return None