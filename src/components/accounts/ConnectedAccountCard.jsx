import AccountStatusBadge from "./AccountStatusBadge";
import { platformBadgeStyles, platformIcons } from "../../data/accountsMockData";

function Stat({ label, value }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-brand-ink/38">{label}</p>
      <p className="mt-0.5 text-sm font-extrabold text-brand-ink">{value}</p>
    </div>
  );
}

export default function ConnectedAccountCard({
  account,
  isSelected,
  onSelect,
  onReconnect,
  onTogglePublishing,
  onSync,
  onDeactivate,
}) {
  const { platform, username, status, followers, posts, reach, sales, lastSync, activeForPublishing } = account;

  return (
    <article
      className={`rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-soft sm:p-5 ${
        isSelected ? "border-brand-navy ring-2 ring-brand-navy/15" : "border-brand-navy/8"
      }`}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <button type="button" onClick={() => onSelect(account)} className="flex min-w-0 flex-1 items-start gap-3 text-left">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl ${platformBadgeStyles[platform] ?? "bg-[#f6f7fb]"}`}>
            {platformIcons[platform] ?? "🔗"}
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-base font-extrabold text-brand-navy">{username}</h3>
              <AccountStatusBadge status={status} />
            </div>
            <p className="mt-0.5 text-sm font-semibold text-brand-ink/50">{platform}</p>
            <p className="mt-1 text-xs text-brand-ink/40">Última sync: {lastSync}</p>
          </div>
        </button>

        <label className="flex shrink-0 items-center gap-2 rounded-xl bg-[#f6f7fb] px-3 py-2">
          <span className="text-xs font-bold text-brand-ink/55">Activa para publicar</span>
          <input
            type="checkbox"
            checked={activeForPublishing}
            onChange={() => onTogglePublishing(account.id)}
            disabled={status === "Error" || status === "Token vencido" || status === "Pendiente"}
            className="h-4 w-4 rounded border-brand-navy/20 text-brand-navy focus:ring-brand-navy/20"
          />
        </label>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-brand-navy/6 pt-4 sm:grid-cols-4">
        <Stat label="Seguidores" value={followers} />
        <Stat label="Publicaciones" value={posts} />
        <Stat label="Alcance 30d" value={reach} />
        <Stat label="Ventas" value={sales} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={() => onSelect(account)} className="rounded-lg border border-brand-navy/10 bg-[#f6f7fb] px-3 py-1.5 text-[11px] font-bold text-brand-ink/70 hover:text-brand-navy">
          Ver detalles
        </button>
        {(status === "Error" || status === "Token vencido") && (
          <button type="button" onClick={() => onReconnect(account)} className="rounded-lg bg-orange-50 px-3 py-1.5 text-[11px] font-bold text-orange-700 ring-1 ring-orange-200">
            Reconectar
          </button>
        )}
        <button type="button" onClick={() => onSync(account.id)} className="rounded-lg border border-brand-navy/10 bg-white px-3 py-1.5 text-[11px] font-bold text-brand-ink/70">
          Sincronizar
        </button>
        <button type="button" onClick={() => onDeactivate(account.id)} className="rounded-lg border border-brand-navy/10 bg-white px-3 py-1.5 text-[11px] font-bold text-brand-ink/70">
          Desactivar
        </button>
        <button type="button" className="rounded-lg border border-rose-200/60 bg-rose-50/50 px-3 py-1.5 text-[11px] font-bold text-rose-700">
          Eliminar
        </button>
      </div>
    </article>
  );
}
