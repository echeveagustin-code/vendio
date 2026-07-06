export default function DashboardHeader({ onMenuToggle }) {
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
              <h1 className="font-display text-2xl font-extrabold text-brand-navy sm:text-3xl">Dashboard</h1>
              <p className="mt-1 text-sm text-brand-ink/55 sm:text-base">
                Planificá, medí y repetí el contenido que mejor funciona.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <select
            className="h-10 rounded-xl border border-brand-navy/10 bg-white px-3 text-sm font-semibold text-brand-ink shadow-sm outline-none focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10"
            defaultValue="30"
            aria-label="Período"
          >
            <option value="30">Últimos 30 días</option>
            <option value="7">Últimos 7 días</option>
            <option value="90">Últimos 90 días</option>
          </select>

          <select
            className="h-10 rounded-xl border border-brand-navy/10 bg-white px-3 text-sm font-semibold text-brand-ink shadow-sm outline-none focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10"
            defaultValue="all"
            aria-label="Cuenta"
          >
            <option value="all">Todas las cuentas</option>
            <option value="tienda">@tienda.style</option>
            <option value="outlet">@outlet.style</option>
          </select>

          <button
            type="button"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-brand-navy px-4 text-sm font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
          >
            Programar contenido
          </button>

          <div
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-navy to-[#0f3b8f] text-sm font-extrabold text-white shadow-sm"
            title="Usuario"
            aria-label="Perfil de usuario"
          >
            M
          </div>
        </div>
      </div>
    </header>
  );
}
