import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard.jsx";
import CalendarPage from "./pages/CalendarPage.jsx";

const navLinks = [
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Beneficios", href: "#beneficios" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "Calendario", href: "#calendario" },
  { label: "MVP", href: "#mvp" },
  { label: "Contacto", href: "#contacto" },
];

const problemCards = [
  {
    title: "Muchos videos, pocos datos",
    text: "Publicás Reels, TikToks y Shorts, pero no queda claro cuáles empujan consultas, clics o ventas.",
  },
  {
    title: "Métricas confusas",
    text: "Views, likes y alcance ayudan, pero no siempre muestran qué pieza mueve el negocio.",
  },
  {
    title: "No sabés qué contenido repetir",
    text: "El contenido ganador se pierde entre publicaciones y terminás creando desde cero cada semana.",
  },
];

const benefits = [
  "Medí ventas por video",
  "Detectá contenido ganador",
  "Repetí lo que funciona",
  "Organizá tu biblioteca de videos",
  "Tomá decisiones con datos",
];

const steps = [
  {
    title: "Subí o conectá tus videos",
    text: "Agrupá tus videos cortos y asocialos a campañas, productos o lanzamientos.",
  },
  {
    title: "Analizá el rendimiento",
    text: "Mirá views, clics, consultas y ventas en un tablero pensado para acción.",
  },
  {
    title: "Repetí lo que vende",
    text: "Convertí tus mejores piezas en ideas reutilizables para vender más con el mismo material.",
  },
];

const videoRows = [
  {
    name: "Reel demo producto",
    channel: "Instagram",
    views: "18.4k",
    clicks: "642",
    sales: "37",
    score: "94",
    label: "Repetir",
    tone: "from-brand-navy to-[#2F5596]",
  },
  {
    name: "TikTok antes/después",
    channel: "TikTok",
    views: "12.8k",
    clicks: "418",
    sales: "22",
    score: "88",
    label: "Alto potencial",
    tone: "from-brand-accent to-[#B29A8D]",
  },
  {
    name: "Short tutorial rápido",
    channel: "YouTube",
    views: "7.9k",
    clicks: "163",
    sales: "8",
    score: "71",
    label: "Mejorar CTA",
    tone: "from-[#E1D8CC] to-[#B8B8AE]",
  },
];

function Wordmark({ light = false }) {
  return (
    <a href="#inicio" className="font-display text-[1.45rem] font-extrabold tracking-normal">
      <span className={light ? "text-brand-paper" : "text-brand-navy"}>Ven</span>
      <span className={light ? "text-white/72" : "text-brand-accent"}>dio.pro</span>
    </a>
  );
}

function CtaButton({ href = "#contacto", children, variant = "primary", className = "", ...props }) {
  const base =
    "inline-flex min-h-12 items-center justify-center rounded-md px-5 py-3 text-sm font-bold transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2";
  const styles =
    variant === "secondary"
      ? "border border-brand-navy/15 bg-white/55 text-brand-navy shadow-sm hover:-translate-y-0.5 hover:bg-white"
      : "bg-brand-navy text-white shadow-soft hover:-translate-y-0.5 hover:shadow-lift";

  return (
    <a href={href} className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </a>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-brand-navy/8 bg-brand-paper/88 backdrop-blur-xl">
      <nav className="relative mx-auto flex w-screen min-w-0 max-w-none items-center justify-between px-5 py-4 md:w-full md:max-w-7xl lg:px-8" aria-label="Principal">
        <Wordmark />

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-semibold text-brand-ink/70 transition hover:text-brand-navy">
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <CtaButton href="#contacto" className="min-h-10 px-4 py-2">
            Sumarme al MVP
          </CtaButton>
        </div>

        <button
          type="button"
          className="mobile-menu-button fixed right-5 top-4 min-h-10 items-center justify-center rounded-md border border-brand-navy/12 px-3.5 text-sm font-bold text-brand-navy"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Cerrar" : "Menú"}
        </button>
      </nav>

      {open && (
        <div className="border-t border-brand-navy/8 bg-brand-paper px-5 pb-5 md:hidden">
          <div className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-sm font-bold text-brand-ink/75"
              >
                {link.label}
              </a>
            ))}
            <CtaButton href="#contacto" className="mt-2 w-full" onClick={() => setOpen(false)}>
              Sumarme al MVP
            </CtaButton>
          </div>
        </div>
      )}
    </header>
  );
}

