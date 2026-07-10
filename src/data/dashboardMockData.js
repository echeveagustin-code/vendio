export const sidebarMenu = [
  { id: "dashboard", label: "Dashboard", icon: "📊", href: "#dashboard" },
  { id: "calendario", label: "Calendario", icon: "📅", href: "#calendario" },
  { id: "contenido", label: "Contenido", icon: "🎬", href: "#contenido" },
  { id: "cuentas", label: "Cuentas conectadas", icon: "🔗", href: "#cuentas" },
  { id: "analiticas", label: "Analíticas", icon: "📈", href: "#dashboard" },
  { id: "configuracion", label: "Configuración", icon: "⚙️", href: "#dashboard" },
];

export const kpis = [
  { id: "publicaciones", icon: "MdPostAdd", label: "Publicaciones realizadas", value: "47", change: "+12%", positive: true },
  { id: "ventas", icon: "MdAdsClick", label: "Visitas atribuidas", value: "284", change: "+8%", positive: true },
  { id: "visualizaciones", icon: "LuView", label: "Visualizaciones totales", value: "128.4K", change: "+8%", positive: true },
  { id: "programadas", icon: "GrSchedulePlay", label: "Publicaciones programadas", value: "18", change: "", positive: null },
];

export const todaySummary = [
  { label: "Publicaciones programadas", value: "3", icon: "GrSchedulePlay" },
  { label: "Cuentas utilizadas", value: "2", icon: "MdSupervisorAccount" },
  { label: "Notificaciones por atender", value: "1", icon: "FiAlertTriangle" },
];

export const connectedAccounts = [
  { platform: "Instagram", handle: "@tienda.style", status: "Activa", statusTone: "success" },
  { platform: "TikTok", handle: "@tienda.style", status: "Activa", statusTone: "success" },
  { platform: "Instagram", handle: "@outlet.style2", status: "Pendiente", statusTone: "warning" },
];


export const featuredContent = [
  {
    id: 1,
    title: "Presentación producto",
    badge: "Repetir",
    badgeTone: "repeat",
    gradient: "from-brand-navy to-[#2F5596]",
    views: "48.2K",
    clicks: "3.1K",
    queries: "287",
    sales: "42",
  },
  {
    id: 2,
    title: "3 errores que frenan tus ventas online",
    badge: "Alto potencial",
    badgeTone: "potential",
    gradient: "from-[#0f3b8f] to-[#3d6bb3]",
    views: "62.1K",
    clicks: "2.9K",
    queries: "156",
    sales: "28",
  },
  {
    id: 3,
    title: "Por qué tantos clientes vuelven a comprar",
    badge: "Mejor CTA",
    badgeTone: "cta",
    gradient: "from-brand-accent to-[#B29A8D]",
    views: "31.5K",
    clicks: "1.2K",
    queries: "98",
    sales: "11",
  },
  {
    id: 4,
    title: "Lo que tenés que saber antes de comprar",
    badge: "Optimizar",
    badgeTone: "optimize",
    gradient: "from-[#6B7DB3] to-[#9BA8CC]",
    views: "19.8K",
    clicks: "789",
    queries: "45",
    sales: "6",
  },
];



const DAY_LABELS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

const CALENDAR_SCHEDULE = [
  { posts: 2, reel: 1, label: "2 posts" },
  { posts: 1, label: "1 post" },
  { label: "Libre" },
  { posts: 3, label: "3 posts" },
  { posts: 1, reel: 1, label: "2 posts" },
  { label: "Libre" },
  { posts: 2, reel: 1, label: "2 posts" },
  { posts: 1, label: "1 post" },
  { posts: 2, reel: 1, label: "2 posts" },
  { label: "Libre" },
];

export function getCalendarDays(count = 10) {
  const today = new Date();
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index);
    const schedule = CALENDAR_SCHEDULE[index] ?? { label: "Libre" };
    return {
      id: index,
      dayLabel: DAY_LABELS[date.getDay()],
      dayNumber: date.getDate(),
      month: date.toLocaleString("es-AR", { month: "short" }),
      isToday: index === 0,
      isSelected: index === 0,
      schedule,
    };
  });
}

export const badgeStyles = {
  repeat: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  potential: "bg-orange-50 text-orange-700 ring-orange-200",
  cta: "bg-rose-50 text-rose-700 ring-rose-200",
  optimize: "bg-violet-50 text-violet-700 ring-violet-200",
};

export const statusStyles = {
  success: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-700",
};
