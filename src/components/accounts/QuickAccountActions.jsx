export default function QuickAccountActions({ actions, onAction }) {
  return (
    <section className="rounded-2xl border border-brand-navy/8 bg-white p-5 shadow-sm">
      <h2 className="font-display text-base font-extrabold text-brand-navy">Acciones rápidas</h2>
      <ul className="mt-4 space-y-2">
        {actions.map((action) => (
          <li key={action.id}>
            <button
              type="button"
              onClick={() => onAction(action.id)}
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
  );
}
