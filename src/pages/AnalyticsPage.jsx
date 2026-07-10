import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import AnalyticsHeader from "../components/analytics/AnalyticsHeader";
import AnalyticsKpiCard from "../components/analytics/AnalyticsKpiCard";
import PerformanceChart from "../components/analytics/PerformanceChart";
import TopContentList from "../components/analytics/TopContentList";
import AccountBreakdown from "../components/analytics/AccountBreakdown";
import { accountBreakdown, analyticsKpis, performanceSeries, topContent } from "../data/analyticsMockData";

export default function AnalyticsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-brand-ink">
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} activePage="analiticas" />

      <div className="lg:pl-[260px]">
        <main className="mx-auto max-w-[1440px] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          <AnalyticsHeader onMenuToggle={() => setSidebarOpen(true)} />

          <section className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" aria-label="Indicadores de analíticas">
            {analyticsKpis.map((kpi) => (
              <AnalyticsKpiCard key={kpi.id} {...kpi} />
            ))}
          </section>

          <div className="mb-6">
            <PerformanceChart data={performanceSeries} />
          </div>

          <div className="grid gap-6 xl:grid-cols-[1fr_minmax(280px,320px)]">
            <TopContentList items={topContent} />
            <AccountBreakdown accounts={accountBreakdown} />
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
