// Gráfico de barras simple hecho con divs (sin librerías de charting).
// Cada métrica se normaliza contra su propio máximo dentro de "data",
// así que agregar/editar puntos en analyticsMockData.js alcanza para
// que el gráfico se actualice solo.

export default function PerformanceChart({ data }) {
  const maxVisitas = Math.max(...data.map((point) => point.visitas), 1);
  const maxVentas = Math.max(...data.map((point) => point.ventas), 1);

  return (
    <section className="rounded-2xl border border-brand-navy/6 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-base font-extrabold text-brand-navy">Visitas y ventas por día</h2>
          <p className="mt-0.5 text-sm text-brand-ink/55">Últimos {data.length} días</p>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold text-brand-ink/60">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-navy" /> Visitas
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-accent" /> Ventas
          </span>
        </div>
      </div>

      <div className="mt-6 flex h-48 items-end gap-3 sm:gap-4">
        {data.map((point) => (
          <div key={point.day} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-40 w-full items-end justify-center gap-1">
              <div
                className="w-full max-w-[14px] rounded-t-md bg-brand-navy/85"
                style={{ height: `${(point.visitas / maxVisitas) * 100}%` }}
                title={`${point.visitas} visitas`}
              />
              <div
                className="w-full max-w-[14px] rounded-t-md bg-brand-accent"
                style={{ height: `${(point.ventas / maxVentas) * 100}%` }}
                title={`${point.ventas} ventas`}
              />
            </div>
            <span className="text-xs font-bold text-brand-ink/50">{point.day}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
