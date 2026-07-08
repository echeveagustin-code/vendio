import { quickActions, quickRecommendations } from "../../data/contentMockData";

export default function QuickActionsPanel({ onUpload, onCreateDraft, onAction }) {
  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-brand-navy/8 bg-white p-5 shadow-sm">
        <h2 className="font-display text-base font-extrabold text-brand-navy">Acciones rápidas</h2>
        <ul className="mt-4 space-y-2">
          {quickActions.map((action) => (
            <li key={action.id}>
              <button
                type="button"
                onClick={() => {
                  if (action.id === "upload") onUpload?.();
                  else if (action.id === "draft") onCreateDraft?.();
                  else onAction?.(action.id);
                }}
                className="flex w-full items-center gap-3 rounded-xl border border-brand-navy/6 bg-[#f6f7fb] px-3 py-2.5 text-left text-sm font-semibold text-brand-ink/75 transition hover:border-brand-navy/15 hover:bg-white hover:shadow-sm"
              >
                <span className="text-base" aria-hidden="true">
                  {action.icon}
                </span>
                {action.label}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-brand-navy/8 bg-white p-5 shadow-sm">
        <h2 className="font-display text-base font-extrabold text-brand-navy">Resumen inteligente</h2>
        <ul className="mt-4 space-y-3">
          {quickRecommendations.map((item) => (
            <li key={item.id} className="flex gap-3 rounded-xl bg-[#f6f7fb] p-3">
              <span className="text-lg" aria-hidden="true">
                {item.icon}
              </span>
              <p className="text-sm font-semibold leading-6 text-brand-ink/70">{item.text}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
