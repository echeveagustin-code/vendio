import { useEffect, useState, useRef } from "react";
import { FaTiktok, FaInstagram, FaFacebook } from "react-icons/fa";
import Dashboard from "./pages/Dashboard.jsx";
import CalendarPage from "./pages/CalendarPage.jsx";
import AccountsPage from "./pages/AccountsPage.jsx";
import ContentPage from "./pages/ContentPage.jsx";
import AnalyticsPage from "./pages/AnalyticsPage.jsx";

const navLinks = [
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "FAQ", href: "#faq" },
];

const problemCards = [
  {
    title: "No sabés qué video trajo consultas",
    text: "Los comentarios, mensajes y pedidos quedan repartidos entre redes, cuentas y publicaciones.",
  },
  {
    title: "No queda claro qué generó ventas",
    text: "Views y likes ayudan, pero no siempre muestran qué contenido movió el negocio.",
  },
  {
    title: "Manejás varias cuentas a mano",
    text: "Instagram, TikTok, Facebook y otras redes terminan en una rutina difícil de ordenar.",
  },
  {
    title: "El contenido ganador se pierde",
    text: "Publicás, seguís con lo próximo y dejás de repetir formatos que ya demostraron potencial.",
  },
  {
    title: "No hay calendario de ventas",
    text: "El contenido se sube por urgencia, sin una vista clara de campañas, fechas y objetivos.",
  },
  {
    title: "Publicás más, pero no mejor",
    text: "Vendio busca cambiar el foco: menos intuición, más señales simples para decidir.",
  },
];

const benefits = [
  {
    title: "Conectá varias cuentas",
    text: "Reuní tus redes y marcas en un tablero pensado para negocios que venden por contenido.",
  },
  {
    title: "Planificá publicaciones",
    text: "Armá campañas, ideas y fechas sin depender de notas sueltas o recordatorios dispersos.",
  },
  {
    title: "Programá contenido",
    text: "Prepará la semana de contenido con una vista clara de productos, formatos y objetivos.",
  },
  {
    title: "Analizá métricas útiles",
    text: "Mirá consultas, interacción, clics y señales de venta sin perderte en reportes complejos.",
  },
  {
    title: "Detectá contenido ganador",
    text: "Encontrá qué videos, publicaciones o formatos tienen más chances de traer clientes.",
  },
  {
    title: "Repetí formatos que venden",
    text: "Convertí lo que funcionó en una próxima acción, sin empezar cada semana desde cero.",
  },
];

const steps = [
  {
    title: "Conectás tus redes",
    text: "Sumás tus cuentas de Instagram, TikTok, Facebook u otras redes para ordenarlas en Vendio.",
  },
  {
    title: "Planificás y subís contenido",
    text: "Armás tu calendario, preparás publicaciones y organizás ideas por campaña, producto o marca.",
  },
  {
    title: "Vendio muestra qué funciona",
    text: "Ves qué publicaciones generan más consultas, interacción y ventas para repetir lo que rinde.",
  },
];

