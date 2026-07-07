import ScheduledPostChip from "./ScheduledPostChip";
import NoteChip from "./NoteChip";

const MAX_VISIBLE = 2;

export default function CalendarDayCell({ day, isCurrentMonth, isToday, isSelected, posts, notes, onSelect }) {
  const hasContent = posts.length > 0 || notes.length > 0;
  const isBusy = posts.length + notes.length >= 3;

  return (
    <button
      type="button"
      onClick={() => isCurrentMonth && onSelect(day)}
      disabled={!isCurrentMonth}
      className={`group relative flex min-h-[110px] flex-col rounded-xl border p-2 text-left transition sm:min-h-[130px] sm:p-2.5 lg:min-h-[148px] ${
        !isCurrentMonth
          ? "cursor-default border-transparent bg-transparent opacity-40"
          : isSelected
            ? "border-brand-navy bg-brand-navy/[0.04] shadow-soft ring-2 ring-brand-navy/20"
            : isToday
              ? "border-brand-navy/30 bg-white shadow-sm"
              : hasContent
                ? "border-brand-navy/10 bg-white hover:border-brand-navy/25 hover:shadow-soft"
                : "border-brand-navy/6 bg-white/80 hover:border-brand-navy/15 hover:bg-white hover:shadow-sm"
      } ${isBusy && isCurrentMonth ? "border-brand-navy/14" : ""}`}
    >
      <div className="flex items-center justify-between gap-1">
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-lg text-sm font-extrabold ${
            isSelected
              ? "bg-brand-navy text-white"
              : isToday
                ? "bg-brand-navy/10 text-brand-navy"
                : "text-brand-ink/70 group-hover:text-brand-navy"
          }`}
        >
          {day}
        </span>
        {isBusy && isCurrentMonth && (
          <span className="rounded-full bg-brand-navy/8 px-1.5 py-0.5 text-[9px] font-bold text-brand-navy">
            {posts.length + notes.length}
          </span>
        )}
      </div>

      {isCurrentMonth && (
        <div className="mt-1.5 flex flex-1 flex-col gap-1 overflow-hidden">
          {posts.slice(0, MAX_VISIBLE).map((post) => (
            <ScheduledPostChip key={post.id} {...post} compact />
          ))}
          {notes.slice(0, posts.length < MAX_VISIBLE ? MAX_VISIBLE - posts.length : 0).map((note) => (
            <NoteChip key={note.id} {...note} compact />
          ))}
          {posts.length + notes.length > MAX_VISIBLE && (
            <span className="text-[10px] font-bold text-brand-ink/45">
              +{posts.length + notes.length - MAX_VISIBLE} más
            </span>
          )}
          {!hasContent && (
            <span className="mt-auto text-[10px] font-medium text-brand-ink/28">Sin contenido</span>
          )}
        </div>
      )}
    </button>
  );
}
