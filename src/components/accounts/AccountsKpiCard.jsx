export default function AccountsKpiCard({ icon, label, value, change }) {
  return (
    <article className="rounded-2xl border border-brand-navy/6 bg-white p-4 shadow-sm transition hover:shadow-soft">
      <div className="flex items-start justify-between gap-2">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f6f7fb] text-xs font-extrabold text-brand-navy" aria-hidden="true">
          {icon}
        </span>
        {change && <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700">{change}</span>}
      </div>
      <p className="mt-4 font-display text-3xl font-extrabold leading-none text-brand-navy">{value}</p>
      <p className="mt-2 text-sm font-semibold text-brand-ink/55">{label}</p>
    </article>
  );
}
