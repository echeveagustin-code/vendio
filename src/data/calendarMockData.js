export const CALENDAR_YEAR = 2026;
export const CALENDAR_MONTH = 0; // Enero (0-indexed)
export const MOCK_TODAY = 6;

export const calendarKpis = [
  { id: "posts", icon: "📆", label: "Publicaciones este mes", value: "42", change: "+6", positive: true },
  { id: "drafts", icon: "✏️", label: "Borradores", value: "9", change: "pendientes", positive: null },
  { id: "notes", icon: "📝", label: "Notas activas", value: "14", change: "en curso", positive: null },
  { id: "empty", icon: "📭", label: "Días sin contenido", value: "6", change: "este mes", positive: null },
];

export const weekDayLabels = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

export const platformStyles = {
  Instagram: "bg-gradient-to-r from-[#f09433]/15 via-[#dc2743]/15 to-[#bc1888]/15 text-[#bc1888] ring-[#bc1888]/20",
  TikTok: "bg-slate-100 text-slate-800 ring-slate-200",
  Facebook: "bg-blue-50 text-blue-700 ring-blue-200",
  YouTube: "bg-red-50 text-red-700 ring-red-200",
};

export const statusStyles = {
  Programado: "bg-sky-50 text-sky-700",
  Borrador: "bg-slate-100 text-slate-600",
  Publicado: "bg-emerald-50 text-emerald-700",
  Revisión: "bg-amber-50 text-amber-700",
};

export const noteCategoryStyles = {
  Idea: "bg-violet-50 text-violet-700 ring-violet-200",
  Recordatorio: "bg-amber-50 text-amber-800 ring-amber-200",
  Campaña: "bg-sky-50 text-sky-700 ring-sky-200",
  Revisión: "bg-rose-50 text-rose-700 ring-rose-200",
};

export const scheduledPosts = [
  { id: 1, day: 3, time: "10:00", title: "Outfit oficina lunes", type: "Reel", platform: "Instagram", account: "@tienda.style", status: "Publicado" },
  { id: 2, day: 3, time: "19:30", title: "Tips de styling", type: "TikTok", platform: "TikTok", account: "@tienda.style", status: "Publicado" },
  { id: 3, day: 6, time: "09:00", title: "Look casual finde", type: "Reel", platform: "Instagram", account: "@tienda.style", status: "Programado" },
  { id: 4, day: 6, time: "14:00", title: "Behind the scenes", type: "Story", platform: "Instagram", account: "@outlet.style", status: "Revisión" },
  { id: 5, day: 8, time: "11:30", title: "Colección verano", type: "Post", platform: "Facebook", account: "Tienda Style", status: "Borrador" },
  { id: 6, day: 10, time: "18:00", title: "Tutorial vestido", type: "Reel", platform: "Instagram", account: "@tienda.style", status: "Publicado" },
  { id: 7, day: 10, time: "20:00", title: "Shorts outfit", type: "Shorts", platform: "YouTube", account: "Tienda Style", status: "Programado" },
  { id: 8, day: 12, time: "09:30", title: "Unboxing nueva colección", type: "Reel", platform: "Instagram", account: "@tienda.style", status: "Programado" },
  { id: 9, day: 12, time: "12:00", title: "Trend del momento", type: "TikTok", platform: "TikTok", account: "@tienda.style", status: "Borrador" },
  { id: 10, day: 14, time: "09:30", title: "Look de verano en 3 pasos", type: "Reel", platform: "Instagram", account: "@tienda.style", status: "Programado" },
  { id: 11, day: 14, time: "12:00", title: "5 outfits trabajo", type: "TikTok", platform: "TikTok", account: "@tienda.style", status: "Borrador" },
  { id: 12, day: 14, time: "18:45", title: "Oferta flash stories", type: "Story", platform: "Instagram", account: "@outlet.style", status: "Revisión" },
  { id: 13, day: 14, time: "20:00", title: "Shorts styling tips", type: "Shorts", platform: "YouTube", account: "Tienda Style", status: "Programado" },
  { id: 14, day: 17, time: "10:30", title: "Reel producto estrella", type: "Reel", platform: "Instagram", account: "@tienda.style", status: "Programado" },
  { id: 15, day: 17, time: "16:00", title: "Carrusel looks", type: "Post", platform: "Instagram", account: "@outlet.style", status: "Borrador" },
  { id: 16, day: 20, time: "09:30", title: "Lanzamiento colección", type: "Reel", platform: "Instagram", account: "@tienda.style", status: "Programado" },
  { id: 17, day: 20, time: "12:00", title: "TikTok challenge", type: "TikTok", platform: "TikTok", account: "@tienda.style", status: "Programado" },
  { id: 18, day: 20, time: "18:00", title: "Live shopping preview", type: "Story", platform: "Instagram", account: "@tienda.style", status: "Revisión" },
  { id: 19, day: 22, time: "11:00", title: "Antes y después", type: "Reel", platform: "Instagram", account: "@tienda.style", status: "Publicado" },
  { id: 20, day: 25, time: "15:00", title: "Promo fin de mes", type: "Post", platform: "Facebook", account: "Tienda Style", status: "Borrador" },
  { id: 21, day: 28, time: "10:00", title: "Recap del mes", type: "Reel", platform: "Instagram", account: "@tienda.style", status: "Programado" },
  { id: 22, day: 31, time: "20:00", title: "Despedida enero", type: "Story", platform: "Instagram", account: "@outlet.style", status: "Programado" },
];

