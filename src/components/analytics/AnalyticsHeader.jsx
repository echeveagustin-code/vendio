export default function AnalyticsHeader({ onMenuToggle }) {
  return (
    <header className="mb-6">
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
              <h1 className="font-display text-2xl font-extrabold text-brand-navy sm:text-3xl">Analíticas</h1>
              <p className="mt-1 text-sm text-brand-ink/55 sm:text-base">
                Qué contenido genera visitas, consultas y ventas reales.
              </p>
            </div>
          </div>
        </div>

        <select
          className="h-10 rounded-xl border border-brand-navy/10 bg-white px-3 text-sm font-semibold text-brand-ink shadow-sm outline-none focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10"
          defaultValue="7"
          aria-label="Período"
        >
          <option value="7">Últimos 7 días</option>
          <option value="30">Últimos 30 días</option>
          <option value="90">Últimos 90 días</option>
        </select>
      </div>
    </header>
  );
}
