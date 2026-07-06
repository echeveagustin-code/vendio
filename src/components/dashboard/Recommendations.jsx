import { recommendations } from "../../data/dashboardMockData";

const toneStyles = {
  info: "border-brand-navy/10 bg-[#f0f4fc]",
  tip: "border-amber-200/60 bg-amber-50/80",
  alert: "border-rose-200/60 bg-rose-50/70",
};

export default function Recommendations() {
  return (
    <section className="rounded-2xl border border-brand-navy/6 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-lg font-extrabold text-brand-navy">Recomendaciones</h2>
        <span className="rounded-full bg-brand-navy/8 px-2.5 py-1 text-[11px] font-bold text-brand-navy">3 nuevas</span>
      </div>

      <ul className="mt-4 space-y-3">
        {recommendations.map((item) => (
          <li
            key={item.id}
            className={`flex gap-3 rounded-xl border p-4 ${toneStyles[item.tone]}`}
          >
            <span className="text-lg" aria-hidden="true">
              {item.icon}
            </span>
            <p className="text-sm font-semibold leading-6 text-brand-ink/75">{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
