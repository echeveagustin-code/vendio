export default function ReconnectAccountModal({ account, onClose }) {
  if (!account) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-brand-ink/40 p-4 backdrop-blur-sm sm:items-center">
      <div className="w-full max-w-md rounded-2xl border border-brand-navy/10 bg-white shadow-lift" role="dialog" aria-modal="true" aria-labelledby="reconnect-title">
        <div className="flex items-center justify-between border-b border-brand-navy/8 px-5 py-4">
          <h2 id="reconnect-title" className="font-display text-lg font-extrabold text-brand-navy">
            Reconectar cuenta
          </h2>
          <button type="button" onClick={onClose} className="rounded-lg p-2 text-brand-ink/50 hover:bg-[#f6f7fb]" aria-label="Cerrar">
            ×
          </button>
        </div>
        <div className="space-y-4 p-5">
          <div className="rounded-2xl bg-[#f6f7fb] p-4">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand-ink/42">Cuenta afectada</p>
            <p className="mt-2 font-display text-xl font-extrabold text-brand-navy">{account.username}</p>
            <p className="mt-1 text-sm font-semibold text-brand-ink/55">{account.platform}</p>
          </div>
          <div className="rounded-xl bg-orange-50 px-3 py-3 text-sm font-bold text-orange-800">
            Motivo: {account.issue || account.status || "Error de sincronizacion"}
          </div>
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-brand-navy text-sm font-bold text-white shadow-soft">
              Reconectar cuenta
            </button>
            <button type="button" onClick={onClose} className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-brand-navy/12 text-sm font-bold text-brand-navy">
              Ver permisos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
