import { badgeStyles } from "../../data/dashboardMockData";

function Metric({ label, value }) {
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-wide text-brand-ink/40">
        {label}
      </p>
      <p className="mt-1 font-display text-lg font-extrabold text-brand-navy">
        {value}
      </p>
    </div>
  );
}

export default function ContentCard({
  title,
  badge,
  badgeTone,
  gradient,
  views,
  clicks,
  queries,
  sales,
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-brand-navy/6 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <div className={`relative h-36 bg-gradient-to-br ${gradient}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_30%)]" />

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-xl text-white backdrop-blur">
            ▶
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 text-sm font-extrabold leading-snug text-brand-ink">
            {title}
          </h3>

          <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ${
              badgeStyles[badgeTone]
            }`}
          >
            {badge}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-[#f6f7fb] p-3">
          <Metric label="Views" value={views} />
          <Metric label="Clicks" value={clicks} />
          <Metric label="Interacciones" value={queries} />
          <Metric label="Visitas a pagina web" value={sales} />
        </div>
      </div>
    </article>
  );
}