import { weekDayLabels, buildCalendarGrid } from "../../data/calendarMockData";
import { getNotesForDay, getPostsForDay } from "../../utils/calendarUtils";
import CalendarDayCell from "./CalendarDayCell";

export default function CalendarGrid({
  year,
  month,
  selectedDay,
  posts,
  notes,
  onSelectDay,
}) {
  const cells = buildCalendarGrid(year, month);

  return (
    <section className="overflow-hidden rounded-2xl border border-brand-navy/8 bg-white shadow-sm">
      <div className="grid grid-cols-7 border-b border-brand-navy/8 bg-[#f6f7fb]">
        {weekDayLabels.map((label) => (
          <div
            key={label}
            className="px-2 py-3 text-center text-xs font-extrabold uppercase tracking-[0.1em] text-brand-ink/45 sm:text-sm"
          >
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-px bg-brand-navy/6 p-px">
        {cells.map((cell, index) => {
          const dayPosts = cell.isCurrentMonth
            ? getPostsForDay(posts, cell.year, cell.month, cell.day)
            : [];

          const dayNotes = cell.isCurrentMonth
            ? getNotesForDay(notes, cell.year, cell.month, cell.day)
            : [];

          return (
            <CalendarDayCell
              key={`${cell.year}-${cell.month}-${cell.day}-${index}`}
              day={cell.day}
              isCurrentMonth={cell.isCurrentMonth}
              isToday={cell.isToday}
              isSelected={
                cell.isCurrentMonth &&
                cell.year === year &&
                cell.month === month &&
                cell.day === selectedDay
              }
              posts={dayPosts}
              notes={dayNotes}
              onSelect={() => onSelectDay(cell.day)}
            />
          );
        })}
      </div>
    </section>
  );
}
