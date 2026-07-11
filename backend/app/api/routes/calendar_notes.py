from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.database import get_db
from app.models.calendar_note import CalendarNote
from app.models.user import User
from app.models.workspace import Workspace
from app.schemas.calendar_note import (
    CalendarNoteCreate,
    CalendarNoteRead,
    CalendarNoteUpdate,
)


router = APIRouter(prefix="/calendar-notes", tags=["Calendar Notes"])


def get_user_workspace(
    db: Session,
    workspace_id: int,
    current_user: User,
) -> Workspace:
    workspace = (
        db.query(Workspace)
        .filter(
            Workspace.id == workspace_id,
            Workspace.owner_id == current_user.id,
        )
        .first()
    )

    if not workspace:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Workspace no encontrado.",
        )

    return workspace


@router.get("/", response_model=list[CalendarNoteRead])
def list_calendar_notes(
    workspace_id: int,
    date_from: datetime,
    date_to: datetime,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    get_user_workspace(db, workspace_id, current_user)

    return (
        db.query(CalendarNote)
        .filter(
            CalendarNote.workspace_id == workspace_id,
            CalendarNote.note_date >= date_from,
            CalendarNote.note_date <= date_to,
        )
        .order_by(CalendarNote.note_date.asc())
        .all()
    )


@router.post("/", response_model=CalendarNoteRead, status_code=status.HTTP_201_CREATED)
def create_calendar_note(
    payload: CalendarNoteCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    get_user_workspace(db, payload.workspace_id, current_user)

    note = CalendarNote(
        workspace_id=payload.workspace_id,
        title=payload.title,
        text=payload.text,
        category=payload.category,
        note_date=payload.note_date,
    )

    db.add(note)
    db.commit()
    db.refresh(note)

    return note


@router.patch("/{note_id}", response_model=CalendarNoteRead)
def update_calendar_note(
    note_id: int,
    payload: CalendarNoteUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    note = (
        db.query(CalendarNote)
        .join(Workspace, Workspace.id == CalendarNote.workspace_id)
        .filter(
            CalendarNote.id == note_id,
            Workspace.owner_id == current_user.id,
        )
        .first()
    )

    if not note:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Nota no encontrada.",
        )

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(note, field, value)

    db.commit()
    db.refresh(note)

    return note


@router.delete("/{note_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_calendar_note(
    note_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    note = (
        db.query(CalendarNote)
        .join(Workspace, Workspace.id == CalendarNote.workspace_id)
        .filter(
            CalendarNote.id == note_id,
            Workspace.owner_id == current_user.id,
        )
        .first()
    )

    if not note:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Nota no encontrada.",
        )

    db.delete(note)
    db.commit()

    return None