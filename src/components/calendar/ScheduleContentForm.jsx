const inputClass =
  "mt-1.5 h-11 w-full rounded-xl border border-brand-navy/12 bg-white px-3 text-sm font-semibold text-brand-ink outline-none transition focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10";

export default function ScheduleContentForm({ open, selectedDay, onClose, onSave }) {
  if (!open) return null;

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const data = {
      title: form.title.value,
      type: form.type.value,
      platform: form.platform.value,
      account: form.account.value,
      day: Number(form.day.value),
      time: form.time.value,
      status: form.status.value,
      note: form.note.value,
    };
    onSave(data);
    form.reset();
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-brand-ink/40 p-4 backdrop-blur-sm sm:items-center">
      <div className="w-full max-w-lg rounded-2xl border border-brand-navy/10 bg-white shadow-lift" role="dialog" aria-modal="true" aria-labelledby="schedule-title">
        <div className="flex items-center justify-between border-b border-brand-navy/8 px-5 py-4">
          <h2 id="schedule-title" className="font-display text-lg font-extrabold text-brand-navy">
            Programar contenido
          </h2>
          <button type="button" onClick={onClose} className="rounded-lg p-2 text-brand-ink/50 hover:bg-[#f6f7fb]" aria-label="Cerrar">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-5">
          <label className="block">
            <span className="text-sm font-bold text-brand-ink/70">Título del contenido</span>
            <input name="title" required placeholder="Ej: Look de verano en 3 pasos" className={inputClass} />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-bold text-brand-ink/70">Tipo</span>
              <select name="type" className={inputClass} defaultValue="Reel">
                <option>Reel</option>
                <option>TikTok</option>
                <option>Story</option>
                <option>Post</option>
                <option>Shorts</option>
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-bold text-brand-ink/70">Plataforma</span>
              <select name="platform" className={inputClass} defaultValue="Instagram">
                <option>Instagram</option>
                <option>TikTok</option>
                <option>Facebook</option>
                <option>YouTube</option>
              </select>
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-bold text-brand-ink/70">Cuenta</span>
            <select name="account" className={inputClass} defaultValue="@tienda.style">
              <option>@tienda.style</option>
              <option>@outlet.style</option>
              <option>Tienda Style</option>
            </select>
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-bold text-brand-ink/70">Fecha (día)</span>
              <input name="day" type="number" min="1" max="31" defaultValue={selectedDay} className={inputClass} />
            </label>
            <label className="block">
              <span className="text-sm font-bold text-brand-ink/70">Hora</span>
              <input name="time" type="time" defaultValue="09:30" className={inputClass} />
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-bold text-brand-ink/70">Estado</span>
            <select name="status" className={inputClass} defaultValue="Programado">
              <option>Programado</option>
              <option>Borrador</option>
              <option>Publicado</option>
              <option>Revisión</option>
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-bold text-brand-ink/70">Nota opcional</span>
            <textarea
              name="note"
              rows={2}
              placeholder="Detalles internos, CTA, hashtags..."
              className={`${inputClass} min-h-[80px] resize-none py-2`}
            />
          </label>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-brand-navy/12 text-sm font-bold text-brand-navy"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-brand-navy text-sm font-bold text-white shadow-soft"
            >
              Guardar programación
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