const faqItems = [
  {
    question: "¿Vendio publica automáticamente?",
    answer:
      "Sí. Vendio busca simplificar la publicación automática en varias redes, para que puedas planificar, programar y reutilizar contenido desde un solo lugar",
  },
  {
    question: "¿Puedo conectar varias cuentas?",
    answer: "Sí. Vendio está pensado para personas y negocios que manejan más de una cuenta, marca o canal social.",
  },
  {
    question: "¿Sirve para Instagram y TikTok?",
    answer:
      "Ese es el foco inicial: redes donde el contenido corto impulsa consultas, interacción y ventas. También evaluamos otras integraciones según la demanda.",
  },
  {
    question: "¿Está pensado para agencias?",
    answer:
      "No principalmente. Vendio prioriza emprendedores, tiendas, creadores y negocios que venden por redes y necesitan algo simple, no un sistema pesado de agencia.",
  },
  {
    question: "¿Cuándo va a estar disponible?",
    answer:
      "Estamos preparando los primeros accesos. Si te sumás a la lista, te avisamos cuando abramos cupos para probar la beta.",
  },
  {
    question: "¿Tengo que pagar para sumarme a la lista?",
    answer: "No. Sumarte a la lista de espera es gratis y no implica ningún compromiso de compra.",
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
  const socialLinks = [
    { name: "Instagram", containerClass: "bg-transparent", icon: <FaInstagram size={20} /> },
    { name: "TikTok", containerClass: "bg-transparent", icon: <FaTiktok size={20} /> },
    { name: "Facebook", containerClass: "bg-transparent", icon: <FaFacebook size={20} /> },
  ];

  return (
    <a href="#inicio" className="font-sora text-[1.45rem] font-extrabold tracking-normal">
      <span className={light ? "text-brand-paper" : "text-brand-navy"}>Ven</span>
      <span className={light ? "text-white/72" : "text-[#FFF7E6] text-shadow-logo"}>dio.pro</span>
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
  const [scrolled, setScrolled] = useState(false);
  const [onDarkSection, setOnDarkSection] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const darkSection = document.querySelector("#problema");
    if (!darkSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setOnDarkSection(entry.isIntersecting);
      },
      {
        rootMargin: "-80px 0px 0px 0px",
        threshold: 0,
      }
    );

    observer.observe(darkSection);
    return () => observer.disconnect();
  }, []);

  return (
    <header className={`fixed left-0 right-0 top-0 z-50 border-b backdrop-blur-xl transition-all duration-300 ${scrolled ? "translate-y-0" : "-translate-y-full"} ${onDarkSection ? "border-white/10 bg-brand-navy/88" : "border-brand-navy/8 bg-brand-paper/88"}`}>
      <nav className="relative mx-auto flex w-screen min-w-0 max-w-none items-center justify-between px-5 py-4 md:w-full md:max-w-7xl lg:px-8" aria-label="Principal">
        <Wordmark light={onDarkSection} />

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className={`text-sm font-semibold transition ${onDarkSection ? "text-white/70 hover:text-white" : "text-brand-ink/70 hover:text-brand-navy"}`}>
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <CtaButton href="#acceso-anticipado" className={`min-h-10 px-4 py-2 ${onDarkSection ? "!bg-white !text-brand-navy" : ""}`}>
              Quiero acceso anticipado
            </CtaButton>
          </div>
        </div>
        <button
          type="button"
          className={`mobile-menu-button fixed right-5 top-4 min-h-10 items-center justify-center rounded-md border px-3.5 text-sm font-bold ${onDarkSection ? "border-white/20 text-white" : "border-brand-navy/12 text-brand-navy"}`}
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
            <CtaButton href="#acceso-anticipado" className="mt-2 w-full" onClick={() => setOpen(false)}>
              Quiero acceso anticipado
            </CtaButton>
          </div>
        </div>
      )}
    </header>
  );
}

