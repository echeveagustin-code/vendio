import AccountStatusBadge from "./AccountStatusBadge";
import { platformBadgeStyles, platformIcons } from "../../data/accountsMockData";

function DetailRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2">
      <span className="text-sm font-semibold text-brand-ink/50">{label}</span>
      <span className="text-sm font-extrabold text-brand-ink">{value}</span>
    </div>
  );
}

export default function AccountDetailPanel({ account, onReconnect, onSync, onDeactivatePublishing }) {
  if (!account) {
    return (
      <aside className="rounded-2xl border border-dashed border-brand-navy/15 bg-white p-6 text-center shadow-sm">
        <p className="text-sm font-semibold text-brand-ink/45">Seleccioná una cuenta para ver su detalle</p>
      </aside>
    );
  }

  const { platform, username, status, followers, posts, reach, sales, lastSync, bestContent, permissions, activeForPublishing } = account;

  return (
    <aside className="flex flex-col rounded-2xl border border-brand-navy/8 bg-white shadow-sm lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto">
      <div className="border-b border-brand-navy/8 p-5">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-ink/40">Detalle de cuenta</p>
        <div className="mt-3 flex items-center gap-3">
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl ${platformBadgeStyles[platform] ?? "bg-[#f6f7fb]"}`}>
            {platformIcons[platform] ?? "🔗"}
          </div>
          <div>
            <h2 className="font-display text-lg font-extrabold text-brand-navy">{username}</h2>
            <p className="text-sm font-semibold text-brand-ink/50">{platform}</p>
          </div>
        </div>
        <div className="mt-3">
          <AccountStatusBadge status={status} />
        </div>
      </div>

      <div className="space-y-1 border-b border-brand-navy/8 p-5">
        <DetailRow label="Seguidores" value={followers} />
        <DetailRow label="Publicaciones/videos" value={posts} />
        <DetailRow label="Alcance últimos 30 días" value={reach} />
        <DetailRow label="Ventas atribuidas" value={sales} />
        <DetailRow label="Última sincronización" value={lastSync} />
        <DetailRow label="Mejor contenido" value={bestContent} />
      </div>

      <div className="p-5">
        <h3 className="text-sm font-extrabold text-brand-navy">Permisos activos</h3>
        <ul className="mt-3 space-y-2">
          {permissions.length > 0 ? (
            permissions.map((perm) => (
              <li key={perm} className="flex items-center gap-2 text-sm font-semibold text-brand-ink/65">
                <span className="text-emerald-600">✓</span>
                {perm}
              </li>
            ))
          ) : (
            <li className="text-sm text-brand-ink/45">Sin permisos activos</li>
          )}
        </ul>
      </div>

      <div className="mt-auto flex flex-col gap-2 border-t border-brand-navy/8 p-5">
        {(status === "Error" || status === "Token vencido") && (
          <button type="button" onClick={() => onReconnect(account)} className="h-10 rounded-xl bg-orange-50 text-sm font-bold text-orange-700 ring-1 ring-orange-200">
            Reconectar cuenta
          </button>
        )}
        <button type="button" onClick={() => onSync(account.id)} className="h-10 rounded-xl bg-brand-navy text-sm font-bold text-white shadow-soft">
          Sincronizar ahora
        </button>
        <button type="button" className="h-10 rounded-xl border border-brand-navy/12 text-sm font-bold text-brand-navy">
          Ver analíticas
        </button>
        {activeForPublishing && (
          <button type="button" onClick={() => onDeactivatePublishing(account.id)} className="h-10 rounded-xl border border-brand-navy/12 text-sm font-bold text-brand-ink/60">
            Desactivar publicación
          </button>
        )}
      </div>
    </aside>
  );
}
