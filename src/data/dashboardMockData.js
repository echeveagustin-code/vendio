export const sidebarMenu = [
  { id: "dashboard", label: "Dashboard", icon: "📊", active: true },
  { id: "calendario", label: "Calendario", icon: "📅" },
  { id: "contenido", label: "Contenido", icon: "🎬" },
  { id: "cuentas", label: "Cuentas conectadas", icon: "🔗" },
  { id: "analiticas", label: "Analíticas", icon: "📈" },
  { id: "recomendaciones", label: "Recomendaciones", icon: "💡" },
  { id: "configuracion", label: "Configuración", icon: "⚙️" },
];

export const kpis = [
  { id: "videos", icon: "🎥", label: "Videos analizados", value: "47", change: "+12%", positive: true },
  { id: "ventas", icon: "💰", label: "Ventas atribuidas", value: "284", change: "+8%", positive: true },
  { id: "score", icon: "⭐", label: "Score promedio", value: "76", change: "+5%", positive: true },
  { id: "ganador", icon: "🏆", label: "Contenido ganador", value: "12", change: "+3", positive: true },
  { id: "programadas", icon: "📆", label: "Publicaciones programadas", value: "18", change: "esta semana", positive: null },
  { id: "cuentas", icon: "👥", label: "Cuentas conectadas", value: "6", change: "activas", positive: null },
];

export const todaySummary = [
  { label: "Publicaciones programadas", value: "3", icon: "📌" },
  { label: "Cuentas activas", value: "2", icon: "✅" },
  { label: "Recomendaciones pendientes", value: "1", icon: "💡" },
];

export const connectedAccounts = [
  { platform: "Instagram", handle: "@tienda.style", status: "Activa", statusTone: "success" },
  { platform: "TikTok", handle: "@tienda.style", status: "Activa", statusTone: "success" },
  { platform: "Facebook", handle: "Tienda Style", status: "Pendiente", statusTone: "warning" },
  { platform: "Instagram", handle: "@outlet.style", status: "Activa", statusTone: "success" },
];

export const upcomingTasks = [
  { id: 1, text: "Revisar videos con bajo CTA", done: false },
  { id: 2, text: "Repetir contenido ganador", done: false },
  { id: 3, text: "Programar reels del viernes", done: false },
];

export const featuredContent = [
  {
    id: 1,
    title: "Cómo usar este vestido de 3 formas distintas",
    score: 94,
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
    title: "5 outfits para la semana de trabajo",
    score: 88,
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
    title: "Unboxing colección verano 2025",
    score: 71,
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
    title: "Tutorial look casual para el finde",
    score: 55,
    badge: "Optimizar",
    badgeTone: "optimize",
    gradient: "from-[#6B7DB3] to-[#9BA8CC]",
    views: "19.8K",
    clicks: "789",
    queries: "45",
    sales: "6",
  },
];

export const recommendations = [
  {
    id: 1,
    icon: "🔁",
    text: "Repetí el formato de tutoriales: generó 3.4x más consultas.",
    tone: "info",
  },
  {
    id: 2,
    icon: "⚡",
    text: "Los videos con CTA en los primeros 5 segundos convierten mejor.",
    tone: "tip",
  },
  {
    id: 3,
    icon: "📢",
    text: "Tenés 2 cuentas sin publicaciones programadas esta semana.",
    tone: "alert",
  },
];

const DAY_LABELS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

const CALENDAR_SCHEDULE = [
  { posts: 2, reel: 1, label: "2 posts" },
  { posts: 1, label: "1 reel" },
  { label: "Libre" },
  { posts: 3, label: "3 posts" },
  { posts: 1, reel: 1, label: "1 post" },
  { label: "Libre" },
  { posts: 2, label: "2 reels" },
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
