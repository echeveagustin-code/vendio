import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

const PlatformIconMap = {
  Instagram: FaInstagram,
  TikTok: FaTiktok,
  Facebook: FaFacebook,
};

export default function AccountBreakdown({ accounts }) {
  const maxVisitas = Math.max(...accounts.map((account) => account.visitas), 1);

  return (
    <aside className="rounded-2xl border border-brand-navy/6 bg-white p-5 shadow-sm">
      <h2 className="font-display text-base font-extrabold text-brand-navy">Rendimiento por cuenta</h2>
      <p className="mt-0.5 text-sm text-brand-ink/55">Visitas y ventas atribuidas.</p>

      <ul className="mt-4 space-y-4">
        {accounts.map((account) => {
          const IconComponent = PlatformIconMap[account.platform];

          return (
            <li key={account.id}>
              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#f6f7fb] text-brand-navy">
                    {IconComponent && <IconComponent className="text-sm" />}
                  </span>
                  <p className="truncate text-sm font-bold text-brand-ink">{account.handle}</p>
                </div>
                <p className="shrink-0 text-xs font-bold text-brand-ink/50">
                  {account.visitas} visitas · {account.ventas} ventas
                </p>
              </div>

              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#f6f7fb]">
                <div
                  className="h-full rounded-full bg-brand-navy"
                  style={{ width: `${(account.visitas / maxVisitas) * 100}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
