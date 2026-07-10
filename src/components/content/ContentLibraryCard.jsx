import { MdContentCopy, MdDeleteOutline, MdImage, MdSchedule, MdStar, MdVideocam } from "react-icons/md";
import { statusBadgeStyles } from "../../data/contentMockData";

export default function ContentLibraryCard({ item, onPreview, onSchedule, onDuplicate, onDelete }) {
  const hasMetrics = item.views !== null && item.views !== undefined;

  return (
    <article className="overflow-hidden rounded-2xl border border-brand-navy/6 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <button
        type="button"
        onClick={() => onPreview(item)}
        className={`relative block h-40 w-full overflow-hidden bg-gradient-to-br ${item.gradient}`}
        aria-label={`Ver preview de ${item.title}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_30%)]" />

        <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white backdrop-blur">
          {item.type === "video" ? <MdVideocam /> : <MdImage />}
          {item.format}
        </span>

        {item.duration && (
          <span className="absolute right-3 top-3 rounded-full bg-black/30 px-2 py-1 text-[10px] font-bold text-white backdrop-blur">
            {item.duration}
          </span>
        )}

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-base text-white backdrop-blur">
            {item.type === "video" ? "▶" : "🔍"}
          </span>
        </div>

        {item.score && (
          <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[10px] font-extrabold text-brand-navy">
            <MdStar className="text-amber-500" /> {item.score}
          </span>
        )}
      </button>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 text-sm font-extrabold leading-snug text-brand-ink">{item.title}</h3>
          <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ${statusBadgeStyles[item.status]}`}>
            {item.status}
          </span>
        </div>

        <p className="mt-1.5 text-xs font-semibold text-brand-ink/50">
          {item.account} · {item.uploadedAt}
        </p>

        {hasMetrics ? (
          <div className="mt-3 grid grid-cols-4 gap-2 rounded-xl bg-[#f6f7fb] p-2.5 text-center">
            <Metric label="Views" value={item.views} />
            <Metric label="Clicks" value={item.clicks} />
            <Metric label="Consultas" value={item.queries} />
            <Metric label="Ventas" value={item.sales} />
          </div>
        ) : (
          <p className="mt-3 rounded-xl bg-[#f6f7fb] p-2.5 text-center text-xs font-semibold text-brand-ink/45">
            Todavía sin métricas
          </p>
        )}

        <div className="mt-3 flex items-center gap-1.5">
          <ActionButton label="Programar" onClick={() => onSchedule(item)}>
            <MdSchedule />
          </ActionButton>
          <ActionButton label="Duplicar" onClick={() => onDuplicate(item)}>
            <MdContentCopy />
          </ActionButton>
          <ActionButton label="Eliminar" onClick={() => onDelete(item)} danger>
            <MdDeleteOutline />
          </ActionButton>
        </div>
      </div>
    </article>
  );
}

function Metric({ label, value }) {
  return (
    <div>
      <p className="font-display text-sm font-extrabold text-brand-navy">{value}</p>
      <p className="text-[9px] font-bold uppercase tracking-wide text-brand-ink/40">{label}</p>
    </div>
  );
}

function ActionButton({ children, label, onClick, danger }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className={`inline-flex h-8 flex-1 items-center justify-center rounded-lg border text-sm transition ${
        danger
          ? "border-rose-100 text-rose-600 hover:bg-rose-50"
          : "border-brand-navy/10 text-brand-navy hover:bg-[#f6f7fb]"
      }`}
    >
      {children}
    </button>
  );
}
