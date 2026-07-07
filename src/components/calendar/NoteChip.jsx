import { noteCategoryStyles } from "../../data/calendarMockData";

export default function NoteChip({ text, category, compact = false }) {
  return (
    <div
      className={`flex items-start gap-1.5 rounded-lg border border-amber-200/50 bg-amber-50/60 px-2 py-1.5 ${
        compact ? "text-[10px]" : "text-[11px]"
      }`}
    >
      <span className="shrink-0 text-xs" aria-hidden="true">
        📝
      </span>
      <div className="min-w-0">
        <p className="font-semibold leading-snug text-brand-ink/80">{text}</p>
        {category && (
          <span className={`mt-0.5 inline-block rounded px-1.5 py-0.5 text-[9px] font-bold ring-1 ring-inset ${noteCategoryStyles[category] ?? "bg-slate-50 text-slate-600 ring-slate-200"}`}>
            {category}
          </span>
        )}
      </div>
    </div>
  );
}
