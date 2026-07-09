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
      <div className="flex justify-center bg-[#f6f7fb] px-4 pt-4">
        <div className="relative aspect-[9/16] h-[230px] overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-brand-navy/8">
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.42),transparent_32%)]" />

          <div className="absolute inset-0 backdrop-blur-[2px]" />

          <div className="absolute left-3 top-3 flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-white/75 shadow-sm" />
            <div>
              <div className="h-2 w-16 rounded-full bg-white/80" />
              <div className="mt-1.5 h-1.5 w-10 rounded-full bg-white/55" />
            </div>
          </div>



          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/25 text-xl text-white shadow-sm backdrop-blur">
              ▶
            </span>
          </div>



          <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-black/25 p-3 backdrop-blur">
          </div>
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
          <Metric label="Visitas a página web" value={sales} />
        </div>
      </div>
    </article>
  );
}