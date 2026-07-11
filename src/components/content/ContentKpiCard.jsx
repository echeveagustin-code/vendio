import { MdCollections, MdFolderOpen, MdSchedule, MdStorage } from "react-icons/md";

const kpiIconMap = {
  MdCollections,
  MdFolderOpen,
  MdSchedule,
  MdStorage,
};

export default function ContentKpiCard({ icon, label, value, change, positive }) {
  const IconComponent = kpiIconMap[icon];

  return (
    <article className="rounded-2xl border border-brand-navy/6 bg-white p-4 shadow-sm transition hover:shadow-soft">
      <div className="flex items-start justify-between gap-2">
        <span className="flex h-10 w-10 items-center justify-center text-brand-navy" aria-hidden="true">
          {IconComponent ? <IconComponent className="text-2xl" /> : icon}
        </span>
        {change && (
          <span
            className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
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
      <p className="mt-4 font-display text-3xl font-extrabold leading-none text-brand-navy">{value}</p>
      <p className="mt-2 text-sm font-semibold text-brand-ink/55">{label}</p>
    </article>
  );
}
