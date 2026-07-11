// Gráfico de barras simple hecho con divs (sin librerías de charting).
// Cada métrica se normaliza contra su propio máximo dentro de "data",
// así que agregar/editar puntos en analyticsMockData.js alcanza para
// que el gráfico se actualice solo.

export default function PerformanceChart({ data }) {
  const maxPublicaciones = Math.max(...data.map((point) => point.publicaciones), 1);
  const maxVisualizaciones = Math.max(...data.map((point) => point.visualizaciones), 1);

  const formatViews = (value) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1).replace(".0", "")}K`;
    }

    return value.toString();
  };

  return (
    <section className="rounded-2xl border border-brand-navy/6 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-base font-extrabold text-brand-navy">
            Publicaciones y visualizaciones por día
          </h2>
          <p className="mt-0.5 text-sm text-brand-ink/55">
            Últimos {data.length} días
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold text-brand-ink/60">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-navy" /> Publicaciones
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-accent" /> Visualizaciones
          </span>
        </div>
      </div>

      <div className="mt-6 flex h-48 items-end gap-3 sm:gap-4">
        {data.map((point) => (
          <div key={point.day} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-40 w-full items-end justify-center gap-1">
              <div
                className="w-full max-w-[14px] rounded-t-md bg-brand-navy/85"
                style={{ height: `${(point.publicaciones / maxPublicaciones) * 100}%` }}
                title={`${point.publicaciones} publicaciones`}
              />
              <div
                className="w-full max-w-[14px] rounded-t-md bg-brand-accent"
                style={{ height: `${(point.visualizaciones / maxVisualizaciones) * 100}%` }}
                title={`${formatViews(point.visualizaciones)} visualizaciones`}
              />
            </div>
            <span className="text-xs font-bold text-brand-ink/50">{point.day}</span>
          </div>
        ))}
      </div>
    </section>
  );
}