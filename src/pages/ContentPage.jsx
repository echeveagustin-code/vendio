import { useMemo, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import ContentHeader from "../components/content/ContentHeader";
import ContentKpiCard from "../components/content/ContentKpiCard";
import UploadContentCard from "../components/content/UploadContentCard";
import ContentFilters from "../components/content/ContentFilters";
import ContentTabs from "../components/content/ContentTabs";
import ContentGrid from "../components/content/ContentGrid";
import DraftsPanel from "../components/content/DraftsPanel";
import QuickActionsPanel from "../components/content/QuickActionsPanel";
import UploadContentForm from "../components/content/UploadContentForm";
import CreateDraftForm from "../components/content/CreateDraftForm";
import {
  contentKpis,
  contents as initialContents,
  recentDrafts as initialDrafts,
  filterContents,
} from "../data/contentMockData";

const GRADIENTS = [
  "from-brand-navy to-[#2F5596]",
  "from-[#0f3b8f] to-[#3d6bb3]",
  "from-brand-accent to-[#B29A8D]",
  "from-[#6B7DB3] to-[#9BA8CC]",
];

export default function ContentPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [items, setItems] = useState(initialContents);
  const [drafts, setDrafts] = useState(initialDrafts);
  const [activeTab, setActiveTab] = useState("todos");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [platformFilter, setPlatformFilter] = useState("Todas");
  const [performanceFilter, setPerformanceFilter] = useState("Todos");
  const [viewMode, setViewMode] = useState("Grid");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [draftOpen, setDraftOpen] = useState(false);

  const filteredItems = useMemo(
    () =>
      filterContents(items, {
        tab: activeTab,
        search,
        status: statusFilter,
        platform: platformFilter,
        performance: performanceFilter,
      }),
    [items, activeTab, search, statusFilter, platformFilter, performanceFilter],
  );

  function handleSaveContent(data) {
    const status = data.status;
    setItems((prev) => [
      {
        id: Date.now(),
        title: data.title,
        platform: data.platform,
        status,
        account: data.account,
        date: data.date || "Hoy",
        scheduledDate: status === "Programado" && data.date ? `${data.date} - ${data.time || "12:00"}` : null,
        views: null,
        clicks: null,
        queries: null,
        sales: null,
        score: null,
        recommendation: status === "Borrador" ? "Borrador" : "Optimizar",
        performance: "Todos",
        gradient: GRADIENTS[prev.length % GRADIENTS.length],
      },
      ...prev,
    ]);
    setUploadOpen(false);
  }

  function handleSaveDraft(data) {
    setDrafts((prev) => [
      { id: Date.now(), title: data.title, platform: data.platform, lastEdit: "Ahora" },
      ...prev,
    ]);
    setItems((prev) => [
      {
        id: Date.now() + 1,
        title: data.title,
        platform: data.platform,
        status: "Borrador",
        account: data.account,
        date: "Hoy",
        scheduledDate: null,
        views: null,
        clicks: null,
        queries: null,
        sales: null,
        score: null,
        recommendation: "Borrador",
        performance: "Todos",
        gradient: GRADIENTS[prev.length % GRADIENTS.length],
      },
      ...prev,
    ]);
    setDraftOpen(false);
  }

  return (
    <div className="min-h-screen bg-[#f7f8fb] text-brand-ink">
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} activePage="contenido" />

      <div className="lg:pl-[260px]">
        <main className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          <ContentHeader
            onMenuToggle={() => setSidebarOpen(true)}
            onUpload={() => setUploadOpen(true)}
            onCreateDraft={() => setDraftOpen(true)}
          />

          <section className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4" aria-label="Resumen de contenido">
            {contentKpis.map((kpi) => (
              <ContentKpiCard key={kpi.id} {...kpi} />
            ))}
          </section>

          <div className="mb-5">
            <UploadContentCard onUpload={() => setUploadOpen(true)} onCreateDraft={() => setDraftOpen(true)} />
          </div>

          <div className="mb-4 space-y-4">
            <ContentFilters
              search={search}
              status={statusFilter}
              platform={platformFilter}
              performance={performanceFilter}
              viewMode={viewMode}
              onSearchChange={setSearch}
              onStatusChange={setStatusFilter}
              onPlatformChange={setPlatformFilter}
              onPerformanceChange={setPerformanceFilter}
              onViewModeChange={setViewMode}
            />
            <ContentTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          <div className="grid gap-6 xl:grid-cols-[1fr_minmax(280px,320px)]">
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-display text-lg font-extrabold text-brand-navy">
                  Biblioteca de contenidos
                  <span className="ml-2 text-sm font-semibold text-brand-ink/45">({filteredItems.length})</span>
                </h2>
              </div>
              <ContentGrid items={filteredItems} viewMode={viewMode} onUpload={() => setUploadOpen(true)} />
            </div>

            <aside className="space-y-5">
              <DraftsPanel drafts={drafts} />
              <QuickActionsPanel
                onUpload={() => setUploadOpen(true)}
                onCreateDraft={() => setDraftOpen(true)}
              />
            </aside>
          </div>

          <footer className="mt-10 border-t border-brand-navy/8 pt-6 text-center">
            <a href="#inicio" className="text-sm font-bold text-brand-navy hover:underline">
              ← Volver a la landing
            </a>
          </footer>
        </main>
      </div>

      <UploadContentForm open={uploadOpen} onClose={() => setUploadOpen(false)} onSave={handleSaveContent} />
      <CreateDraftForm open={draftOpen} onClose={() => setDraftOpen(false)} onSave={handleSaveDraft} />
    </div>
  );
}
