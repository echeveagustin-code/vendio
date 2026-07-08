export default function EmptyAccountsState({ onConnect }) {
  return (
    <div className="rounded-2xl border border-dashed border-brand-navy/18 bg-white p-8 text-center shadow-sm">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-navy text-sm font-extrabold text-white">+</div>
      <h3 className="mt-5 font-display text-2xl font-extrabold text-brand-navy">Conecta tu primera cuenta</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-brand-ink/58">
        Suma Instagram, TikTok o Facebook para empezar a programar contenido y medir que publicaciones generan ventas.
      </p>
      <button type="button" onClick={onConnect} className="mt-5 h-11 rounded-xl bg-brand-navy px-5 text-sm font-bold text-white shadow-soft">
        Conectar cuenta
      </button>
    </div>
  );
}
