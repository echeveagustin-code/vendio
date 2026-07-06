import { connectedAccounts, statusStyles } from "../../data/dashboardMockData";

const platformIcons = {
  Instagram: "📸",
  TikTok: "🎵",
  Facebook: "👤",
};

export default function ConnectedAccounts() {
  return (
    <section className="rounded-2xl border border-brand-navy/6 bg-white p-5 shadow-sm">
      <h2 className="font-display text-base font-extrabold text-brand-navy">Cuentas conectadas</h2>
      <ul className="mt-4 space-y-3">
        {connectedAccounts.map((account) => (
          <li
            key={`${account.platform}-${account.handle}`}
            className="flex items-center justify-between gap-3 rounded-xl bg-[#f6f7fb] px-3 py-3"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-base shadow-sm">
                {platformIcons[account.platform] ?? "🔗"}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-extrabold text-brand-ink">{account.platform}</p>
                <p className="truncate text-xs font-semibold text-brand-ink/50">{account.handle}</p>
              </div>
            </div>
            <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${statusStyles[account.statusTone]}`}>
              {account.status}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
