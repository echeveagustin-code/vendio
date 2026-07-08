import AccountStatusBadge from "./AccountStatusBadge";

function Stat({ label, value }) {
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-brand-ink/38">{label}</p>
      <p className="mt-1 font-extrabold text-brand-ink">{value}</p>
    </div>
  );
}

export default function ConnectedAccountCard({ account, selected, onSelect, onReconnect }) {
  const needsReconnect = account.status === "Error" || account.status === "Token vencido";

  return (
    <article className={`rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-soft ${selected ? "border-brand-navy/28" : "border-brand-navy/6"}`}>
      <div className="flex flex-col gap-4 xl:grid xl:grid-cols-[1.15fr_1.35fr_auto] xl:items-center">
        <button type="button" onClick={() => onSelect(account)} className="flex min-w-0 items-center gap-3 text-left">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f6f7fb] text-xs font-extrabold text-brand-navy">
            {account.platform.slice(0, 2).toUpperCase()}
          </span>
          <span className="min-w-0">
            <span className="flex flex-wrap items-center gap-2">
              <AccountStatusBadge type="platform">{account.platform}</AccountStatusBadge>
              <AccountStatusBadge>{account.status}</AccountStatusBadge>
            </span>
            <span className="mt-2 block truncate font-display text-lg font-extrabold text-brand-navy">{account.username}</span>
          </span>
        </button>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          <Stat label="Seguidores" value={account.followers} />
          <Stat label="Videos" value={account.posts} />
          <Stat label="Alcance 30d" value={account.reach} />
          <Stat label="Ventas" value={account.sales} />
          <Stat label="Sync" value={account.lastSync} />
        </div>

        <div className="flex flex-wrap items-center gap-2 xl:justify-end">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#f6f7fb] px-3 py-1.5 text-xs font-extrabold text-brand-ink/65">
            <span className={`h-4 w-8 rounded-full p-0.5 ${account.activeForPublishing ? "bg-brand-navy" : "bg-slate-300"}`}>
              <span className={`block h-3 w-3 rounded-full bg-white transition ${account.activeForPublishing ? "translate-x-4" : ""}`} />
            </span>
            Activa para publicar
          </span>
          <button type="button" onClick={() => onSelect(account)} className="rounded-xl border border-brand-navy/10 px-3 py-2 text-xs font-bold text-brand-navy">
            Ver detalles
          </button>
          <button
            type="button"
            onClick={() => onReconnect(account)}
            className={`rounded-xl px-3 py-2 text-xs font-bold ${needsReconnect ? "bg-brand-navy text-white" : "border border-brand-navy/10 text-brand-navy"}`}
          >
            Reconectar
          </button>
          <button type="button" className="rounded-xl border border-brand-navy/10 px-3 py-2 text-xs font-bold text-brand-navy">
            Sincronizar
          </button>
          <button type="button" className="rounded-xl border border-brand-navy/10 px-3 py-2 text-xs font-bold text-brand-ink/60">
            Desactivar
          </button>
          <button type="button" className="rounded-xl border border-rose-100 px-3 py-2 text-xs font-bold text-rose-700">
            Eliminar
          </button>
        </div>
      </div>
    </article>
  );
}
