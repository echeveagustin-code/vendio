export const contentKpis = [
  { id: "uploaded", icon: "📁", label: "Contenidos subidos", value: "128", change: "+18", positive: true },
  { id: "drafts", icon: "✏️", label: "Borradores", value: "14", change: "pendientes", positive: null },
  { id: "scheduled", icon: "📅", label: "Programados", value: "22", change: "esta semana", positive: null },
  { id: "published", icon: "✅", label: "Publicados este mes", value: "47", change: "+12%", positive: true },
];

export const contentStatusStyles = {
  Publicado: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Programado: "bg-sky-50 text-sky-700 ring-sky-200",
  Borrador: "bg-violet-50 text-violet-700 ring-violet-200",
  "En revisión": "bg-amber-50 text-amber-700 ring-amber-200",
  Falló: "bg-rose-50 text-rose-700 ring-rose-200",
};

export const recommendationStyles = {
  Repetir: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "Alto potencial": "bg-orange-50 text-orange-700 ring-orange-200",
  "Mejorar CTA": "bg-amber-50 text-amber-700 ring-amber-200",
  Optimizar: "bg-violet-50 text-violet-700 ring-violet-200",
  Borrador: "bg-slate-100 text-slate-600 ring-slate-200",
};

export const platformStyles = {
  Instagram: "bg-gradient-to-r from-[#f09433]/20 via-[#dc2743]/20 to-[#bc1888]/20 text-[#bc1888]",
  TikTok: "bg-slate-100 text-slate-800",
  Facebook: "bg-blue-50 text-blue-700",
  "YouTube Shorts": "bg-red-50 text-red-700",
};

export const contentTabs = [
  { id: "todos", label: "Todos" },
  { id: "borradores", label: "Borradores" },
  { id: "programados", label: "Programados" },
  { id: "publicados", label: "Publicados" },
  { id: "ganadores", label: "Ganadores" },
  { id: "revision", label: "Necesitan revisión" },
];

export const contents = [
  {
    id: 1,
    title: "Cómo usar este vestido de 3 formas distintas",
    platform: "Instagram",
    status: "Publicado",
    account: "@tienda.style",
    date: "12 Ene",
    scheduledDate: null,
    views: "48.2K",
    clicks: "3.1K",
    queries: "287",
    sales: "42",
    score: 94,
    recommendation: "Repetir",
    performance: "Ganador",
    gradient: "from-brand-navy to-[#2F5596]",
  },
  {
    id: 2,
    title: "5 outfits para la semana de trabajo",
    platform: "TikTok",
    status: "Publicado",
    account: "@tienda.style",
    date: "13 Ene",
    scheduledDate: null,
    views: "62.1K",
    clicks: "2.9K",
    queries: "156",
    sales: "28",
    score: 88,
    recommendation: "Alto potencial",
    performance: "Alto potencial",
    gradient: "from-[#0f3b8f] to-[#3d6bb3]",
  },
  {
    id: 3,
    title: "Unboxing colección verano 2025",
    platform: "Instagram",
    status: "Programado",
    account: "@outlet.style",
    date: null,
    scheduledDate: "16 Ene - 18:30",
    views: null,
    clicks: null,
    queries: null,
    sales: null,
    score: 71,
    recommendation: "Mejorar CTA",
    performance: "Optimizar",
    gradient: "from-brand-accent to-[#B29A8D]",
  },
  {
    id: 4,
    title: "Tutorial look casual para el finde",
    platform: "YouTube Shorts",
    status: "Borrador",
    account: "Vendio Shorts",
    date: "14 Ene",
    scheduledDate: null,
    views: null,
    clicks: null,
    queries: null,
    sales: null,
    score: null,
    recommendation: "Borrador",
    performance: "Todos",
    gradient: "from-[#6B7DB3] to-[#9BA8CC]",
  },
  {
    id: 5,
    title: "Oferta relámpago de camperas",
    platform: "Facebook",
    status: "En revisión",
    account: "Tienda Style",
    date: null,
    scheduledDate: "17 Ene - 12:00",
    views: null,
    clicks: null,
    queries: null,
    sales: null,
    score: 64,
    recommendation: "Optimizar",
    performance: "Optimizar",
    gradient: "from-[#3b5998] to-[#6b8cce]",
  },
  {
    id: 6,
    title: "Antes y después: cambio de look",
    platform: "TikTok",
    status: "Publicado",
    account: "@tienda.style",
    date: "10 Ene",
    scheduledDate: null,
    views: "21.8K",
    clicks: "980",
    queries: "74",
    sales: "9",
    score: 58,
    recommendation: "Mejorar CTA",
    performance: "Bajo rendimiento",
    gradient: "from-slate-700 to-slate-500",
  },
  {
    id: 7,
    title: "Reel producto estrella enero",
    platform: "Instagram",
    status: "Programado",
    account: "@tienda.style",
    date: null,
    scheduledDate: "18 Ene - 10:00",
    views: null,
    clicks: null,
    queries: null,
    sales: null,
    score: 82,
    recommendation: "Alto potencial",
    performance: "Alto potencial",
    gradient: "from-brand-navy to-[#0f3b8f]",
  },
  {
    id: 8,
    title: "Story encuesta nueva colección",
    platform: "Instagram",
    status: "Borrador",
    account: "@outlet.style",
    date: "15 Ene",
    scheduledDate: null,
    views: null,
    clicks: null,
    queries: null,
    sales: null,
    score: null,
    recommendation: "Borrador",
    performance: "Todos",
    gradient: "from-[#E1D8CC] to-[#B8B8AE]",
  },
];

