import { useMemo, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import ContentHeader from "../components/content/ContentHeader";
import ContentKpiCard from "../components/content/ContentKpiCard";
import UploadDropzone from "../components/content/UploadDropzone";
import ContentFilters from "../components/content/ContentFilters";
import ContentLibraryCard from "../components/content/ContentLibraryCard";
import ContentPreviewModal from "../components/content/ContentPreviewModal";
import ContentTipsPanel from "../components/content/ContentTipsPanel";
import { contentGradients, contentKpis, initialContentLibrary } from "../data/contentMockData";

let nextId = 1000;

function parseMetric(value) {
  if (!value) return 0;
  const cleaned = value.toString().toUpperCase().replace(",", ".");
  const multiplier = cleaned.includes("K") ? 1000 : 1;
  return parseFloat(cleaned) * multiplier || 0;
}

export default function ContentPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [library, setLibrary] = useState(initialContentLibrary);
  const [previewItem, setPreviewItem] = useState(null);

  const [search, setSearch] = useState("");
  const [format, setFormat] = useState("Todos");
  const [account, setAccount] = useState("Todas las cuentas");
  const [status, setStatus] = useState("Todos");
  const [sort, setSort] = useState("Más recientes");

  function handleFilesSelected(files) {
    const uploaded = files.map((file, index) => ({
      id: nextId++,
      title: file.name.replace(/\.[^/.]+$/, ""),
      type: file.type.startsWith("video") ? "video" : "imagen",
      format: file.type.startsWith("video") ? "Reel" : "Post",
      account: "@tienda.style",
      duration: file.type.startsWith("video") ? "0:00" : null,
      uploadedAt: "Recién subido",
      status: "Sin usar",
      gradient: contentGradients[(library.length + index) % contentGradients.length],
      views: null,
      clicks: null,
      queries: null,
      sales: null,
    }));

    setLibrary((current) => [...uploaded, ...current]);
  }

  function handleDuplicate(item) {
    const copy = {
      ...item,
      id: nextId++,
      title: `${item.title} (copia)`,
      status: "Sin usar",
      uploadedAt: "Recién duplicado",
      views: null,
      clicks: null,
      queries: null,
      sales: null,
    };
    setLibrary((current) => [copy, ...current]);
  }

  function handleDelete(item) {
    setLibrary((current) => current.filter((entry) => entry.id !== item.id));
    setPreviewItem((current) => (current?.id === item.id ? null : current));
  }

  function handleSchedule() {
    window.location.hash = "#calendario";
  }

  const filteredLibrary = useMemo(() => {
    let items = library.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
      const matchesFormat = format === "Todos" || item.format === format;
      const matchesAccount = account === "Todas las cuentas" || item.account === account;
      const matchesStatus = status === "Todos" || item.status === status;
      return matchesSearch && matchesFormat && matchesAccount && matchesStatus;
    });

    if (sort === "Más vistas") {
      items = [...items].sort((a, b) => parseMetric(b.views) - parseMetric(a.views));
    } else if (sort === "Más ventas") {
      items = [...items].sort((a, b) => (parseFloat(b.sales) || 0) - (parseFloat(a.sales) || 0));
    }

    return items;
  }, [library, search, format, account, status, sort]);

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-brand-ink">
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} activePage="contenido" />

      <div className="lg:pl-[260px]">
        <main className="mx-auto max-w-[1440px] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          <ContentHeader
            onMenuToggle={() => setSidebarOpen(true)}
            onUploadClick={() => document.getElementById("content-upload-dropzone")?.scrollIntoView({ behavior: "smooth" })}
          />

          <section className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" aria-label="Indicadores de contenido">
            {contentKpis.map((kpi) => (
              <ContentKpiCard key={kpi.id} {...kpi} />
            ))}
          </section>

          <div id="content-upload-dropzone">
            <UploadDropzone onFilesSelected={handleFilesSelected} />
          </div>

          <div className="grid gap-6 xl:grid-cols-[1fr_minmax(280px,320px)]">
            <section className="min-w-0">
              <div className="mb-4">
                <h2 className="font-display text-xl font-extrabold text-brand-navy">Tu biblioteca</h2>
                <p className="mt-1 text-sm text-brand-ink/55">
                  {filteredLibrary.length} {filteredLibrary.length === 1 ? "pieza encontrada" : "piezas encontradas"}
                </p>
              </div>

              <ContentFilters
                search={search}
                onSearchChange={setSearch}
                format={format}
                onFormatChange={setFormat}
                account={account}
                onAccountChange={setAccount}
                status={status}
                onStatusChange={setStatus}
                sort={sort}
                onSortChange={setSort}
              />

              {filteredLibrary.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredLibrary.map((item) => (
                    <ContentLibraryCard
                      key={item.id}
                      item={item}
                      onPreview={setPreviewItem}
                      onSchedule={handleSchedule}
                      onDuplicate={handleDuplicate}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-brand-navy/15 bg-white p-10 text-center">
                  <p className="font-display text-base font-extrabold text-brand-navy">Sin resultados</p>
                  <p className="mt-1 text-sm text-brand-ink/55">Probá con otro filtro o subí contenido nuevo.</p>
                </div>
              )}
            </section>

            <ContentTipsPanel />
          </div>

          <footer className="mt-10 border-t border-brand-navy/8 pt-6 text-center">
            <a href="#inicio" className="text-sm font-bold text-brand-navy hover:underline">
              ← Volver a la landing
            </a>
          </footer>
        </main>
      </div>

      <ContentPreviewModal
        item={previewItem}
        onClose={() => setPreviewItem(null)}
        onSchedule={handleSchedule}
        onDuplicate={(item) => {
          handleDuplicate(item);
          setPreviewItem(null);
        }}
        onDelete={handleDelete}
      />
    </div>
  );
}
