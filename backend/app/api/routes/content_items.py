from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.database import get_db
from app.models.content_item import ContentItem
from app.models.user import User
from app.models.workspace import Workspace
from app.schemas.content_item import (
    ContentItemCreate,
    ContentItemRead,
    ContentItemUpdate,
)


router = APIRouter(prefix="/content-items", tags=["Content Items"])


@router.post("/", response_model=ContentItemRead, status_code=status.HTTP_201_CREATED)
def create_content_item(
    payload: ContentItemCreate,
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

    content_item = ContentItem(**payload.model_dump())

    db.add(content_item)
    db.commit()
    db.refresh(content_item)

    return content_item


@router.get("/", response_model=list[ContentItemRead])
def list_content_items(
    workspace_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return (
        db.query(ContentItem)
        .join(Workspace, Workspace.id == ContentItem.workspace_id)
        .filter(
            ContentItem.workspace_id == workspace_id,
            Workspace.owner_id == current_user.id
        )
        .order_by(ContentItem.created_at.desc())
        .all()
    )


@router.patch("/{content_item_id}", response_model=ContentItemRead)
def update_content_item(
    content_item_id: int,
    payload: ContentItemUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    content_item = (
        db.query(ContentItem)
        .join(Workspace, Workspace.id == ContentItem.workspace_id)
        .filter(
            ContentItem.id == content_item_id,
            Workspace.owner_id == current_user.id
        )
        .first()
    )

    if not content_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Contenido no encontrado."
        )

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(content_item, field, value)

    db.commit()
    db.refresh(content_item)

    return content_item


@router.delete("/{content_item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_content_item(
    content_item_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    content_item = (
        db.query(ContentItem)
        .join(Workspace, Workspace.id == ContentItem.workspace_id)
        .filter(
            ContentItem.id == content_item_id,
            Workspace.owner_id == current_user.id
        )
        .first()
    )

    if not content_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Contenido no encontrado."
        )

    db.delete(content_item)
    db.commit()

    return None