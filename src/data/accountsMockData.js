export const accountsKpis = [
  { id: "connected", icon: "🔗", label: "Cuentas conectadas", value: "6", change: "+1", positive: true },
  { id: "active", icon: "✅", label: "Cuentas activas", value: "5", change: "publicando", positive: null },
  { id: "followers", icon: "👥", label: "Seguidores totales", value: "128.4K", change: "+12%", positive: true },
  { id: "publicaciones", icon: "📝", label: "Publicaciones realizadas", value: "342", change: "total", positive: null },
  { id: "reach", icon: "📡", label: "Alcance mensual", value: "884K", change: "+8%", positive: true },
  { id: "sales", icon: "💰", label: "Ventas atribuidas", value: "284", change: "+15%", positive: true },
];

export const accountStatusStyles = {
  Activa: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Pendiente: "bg-amber-50 text-amber-700 ring-amber-200",
  Error: "bg-rose-50 text-rose-700 ring-rose-200",
  "Token vencido": "bg-orange-50 text-orange-700 ring-orange-200",
  Desactivada: "bg-slate-100 text-slate-600 ring-slate-200",
};

export const platformBadgeStyles = {
  Instagram: "bg-gradient-to-r from-[#f09433]/20 via-[#dc2743]/20 to-[#bc1888]/20 text-[#bc1888]",
  TikTok: "bg-slate-100 text-slate-800",
  Facebook: "bg-blue-50 text-blue-700",
  "YouTube Shorts": "bg-red-50 text-red-700",
};

export const platformIcons = {
  Instagram: "📸",
  TikTok: "🎵",
  Facebook: "👤",
  "YouTube Shorts": "▶️",
};

export const alertToneStyles = {
  error: "border-rose-200/70 bg-rose-50/80 text-rose-800",
  warning: "border-amber-200/70 bg-amber-50/80 text-amber-900",
  ok: "border-emerald-200/70 bg-emerald-50/80 text-emerald-800",
  info: "border-sky-200/70 bg-sky-50/80 text-sky-800",
};

export const connectPlatforms = [
  {
    id: "instagram",
    platform: "Instagram",
    description: "Conectá una o varias cuentas de Instagram para programar reels, medir publicaciones y detectar contenido ganador.",
    connectedCount: 2,
    cta: "Conectar Instagram",
  },
  {
    id: "tiktok",
    platform: "TikTok",
    description: "Conectá cuentas de TikTok para subir videos, analizar rendimiento y planificar contenido.",
    connectedCount: 2,
    cta: "Conectar TikTok",
  },
  {
    id: "facebook",
    platform: "Facebook",
    description: "Conectá páginas de Facebook para publicar ofertas, medir alcance y atribuir ventas.",
    connectedCount: 1,
    cta: "Conectar Facebook",
  },
  {
    id: "youtube",
    platform: "YouTube Shorts",
    description: "Conectá tu canal para programar Shorts, analizar views y repetir formatos ganadores.",
    connectedCount: 1,
    cta: "Conectar YouTube Shorts",
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
    sales: 142,
    lastSync: "Hace 12 min",
    activeForPublishing: true,
    bestContent: "Cómo usar este vestido de 3 formas distintas",
    permissions: ["Publicar contenido", "Leer métricas", "Leer comentarios/consultas", "Administrar borradores"],
  },
  {
    id: 2,
    platform: "TikTok",
    username: "@tienda.style",
    status: "Activa",
    followers: "62.8K",
    posts: 98,
    reach: "410K",
    sales: 96,
    lastSync: "Hace 24 min",
    activeForPublishing: true,
    bestContent: "5 outfits para la semana de trabajo",
    permissions: ["Publicar contenido", "Leer métricas", "Leer comentarios/consultas", "Administrar borradores"],
  },
  {
    id: 3,
    platform: "Instagram",
    username: "@outlet.style",
    status: "Activa",
    followers: "12.4K",
    posts: 56,
    reach: "84K",
    sales: 31,
    lastSync: "Hace 1 h",
    activeForPublishing: true,
    bestContent: "Oferta relámpago de camperas",
    permissions: ["Publicar contenido", "Leer métricas", "Leer comentarios/consultas"],
  },
  {
    id: 4,
    platform: "Facebook",
    username: "Tienda Style",
    status: "Pendiente",
    followers: "4.9K",
    posts: 34,
    reach: "22K",
    sales: 8,
    lastSync: "Pendiente",
    activeForPublishing: false,
    bestContent: "—",
    permissions: ["Leer métricas"],
  },
  {
    id: 5,
    platform: "TikTok",
    username: "@outlet.style",
    status: "Token vencido",
    followers: "0",
    posts: 0,
    reach: "0",
    sales: 0,
    lastSync: "Hace 7 días",
    activeForPublishing: false,
    bestContent: "—",
    permissions: [],
    reconnectReason: "Token vencido",
  },
  {
    id: 6,
    platform: "YouTube Shorts",
    username: "Vendio Shorts",
    status: "Error",
    followers: "0",
    posts: 30,
    reach: "28K",
    sales: 7,
    lastSync: "Error de permisos",
    activeForPublishing: false,
    bestContent: "Tutorial look casual para el finde",
    permissions: ["Leer métricas"],
    reconnectReason: "Permisos incompletos",
  },
];

export const accountAlerts = [
  { id: 1, tone: "warning", text: "La cuenta @outlet.style de TikTok necesita reconexión." },
  { id: 2, tone: "error", text: "YouTube Shorts tiene permisos incompletos." },
  { id: 3, tone: "warning", text: "Facebook está pendiente de aprobación." },
  { id: 4, tone: "ok", text: "Instagram @tienda.style está lista para publicar." },
];

export const accountRecommendations = [
  { id: 1, icon: "📊", text: "Conectá al menos una cuenta de TikTok adicional para comparar rendimiento." },
  { id: 2, icon: "🏆", text: "Instagram @tienda.style genera el 50% de las ventas atribuidas." },
  { id: 3, icon: "📈", text: "La cuenta @outlet.style tiene buen alcance pero baja conversión." },
  { id: 4, icon: "💡", text: "Activá métricas completas para detectar mejor qué contenido repetir." },
];

export const quickAccountActions = [
  { id: "instagram", label: "Conectar Instagram", icon: "📸" },
  { id: "tiktok", label: "Conectar TikTok", icon: "🎵" },
  { id: "sync-all", label: "Sincronizar todas", icon: "🔄" },
  { id: "permissions", label: "Revisar permisos", icon: "🔐" },
  { id: "metrics", label: "Ver métricas por cuenta", icon: "📈" },
];

export const defaultPermissions = [
  "Publicar contenido",
  "Programar publicaciones",
  "Leer métricas",
  "Leer comentarios y consultas",
];

export function filterAccounts(accounts, platform) {
  if (platform === "Todas las plataformas") return accounts;
  return accounts.filter((a) => a.platform === platform);
}

export function needsReconnect(status) {
  return status === "Error" || status === "Token vencido";
}
