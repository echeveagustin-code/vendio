import { platformBadgeStyles, platformIcons } from "../../data/accountsMockData";

export default function ReconnectAccountModal({ open, account, onClose, onReconnect }) {
  if (!open || !account) return null;

  const reason = account.reconnectReason ?? account.status;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-brand-ink/40 p-4 backdrop-blur-sm sm:items-center">
      <div className="w-full max-w-md rounded-2xl border border-brand-navy/10 bg-white shadow-lift" role="dialog" aria-modal="true" aria-labelledby="reconnect-title">
        <div className="flex items-center justify-between border-b border-brand-navy/8 px-5 py-4">
          <h2 id="reconnect-title" className="font-display text-lg font-extrabold text-brand-navy">
            Reconectar cuenta
          </h2>
          <button type="button" onClick={onClose} className="rounded-lg p-2 text-brand-ink/50 hover:bg-[#f6f7fb]" aria-label="Cerrar">
            ✕
          </button>
        </div>

        <div className="space-y-4 p-5">
          <div className="flex items-center gap-3 rounded-xl bg-[#f6f7fb] p-4">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl ${platformBadgeStyles[account.platform] ?? "bg-white"}`}>
              {platformIcons[account.platform] ?? "🔗"}
            </div>
            <div>
              <p className="font-display text-base font-extrabold text-brand-navy">{account.username}</p>
              <p className="text-sm font-semibold text-brand-ink/50">{account.platform}</p>
            </div>
          </div>

          <div className="rounded-xl border border-orange-200/60 bg-orange-50/70 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-orange-700/70">Motivo</p>
            <p className="mt-1 text-sm font-extrabold text-orange-900">{reason}</p>
            <p className="mt-2 text-xs leading-5 text-orange-800/70">
              {reason === "Token vencido" && "La sesión expiró. Reconectá para seguir publicando y sincronizando métricas."}
              {reason === "Permisos incompletos" && "Faltan permisos para publicar o leer métricas completas."}
              {reason === "Error" && "Hubo un error de sincronización. Intentá reconectar la cuenta."}
            </p>
          </div>

          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-brand-navy/12 text-sm font-bold text-brand-navy">
              Ver permisos
            </button>
            <button
              type="button"
              onClick={() => onReconnect(account)}
              className="inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-brand-navy text-sm font-bold text-white shadow-soft"
            >
              Reconectar cuenta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
