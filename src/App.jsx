import { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import Dashboard from "./pages/Dashboard.jsx";
import CalendarPage from "./pages/CalendarPage.jsx";
import AccountsPage from "./pages/AccountsPage.jsx";
import Login from "./pages/Login.jsx";
import { getToken } from "./lib/api";

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
    text: "Sumás tus cuentas de Instagram, TikTok y Facebook para administrarlas desde Vendio.",
  },
  {
    title: "Planificás y subís contenido",
    text: "Cargás tus publicaciones y elegís en qué cuentas y fechas querés publicarlas.",
  },
  {
    title: "Vendio muestra qué funciona",
    text: "Revisás qué publicaciones generan más impacto y volvés a usar lo que mejor rinde.",
  },
];

const faqItems = [
  {
    question: "¿Vendio publica automáticamente?",
    answer:
      "Sí. Vendio busca simplificar la publicación automática en varias redes para que puedas planificar, programar y reutilizar contenido desde un solo lugar.",
  },
  {
    question: "¿Puedo conectar varias cuentas?",
    answer:
      "Sí. Vendio está pensado para personas y negocios que manejan más de una cuenta, marca o canal social.",
  },
  {
    question: "¿Sirve para Instagram y TikTok?",
    answer:
      "Ese es el foco inicial: redes donde el contenido corto impulsa consultas, interacción y ventas. También evaluamos otras integraciones según la demanda.",
  },
  {
    question: "¿Está pensado para agencias?",
    answer:
      "No principalmente. Vendio prioriza emprendedores, tiendas, creadores y negocios que venden por redes y necesitan una herramienta simple.",
  },
  {
    question: "¿Cuándo va a estar disponible?",
    answer:
      "Estamos preparando los primeros accesos. Si te sumás a la lista, te avisamos cuando abramos cupos para probar la beta.",
  },
  {
    question: "¿Tengo que pagar para sumarme a la lista?",
    answer:
      "No. Sumarte a la lista de espera es gratis y no implica ningún compromiso de compra.",
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
    <a
      href="#inicio"
      className="font-sora text-[1.45rem] font-extrabold tracking-normal"
    >
      <span className={light ? "text-brand-paper" : "text-brand-navy"}>
        Ven
      </span>
      <span
        className={light ? "text-white/72" : "text-[#FFF7E6] text-shadow-logo"}
      >
        dio.pro
      </span>
    </a>
  );
}

