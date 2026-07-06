import { upcomingTasks } from "../../data/dashboardMockData";

export default function UpcomingTasks() {
  return (
    <section className="rounded-2xl border border-brand-navy/6 bg-white p-5 shadow-sm">
      <h2 className="font-display text-base font-extrabold text-brand-navy">Próximas tareas</h2>
      <ul className="mt-4 space-y-2">
        {upcomingTasks.map((task) => (
          <li key={task.id}>
            <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-[#f6f7fb] px-3 py-3 transition hover:bg-[#eef0f8]">
              <input
                type="checkbox"
                defaultChecked={task.done}
                className="mt-0.5 h-4 w-4 rounded border-brand-navy/20 text-brand-navy focus:ring-brand-navy/20"
              />
              <span className="text-sm font-semibold leading-6 text-brand-ink/70">{task.text}</span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}
