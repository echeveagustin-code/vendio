export const platforms = [
  {
    id: "instagram",
    name: "Instagram",
    icon: "IG",
    connectedCount: 2,
    description:
      "Conecta una o varias cuentas de Instagram para programar reels, medir publicaciones y detectar contenido ganador.",
    buttonLabel: "Conectar Instagram",
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: "TT",
    connectedCount: 2,
    description: "Conecta cuentas de TikTok para subir videos, analizar rendimiento y planificar contenido.",
    buttonLabel: "Conectar TikTok",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: "FB",
    connectedCount: 1,
    description: "Conecta paginas de Facebook para publicar contenido y medir consultas desde un solo panel.",
    buttonLabel: "Conectar Facebook",
  },
  {
    id: "youtube",
    name: "YouTube Shorts",
    icon: "YT",
    connectedCount: 1,
    description: "Conecta Shorts para revisar alcance, permisos y rendimiento de videos cortos.",
    buttonLabel: "Conectar YouTube",
  },
];

export const connectedAccounts = [
  {
    id: 1,
    platform: "Instagram",
    username: "@tienda.style",
    status: "Activa",
    followers: "48.2K",
    posts: 124,
    reach: "340K",
    lastSync: " 12 min",
    activeForPublishing: true,
    bestContent: "Reel: vestido de verano en 3 looks",
    issue: null,
  },
  {
    id: 2,
    platform: "TikTok",
    username: "@tienda.style",
    status: "Activa",
    followers: "62.8K",
    posts: 98,
    reach: "410K",
    lastSync: " 24 min",
    activeForPublishing: true,
    bestContent: "Video: antes y despues de outfit",
    issue: null,
  },
  {
    id: 3,
    platform: "Instagram",
    username: "@outlet.style",
    status: "Activa",
    followers: "12.4K",
    posts: 56,
    reach: "84K",
    lastSync: " 1 h",
    activeForPublishing: true,
    bestContent: "Carrusel: liquidacion de temporada",
    issue: null,
  },
  {
    id: 4,
    platform: "Facebook",
    username: "Tienda Style",
    status: "Pendiente",
    followers: "4.9K",
    posts: 34,
    reach: "22K",
    lastSync: "Pendiente",
    activeForPublishing: false,
    bestContent: "Post: guia de talles",
    issue: "Pendiente de aprobacion",
  },
  {
    id: 5,
    platform: "TikTok",
    username: "@outlet.style",
    status: "Token vencido",
    followers: "0",
    posts: 0,
    reach: "0",
    lastSync: " 7 dias",
    activeForPublishing: false,
    bestContent: "Sin datos recientes",
    issue: "Token vencido",
  },
  {
    id: 6,
    platform: "YouTube Shorts",
    username: "Vendio Shorts",
    status: "Error",
    followers: "0",
    posts: 30,
    reach: "28K",
    lastSync: "Error de permisos",
    activeForPublishing: false,
    bestContent: "Short: pack de productos destacados",
    issue: "Permisos incompletos",
  },
];

export const accountKpis = [
  { id: "connected", icon: "🔗", label: "Cuentas conectadas", value: "6", change: "" },
  { id: "active", icon: "✅", label: "Cuentas activas", value: "5", change: "" },
  { id: "views", icon: "👁️", label: "Visualizaciones totales", value: "128.4K", change: "+8%" },
  { id: "videos", icon: "🎥", label: "Videos publicados", value: "342", change: "30 dias" },
  { id: "reach", icon: "🌐", label: "Alcance mensual", value: "884K", change: "+18%" },
  { id: "sales", icon: "💰", label: "Ventas atribuidas", value: "284", change: "+9%" },
];

export const permissions = ["Publicar contenido", "Leer metricas", "Leer comentarios/consultas", "Administrar borradores"];

export const alerts = [
  { id: 1, tone: "error", text: "La cuenta @outlet.style de TikTok necesita reconexion." },
  { id: 2, tone: "warning", text: "YouTube Shorts tiene permisos incompletos." },
  { id: 3, tone: "info", text: "Facebook esta pendiente de aprobacion." },
  { id: 4, tone: "ok", text: "Instagram @tienda.style esta lista para publicar." },
];

export const recommendations = [
  "Conecta al menos una cuenta de TikTok adicional para comparar rendimiento.",
  "Instagram @tienda.style genera el 50% de las ventas atribuidas.",
  "La cuenta @outlet.style tiene buen alcance pero baja conversion.",
  "Activa metricas completas para detectar mejor que contenido repetir.",
];

export const statusStyles = {
  Activa: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Pendiente: "bg-amber-50 text-amber-700 ring-amber-200",
  Error: "bg-rose-50 text-rose-700 ring-rose-200",
  "Token vencido": "bg-orange-50 text-orange-700 ring-orange-200",
  Desactivada: "bg-slate-100 text-slate-600 ring-slate-200",
};

export const platformStyles = {
  Instagram: "bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-200",
  TikTok: "bg-slate-100 text-slate-800 ring-slate-300",
  Facebook: "bg-blue-50 text-blue-700 ring-blue-200",
  "YouTube Shorts": "bg-red-50 text-red-700 ring-red-200",
};

export const alertStyles = {
  error: "border-rose-100 bg-rose-50 text-rose-800",
  warning: "border-orange-100 bg-orange-50 text-orange-800",
  ok: "border-emerald-100 bg-emerald-50 text-emerald-800",
  info: "border-blue-100 bg-blue-50 text-blue-800",
};
