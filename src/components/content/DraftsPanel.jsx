import { platformStyles } from "../../data/contentMockData";

export default function DraftsPanel({ drafts, onContinue, onSchedule }) {
  return (
    <section className="rounded-2xl border border-brand-navy/8 bg-white p-5 shadow-sm">
      <h2 className="font-display text-base font-extrabold text-brand-navy">Borradores recientes</h2>
      <p className="mt-1 text-xs text-brand-ink/50">Continuá donde lo dejaste</p>

      <ul className="mt-4 space-y-3">
        {drafts.map((draft) => (
          <li key={draft.id} className="rounded-xl border border-brand-navy/6 bg-[#f6f7fb] p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-extrabold text-brand-ink">{draft.title}</p>
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <span className={`rounded px-2 py-0.5 text-[10px] font-bold ${platformStyles[draft.platform] ?? "bg-white text-brand-ink"}`}>
                    {draft.platform}
                  </span>
                  <span className="text-[10px] font-semibold text-brand-ink/40">{draft.lastEdit}</span>
                </div>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => onContinue?.(draft)}
                className="flex-1 rounded-lg bg-brand-navy py-1.5 text-[11px] font-bold text-white transition hover:bg-[#0f3b8f]"
              >
                Continuar
              </button>
              <button
                type="button"
                onClick={() => onSchedule?.(draft)}
                className="flex-1 rounded-lg border border-brand-navy/12 bg-white py-1.5 text-[11px] font-bold text-brand-navy transition hover:bg-white"
              >
                Programar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
