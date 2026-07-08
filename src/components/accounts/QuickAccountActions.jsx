export default function QuickAccountActions({ onConnect, onSync }) {
  const actions = [
    { label: "Conectar Instagram", action: () => onConnect("Instagram") },
    { label: "Conectar TikTok", action: () => onConnect("TikTok") },
    { label: "Sincronizar todas", action: onSync },
    { label: "Revisar permisos", action: onSync },
    { label: "Ver metricas por cuenta", action: onSync },
  ];

  return (
    <section className="rounded-2xl border border-brand-navy/6 bg-white p-5 shadow-sm">
      <h2 className="font-display text-xl font-extrabold text-brand-navy">Acciones rapidas</h2>
      <div className="mt-4 grid gap-2">
        {actions.map((action) => (
          <button
            key={action.label}
            type="button"
            onClick={action.action}
            className="h-10 rounded-xl border border-brand-navy/10 px-4 text-left text-sm font-bold text-brand-navy transition hover:bg-[#f6f7fb]"
          >
            {action.label}
          </button>
        ))}
      </div>
    </section>
  );
}
