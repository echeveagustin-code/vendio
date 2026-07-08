import {
  contentStatusStyles,
  recommendationStyles,
  platformStyles,
} from "../../data/contentMockData";

function Metric({ label, value }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-brand-ink/38">{label}</p>
      <p className="mt-0.5 text-sm font-extrabold text-brand-ink">{value}</p>
    </div>
  );
}

export default function ContentCard({ item, viewMode = "Grid" }) {
  const {
    title,
    platform,
    status,
    account,
    date,
    scheduledDate,
    views,
    clicks,
    queries,
    sales,
    score,
    recommendation,
    gradient,
  } = item;

  const isList = viewMode === "Lista";

  return (
    <article
      className={`overflow-hidden rounded-2xl border border-brand-navy/8 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft ${
        isList ? "flex flex-col sm:flex-row" : ""
      }`}
    >
      <div className={`relative bg-gradient-to-br ${gradient} ${isList ? "aspect-[16/10] sm:aspect-auto sm:w-48 sm:shrink-0" : "aspect-[16/10]"}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.22),transparent_55%)]" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1">
          <span className={`rounded-lg px-2 py-1 text-[10px] font-bold ${platformStyles[platform] ?? "bg-white/90 text-brand-ink"}`}>
            {platform}
          </span>
          <span className={`rounded-lg px-2 py-1 text-[10px] font-bold ring-1 ring-inset ${contentStatusStyles[status] ?? "bg-slate-100 text-slate-600"}`}>
            {status}
          </span>
        </div>
        {score !== null && (
          <div className="absolute right-3 top-3 rounded-xl bg-white/95 px-2 py-1 text-center shadow-sm backdrop-blur">
            <p className="text-[9px] font-bold uppercase tracking-wider text-brand-ink/40">Score</p>
            <p className="font-display text-lg font-extrabold leading-none text-brand-navy">{score}</p>
          </div>
        )}
        <button
          type="button"
          className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-brand-navy shadow-lift transition hover:scale-105"
          aria-label={`Reproducir ${title}`}
        >
          <span className="ml-0.5 text-base">▶</span>
        </button>
      </div>

      <div className={`flex flex-1 flex-col p-4 ${isList ? "justify-center" : ""}`}>
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="flex-1 font-display text-base font-extrabold leading-snug text-brand-ink">{title}</h3>
          <span className={`shrink-0 rounded-lg px-2 py-1 text-[10px] font-extrabold ring-1 ring-inset ${recommendationStyles[recommendation] ?? "bg-slate-100 text-slate-600 ring-slate-200"}`}>
            {recommendation}
          </span>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-semibold text-brand-ink/50">
          <span>{account}</span>
          <span className="text-brand-ink/25">·</span>
          <span>{scheduledDate ?? date ?? "Sin fecha"}</span>
        </div>

        {status === "Publicado" && (
          <div className={`mt-3 grid gap-3 ${isList ? "grid-cols-4" : "grid-cols-2 sm:grid-cols-4"}`}>
            <Metric label="Views" value={views} />
            <Metric label="Clics" value={clicks} />
            <Metric label="Consultas" value={queries} />
            <Metric label="Ventas" value={sales} />
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-1.5 border-t border-brand-navy/6 pt-3">
          {["Editar", "Programar", "Duplicar", "Analizar"].map((action) => (
            <button
              key={action}
              type="button"
              className="rounded-lg border border-brand-navy/10 bg-[#f6f7fb] px-2.5 py-1.5 text-[11px] font-bold text-brand-ink/65 transition hover:border-brand-navy/20 hover:text-brand-navy"
            >
              {action}
            </button>
          ))}
          <button
            type="button"
            className="rounded-lg border border-brand-navy/10 bg-[#f6f7fb] px-2.5 py-1.5 text-[11px] font-bold text-brand-ink/65 transition hover:border-brand-navy/20"
            aria-label="Más opciones"
          >
            ···
          </button>
        </div>
      </div>
    </article>
  );
}
