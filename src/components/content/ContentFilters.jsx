export default function ContentFilters({
  search,
  status,
  platform,
  performance,
  viewMode,
  onSearchChange,
  onStatusChange,
  onPlatformChange,
  onPerformanceChange,
  onViewModeChange,
}) {
  const statuses = ["Todos", "Borrador", "Programado", "Publicado", "En revisión", "Falló"];
  const platforms = ["Todas", "Instagram", "TikTok", "Facebook", "YouTube Shorts"];
  const performances = ["Todos", "Alto potencial", "Ganador", "Optimizar", "Bajo rendimiento"];

  return (
    <div className="space-y-3 rounded-2xl border border-brand-navy/8 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar contenido..."
          className="h-10 flex-1 rounded-xl border border-brand-navy/10 bg-[#f6f7fb] px-4 text-sm font-semibold text-brand-ink outline-none transition placeholder:text-brand-ink/35 focus:border-brand-navy focus:bg-white focus:ring-2 focus:ring-brand-navy/10"
        />
        <div className="flex rounded-xl border border-brand-navy/10 bg-[#f6f7fb] p-1">
          {["Grid", "Lista"].map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => onViewModeChange(mode)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition sm:text-sm ${
                viewMode === mode ? "bg-brand-navy text-white" : "text-brand-ink/60 hover:text-brand-navy"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-[0.1em] text-brand-ink/40">Estado</span>
        {statuses.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onStatusChange(s)}
            className={`rounded-lg px-2.5 py-1.5 text-xs font-bold transition ${
              status === s ? "bg-brand-navy text-white" : "border border-brand-navy/10 bg-white text-brand-ink/60 hover:border-brand-navy/20"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-[0.1em] text-brand-ink/40">Plataforma</span>
        {platforms.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPlatformChange(p)}
            className={`rounded-lg px-2.5 py-1.5 text-xs font-bold transition ${
              platform === p ? "bg-[#0f3b8f] text-white" : "border border-brand-navy/10 bg-white text-brand-ink/60 hover:border-brand-navy/20"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-[0.1em] text-brand-ink/40">Rendimiento</span>
        {performances.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPerformanceChange(p)}
            className={`rounded-lg px-2.5 py-1.5 text-xs font-bold transition ${
              performance === p ? "bg-brand-accent/90 text-white" : "border border-brand-navy/10 bg-white text-brand-ink/60 hover:border-brand-navy/20"
            }`}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
