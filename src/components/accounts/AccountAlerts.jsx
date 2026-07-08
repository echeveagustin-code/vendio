import { alertStyles } from "../../data/accountsMockData";

export default function AccountAlerts({ alerts }) {
  return (
    <section className="rounded-2xl border border-brand-navy/6 bg-white p-5 shadow-sm">
      <h2 className="font-display text-xl font-extrabold text-brand-navy">Alertas</h2>
      <div className="mt-4 space-y-2">
        {alerts.map((alert) => (
          <div key={alert.id} className={`rounded-xl border px-3 py-2 text-sm font-bold ${alertStyles[alert.tone]}`}>
            {alert.text}
          </div>
        ))}
      </div>
    </section>
  );
}