function CtaButton({
  href = "#contacto",
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "inline-flex min-h-12 items-center justify-center rounded-md px-5 py-3 text-sm font-bold transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2";
  const styles =
    variant === "secondary"
      ? "border border-brand-navy/15 bg-white/55 text-brand-navy shadow-sm hover:-translate-y-0.5 hover:bg-white"
      : "bg-brand-navy text-white shadow-soft hover:-translate-y-0.5 hover:shadow-lift";

  return (
    <a
      href={href}
      className={`${base} ${styles} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [onDarkSection, setOnDarkSection] = useState(false);

  useEffect(() => {
    const darkSection = document.querySelector("#problema");
    if (!darkSection) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setOnDarkSection(entry.isIntersecting),
      {
        rootMargin: "-80px 0px 0px 0px",
        threshold: 0,
      },
    );

    observer.observe(darkSection);
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-brand-navy/8 bg-brand-paper/88 backdrop-blur-xl">
      <nav
        className="relative mx-auto flex w-screen min-w-0 max-w-none items-center justify-between px-5 py-4 md:w-full md:max-w-7xl lg:px-8"
        aria-label="Principal"
      >
        <Wordmark />

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-brand-ink/70 transition hover:text-brand-navy"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <CtaButton
            href="#contacto"
            className="min-h-10 px-4 py-2"
          >
            Sumarme al MVP
          </CtaButton>
        </div>

        <button
          type="button"
          className={`mobile-menu-button fixed right-5 top-4 min-h-10 items-center justify-center rounded-md border px-3.5 text-sm font-bold md:hidden ${
            onDarkSection
              ? "border-white/20 text-white"
              : "border-brand-navy/12 text-brand-navy"
          }`}
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
            <CtaButton
              href="#contacto"
              className="mt-2 w-full"
              onClick={() => setOpen(false)}
            >
              Sumarme al MVP
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
      text: "Detectá qué publicaciones generaron más visualizaciones, clics e impacto para volver a usarlas en otras cuentas.",
    },
    {
      id: "repeat",
      label: "Repetir",
      title: "Repetí lo que funciona",
      text: "Volvé a publicar tus mejores contenidos en distintas cuentas para aprovechar su potencial de venta.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeStep = flowSteps[activeIndex];

  useEffect(() => {
    if (isPaused) return undefined;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % flowSteps.length);
    }, 6500);

    return () => window.clearInterval(interval);
  }, [isPaused, flowSteps.length]);

  const handleStepClick = (index) => {
    setActiveIndex(index);
    setIsPaused(true);
  };

  return (
    <div className="dashboard-shell w-full min-w-0 max-w-[330px] rounded-lg border border-white/70 bg-white p-2 shadow-lift sm:mx-auto sm:max-w-[620px]">
      <div className="overflow-hidden rounded-md border border-brand-navy/10 bg-brand-paper">
        <div className="flex items-center justify-between gap-3 bg-brand-navy px-4 py-3 text-white">
          <div
            className="flex gap-1.5"
            aria-hidden="true"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-[#F4B4A7]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#E7D4A8]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#AFD3B5]" />
          </div>
          <p className="truncate text-[10px] font-bold uppercase tracking-[0.14em] text-white/68 sm:text-xs sm:tracking-[0.18em]">
            Vendio
          </p>
        </div>

        <div className="p-4 sm:p-5">
          <div className="grid grid-cols-4 gap-2">
            {flowSteps.map((step, index) => (
              <button
                key={step.id}
                type="button"
                onClick={() => handleStepClick(index)}
                className={`rounded-lg px-2 py-2 text-[10px] font-extrabold transition sm:text-xs ${
                  index === activeIndex
                    ? "bg-brand-navy text-white"
                    : "bg-white text-brand-ink/55 hover:text-brand-navy"
                }`}
              >
                {step.label}
              </button>
            ))}
          </div>

          <div className="mt-5 min-h-[340px] rounded-2xl border border-brand-navy/8 bg-white p-4 transition-all duration-700 sm:p-5">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand-accent">
              Paso {activeIndex + 1}
            </p>
            <h2 className="mt-2 font-display text-xl font-extrabold text-brand-navy sm:text-2xl">
              {activeStep.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-brand-ink/58">
              {activeStep.text}
            </p>

            <HeroMockupBody stepId={activeStep.id} />
          </div>

          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-brand-navy/8">
            <div
              className="h-full rounded-full bg-brand-navy transition-all duration-1000"
              style={{
                width: `${((activeIndex + 1) / flowSteps.length) * 100}%`,
              }}
            />
          </div>

          {isPaused && (
            <button
              type="button"
              onClick={() => setIsPaused(false)}
              className="mt-3 text-xs font-bold text-brand-ink/45 transition hover:text-brand-navy"
            >
              Reanudar animación
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function HeroAccountRow({ icon, name, status }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-brand-navy/8 bg-brand-paper p-3">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-navy text-white">
          {icon}
        </span>
        <div>
          <p className="text-sm font-extrabold text-brand-ink">{name}</p>
          <p className="text-xs font-semibold text-brand-ink/45">Instagram</p>
        </div>
      </div>
      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-extrabold text-emerald-700">
        {status}
      </span>
    </div>
  );
}

function HeroMockupBody({ stepId }) {
  if (stepId === "accounts") {
    return (
      <div className="mt-5 grid gap-2">
        <HeroAccountRow
          icon={<FaInstagram />}
          name="@tienda.style"
          status="Conectada"
        />
        <HeroAccountRow
          icon={<FaInstagram />}
          name="@outlet.style2"
          status="Conectada"
        />
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
        <div className="space-y-2">
          {[
            "Instagram · @tienda.style",
            "TikTok · @tienda.style",
            "Facebook · Tienda Style",
          ].map((account) => (
            <div
              key={account}
              className="flex items-center justify-between rounded-xl border border-brand-navy/8 p-3"
            >
              <span className="text-xs font-bold text-brand-ink/65">
                {account}
              </span>
              <span className="text-[11px] font-extrabold text-brand-navy">
                Programado
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (stepId === "impact") {
    return (
      <div className="mt-5 space-y-2">
        {videoRows.slice(0, 2).map((row) => (
          <article
            key={row.name}
            className="grid grid-cols-[48px_1fr_auto] items-center gap-3 rounded-xl border border-brand-navy/8 p-3"
          >
            <div
              className={`h-12 rounded-lg bg-gradient-to-br ${row.tone}`}
              aria-hidden="true"
            />
            <div>
              <p className="text-xs font-extrabold text-brand-ink">
                {row.name}
              </p>
              <p className="mt-1 text-[11px] font-semibold text-brand-ink/45">
                {row.views} views · {row.clicks} clics
              </p>
            </div>
            <span className="text-lg font-extrabold text-brand-navy">
              {row.score}
            </span>
          </article>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-5 rounded-2xl bg-brand-navy p-4 text-white">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/55">
        Publicación recomendada
      </p>
      <p className="mt-2 font-display text-lg font-extrabold">
        Reel demo producto
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold">
          Instagram
        </span>
        <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold">
          TikTok
        </span>
        <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold">
          Facebook
        </span>
      </div>
      <button
        type="button"
        className="mt-5 w-full rounded-xl bg-white px-4 py-3 text-sm font-extrabold text-brand-navy"
      >
        Volver a programar
      </button>
    </div>
  );
}

function SectionHeader({ eyebrow, title, text, light = false }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow && (
        <p
          className={`text-xs font-extrabold uppercase tracking-[0.22em] ${
            light ? "text-white/58" : "text-brand-accent"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`mt-3 font-display text-3xl font-extrabold tracking-normal sm:text-4xl ${
          light ? "text-white" : "text-brand-navy"
        }`}
      >
        {title}
      </h2>
      {text && (
        <p
          className={`mt-4 text-base leading-7 sm:text-lg ${
            light ? "text-white/68" : "text-brand-ink/58"
          }`}
        >
          {text}
        </p>
      )}
    </div>
  );
}

function ProblemSection() {
  return (
    <section
      id="problema"
      className="bg-brand-navy py-20 text-white sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          light
          eyebrow="Te pasa que..."
          title="¿Te gustaría aprovechar mejor el contenido que ya publicás para vender más?"
          text="Vendio.pro te ayuda a mantener tus redes activas reutilizando tus mejores videos en varias cuentas y plataformas."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {problemCards.map((card) => (
            <article
              key={card.title}
              className="rounded-lg border border-white/10 bg-white/[0.06] p-6 shadow-accent"
            >
              <div
                className="mb-6 h-10 w-10 rounded-md bg-brand-accent/90"
                aria-hidden="true"
              />
              <h3 className="font-display text-xl font-extrabold">
                {card.title}
              </h3>
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
    <section
      id="beneficios"
      className="py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="Dejá de adivinar"
          title="Encontrá tus mejores publicaciones y usalas de nuevo"
          text="Vendio.pro te ayuda a detectar qué contenido genera ventas, qué publicaciones atraen consultas y qué formatos conviene repetir."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <article
              key={benefit.title}
              className="group rounded-lg border border-brand-navy/8 bg-white p-5 shadow-soft transition duration-200 hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="text-sm font-extrabold text-brand-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 min-h-14 font-display text-lg font-extrabold leading-tight text-brand-navy">
                {benefit.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-brand-ink/56">
                {benefit.text}
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
    <section
      id="como-funciona"
      className="border-y border-brand-navy/8 bg-white/42 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="Cómo funciona"
          title="Tres pasos para vender más con tus videos"
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="relative overflow-hidden rounded-lg border border-brand-navy/8 bg-brand-paper p-7 shadow-soft"
            >
              <span className="absolute -right-2 -top-8 font-display text-8xl font-extrabold text-brand-navy/[0.06]">
                0{index + 1}
              </span>
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-brand-navy text-lg font-extrabold text-white">
                  {index + 1}
                </div>
                <h3 className="mt-8 font-display text-xl font-extrabold text-brand-navy">
                  {step.title}
                </h3>
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
    <section
      id="mvp"
      className="py-20 sm:py-24"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand-accent">
            MVP privado
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-normal text-brand-navy sm:text-4xl">
            Estamos lanzando la primera versión para negocios que venden con
            videos cortos.
          </h2>
          <p className="mt-5 text-lg leading-8 text-brand-ink/60">
            Buscamos ecommerce, marcas personales, tiendas y emprendedores que
            ya publican en Instagram, TikTok, Reels o Shorts y quieren entender
            qué contenido convierte.
          </p>
          <CtaButton
            href="#contacto"
            className="mt-8"
          >
            Quiero acceso temprano
          </CtaButton>
        </div>

        <div className="rounded-lg bg-brand-navy p-5 text-white shadow-lift sm:p-7">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              [
                "Para quién",
                "Negocios que venden productos o servicios con video corto.",
              ],
              [
                "Qué validamos",
                "Métricas útiles, flujo de carga y reportes accionables.",
              ],
              [
                "Qué recibís",
                "Acceso temprano, feedback directo y prioridad en mejoras.",
              ],
              [
                "Sin compromiso",
                "Una primera versión simple para aprender rápido.",
              ],
            ].map(([title, text]) => (
              <article
                key={title}
                className="rounded-md border border-white/10 bg-white/[0.06] p-5"
              >
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

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faq"
      className="border-t border-brand-navy/8 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="Preguntas frecuentes"
          title="Todo lo básico antes de sumarte"
        />

        <div className="mt-12 space-y-3">
          {faqItems.map((item, index) => {
            const isOpen = index === openIndex;

            return (
              <article
                key={item.question}
                className="overflow-hidden rounded-lg border border-brand-navy/8 bg-white shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base font-extrabold text-brand-navy sm:text-lg">
                    {item.question}
                  </span>
                  <span className="text-xl font-bold text-brand-accent">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <p className="border-t border-brand-navy/8 px-5 py-5 leading-7 text-brand-ink/60">
                    {item.answer}
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function LeadForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email) return;

    setStatus("loading");

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

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contacto"
      className="bg-brand-navy py-20 text-white sm:py-24"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-white/58">
            Acceso temprano
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
            Sumate al MVP de Vendio.pro
          </h2>
          <p className="mt-5 text-lg leading-8 text-white/68">
            Dejanos tu correo y te avisamos cuando abramos los primeros cupos de
            la beta.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-lg bg-brand-paper p-5 text-brand-ink shadow-lift sm:p-7"
        >
          <label>
            <span className="text-sm font-bold text-brand-ink/72">Email</span>
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="tu@email.com"
              autoComplete="email"
              className="mt-2 h-12 w-full rounded-md border border-brand-navy/12 bg-white px-4 text-sm font-semibold text-brand-ink outline-none transition placeholder:text-brand-ink/32 focus:border-brand-navy focus:ring-4 focus:ring-brand-navy/10"
            />
          </label>

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-brand-navy px-5 py-3 text-sm font-extrabold text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "loading" ? "Enviando..." : "Sumarme al MVP"}
          </button>

          {status === "success" && (
            <p className="mt-4 rounded-md bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
              Listo. Te sumaste a la lista de espera.
            </p>
          )}

          {status === "error" && (
            <p className="mt-4 rounded-md bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">
              No se pudo enviar. Probá nuevamente.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function Footer() {
  const socialLinks = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/",
      icon: <FaInstagram size={19} />,
    },
    {
      name: "TikTok",
      href: "https://www.tiktok.com/",
      icon: <FaTiktok size={18} />,
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/",
      icon: <FaFacebook size={18} />,
    },
  ];

  return (
    <footer className="bg-[#061631] py-10 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div>
          <Wordmark light />
          <p className="mt-2 text-sm font-semibold text-white/58">
            Vendé más con el contenido que ya publicaste
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.name}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-white/60 transition hover:border-white/30 hover:text-white"
            >
              {social.icon}
            </a>
          ))}
          <a
            href="https://x.com/echeve_agus"
            target="_blank"
            rel="noreferrer"
            className="ml-1 text-sm font-bold text-white/60 transition hover:text-white"
          >
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
  if (hash === "#cuentas") return "cuentas";
  if (hash === "#login") return "login";
  return "landing";
}

function isAuthenticated() {
  return Boolean(getToken());
}

export default function App() {
  const [view, setView] = useState(getViewFromHash);

  useEffect(() => {
    const syncView = () => setView(getViewFromHash());

    syncView();
    window.addEventListener("hashchange", syncView);
    return () => window.removeEventListener("hashchange", syncView);
  }, []);

  if (view === "login") return <Login />;

  if (view === "dashboard") {
    if (!isAuthenticated()) {
      window.location.hash = "#login";
      return null;
    }
    return <Dashboard />;
  }

  if (view === "calendario") {
    if (!isAuthenticated()) {
      window.location.hash = "#login";
      return null;
    }
    return <CalendarPage />;
  }

  if (view === "cuentas") {
    if (!isAuthenticated()) {
      window.location.hash = "#login";
      return null;
    }
    return <AccountsPage />;
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-brand-paper text-brand-ink">
      <Navbar />
      <main>
        <section
          id="inicio"
          className="relative overflow-hidden pt-28 sm:pt-32"
        >
          <div className="hero-grid mx-auto grid w-full min-w-0 max-w-7xl items-center gap-12 px-5 pb-20 pt-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:pb-24">
            <div className="w-full min-w-0 max-w-[calc(100vw-2.5rem)] lg:max-w-none">
              <div className="inline-flex items-center gap-3 rounded-md border border-brand-navy/10 bg-white/52 px-3 py-2 shadow-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-accent" />
                <span className="text-xs font-extrabold uppercase tracking-[0.17em] text-brand-ink/62">
                  Videos que venden
                </span>
              </div>

              <h1 className="mt-7 max-w-4xl font-display text-[2.35rem] font-extrabold leading-[1.02] tracking-normal text-brand-navy sm:text-6xl sm:leading-[0.94] lg:text-7xl">
                Vendé más con el contenido que ya publicaste.
              </h1>

              <p className="mt-6 max-w-[330px] text-lg leading-8 text-brand-ink/60 sm:max-w-2xl sm:text-xl">
                Gestioná varias cuentas desde un solo lugar, programá contenido
                y usá las métricas para entender qué videos generan ventas.
              </p>

              <div className="mt-8 flex max-w-[330px] flex-col gap-3 sm:max-w-none sm:flex-row">
                <CtaButton
                  href="#contacto"
                  className="w-full sm:w-auto"
                >
                  Sumarme al MVP
                </CtaButton>
                <CtaButton
                  href="#como-funciona"
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  Ver cómo funciona
                </CtaButton>
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <div
                  className="flex -space-x-3"
                  aria-hidden="true"
                >
                  {[
                    "bg-brand-navy",
                    "bg-brand-accent",
                    "bg-[#B8B8AE]",
                    "bg-white",
                  ].map((color, index) => (
                    <span
                      key={color}
                      className={`h-10 w-10 rounded-full border-2 border-brand-paper ${color}`}
                    >
                      {index === 3 && (
                        <span className="flex h-full items-center justify-center text-xs font-extrabold text-brand-navy">
                          +
                        </span>
                      )}
                    </span>
                  ))}
                </div>
                <p className="max-w-xs text-sm font-semibold leading-6 text-brand-ink/58">
                  Para marcas, ecommerce y creadores que ya venden con contenido
                  corto.
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
        <LeadForm />
      </main>
      <Footer />
    </div>
  );
}
