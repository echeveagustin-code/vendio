export default function AccountsKpiCard({ icon, label, value, change, positive }) {
  return (
    <article className="rounded-2xl border border-brand-navy/6 bg-white p-4 shadow-sm transition hover:shadow-soft">
      <div className="flex items-start justify-between gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f6f7fb] text-base" aria-hidden="true">
          {icon}
        </span>
        {change && (
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
              positive === true
                ? "bg-emerald-50 text-emerald-700"
                : positive === false
                  ? "bg-rose-50 text-rose-700"
                  : "bg-brand-navy/6 text-brand-ink/55"
            }`}
          >
            {change}
          </span>
        )}
      </div>
      <p className="mt-3 font-display text-2xl font-extrabold leading-none text-brand-navy">{value}</p>
      <p className="mt-1.5 text-xs font-semibold text-brand-ink/55 sm:text-sm">{label}</p>
    </article>
  );
}
