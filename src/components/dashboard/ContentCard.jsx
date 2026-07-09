import { badgeStyles } from "../../data/dashboardMockData";

function Metric({ label, value }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-brand-ink/38">{label}</p>
      <p className="mt-0.5 text-sm font-extrabold text-brand-ink">{value}</p>
    </div>
  );
}

export default function ContentCard({ title, badge, badgeTone, gradient, views, clicks, queries, sales }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-brand-navy/8 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft">
      <div className={`relative aspect-[16/10] bg-gradient-to-br ${gradient}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.22),transparent_55%)]" />
        <div className="absolute right-3 top-3 rounded-xl bg-white/95 px-2.5 py-1.5 text-center shadow-sm backdrop-blur">
          <p className="text-[9px] font-bold uppercase tracking-wider text-brand-ink/40">Score</p>
        </div>
        <button
          type="button"
          className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-brand-navy shadow-lift transition hover:scale-105"
          aria-label={`Reproducir ${title}`}
        >
          <span className="ml-0.5 text-lg">▶</span>
        </button>
      </div>

      <div className="p-4">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="flex-1 font-display text-base font-extrabold leading-snug text-brand-ink">{title}</h3>
          <span className={`shrink-0 rounded-lg px-2.5 py-1 text-[11px] font-extrabold ring-1 ring-inset ${badgeStyles[badgeTone]}`}>
            {badge}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Metric label="Views" value={views} />
          <Metric label="Clics" value={clicks} />
          <Metric label="Consultas" value={queries} />
          <Metric label="Ventas" value={sales} />
        </div>
      </div>
    </article>
  );
}
