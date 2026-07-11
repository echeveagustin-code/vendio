export default function ContentHeader({ onMenuToggle, onUploadClick }) {
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
              <h1 className="font-display text-2xl font-extrabold text-brand-navy sm:text-3xl">Contenido</h1>
              <p className="mt-1 text-sm text-brand-ink/55 sm:text-base">
                Subí fotos y videos, revisá tu biblioteca y encontrá qué repetir.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onUploadClick}
            className="inline-flex h-10 items-center justify-center rounded-xl bg-brand-navy px-4 text-sm font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
          >
            + Subir contenido
          </button>
        </div>
      </div>
    </header>
  );
}
