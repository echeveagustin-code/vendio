export default function AccountRecommendations({ recommendations }) {
  return (
    <section className="rounded-2xl border border-brand-navy/6 bg-white p-5 shadow-sm">
      <h2 className="font-display text-xl font-extrabold text-brand-navy">Recomendaciones</h2>
      <div className="mt-4 space-y-3">
        {recommendations.map((recommendation) => (
          <div key={recommendation} className="rounded-xl bg-[#f6f7fb] px-3 py-3 text-sm font-semibold leading-6 text-brand-ink/68">
            {recommendation}
          </div>
        ))}
      </div>
    </section>
  );
}
