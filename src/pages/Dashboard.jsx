import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import CalendarStrip from "../components/dashboard/CalendarStrip";
import KpiCard from "../components/dashboard/KpiCard";
import TodaySummary from "../components/dashboard/TodaySummary";
import ConnectedAccounts from "../components/dashboard/ConnectedAccounts";
import ContentCard from "../components/dashboard/ContentCard";
import { kpis, featuredContent } from "../data/dashboardMockData";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-brand-ink">
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} activePage="dashboard" />

      <div className="lg:pl-[260px]">
        <main className="mx-auto max-w-[1440px] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          <DashboardHeader onMenuToggle={() => setSidebarOpen(true)} />

          <CalendarStrip />

          <section className="mb-6" aria-label="Indicadores principales">
            <div className="mb-4">
              <h2 className="font-display text-xl font-extrabold text-brand-navy">Tus estadísticas</h2>
              <p className="mt-1 text-sm text-brand-ink/55">En estos 30 días</p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-6">
              {kpis.map((kpi) => (
                <KpiCard key={kpi.id} {...kpi} />
              ))}
            </div>
          </section>

          <div className="grid gap-6 xl:grid-cols-[minmax(280px,320px)_1fr]">
            <aside className="space-y-5">
              <TodaySummary />
              <ConnectedAccounts />
            </aside>

            <div className="space-y-6">
              <section>
                <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <h2 className="font-display text-xl font-extrabold text-brand-navy">Contenido destacado</h2>
                    <p className="mt-1 text-sm text-brand-ink/55">Tus mejores piezas según score, consultas y ventas.</p>
                  </div>
                  <a href="#contenido" className="text-sm font-bold text-brand-navy hover:underline">
                    Ver todo el contenido
                  </a>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {featuredContent.map((item) => (
                    <ContentCard key={item.id} {...item} />
                  ))}
                </div>
              </section>


            </div>
          </div>

          <footer className="mt-10 border-t border-brand-navy/8 pt-6 text-center">
            <a href="#inicio" className="text-sm font-bold text-brand-navy hover:underline">
              ← Volver a la landing
            </a>
          </footer>
        </main>
      </div>
    </div>
  );
}