function DashboardMockup() {
  const flowSteps = [
    {
      id: "accounts",
      label: "Cuentas",
      title: "Conectá tus cuentas",
      text: "Tené tus perfiles de venta ordenados en un solo lugar para publicar sin saltar entre apps.",
    },
    {
      id: "content",
      label: "Carga",
      title: "Cargá tus publicaciones",
      text: "Subí tus videos una vez y Vendio los deja listos para publicarse en las cuentas y fechas que elijas.",
    },
    {
      id: "impact",
      label: "Impacto",
      title: "Revisá qué videos rindieron mejor",
      text: "Detectá qué publicaciones generaron más visualizaciones, clicks e impacto para volver a usarlas en otras cuentas.",
    },
    {
      id: "repeat",
      label: "Repetir",
      title: "Repetí lo que funciona",
      text: "Repetí tus mejores publicaciones en varias cuentas, asi genera mas ventas.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeStep = flowSteps[activeIndex];

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % flowSteps.length);
    }, 4200);

    return () => clearInterval(interval);
  }, [isPaused, flowSteps.length]);

  const handleStepClick = (index) => {
    setActiveIndex(index);
    setIsPaused(true);
  };

  return (
    <div className="dashboard-shell w-full min-w-0 max-w-[330px] rounded-lg border border-white/70 bg-white p-2 shadow-lift sm:mx-auto sm:max-w-[620px]">
      <div className="overflow-hidden rounded-md border border-brand-navy/10 bg-brand-paper">
        <div className="flex items-center justify-between gap-3 bg-brand-navy px-4 py-3 text-white">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#F4B4A7]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#E7D4A8]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#AFD3B5]" />
          </div>

          <p className="truncate text-[10px] font-bold uppercase tracking-[0.14em] text-white/68 sm:text-xs sm:tracking-[0.18em]">
            Vendio Flow
          </p>
        </div>

        <div className="space-y-4 p-3 sm:p-4">
          <div className="grid grid-cols-4 gap-2">
            {flowSteps.map((step, index) => {
              const isActive = activeIndex === index;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => handleStepClick(index)}
                  className={`rounded-xl px-2 py-2 text-[10px] font-extrabold transition-colors duration-300 sm:text-xs ${
                    isActive
                      ? "bg-brand-navy text-white"
                      : "bg-white text-brand-ink/45 hover:text-brand-navy"
                  }`}
                >
                  {step.label}
                </button>
              );
            })}
          </div>

          <div className="overflow-hidden rounded-2xl border border-brand-navy/8 bg-white p-4 shadow-sm">
            <div key={activeStep.id} className="animate-[heroSoftFade_0.8s_ease-out_both]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-accent">
                    Paso {activeIndex + 1}
                  </p>

                  <h3 className="mt-2 font-display text-xl font-extrabold text-brand-navy sm:text-2xl">
                    {activeStep.title}
                  </h3>

                  <p className="mt-2 max-w-sm text-sm font-semibold leading-6 text-brand-ink/55">
                    {activeStep.text}
                  </p>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-navy text-lg font-extrabold text-white shadow-soft">
                  {activeIndex + 1}
                </div>
              </div>

              <HeroMockupBody stepId={activeStep.id} />
            </div>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-brand-navy/8">
            <div
              className="h-full rounded-full bg-brand-navy transition-all duration-1000"
              style={{ width: `${((activeIndex + 1) / flowSteps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroMockupBody({ stepId }) {
  if (stepId === "accounts") {
    return (
      <div className="mt-5 grid gap-2">
        <HeroAccountRow icon={<FaInstagram />} name="@tienda.style" status="Conectada" />
        <HeroAccountRow icon={<FaInstagram />} name="@outlet.style2" status="Conectada" />
      </div>
    );
  }

  if (stepId === "content") {
    return (
      <div className="mt-5 grid gap-3 sm:grid-cols-[120px_1fr]">
        <div className="relative h-36 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-navy via-[#2F5596] to-brand-accent shadow-soft">
          <div className="absolute left-3 top-3 h-2 w-12 rounded-full bg-white/60" />
          <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-white/14 p-2 backdrop-blur-sm">
            <div className="h-2 w-2/3 rounded-full bg-white/70" />
            <div className="mt-2 h-2 w-1/2 rounded-full bg-white/40" />
          </div>
        </div>

        <div className="space-y-3">
          <div className="h-3 w-4/5 rounded-full bg-brand-navy/12" />
          <div className="h-3 w-3/5 rounded-full bg-brand-navy/10" />
          <div className="h-3 w-5/6 rounded-full bg-brand-navy/8" />

          <div className="flex flex-wrap gap-2 pt-2">
            <HeroPill>Reel</HeroPill>
            <HeroPill>Historia</HeroPill>
            <HeroPill>Carrusel</HeroPill>
          </div>
        </div>
      </div>
    );
  }

  if (stepId === "impact") {
    return (
      <div className="mt-5 space-y-3">
        <HeroContentImpact
          title="Reel demo producto"
          account="@tienda.style"
          views="48.2K"
          impact="Alto"
        />
        <HeroContentImpact
          title="Antes y después"
          account="@outlet.style2"
          views="31.5K"
          impact="Bueno"
        />
        <HeroContentImpact
          title="Tutorial rápido"
          account="@tienda.style"
          views="19.8K"
          impact="Medio"
        />
      </div>
    );
  }

  return (
    <div className="mt-5 space-y-4">
      <div className="rounded-2xl border border-brand-navy/8 bg-[#f6f7fb] p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-extrabold text-brand-ink">Reel demo producto</p>
            <p className="mt-1 text-xs font-semibold text-brand-ink/50">
              Listo para reutilizar en otra cuenta
            </p>
          </div>

          <span className="rounded-full bg-brand-navy px-3 py-1 text-xs font-extrabold text-white">
            Repetir
          </span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <HeroMiniStat label="Views" value="48.2K" />
          <HeroMiniStat label="Clicks" value="3.1K" />
          <HeroMiniStat label="Impacto" value="1.8K" />
        </div>
      </div>

      <div className="flex items-center justify-between rounded-2xl bg-brand-navy px-4 py-3 text-white">
        <p className="text-sm font-extrabold">Programado para el viernes</p>
        <p className="text-xs font-bold text-white/60">2 cuentas</p>
      </div>
    </div>
  );
}

function HeroAccountRow({ icon, name, status }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-brand-navy/8 bg-[#f6f7fb] px-4 py-3">
      <div className="flex items-center gap-3">
        <span className="text-xl text-brand-navy">{icon}</span>
        <span className="text-sm font-extrabold text-brand-ink">{name}</span>
      </div>

      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-700">
        {status}
      </span>
    </div>
  );
}

function HeroContentImpact({ title, account, views, impact }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-brand-navy/8 bg-[#f6f7fb] px-4 py-3">
      <div className="min-w-0">
        <p className="truncate text-sm font-extrabold text-brand-ink">{title}</p>
        <p className="mt-1 text-xs font-semibold text-brand-ink/50">{account}</p>
      </div>

      <div className="shrink-0 text-right">
        <p className="font-display text-sm font-extrabold text-brand-navy">{views}</p>
        <p className="text-[10px] font-bold uppercase tracking-wide text-brand-ink/40">
          {impact}
        </p>
      </div>
    </div>
  );
}

function HeroPill({ children }) {
  return (
    <span className="rounded-full bg-brand-navy/6 px-3 py-1 text-xs font-extrabold text-brand-navy">
      {children}
    </span>
  );
}

function HeroMiniStat({ label, value }) {
  return (
    <div className="rounded-2xl bg-white p-3">
      <p className="font-display text-lg font-extrabold text-brand-navy">{value}</p>
      <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-brand-ink/40">
        {label}
      </p>
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

function VerticalScroller({ rows = [] }) {
  const VISIBLE = rows.length; // show all rows height-wise
  const [items, setItems] = useState(rows);
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const tickingRef = useRef(false);

  useEffect(() => {
    setItems(rows);
  }, [rows]);

  useEffect(() => {
    if (!trackRef.current || !containerRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cardHeight = 0;
    const measure = () => {
      const first = trackRef.current.children[0];
      if (first) {
        const gap = parseFloat(getComputedStyle(trackRef.current).gap) || 12;
        cardHeight = Math.round(first.getBoundingClientRect().height + gap);
        containerRef.current.style.height = `${cardHeight * VISIBLE - gap}px`;
      }
    };

    measure();
    let interval = setInterval(() => {
      if (tickingRef.current) return;
      const track = trackRef.current;
      if (!track || track.children.length === 0) return;
      tickingRef.current = true;
      const first = track.children[0];
      const gap = parseFloat(getComputedStyle(track).gap) || 12;
      const offset = first.getBoundingClientRect().height + gap;
      track.style.transition = 'transform 0.8s ease';
      track.style.transform = `translateY(-${offset}px)`;

      const onEnd = () => {
        track.style.transition = '';
        track.style.transform = 'translateY(0)';
        setItems((prev) => {
          const [firstItem, ...rest] = prev;
          return [...rest, firstItem];
        });
        tickingRef.current = false;
        track.removeEventListener('transitionend', onEnd);
      };

      track.addEventListener('transitionend', onEnd);
    }, 3800);

    const onResize = () => {
      measure();
    };
    window.addEventListener('resize', onResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', onResize);
    };
  }, [VISIBLE]);

  return (
    <div ref={containerRef} className="overflow-hidden">
      <div ref={trackRef} className="flex flex-col gap-3">
        {items.map((row, i) => (
          <article
            key={`${row.name}-${i}`}
            className="grid gap-3 rounded-md border border-brand-navy/8 bg-white p-3 sm:grid-cols-[64px_1fr_auto] sm:items-center"
          >
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
          eyebrow="Te pasa que..."
          title="¿Te gustaría aprovechar mejor el contenido que ya publicás para vender más?"
          text="Vendio.pro te ayuda a mantener tus redes activas reutilizando tus mejores videos en varias cuentas y plataformas."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {problemCards.map((card, index) => (
            <article key={card.title} className="rounded-lg border border-white/10 bg-[rgba(255,255,255,0.04)] p-6 shadow-accent backdrop-blur-2xl">
              <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-md text-sm font-extrabold text-white shadow-[0_8px_20px_rgba(0,0,0,0.10)] backdrop-blur-xl">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="font-display text-xl font-extrabold">{card.title}</h3>
              <p className="mt-3 leading-7 text-white/66">{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContinuousScroller({ rows = [] }) {
  const generateViews = (name) => {
    // Generar número consistente basado en el nombre (hash simple)
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = ((hash << 5) - hash) + name.charCodeAt(i);
      hash = hash & hash;
    }
    // Convertir hash a número entre 5000 y 50000
    const num = Math.abs(hash) % 45000 + 5000;
    return num;
  };

  return (
    <div className="vertical-marquee marquee-mask h-[260px] overflow-hidden">
      <div className="vertical-marquee__track">
        <div className="vertical-marquee__group">
          {rows.map((row) => (
            <article
              key={`first-${row.name}`}
              className="rounded-2xl border border-brand-navy/10 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold text-brand-ink">{row.name}</h3>
                  <p className="mt-1 text-xs font-semibold text-brand-ink/52">
                    {row.channel}
                  </p>
                </div>

                <div className="rounded-xl bg-brand-navy px-3 py-2 text-right text-white">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-white/70">
                    Visualizaciones
                  </p>
                  <p className="text-lg font-extrabold leading-none">{(generateViews(row.name) / 1000).toFixed(1)}k</p>
                </div>
              </div>

              <div className="mt-3 inline-flex rounded-full bg-brand-navy/6 px-3 py-1 text-xs font-bold text-brand-navy">
                {row.label}
              </div>
            </article>
          ))}
        </div>

        <div className="vertical-marquee__group" aria-hidden="true">
          {rows.map((row) => (
            <article
              key={`second-${row.name}`}
              className="rounded-2xl border border-brand-navy/10 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold text-brand-ink">{row.name}</h3>
                  <p className="mt-1 text-xs font-semibold text-brand-ink/52">
                    {row.channel}
                  </p>
                </div>

                <div className="rounded-xl bg-brand-navy px-3 py-2 text-right text-white">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-white/70">
                    Visualizaciones
                  </p>
                  <p className="text-lg font-extrabold leading-none">{(generateViews(row.name) / 1000).toFixed(1)}k</p>
                </div>
              </div>

              <div className="mt-3 inline-flex rounded-full bg-brand-navy/6 px-3 py-1 text-xs font-bold text-brand-navy">
                {row.label}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function BenefitsSection() {
  return (
    <section id="beneficios" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="... DEJÁ DE ADIVINAR"
          title="Encontrá tus mejores publicaciones y usalas de nuevo!"
          text="Vendio.pro te ayuda a detectar qué contenido genera ventas, qué publicaciones atraen consultas y qué formatos conviene repetir."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <article key={benefit.title} className="group rounded-3xl border border-brand-navy/8 bg-white p-6 shadow-soft transition duration-200 hover:-translate-y-1 hover:shadow-lift">
              <div className="mb-4 inline-flex h-8 min-w-[42px] items-center justify-center rounded-full bg-[#F5E9D5] px-3 text-sm font-extrabold uppercase tracking-[0.2em] text-[#6B5A4A]">
                0{index + 1}
              </div>
              <h3 className="font-display text-lg font-extrabold leading-tight text-brand-navy">
                {benefit.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-brand-ink/70">{benefit.text}</p>
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
        <SectionHeader eyebrow="Cómo funciona" title="Tres pasos para vender mejor con tu contenido" />
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
  const [email, setEmail] = useState("");
  const [formStatus, setFormStatus] = useState("idle");

  const handleWaitlistSubmit = async (event) => {
    event.preventDefault();

    if (!email) return;

    setFormStatus("loading");

    try {
      const response = await fetch("https://formspree.io/f/mjgqqrlg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("No se pudo enviar el formulario.");
      }

      setFormStatus("success");
      setEmail("");
    } catch (error) {
      setFormStatus("error");
    }
  };

  return (
    <section id="acceso-anticipado" className="bg-brand-navy py-20 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] items-center">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-white/70">Acceso anticipado</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-normal text-white sm:text-4xl">
              Estamos preparando Vendio. Sumate a la beta.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/75">
              Vendio se está construyendo con el feedback de negocios reales que venden por redes. Sumate ahora y ayudanos a decidir que características implementar.
            </p>
            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft">
              <h3 className="font-display text-xl font-bold text-white">Anuncios que venden</h3>
              <p className="mt-3 text-sm leading-6 text-white/70">
                Menos intuición, más contenido con señales claras de venta.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white/95 p-6 shadow-soft sm:p-8">
            <p className="text-base font-bold text-brand-navy">Dejá tu mejor mail y te avisamos cuando abramos cupos</p>
            <form onSubmit={handleWaitlistSubmit} className="mt-5 space-y-4">
              <label htmlFor="beta-email" className="sr-only">
                Email
              </label>
              <input
                id="beta-email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-2xl border border-brand-navy/10 bg-white px-4 py-4 text-sm text-brand-navy shadow-sm outline-none transition focus:border-brand-navy/70 focus:ring-2 focus:ring-brand-navy/10"
              />
              <button
                type="submit"
                disabled={formStatus === "loading"}
                className="w-full rounded-2xl bg-brand-navy px-5 py-4 text-sm font-bold text-white shadow-soft transition hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formStatus === "loading" ? "Enviando..." : "Sumarme a la beta"}
              </button>
              {formStatus === "success" && (
                <p className="text-sm font-semibold text-emerald-600">
                  ✓ Listo, ya estás en la lista.
                </p>
              )}
              {formStatus === "error" && (
                <p className="text-sm font-semibold text-red-600">
                  Hubo un error. Probá de nuevo.
                </p>
              )}
            </form>
            <p className="mt-4 text-xs leading-5 text-brand-ink/50">
              Sin costo y sin compromiso. Solo te escribimos por novedades de Vendio.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-brand-paper py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand-accent">FAQ</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-normal text-brand-navy sm:text-4xl">
            Preguntas frecuentes
          </h2>
        </div>

        <div className="mx-auto mt-10 max-w-3xl space-y-3">
          {faqItems.map((item, idx) => {
            const open = openIndex === idx;
            return (
              <div
                key={item.question}
                className={`rounded-3xl border border-brand-navy/8 bg-white px-6 py-5 shadow-sm transition ${
                  open ? "ring-2 ring-brand-navy/10" : "hover:shadow-lg"
                }`}
              >
                <button
                  type="button"
                  className="w-full flex items-center justify-between"
                  onClick={() => setOpenIndex(open ? -1 : idx)}
                  aria-expanded={open}
                >
                  <p className="font-display text-base font-semibold text-brand-navy">{item.question}</p>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy text-lg font-bold text-white">{open ? "−" : "+"}</span>
                </button>

                {open && <p className="mt-4 text-sm leading-7 text-brand-ink/70">{item.answer}</p>}
              </div>
            );
          })}
        </div>
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
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 lg:px-8">
        <div>
          <Wordmark light />
          <p className="mt-2 text-sm font-semibold text-white/58">Vendé más con el contenido que ya publicaste</p>
        </div>
      </div>
    </footer>
  );
}

function getViewFromHash() {
  const hash = window.location.hash;
  if (hash === "#dashboard") return "dashboard";
  if (hash === "#calendario") return "calendario";
  if (hash === "#cuentas") return "cuentas";
  if (hash === "#contenido") return "contenido";
  if (hash === "#analiticas") return "analiticas";
  return "landing";
}

export default function App() {
  const [view, setView] = useState(getViewFromHash);
  const [heroEmail, setHeroEmail] = useState("");
  const [heroFormStatus, setHeroFormStatus] = useState("idle");

  const handleHeroSubmit = async (event) => {
    event.preventDefault();

    if (!heroEmail) return;

    setHeroFormStatus("loading");

    try {
      const response = await fetch("https://formspree.io/f/mjgqqrlg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email: heroEmail }),
      });

      if (!response.ok) {
        throw new Error("No se pudo enviar el formulario.");
      }

      setHeroFormStatus("success");
      setHeroEmail("");
    } catch (error) {
      setHeroFormStatus("error");
    }
  };

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

  if (view === "cuentas") {
    return <AccountsPage />;
  }

  if (view === "contenido") {
    return <ContentPage />;
  }

  if (view === "analiticas") {
    return <AnalyticsPage />;
  }
  const socialLinks = [
    { name: "Instagram", containerClass: "bg-transparent", icon: <FaInstagram size={22} /> },
    { name: "TikTok", containerClass: "bg-transparent", icon: <FaTiktok size={22} /> },
    { name: "Facebook", containerClass: "bg-transparent", icon: <FaFacebook size={22} /> },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-brand-paper text-brand-ink">
      <Navbar />
      <main>
        <section id="inicio" className="relative overflow-hidden pt-10 sm:pt-12">
          <div className="hero-grid mx-auto grid w-full min-w-0 max-w-7xl items-center gap-12 px-5 pb-20 pt-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:pb-24">
            <div className="w-full min-w-0 max-w-[calc(100vw-2.5rem)] lg:max-w-none">
              <div className="inline-flex items-center gap-3 rounded-md border border-brand-navy/10 bg-white/52 px-3 py-2 shadow-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-accent" />
                <span className="text-xs font-extrabold uppercase tracking-[0.17em] text-brand-ink/62">TU HERRAMIENTA IDEAL PARA VENDER POR REDES</span>
              </div>
              <h1 className="mt-7 max-w-4xl font-display text-[2.35rem] font-extrabold leading-[1.02] tracking-normal text-brand-navy sm:text-6xl sm:leading-[0.94] lg:text-7xl">
                <span className="block sm:inline">Vendé más </span>
                <span className="block sm:inline">con el contenido </span>
                <span className="block sm:inline">que ya publicaste.</span>
              </h1>
              <p className="mt-6 max-w-[330px] text-lg leading-8 text-brand-ink/60 sm:max-w-2xl sm:text-xl">
                Vendio te ayuda a conectar tus cuentas, planificar contenido y descubrir qué publicaciones generan más consultas, interacción y ventas.
              </p>
              <form onSubmit={handleHeroSubmit} className="mt-8 flex max-w-[330px] flex-col gap-3 sm:max-w-none sm:flex-row">
                <div className="relative w-full sm:max-w-[320px]">
                  <input
                    name="email"
                    type="email"
                    placeholder="tu@email.com"
                    required
                    value={heroEmail}
                    onChange={(event) => setHeroEmail(event.target.value)}
                    className="h-12 w-full rounded-xl border border-brand-navy/10 bg-white px-4 text-sm text-brand-ink outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
                  />
                </div>
                <button type="submit" disabled={heroFormStatus === "loading"} className="inline-flex min-h-12 items-center justify-center rounded-md px-5 py-3 text-sm font-bold transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 bg-brand-navy text-white shadow-soft hover:-translate-y-0.5 hover:shadow-lift w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed">
                  {heroFormStatus === "loading" ? "Enviando..." : "Quiero acceso anticipado"}
                </button>
              </form>
              {heroFormStatus === "success" && (
                <p className="mt-3 text-sm font-semibold text-emerald-600">
                  ✓ Listo, ya estás en la lista.
                </p>
              )}
              {heroFormStatus === "error" && (
                <p className="mt-3 text-sm font-semibold text-red-600">
                  Hubo un error. Probá de nuevo.
                </p>
              )}
              <p className="mt-4 max-w-[330px] text-sm font-semibold leading-6 text-brand-ink/55 sm:max-w-2xl">
                Sumate gratis a la lista de espera. Te avisamos cuando abramos los primeros accesos.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <div className="flex" aria-hidden>
                  {socialLinks.map(({ name, svg, icon, containerClass = "bg-white" }) => (
                    <div
                      key={name}
                      role="img"
                      aria-label={name}
                      title={name}
                      className={`h-12 w-12 rounded-full border-2 border-brand-paper ${containerClass} flex items-center justify-center text-brand-navy`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="sr-only">{name}</span>
                      {icon || svg}
                    </div>
                  ))}
                </div>
                <p className="max-w-xs text-sm font-semibold leading-6 text-brand-ink/58">
                  Para marcas, tiendas y creadores que ya venden con contenido en redes sociales.
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
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
