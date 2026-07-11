import { apiRequest, getWorkspaceId } from "../lib/api";

function mapNoteToCalendar(note) {
  const rawDate = note.note_date || note.noteDate || note.created_at;
  const date = rawDate ? new Date(rawDate) : null;

  return {
    id: note.id,
    year: date ? date.getFullYear() : null,
    month: date ? date.getMonth() : null,
    day: date ? date.getDate() : null,
    text: note.text,
    category: note.category || "Nota",
    title: note.title || "",
    note_date: note.note_date,
    raw: note,
  };
}

export async function getCalendarNotes({ year, month } = {}) {
  const workspaceId = getWorkspaceId();

  if (!workspaceId) {
    throw new Error("No hay workspace activo.");
  }

  const today = new Date();
  const targetYear = year ?? today.getFullYear();
  const targetMonth = month ?? today.getMonth();

  const dateFrom = new Date(targetYear, targetMonth, 1, 0, 0, 0);
  const dateTo = new Date(targetYear, targetMonth + 1, 0, 23, 59, 59);

  const params = new URLSearchParams({
    workspace_id: workspaceId,
    date_from: dateFrom.toISOString(),
    date_to: dateTo.toISOString(),
  });

  const data = await apiRequest(`/calendar-notes/?${params.toString()}`);

  const notes = Array.isArray(data) ? data : data.items || data.notes || [];

  return notes
    .map(mapNoteToCalendar)
    .filter((note) => {
      return note.day !== null && note.month !== null && note.year !== null;
    });
}

export async function createCalendarNote({ year, month, day, text, category, title }) {
  const workspaceId = getWorkspaceId();

  if (!workspaceId) {
    throw new Error("No hay workspace activo.");
  }

  const noteDate = new Date(year, month, day, 12, 0, 0);

  const created = await apiRequest("/calendar-notes/", {
    method: "POST",
    body: JSON.stringify({
      workspace_id: Number(workspaceId),
      title: title || null,
      text,
      category: category || null,
      note_date: noteDate.toISOString(),
    }),
  });

  return mapNoteToCalendar(created);
}

export async function updateCalendarNote(noteId, payload) {
  const updated = await apiRequest(`/calendar-notes/${noteId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  return mapNoteToCalendar(updated);
}

export async function deleteCalendarNote(noteId) {
  return apiRequest(`/calendar-notes/${noteId}`, {
    method: "DELETE",
  });
}