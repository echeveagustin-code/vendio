import { weekDayLabels, getPostsForDay, getNotesForDay } from "../../data/calendarMockData";
import ScheduledPostChip from "./ScheduledPostChip";
import NoteChip from "./NoteChip";

export default function CalendarWeekView({ year, month, selectedDay, posts, notes, onSelectDay }) {
  const startDay = Math.max(1, selectedDay - 3);
  const endDay = Math.min(new Date(year, month + 1, 0).getDate(), startDay + 6);
  const days = Array.from({ length: endDay - startDay + 1 }, (_, i) => startDay + i);

  return (
    <section className="overflow-hidden rounded-2xl border border-brand-navy/8 bg-white shadow-sm">
      <div className="grid grid-cols-7 border-b border-brand-navy/8 bg-[#f6f7fb]">
        {weekDayLabels.map((label) => (
          <div key={label} className="px-2 py-3 text-center text-xs font-extrabold uppercase tracking-[0.1em] text-brand-ink/45">
            {label}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-7">
        {days.map((day) => {
          const date = new Date(year, month, day);
          const dayPosts = getPostsForDay(posts, day);
          const dayNotes = getNotesForDay(notes, day);
          const isSelected = day === selectedDay;

          return (
            <button
              key={day}
              type="button"
              onClick={() => onSelectDay(day)}
              className={`flex min-h-[200px] flex-col rounded-xl border p-3 text-left transition ${
                isSelected
                  ? "border-brand-navy bg-brand-navy/[0.04] ring-2 ring-brand-navy/20"
                  : "border-brand-navy/8 bg-white hover:border-brand-navy/20 hover:shadow-soft"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-lg font-extrabold ${isSelected ? "text-brand-navy" : "text-brand-ink/70"}`}>{day}</span>
                <span className="text-[10px] font-semibold capitalize text-brand-ink/40">
                  {date.toLocaleString("es-AR", { weekday: "short" })}
                </span>
              </div>
              <div className="mt-3 flex flex-1 flex-col gap-2">
                {dayPosts.map((post) => (
                  <ScheduledPostChip key={post.id} {...post} />
                ))}
                {dayNotes.map((note) => (
                  <NoteChip key={note.id} {...note} />
                ))}
                {dayPosts.length === 0 && dayNotes.length === 0 && (
                  <span className="mt-auto text-xs text-brand-ink/30">Sin contenido</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