export const calendarNotes = [
  { id: 1, day: 3, text: "Campaña verano", category: "Campaña" },
  { id: 2, day: 6, text: "Revisar CTA", category: "Revisión" },
  { id: 3, day: 8, text: "Subir contenido de oferta", category: "Recordatorio" },
  { id: 4, day: 10, text: "Repetir formato ganador", category: "Idea" },
  { id: 5, day: 12, text: "Lanzamiento producto", category: "Campaña" },
  { id: 6, day: 14, text: "Revisar CTA de videos de oferta", category: "Revisión" },
  { id: 7, day: 14, text: "Repetir formato de tutorial ganador", category: "Idea" },
  { id: 8, day: 17, text: "Coordinar con diseño", category: "Recordatorio" },
  { id: 9, day: 20, text: "Campaña verano — semana 3", category: "Campaña" },
  { id: 10, day: 22, text: "Analizar métricas del reel", category: "Revisión" },
  { id: 11, day: 25, text: "Idea: serie de tutoriales", category: "Idea" },
  { id: 12, day: 28, text: "Preparar contenido febrero", category: "Recordatorio" },
];

export function getMonthLabel(year, month) {
  const label = new Date(year, month, 1).toLocaleString("es-AR", { month: "long", year: "numeric" });
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export function getDayLabel(year, month, day) {
  const date = new Date(year, month, day);
  const weekday = date.toLocaleString("es-AR", { weekday: "long" });
  return `${weekday.charAt(0).toUpperCase() + weekday.slice(1)} ${day}`;
}

export function buildCalendarGrid(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();

  // Monday-based week: Mon=0 … Sun=6
  const startOffset = (firstDay.getDay() + 6) % 7;

  const cells = [];

  for (let i = 0; i < startOffset; i++) {
    const prevDate = new Date(year, month, -startOffset + i + 1);
    cells.push({
      day: prevDate.getDate(),
      month: prevDate.getMonth(),
      year: prevDate.getFullYear(),
      isCurrentMonth: false,
      isToday: false,
    });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({
      day,
      month,
      year,
      isCurrentMonth: true,
      isToday: day === MOCK_TODAY && month === CALENDAR_MONTH && year === CALENDAR_YEAR,
    });
  }

  while (cells.length % 7 !== 0) {
    const nextIndex = cells.length - startOffset - daysInMonth + 1;
    const nextDate = new Date(year, month + 1, nextIndex);
    cells.push({
      day: nextDate.getDate(),
      month: nextDate.getMonth(),
      year: nextDate.getFullYear(),
      isCurrentMonth: false,
      isToday: false,
    });
  }

  return cells;
}

export function filterPosts(posts, { platform, status }) {
  return posts.filter((post) => {
    if (platform !== "Todas" && post.platform !== platform) return false;
    if (status !== "Todos" && post.status !== status) return false;
    return true;
  });
}

export function getPostsForDay(posts, day) {
  return posts.filter((p) => p.day === day).sort((a, b) => a.time.localeCompare(b.time));
}

export function getNotesForDay(notes, day) {
  return notes.filter((n) => n.day === day);
}
