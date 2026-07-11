// Todos los valores de esta página son mock. Para actualizar los números
// que se ven en pantalla, solo hay que editar los arrays de acá abajo.

export const analyticsKpis = [
  { id: "ventas", icon: "MdShoppingCart", label: "Ventas atribuidas", value: "87", change: "+5%", positive: true },
  { id: "consultas", icon: "MdChatBubbleOutline", label: "Consultas generadas", value: "318", change: "+12%", positive: true },
  { id: "visualizaciones", icon: "LuView", label: "Visualizaciones", value: "1.284", change: "+8%", positive: true },
  { id: "conversion", icon: "MdTrendingUp", label: "Tasa de conversión", value: "6.8%", change: "+0.4pp", positive: true },
];

// Serie de los últimos 7 días. Cada punto tiene publicaciones y visualizaciones.
// El gráfico normaliza cada métrica contra su propio máximo, así que
// se puede agregar/quitar días o cambiar valores sin tocar el componente.
export const performanceSeries = [
  { day: "Lun", publicaciones: 2, visualizaciones: 3400 },
  { day: "Mar", publicaciones: 3, visualizaciones: 5800 },
  { day: "Mié", publicaciones: 1, visualizaciones: 4900 },
  { day: "Jue", publicaciones: 4, visualizaciones: 7200 },
  { day: "Vie", publicaciones: 2, visualizaciones: 6100 },
  { day: "Sáb", publicaciones: 5, visualizaciones: 12400 },
  { day: "Dom", publicaciones: 3, visualizaciones: 9800 },
];


// Ranking de contenido por interacciones. Agregar/quitar items
// acá cambia directamente la lista que se muestra en pantalla.
export const topContent = [
  {
    id: 1,
    title: "Presentación producto",
    account: "@tienda.style",
    format: "Reel",
    views: "48.2K",
    clicks: "3.1K",
    interactions: "1.842",
  },
  {
    id: 2,
    title: "3 errores que frenan tus ventas online",
    account: "@tienda.style",
    format: "Reel",
    views: "62.1K",
    clicks: "2.9K",
    interactions: "1.426",
  },
  {
    id: 3,
    title: "Por qué tantos clientes vuelven a comprar",
    account: "@outlet.style2",
    format: "Post",
    views: "31.5K",
    clicks: "1.2K",
    interactions: "684",
  },
  {
    id: 4,
    title: "Lo que tenés que saber antes de comprar",
    account: "@tienda.style",
    format: "Carrusel",
    views: "19.8K",
    clicks: "789",
    interactions: "312",
  },
];

// Rendimiento por cuenta conectada. El ancho de la barra se calcula
// en el componente en base a "visitas", no hace falta mantener porcentajes.
export const accountBreakdown = [
  { id: 1, platform: "Instagram", handle: "@tienda.style", visitas: 620, ventas: 46 },
  { id: 2, platform: "TikTok", handle: "@tienda.style", visitas: 310, ventas: 24 },
  { id: 3, platform: "Instagram", handle: "@outlet.style2", visitas: 94, ventas: 7 },
];
