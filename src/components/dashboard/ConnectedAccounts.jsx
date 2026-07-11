import { FaTiktok, FaInstagram, FaFacebook } from "react-icons/fa";
import { connectedAccounts } from "../../data/dashboardMockData";

const PlatformIconMap = {
  Instagram: FaInstagram,
  TikTok: FaTiktok,
  Facebook: FaFacebook,
};

const statusStyles = {
  connected: "bg-emerald-50 text-emerald-700",
  active: "bg-emerald-50 text-emerald-700",
  ok: "bg-emerald-50 text-emerald-700",

  disconnected: "bg-rose-50 text-rose-700",
  error: "bg-rose-50 text-rose-700",
  expired: "bg-rose-50 text-rose-700",

  pending: "bg-amber-50 text-amber-700",
  warning: "bg-amber-50 text-amber-700",
};

function getPlatformName(account) {
  return account.platform || account.provider || account.network || "Cuenta";
}

function getAccountHandle(account) {
  return (
    account.handle ||
    account.username ||
    account.account_name ||
    account.external_username ||
    account.name ||
    "Sin usuario"
  );
}

function getAccountStatus(account) {
  return account.status || account.connection_status || "connected";
}

function getStatusLabel(status) {
  const labels = {
    connected: "Conectada",
    active: "Activa",
    ok: "OK",
    disconnected: "Desconectada",
    error: "Error",
    expired: "Expirada",
    pending: "Pendiente",
    warning: "Revisar",
  };

  return labels[status] || status;
}

export default function ConnectedAccounts({ accounts = [] }) {
  return (
    <section className="rounded-2xl border border-brand-navy/6 bg-white p-5 shadow-sm">
      <h2 className="font-display text-base font-extrabold text-brand-navy">
        Cuentas conectadas
      </h2>

      <ul className="mt-4 space-y-3">
        {connectedAccounts.map((account) => {
          const IconComponent = PlatformIconMap[account.platform];

          return (
            <li
              key={`${account.platform}-${account.handle}`}
              className="flex items-center justify-between gap-3 rounded-xl bg-[#f6f7fb] px-3 py-3"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-brand-navy shadow-sm">
                  {IconComponent ? (
                    <IconComponent className="text-lg" />
                  ) : (
                    <span className="text-base">🔗</span>
                  )}
                </span>

                <div className="min-w-0">
                  <p className="text-sm font-extrabold text-brand-ink">
                    {account.platform}
                  </p>
                  <p className="truncate text-xs font-semibold text-brand-ink/50">
                    {account.handle}
                  </p>
                </div>
              </div>

              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                  statusStyles[account.statusTone]
                }`}
              >
                {account.status}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
