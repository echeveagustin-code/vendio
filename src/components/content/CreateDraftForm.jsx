const inputClass =
  "mt-1.5 h-11 w-full rounded-xl border border-brand-navy/12 bg-white px-3 text-sm font-semibold text-brand-ink outline-none transition focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10";

export default function CreateDraftForm({ open, onClose, onSave }) {
  if (!open) return null;

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    onSave({
      title: form.title.value,
      idea: form.idea.value,
      platform: form.platform.value,
      account: form.account.value,
      note: form.note.value,
    });
    form.reset();
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-brand-ink/40 p-4 backdrop-blur-sm sm:items-center">
      <div className="w-full max-w-md rounded-2xl border border-brand-navy/10 bg-white shadow-lift" role="dialog" aria-modal="true" aria-labelledby="draft-title">
        <div className="flex items-center justify-between border-b border-brand-navy/8 px-5 py-4">
          <h2 id="draft-title" className="font-display text-lg font-extrabold text-brand-navy">
            Crear borrador
          </h2>
          <button type="button" onClick={onClose} className="rounded-lg p-2 text-brand-ink/50 hover:bg-[#f6f7fb]" aria-label="Cerrar">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-5">
          <label className="block">
            <span className="text-sm font-bold text-brand-ink/70">Título del contenido</span>
            <input name="title" required placeholder="Ej: Reel lanzamiento verano" className={inputClass} />
          </label>

          <label className="block">
            <span className="text-sm font-bold text-brand-ink/70">Idea o descripción</span>
            <textarea name="idea" rows={3} required placeholder="Describí la idea del contenido..." className={`${inputClass} min-h-[88px] resize-none py-2`} />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-bold text-brand-ink/70">Plataforma sugerida</span>
              <select name="platform" className={inputClass} defaultValue="Instagram">
                <option>Instagram</option>
                <option>TikTok</option>
                <option>Facebook</option>
                <option>YouTube Shorts</option>
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-bold text-brand-ink/70">Cuenta</span>
              <select name="account" className={inputClass} defaultValue="@tienda.style">
                <option>@tienda.style</option>
                <option>@outlet.style</option>
                <option>Tienda Style</option>
              </select>
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-bold text-brand-ink/70">Nota interna</span>
            <textarea name="note" rows={2} placeholder="Contexto, referencias, hashtags..." className={`${inputClass} min-h-[72px] resize-none py-2`} />
          </label>

          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-brand-navy/12 text-sm font-bold text-brand-navy">
              Cancelar
            </button>
            <button type="submit" className="inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-brand-navy text-sm font-bold text-white shadow-soft">
              Guardar borrador
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
