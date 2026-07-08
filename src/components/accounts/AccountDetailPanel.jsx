import { permissions } from "../../data/accountsMockData";
import AccountStatusBadge from "./AccountStatusBadge";

function DetailStat({ label, value }) {
  return (
    <div className="rounded-xl bg-[#f6f7fb] p-3">
      <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-brand-ink/38">{label}</p>
      <p className="mt-1 font-display text-lg font-extrabold text-brand-navy">{value}</p>
    </div>
  );
}

export default function AccountDetailPanel({ account, onReconnect }) {
  if (!account) return null;

  return (
    <aside className="rounded-2xl border border-brand-navy/6 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-extrabold text-brand-navy">Detalle de cuenta</h2>
          <p className="mt-1 text-sm text-brand-ink/55">{account.username}</p>
        </div>
        <AccountStatusBadge>{account.status}</AccountStatusBadge>
      </div>

      <div className="mt-5 flex items-center gap-3 rounded-2xl bg-[#f6f7fb] p-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-navy text-xs font-extrabold text-white">
          {account.platform.slice(0, 2).toUpperCase()}
        </span>
        <div>
          <AccountStatusBadge type="platform">{account.platform}</AccountStatusBadge>
          <p className="mt-2 font-display text-lg font-extrabold text-brand-navy">{account.username}</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <DetailStat label="Seguidores" value={account.followers} />
        <DetailStat label="Videos" value={account.posts} />
        <DetailStat label="Alcance 30d" value={account.reach} />
        <DetailStat label="Ventas" value={account.sales} />
      </div>

      <div className="mt-5 rounded-2xl border border-brand-navy/8 p-4">
        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand-ink/42">Mejor contenido</p>
        <p className="mt-2 font-bold text-brand-navy">{account.bestContent}</p>
        <p className="mt-3 text-sm font-semibold text-brand-ink/55">Ultima sincronizacion: {account.lastSync}</p>
      </div>

      <div className="mt-5">
        <p className="text-sm font-extrabold text-brand-navy">Permisos activos</p>
        <div className="mt-3 space-y-2">
          {permissions.map((permission) => (
            <div key={permission} className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-700">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-xs">✓</span>
              {permission}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-2">
        <button type="button" onClick={() => onReconnect(account)} className="h-10 rounded-xl bg-brand-navy px-4 text-sm font-bold text-white shadow-soft">
          Reconectar cuenta
        </button>
        <button type="button" className="h-10 rounded-xl border border-brand-navy/12 px-4 text-sm font-bold text-brand-navy">
          Sincronizar ahora
        </button>
        <button type="button" className="h-10 rounded-xl border border-brand-navy/12 px-4 text-sm font-bold text-brand-navy">
          Ver analiticas
        </button>
        <button type="button" className="h-10 rounded-xl border border-rose-100 px-4 text-sm font-bold text-rose-700">
          Desactivar publicacion
        </button>
      </div>
    </aside>
  );
}
