from datetime import datetime

from pydantic import BaseModel, ConfigDict


class CalendarNoteCreate(BaseModel):
    workspace_id: int
    text: str
    category: str | None = None
    title: str | None = None
    note_date: datetime


class CalendarNoteUpdate(BaseModel):
    text: str | None = None
    category: str | None = None
    title: str | None = None
    note_date: datetime | None = None


class CalendarNoteRead(BaseModel):
    id: int
    workspace_id: int
    title: str | None = None
    text: str
    category: str | None = None
    note_date: datetime
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)