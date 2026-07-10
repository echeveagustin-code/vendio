export default function TopContentList({ items }) {
  return (
    <section className="rounded-2xl border border-brand-navy/6 bg-white p-5 shadow-sm">
      <h2 className="font-display text-base font-extrabold text-brand-navy">Contenido con más ventas</h2>
      <p className="mt-0.5 text-sm text-brand-ink/55">Ranking según ventas atribuidas.</p>

      <ul className="mt-4 space-y-2">
        {items.map((item, index) => (
          <li
            key={item.id}
            className="flex items-center gap-3 rounded-xl bg-[#f6f7fb] px-3 py-3"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-xs font-extrabold text-brand-navy shadow-sm">
              {index + 1}
            </span>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-brand-ink">{item.title}</p>
              <p className="truncate text-xs font-semibold text-brand-ink/50">
                {item.account} · {item.format}
              </p>
            </div>

            <div className="flex shrink-0 gap-4 text-right">
              <Metric label="Views" value={item.views} />
              <Metric label="Clicks" value={item.clicks} />
              <Metric label="Ventas" value={item.sales} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Metric({ label, value }) {
  return (
    <div>
      <p className="font-display text-sm font-extrabold text-brand-navy">{value}</p>
      <p className="text-[10px] font-bold uppercase tracking-wide text-brand-ink/40">{label}</p>
    </div>
  );
}
