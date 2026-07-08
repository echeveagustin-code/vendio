export default function AccountRecommendations({ recommendations }) {
  return (
    <section className="rounded-2xl border border-brand-navy/8 bg-white p-5 shadow-sm">
      <h2 className="font-display text-base font-extrabold text-brand-navy">Recomendaciones</h2>
      <ul className="mt-4 space-y-3">
        {recommendations.map((item) => (
          <li key={item.id} className="flex gap-3 rounded-xl bg-[#f6f7fb] p-3">
            <span className="text-lg" aria-hidden="true">
              {item.icon}
            </span>
            <p className="text-sm font-semibold leading-6 text-brand-ink/70">{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