function DashboardMockup() {
  return (
    <div className="dashboard-shell w-full min-w-0 max-w-[330px] rounded-lg border border-white/70 bg-white p-3 shadow-lift sm:mx-auto sm:max-w-[620px]">
      <div className="overflow-hidden rounded-md border border-brand-navy/10 bg-brand-paper">
        <div className="flex items-center justify-between gap-3 bg-brand-navy px-4 py-3 text-white">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#F4B4A7]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#E7D4A8]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#AFD3B5]" />
          </div>
          <p className="truncate text-[10px] font-bold uppercase tracking-[0.14em] text-white/68 sm:text-xs sm:tracking-[0.18em]">Vendio Analytics</p>
        </div>

        <div className="space-y-4 p-4 sm:p-5">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["Views", "39.1k"],
              ["Clics", "1.2k"],
              ["Consultas", "186"],
              ["Ventas", "67"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-md border border-brand-navy/8 bg-white px-3 py-3">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-ink/42">{label}</p>
                <p className="mt-1 text-xl font-extrabold text-brand-navy">{value}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            {videoRows.map((row) => (
              <article key={row.name} className="grid gap-3 rounded-md border border-brand-navy/8 bg-white p-3 sm:grid-cols-[64px_1fr_auto] sm:items-center">
                <div className={`h-16 rounded-md bg-gradient-to-br ${row.tone}`} aria-hidden="true" />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-extrabold text-brand-ink">{row.name}</h3>
                    <span className="rounded bg-brand-paper px-2 py-1 text-[11px] font-bold text-brand-accent">{row.channel}</span>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                    <Metric label="Views" value={row.views} />
                    <Metric label="Clics" value={row.clicks} />
                    <Metric label="Ventas" value={row.sales} />
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 sm:block sm:text-right">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-ink/40">Score</p>
                    <p className="text-2xl font-extrabold text-brand-navy">{row.score}</p>
                  </div>
                  <span className="inline-flex rounded bg-brand-navy px-2.5 py-1.5 text-[11px] font-extrabold text-white">{row.label}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div>
      <p className="font-bold uppercase tracking-[0.1em] text-brand-ink/38">{label}</p>
      <p className="mt-0.5 font-extrabold text-brand-ink">{value}</p>
    </div>
  );
}

function SectionHeader({ eyebrow, title, text, light = false }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow && (
        <p className={`text-xs font-extrabold uppercase tracking-[0.22em] ${light ? "text-white/58" : "text-brand-accent"}`}>{eyebrow}</p>
      )}
      <h2 className={`mt-3 font-display text-3xl font-extrabold tracking-normal sm:text-4xl ${light ? "text-white" : "text-brand-navy"}`}>
        {title}
      </h2>
      {text && <p className={`mt-4 text-base leading-7 sm:text-lg ${light ? "text-white/68" : "text-brand-ink/58"}`}>{text}</p>}
    </div>
  );
}

function ProblemSection() {
  return (
    <section id="problema" className="bg-brand-navy py-20 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          light
          eyebrow="Problema"
          title="Dejá de publicar a ciegas"
          text="Vendio.pro ordena la relación entre contenido y ventas para que cada video deje una pista útil."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {problemCards.map((card) => (
            <article key={card.title} className="rounded-lg border border-white/10 bg-white/[0.06] p-6 shadow-accent">
              <div className="mb-6 h-10 w-10 rounded-md bg-brand-accent/90" aria-hidden="true" />
              <h3 className="font-display text-xl font-extrabold">{card.title}</h3>
              <p className="mt-3 leading-7 text-white/66">{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  return (
    <section id="beneficios" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="Solución"
          title="Todo lo que necesitás para repetir contenido ganador"
          text="Un tablero simple para entender qué videos atraen compradores y qué hacer después."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {benefits.map((benefit, index) => (
            <article key={benefit} className="group rounded-lg border border-brand-navy/8 bg-white p-5 shadow-soft transition duration-200 hover:-translate-y-1 hover:shadow-lift">
              <span className="text-sm font-extrabold text-brand-accent">0{index + 1}</span>
              <h3 className="mt-5 min-h-14 font-display text-lg font-extrabold leading-tight text-brand-navy">{benefit}</h3>
              <p className="mt-3 text-sm leading-6 text-brand-ink/56">
                Mirá la señal correcta y convertí cada aprendizaje en una próxima acción.
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section id="como-funciona" className="border-y border-brand-navy/8 bg-white/42 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader eyebrow="Cómo funciona" title="Tres pasos para vender más con tus videos" />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.title} className="relative overflow-hidden rounded-lg border border-brand-navy/8 bg-brand-paper p-7 shadow-soft">
              <span className="absolute -right-2 -top-8 font-display text-8xl font-extrabold text-brand-navy/[0.06]">0{index + 1}</span>
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-navy text-lg font-extrabold text-white">{index + 1}</div>
                <h3 className="mt-8 font-display text-xl font-extrabold text-brand-navy">{step.title}</h3>
                <p className="mt-4 leading-7 text-brand-ink/58">{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MvpSection() {
  return (
    <section id="mvp" className="py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand-accent">MVP privado</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-normal text-brand-navy sm:text-4xl">
            Estamos lanzando la primera versión para negocios que venden con videos cortos.
          </h2>
          <p className="mt-5 text-lg leading-8 text-brand-ink/60">
            Buscamos ecommerce, marcas personales, tiendas y emprendedores que ya publican en Instagram, TikTok,
            Reels o Shorts y quieren entender qué contenido convierte.
          </p>
          <CtaButton href="#contacto" className="mt-8">
            Quiero acceso temprano
          </CtaButton>
        </div>

        <div className="rounded-lg bg-brand-navy p-5 text-white shadow-lift sm:p-7">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Para quién", "Negocios que venden productos o servicios con video corto."],
              ["Qué validamos", "Métricas útiles, flujo de carga y reportes accionables."],
              ["Qué recibís", "Acceso temprano, feedback directo y prioridad en mejoras."],
              ["Sin compromiso", "Una primera versión simple para aprender rápido."],
            ].map(([title, text]) => (
              <article key={title} className="rounded-md border border-white/10 bg-white/[0.06] p-5">
                <h3 className="font-display text-lg font-extrabold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/66">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LeadForm() {
  const [status, setStatus] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    // Connect the real submission here:
    // - POST to a future /api/leads endpoint
    // - send to Formspree
    // - insert in Supabase
    // - redirect to a Google Forms endpoint
    setStatus("Gracias. Tu interés quedó registrado en esta demo; falta conectar el envío real.");
  }

  return (
    <section id="contacto" className="bg-brand-navy py-20 text-white sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-white/58">Acceso temprano</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">Sumate al MVP de Vendio.pro</h2>
          <p className="mt-5 text-lg leading-8 text-white/68">
            Contanos dónde vendés y qué red usás más. Te vamos a contactar cuando abramos cupos de la beta.
          </p>
          <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.06] p-5">
            <p className="font-display text-2xl font-extrabold">Videos que venden</p>
            <p className="mt-2 text-white/64">Menos intuición, más contenido con señales claras de venta.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-lg bg-brand-paper p-5 text-brand-ink shadow-lift sm:p-7">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nombre" name="name" placeholder="Tu nombre" autoComplete="name" />
            <Field label="Email" name="email" placeholder="tu@email.com" type="email" autoComplete="email" />
            <Field label="Negocio / marca" name="business" placeholder="Nombre de tu marca" className="sm:col-span-2" />
            <label className="sm:col-span-2">
              <span className="text-sm font-bold text-brand-ink/72">Red principal</span>
              <select
                name="network"
                className="mt-2 h-12 w-full rounded-md border border-brand-navy/12 bg-white px-4 text-sm font-semibold text-brand-ink outline-none transition focus:border-brand-navy focus:ring-4 focus:ring-brand-navy/10"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Elegí una opción
                </option>
                <option>Instagram</option>
                <option>TikTok</option>
                <option>YouTube Shorts</option>
                <option>Otra</option>
              </select>
            </label>
          </div>

          <button
            type="submit"
            className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-brand-navy px-5 py-3 text-sm font-extrabold text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
          >
            Sumarme al MVP
          </button>
          {status && <p className="mt-4 rounded-md bg-white px-4 py-3 text-sm font-bold text-brand-navy">{status}</p>}
        </form>
      </div>
    </section>
  );
}

function Field({ label, name, placeholder, type = "text", autoComplete, className = "" }) {
  return (
    <label className={className}>
      <span className="text-sm font-bold text-brand-ink/72">{label}</span>
      <input
        required
        type={type}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="mt-2 h-12 w-full rounded-md border border-brand-navy/12 bg-white px-4 text-sm font-semibold text-brand-ink outline-none transition placeholder:text-brand-ink/32 focus:border-brand-navy focus:ring-4 focus:ring-brand-navy/10"
      />
    </label>
  );
}

function Footer() {
  return (
    <footer className="bg-[#061631] py-10 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div>
          <Wordmark light />
          <p className="mt-2 text-sm font-semibold text-white/58">Videos que venden</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-white/58">
          <a href="mailto:hola@vendio.pro" className="hover:text-white">
            hola@vendio.pro
          </a>
          <a href="#como-funciona" className="hover:text-white">
            Cómo funciona
          </a>
          <a href="#beneficios" className="hover:text-white">
            Beneficios
          </a>
          <a href="#contacto" className="hover:text-white">
            Contacto
          </a>
        </div>
      </div>
    </footer>
  );
}

function getViewFromHash() {
  const hash = window.location.hash;
  if (hash === "#dashboard") return "dashboard";
  if (hash === "#calendario") return "calendario";
  return "landing";
}

export default function App() {
  const [view, setView] = useState(getViewFromHash);

  useEffect(() => {
    function syncView() {
      setView(getViewFromHash());
    }

    syncView();
    window.addEventListener("hashchange", syncView);
    return () => window.removeEventListener("hashchange", syncView);
  }, []);

  if (view === "dashboard") {
    return <Dashboard />;
  }

  if (view === "calendario") {
    return <CalendarPage />;
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-brand-paper text-brand-ink">
      <Navbar />
      <main>
        <section id="inicio" className="relative overflow-hidden pt-28 sm:pt-32">
          <div className="hero-grid mx-auto grid w-full min-w-0 max-w-7xl items-center gap-12 px-5 pb-20 pt-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:pb-24">
            <div className="w-full min-w-0 max-w-[calc(100vw-2.5rem)] lg:max-w-none">
              <div className="inline-flex items-center gap-3 rounded-md border border-brand-navy/10 bg-white/52 px-3 py-2 shadow-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-accent" />
                <span className="text-xs font-extrabold uppercase tracking-[0.17em] text-brand-ink/62">Videos que venden</span>
              </div>
              <h1 className="mt-7 max-w-4xl font-display text-[2.35rem] font-extrabold leading-[1.02] tracking-normal text-brand-navy sm:text-6xl sm:leading-[0.94] lg:text-7xl">
                <span className="block sm:inline">Vendé más </span>
                <span className="block sm:inline">con los videos </span>
                <span className="block sm:inline">que ya subís.</span>
              </h1>
              <p className="mt-6 max-w-[330px] text-lg leading-8 text-brand-ink/60 sm:max-w-2xl sm:text-xl">
              Gestioná varias cuentas desde un solo lugar, programá contenido y usá las métricas para entender qué videos generan ventas.
              </p>
              <div className="mt-8 flex max-w-[330px] flex-col gap-3 sm:max-w-none sm:flex-row">
                <CtaButton href="#contacto" className="w-full sm:w-auto">
                  Sumarme al MVP
                </CtaButton>
                <CtaButton href="#como-funciona" variant="secondary" className="w-full sm:w-auto">
                  Ver cómo funciona
                </CtaButton>
              </div>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <div className="flex -space-x-3" aria-hidden="true">
                  {["bg-brand-navy", "bg-brand-accent", "bg-[#B8B8AE]", "bg-white"].map((color, index) => (
                    <span key={color} className={`h-10 w-10 rounded-full border-2 border-brand-paper ${color}`}>
                      {index === 3 && <span className="flex h-full items-center justify-center text-xs font-extrabold text-brand-navy">+</span>}
                    </span>
                  ))}
                </div>
                <p className="max-w-xs text-sm font-semibold leading-6 text-brand-ink/58">
                  Para marcas, ecommerce y creadores que ya venden con contenido corto.
                </p>
              </div>
            </div>

            <DashboardMockup />
          </div>
        </section>
        <ProblemSection />
        <BenefitsSection />
        <HowItWorksSection />
        <MvpSection />
        <LeadForm />
      </main>
      <Footer />
    </div>
  );
}
