import { useState } from "react";
import { getCalendarDays } from "../../data/dashboardMockData";

export default function CalendarStrip() {
  const days = getCalendarDays(10);
  const [selectedId, setSelectedId] = useState(days[0]?.id ?? 0);

  return (
    <section className="mb-6" aria-label="Calendario editorial">
      <div className="flex items-center justify-between gap-3 px-0.5 pb-3">
        <h2 className="text-sm font-extrabold uppercase tracking-[0.12em] text-brand-ink/45">Calendario</h2>
        <a href="#dashboard" className="text-xs font-bold text-brand-navy hover:underline">
          Ver calendario completo →
        </a>
      </div>

      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 scrollbar-thin">
        {days.map((day) => {
          const isSelected = day.id === selectedId;
          const dotCount = (day.schedule.posts ?? 0) + (day.schedule.reel ?? 0);

          return (
            <button
              key={day.id}
              type="button"
              onClick={() => setSelectedId(day.id)}
              className={`min-w-[88px] shrink-0 rounded-2xl border px-3 py-3 text-left transition ${
                isSelected
                  ? "border-brand-navy bg-brand-navy text-white shadow-soft"
                  : "border-brand-navy/8 bg-white text-brand-ink shadow-sm hover:border-brand-navy/20 hover:shadow-soft"
              }`}
            >
              <p className={`text-[11px] font-bold uppercase tracking-wide ${isSelected ? "text-white/70" : "text-brand-ink/45"}`}>
                {day.dayLabel}
              </p>
              <p className="mt-0.5 font-display text-2xl font-extrabold leading-none">{day.dayNumber}</p>
              <p className={`mt-1 text-[10px] font-semibold capitalize ${isSelected ? "text-white/55" : "text-brand-ink/38"}`}>
                {day.month}
              </p>

              <div className="mt-2 flex min-h-[18px] items-center gap-1">
                {dotCount > 0 ? (
                  <>
                    {Array.from({ length: Math.min(dotCount, 3) }).map((_, i) => (
                      <span
                        key={i}
                        className={`h-1.5 w-1.5 rounded-full ${isSelected ? "bg-white/80" : "bg-brand-navy/50"}`}
                      />
                    ))}
                    <span className={`ml-0.5 text-[10px] font-bold ${isSelected ? "text-white/75" : "text-brand-ink/50"}`}>
                      {day.schedule.label}
                    </span>
                  </>
                ) : (
                  <span className={`text-[10px] font-bold ${isSelected ? "text-white/60" : "text-brand-ink/40"}`}>
                    {day.schedule.label}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
