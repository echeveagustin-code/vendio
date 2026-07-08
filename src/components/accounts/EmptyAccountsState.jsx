export default function EmptyAccountsState({ onConnect }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-brand-navy/15 bg-white px-6 py-16 text-center shadow-sm">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-navy/8 text-3xl">🔗</div>
      <h3 className="mt-5 font-display text-xl font-extrabold text-brand-navy">Conectá tu primera cuenta</h3>
      <p className="mt-2 max-w-sm text-sm leading-6 text-brand-ink/55">
        Sumá Instagram, TikTok o Facebook para empezar a programar contenido y medir qué publicaciones generan ventas.
      </p>
      <button
        type="button"
        onClick={onConnect}
        className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-brand-navy px-6 text-sm font-bold text-white shadow-soft transition hover:-translate-y-0.5"
      >
        Conectar cuenta
      </button>
    </div>
  );
}
