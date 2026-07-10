// Todos los valores de esta página son mock. Para actualizar los números
// que se ven en pantalla, solo hay que editar los arrays de acá abajo.

export const analyticsKpis = [
  { id: "visitas", icon: "MdAdsClick", label: "Visitas atribuidas", value: "1.284", change: "+8%", positive: true },
  { id: "consultas", icon: "MdChatBubbleOutline", label: "Consultas generadas", value: "318", change: "+12%", positive: true },
  { id: "ventas", icon: "MdShoppingCart", label: "Ventas atribuidas", value: "87", change: "+5%", positive: true },
  { id: "conversion", icon: "MdTrendingUp", label: "Tasa de conversión", value: "6.8%", change: "+0.4pp", positive: true },
];

// Serie de los últimos 7 días. Cada punto tiene visitas y ventas.
// El gráfico normaliza cada métrica contra su propio máximo, así que
// se puede agregar/quitar días o cambiar valores sin tocar el componente.
export const performanceSeries = [
  { day: "Lun", visitas: 140, ventas: 8 },
  { day: "Mar", visitas: 165, ventas: 9 },
  { day: "Mié", visitas: 190, ventas: 11 },
  { day: "Jue", visitas: 210, ventas: 13 },
  { day: "Vie", visitas: 175, ventas: 10 },
  { day: "Sáb", visitas: 230, ventas: 15 },
  { day: "Dom", visitas: 260, ventas: 18 },
];

// Ranking de contenido por ventas atribuidas. Agregar/quitar items
// acá cambia directamente la lista que se muestra en pantalla.
export const topContent = [
  {
    id: 1,
    title: "Presentación producto",
    account: "@tienda.style",
    format: "Reel",
    views: "48.2K",
    clicks: "3.1K",
    sales: "42",
  },
  {
    id: 2,
    title: "3 errores que frenan tus ventas online",
    account: "@tienda.style",
    format: "Reel",
    views: "62.1K",
    clicks: "2.9K",
    sales: "28",
  },
  {
    id: 3,
    title: "Por qué tantos clientes vuelven a comprar",
    account: "@outlet.style2",
    format: "Post",
    views: "31.5K",
    clicks: "1.2K",
    sales: "11",
  },
  {
    id: 4,
    title: "Lo que tenés que saber antes de comprar",
    account: "@tienda.style",
    format: "Carrusel",
    views: "19.8K",
    clicks: "789",
    sales: "6",
  },
];

// Rendimiento por cuenta conectada. El ancho de la barra se calcula
// en el componente en base a "visitas", no hace falta mantener porcentajes.
export const accountBreakdown = [
  { id: 1, platform: "Instagram", handle: "@tienda.style", visitas: 620, ventas: 46 },
  { id: 2, platform: "TikTok", handle: "@tienda.style", visitas: 310, ventas: 24 },
  { id: 3, platform: "Instagram", handle: "@outlet.style2", visitas: 94, ventas: 7 },
];
