export default function CalendarToolbar({
  platform,
  monthLabel,
  onPlatformChange,
  onToday,
  onPrevMonth,
  onNextMonth,
}) {
  const platforms = ["Todas", "Instagram", "TikTok", "Facebook"];

  return (
    <div className="mb-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-[0.1em] text-brand-ink/40">
            Plataforma
          </span>
          {platforms.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => onPlatformChange(p)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                platform === p
                  ? "bg-brand-navy text-white shadow-sm"
                  : "border border-brand-navy/10 bg-white text-brand-ink/60 hover:border-brand-navy/20"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPrevMonth}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-navy/10 bg-white text-brand-navy shadow-sm transition hover:bg-[#f6f7fb]"
            aria-label="Mes anterior"
          >
            ←
          </button>
          <span className="min-w-[130px] text-center font-display text-base font-extrabold text-brand-navy sm:text-lg">
            {monthLabel}
          </span>
          <button
            type="button"
            onClick={onNextMonth}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-navy/10 bg-white text-brand-navy shadow-sm transition hover:bg-[#f6f7fb]"
            aria-label="Mes siguiente"
          >
            →
          </button>
          <button
            type="button"
            onClick={onToday}
            className="ml-1 rounded-lg border border-brand-navy/10 bg-white px-3 py-1.5 text-xs font-bold text-brand-navy shadow-sm transition hover:bg-[#f6f7fb]"
          >
            Hoy
          </button>
        </div>
      </div>
    </div>
  );
}
