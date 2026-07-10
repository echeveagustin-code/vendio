import { MdContentCopy, MdDeleteOutline, MdImage, MdSchedule, MdVideocam } from "react-icons/md";
import { statusBadgeStyles } from "../../data/contentMockData";

export default function ContentPreviewModal({ item, onClose, onSchedule, onDuplicate, onDelete }) {
  if (!item) return null;

  const hasMetrics = item.views !== null && item.views !== undefined;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-brand-ink/40 p-4 backdrop-blur-sm sm:items-center">
      <div
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-brand-navy/10 bg-white shadow-lift"
        role="dialog"
        aria-modal="true"
        aria-labelledby="preview-title"
      >
        <div className={`relative h-64 overflow-hidden bg-gradient-to-br ${item.gradient}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_30%)]" />

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-lg text-white backdrop-blur hover:bg-white/30"
          >
            ×
          </button>

          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-white backdrop-blur">
            {item.type === "video" ? <MdVideocam /> : <MdImage />}
            {item.format}
          </span>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-2xl text-white backdrop-blur">
              {item.type === "video" ? "▶" : "🔍"}
            </span>
          </div>

          {item.duration && (
            <span className="absolute bottom-3 right-3 rounded-full bg-black/30 px-2 py-1 text-[11px] font-bold text-white backdrop-blur">
              {item.duration}
            </span>
          )}
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <h2 id="preview-title" className="font-display text-lg font-extrabold text-brand-navy">
              {item.title}
            </h2>
            <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ${statusBadgeStyles[item.status]}`}>
              {item.status}
            </span>
          </div>

          <p className="mt-1 text-sm font-semibold text-brand-ink/50">
            {item.account} · {item.uploadedAt}
            {item.score ? ` · Score ${item.score}` : ""}
          </p>

          {hasMetrics ? (
            <div className="mt-4 grid grid-cols-4 gap-3 rounded-xl bg-[#f6f7fb] p-3 text-center">
              <Metric label="Views" value={item.views} />
              <Metric label="Clicks" value={item.clicks} />
              <Metric label="Consultas" value={item.queries} />
              <Metric label="Ventas" value={item.sales} />
            </div>
          ) : (
            <p className="mt-4 rounded-xl bg-[#f6f7fb] p-3 text-center text-sm font-semibold text-brand-ink/45">
              Esta pieza todavía no tiene métricas.
            </p>
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onSchedule(item)}
              className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl bg-brand-navy px-4 text-sm font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
            >
              <MdSchedule /> Programar
            </button>
            <button
              type="button"
              onClick={() => onDuplicate(item)}
              className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl border border-brand-navy/12 text-sm font-bold text-brand-navy transition hover:bg-[#f6f7fb]"
            >
              <MdContentCopy /> Duplicar
            </button>
            <button
              type="button"
              onClick={() => onDelete(item)}
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-rose-100 px-4 text-sm font-bold text-rose-600 transition hover:bg-rose-50"
            >
              <MdDeleteOutline /> Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div>
      <p className="font-display text-base font-extrabold text-brand-navy">{value}</p>
      <p className="text-[10px] font-bold uppercase tracking-wide text-brand-ink/40">{label}</p>
    </div>
  );
}
