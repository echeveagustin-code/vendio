import { defaultPermissions, platformIcons } from "../../data/accountsMockData";

const inputClass =
  "mt-1.5 h-11 w-full rounded-xl border border-brand-navy/12 bg-white px-3 text-sm font-semibold text-brand-ink outline-none transition focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10";

const PLATFORMS = ["Instagram", "TikTok", "Facebook", "YouTube Shorts"];

export default function ConnectAccountModal({ open, defaultPlatform, onClose, onConnect }) {
  if (!open) return null;

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    onConnect({
      platform: form.platform.value,
      internalName: form.internalName.value,
    });
    form.reset();
  }

  const platform = defaultPlatform || "Instagram";

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-brand-ink/40 p-4 backdrop-blur-sm sm:items-center">
      <div className="w-full max-w-md rounded-2xl border border-brand-navy/10 bg-white shadow-lift" role="dialog" aria-modal="true" aria-labelledby="connect-title">
        <div className="flex items-center justify-between border-b border-brand-navy/8 px-5 py-4">
          <h2 id="connect-title" className="font-display text-lg font-extrabold text-brand-navy">
            Conectar cuenta
          </h2>
          <button type="button" onClick={onClose} className="rounded-lg p-2 text-brand-ink/50 hover:bg-[#f6f7fb]" aria-label="Cerrar">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-5">
          <label className="block">
            <span className="text-sm font-bold text-brand-ink/70">Plataforma</span>
            <select name="platform" className={inputClass} defaultValue={platform}>
              {PLATFORMS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-bold text-brand-ink/70">Nombre interno de la cuenta</span>
            <input name="internalName" required placeholder="Ej: Tienda principal" className={inputClass} />
          </label>

          <div className="rounded-xl bg-[#f6f7fb] p-4">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-brand-ink/40">Permisos solicitados</p>
            <ul className="mt-3 space-y-2">
              {defaultPermissions.map((perm) => (
                <li key={perm} className="flex items-center gap-2 text-sm font-semibold text-brand-ink/65">
                  <span className="text-brand-navy">✓</span>
                  {perm}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-5 text-brand-ink/45">
              Vendio solo usará estos permisos para programar contenido y analizar el rendimiento de tus publicaciones.
            </p>
          </div>

          <button
            type="submit"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand-navy text-sm font-bold text-white shadow-soft"
          >
            <span>{platformIcons[platform] ?? "🔗"}</span>
            Continuar con {platform}
          </button>
        </form>
      </div>
    </div>
  );
}
