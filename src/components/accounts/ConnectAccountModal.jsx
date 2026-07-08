import { platforms } from "../../data/accountsMockData";

const inputClass =
  "mt-1.5 h-11 w-full rounded-xl border border-brand-navy/12 bg-white px-3 text-sm font-semibold text-brand-ink outline-none transition focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10";

export default function ConnectAccountModal({ open, selectedPlatform, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-brand-ink/40 p-4 backdrop-blur-sm sm:items-center">
      <div className="w-full max-w-lg rounded-2xl border border-brand-navy/10 bg-white shadow-lift" role="dialog" aria-modal="true" aria-labelledby="connect-title">
        <div className="flex items-center justify-between border-b border-brand-navy/8 px-5 py-4">
          <h2 id="connect-title" className="font-display text-lg font-extrabold text-brand-navy">
            Conectar cuenta
          </h2>
          <button type="button" onClick={onClose} className="rounded-lg p-2 text-brand-ink/50 hover:bg-[#f6f7fb]" aria-label="Cerrar">
            ×
          </button>
        </div>

        <form className="space-y-4 p-5">
          <label className="block">
            <span className="text-sm font-bold text-brand-ink/70">Seleccionar plataforma</span>
            <select name="platform" className={inputClass} defaultValue={selectedPlatform || "Instagram"}>
              {platforms.map((platform) => (
                <option key={platform.id}>{platform.name}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-bold text-brand-ink/70">Nombre interno de la cuenta</span>
            <input name="name" placeholder="Ej: Tienda principal" className={inputClass} />
          </label>

          <div>
            <p className="text-sm font-bold text-brand-ink/70">Permisos solicitados</p>
            <div className="mt-2 grid gap-2">
              {["Publicar contenido", "Programar publicaciones", "Leer metricas", "Leer comentarios y consultas"].map((permission) => (
                <label key={permission} className="flex items-center gap-2 rounded-xl bg-[#f6f7fb] px-3 py-2 text-sm font-bold text-brand-ink/70">
                  <input type="checkbox" defaultChecked className="h-4 w-4 accent-brand-navy" />
                  {permission}
                </label>
              ))}
            </div>
          </div>

          <p className="rounded-xl bg-blue-50 px-3 py-3 text-sm font-semibold leading-6 text-blue-800">
            Vendio solo usara estos permisos para programar contenido y analizar el rendimiento de tus publicaciones.
          </p>

          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-brand-navy/12 text-sm font-bold text-brand-navy">
              Cancelar
            </button>
            <button type="button" onClick={onClose} className="inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-brand-navy text-sm font-bold text-white shadow-soft">
              Continuar con {selectedPlatform || "Instagram"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
