import { sidebarMenu } from "../../data/dashboardMockData";

function Wordmark() {
  return (
    <a href="#inicio" className="font-display text-xl font-extrabold tracking-normal">
      <span className="text-brand-navy">Ven</span>
      <span className="text-brand-accent">dio</span>
    </a>
  );
}

export default function Sidebar({ mobileOpen, onClose, activePage = "dashboard" }) {
  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-brand-ink/40 backdrop-blur-sm lg:hidden"
          aria-label="Cerrar menú"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-brand-navy/8 bg-white shadow-soft transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-brand-navy/6 px-5 py-5">
          <Wordmark />
          <button
            type="button"
            className="rounded-lg p-2 text-sm font-bold text-brand-ink/50 lg:hidden"
            onClick={onClose}
            aria-label="Cerrar sidebar"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Dashboard">
          <ul className="space-y-1">
            {sidebarMenu.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                    item.id === activePage
                      ? "bg-brand-navy text-white shadow-sm"
                      : "text-brand-ink/65 hover:bg-[#f6f7fb] hover:text-brand-navy"
                  }`}
                >
                  <span className="text-base" aria-hidden="true">
                    {item.icon}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-brand-navy/6 p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-brand-navy flex items-center justify-center text-white font-bold text-lg">
              A
            </div>
            <div>
              <p className="text-sm font-semibold text-brand-ink">Agustin Echeverria</p>
              <p className="text-xs text-brand-ink/60">Miembro Pro</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