export const recentDrafts = [
  { id: 1, title: "Video oferta 2x1", platform: "Instagram", lastEdit: "Hace 2 h" },
  { id: 2, title: "Reel lanzamiento verano", platform: "TikTok", lastEdit: "Ayer" },
  { id: 3, title: "Historia con encuesta", platform: "Instagram", lastEdit: "Hace 3 días" },
  { id: 4, title: "Tutorial producto estrella", platform: "YouTube Shorts", lastEdit: "Hace 5 días" },
];

export const quickRecommendations = [
  { id: 1, icon: "📋", text: "Tenés 4 borradores listos para programar." },
  { id: 2, icon: "🏆", text: "2 videos publicados superaron el score 85." },
  { id: 3, icon: "📈", text: "El formato tutorial está generando más ventas esta semana." },
  { id: 4, icon: "⚠️", text: "Hay 3 contenidos con buen alcance pero bajo CTA." },
];

export const quickActions = [
  { id: "upload", label: "Subir video", icon: "⬆️" },
  { id: "draft", label: "Crear borrador", icon: "✏️" },
  { id: "batch", label: "Programar lote", icon: "📅" },
  { id: "import", label: "Importar desde redes", icon: "🔗" },
  { id: "analyze", label: "Analizar contenido", icon: "📊" },
];

const TAB_FILTERS = {
  todos: () => true,
  borradores: (item) => item.status === "Borrador",
  programados: (item) => item.status === "Programado",
  publicados: (item) => item.status === "Publicado",
  ganadores: (item) => item.score !== null && item.score >= 85,
  revision: (item) => item.status === "En revisión" || item.recommendation === "Optimizar" || item.recommendation === "Mejorar CTA",
};

export function filterContents(items, { tab, search, status, platform, performance }) {
  const query = search.trim().toLowerCase();

  return items.filter((item) => {
    if (!TAB_FILTERS[tab]?.(item)) return false;
    if (status !== "Todos" && item.status !== status) return false;
    if (platform !== "Todas" && item.platform !== platform) return false;
    if (performance !== "Todos" && item.performance !== performance) return false;
    if (query && !item.title.toLowerCase().includes(query) && !item.account.toLowerCase().includes(query)) return false;
    return true;
  });
}
