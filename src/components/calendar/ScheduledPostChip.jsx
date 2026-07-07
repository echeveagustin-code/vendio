import { platformStyles, statusStyles } from "../../data/calendarMockData";

const platformDots = {
  Instagram: "bg-[#bc1888]",
  TikTok: "bg-slate-800",
  Facebook: "bg-blue-600",
  YouTube: "bg-red-600",
};

export default function ScheduledPostChip({ time, type, platform, status, compact = false }) {
  return (
    <div
      className={`group/chip flex items-start gap-1.5 rounded-lg border border-brand-navy/6 bg-white px-2 py-1.5 shadow-sm transition hover:border-brand-navy/15 hover:shadow-soft ${
        compact ? "text-[10px]" : "text-[11px]"
      }`}
    >
      <span className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${platformDots[platform] ?? "bg-brand-navy"}`} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1 font-bold text-brand-ink">
          <span className="text-brand-navy">{time}</span>
          <span className="text-brand-ink/30">·</span>
          <span>{type}</span>
        </div>
        <div className="mt-0.5 flex flex-wrap items-center gap-1">
          <span className={`rounded px-1.5 py-0.5 font-bold ring-1 ring-inset ${platformStyles[platform] ?? "bg-slate-50 text-slate-700 ring-slate-200"}`}>
            {platform}
          </span>
          <span className={`rounded px-1.5 py-0.5 font-bold ${statusStyles[status] ?? "bg-slate-100 text-slate-600"}`}>
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}
