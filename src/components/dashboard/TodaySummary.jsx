import { todaySummary } from "../../data/dashboardMockData";
import { GrSchedulePlay } from "react-icons/gr";
import { MdSupervisorAccount } from "react-icons/md";
import { FiAlertTriangle } from "react-icons/fi";

const TodayIconMap = {
  GrSchedulePlay,
  MdSupervisorAccount,
  FiAlertTriangle,
};

export default function TodaySummary() {
  return (
    <section className="rounded-2xl border border-brand-navy/6 bg-white p-5 shadow-sm">
      <h2 className="font-display text-base font-extrabold text-brand-navy">
        Resumen de hoy
      </h2>

      <ul className="mt-4 space-y-3">
        {todaySummary.map((item) => {
          const IconComponent = TodayIconMap[item.icon];

          return (
            <li
              key={item.label}
              className="flex items-center justify-between gap-3 rounded-xl bg-[#f6f7fb] px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span className="text-base text-brand-navy" aria-hidden="true">
                  {IconComponent ? (
                    <IconComponent className="text-xl" />
                  ) : (
                    item.icon
                  )}
                </span>

                <span className="text-sm font-semibold text-brand-ink/65">
                  {item.label}
                </span>
              </div>

              <span className="font-display text-xl font-extrabold text-brand-navy">
                {item.value}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}