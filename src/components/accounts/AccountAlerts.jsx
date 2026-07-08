import { alertToneStyles } from "../../data/accountsMockData";

export default function AccountAlerts({ alerts }) {
  return (
    <section className="rounded-2xl border border-brand-navy/8 bg-white p-5 shadow-sm">
      <h2 className="font-display text-base font-extrabold text-brand-navy">Alertas</h2>
      <ul className="mt-4 space-y-2">
        {alerts.map((alert) => (
          <li key={alert.id} className={`rounded-xl border px-3 py-2.5 text-sm font-semibold ${alertToneStyles[alert.tone] ?? alertToneStyles.info}`}>
            {alert.text}
          </li>
        ))}
      </ul>
    </section>
  );
}
