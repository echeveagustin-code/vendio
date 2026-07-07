export default function CalendarHeader({ onMenuToggle, viewMode, onViewModeChange, onSchedule, onAddNote }) {
  return (
    <header className="mb-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-brand-navy/10 bg-white text-lg shadow-sm lg:hidden"
              onClick={onMenuToggle}
              aria-label="Abrir menú"
            >
              ☰
            </button>
            <div>
              <h1 className="font-display text-2xl font-extrabold text-brand-navy sm:text-3xl">Calendario</h1>
              <p className="mt-1 text-sm text-brand-ink/55 sm:text-base">
                Planificá tus publicaciones, organizá campañas y agregá notas por día.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <select
            className="h-10 rounded-xl border border-brand-navy/10 bg-white px-3 text-sm font-semibold text-brand-ink shadow-sm outline-none focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10"
            defaultValue="all"
            aria-label="Cuenta"
          >
            <option value="all">Todas las cuentas</option>
            <option value="tienda">@tienda.style</option>
            <option value="outlet">@outlet.style</option>
          </select>

          <div className="flex rounded-xl border border-brand-navy/10 bg-white p-1 shadow-sm">
            {["Mes", "Semana"].map((mode) => (
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

          <button
            type="button"
            onClick={onAddNote}
            className="inline-flex h-10 items-center justify-center rounded-xl border border-brand-navy/12 bg-white px-4 text-sm font-bold text-brand-navy shadow-sm transition hover:bg-[#f6f7fb]"
          >
            Agregar nota
          </button>

          <button
            type="button"
            onClick={onSchedule}
            className="inline-flex h-10 items-center justify-center rounded-xl bg-brand-navy px-4 text-sm font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
          >
            Programar contenido
          </button>
        </div>
      </div>
    </header>
  );
}
