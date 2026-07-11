const inputClass =
  "mt-1.5 h-11 w-full rounded-xl border border-brand-navy/12 bg-white px-3 text-sm font-semibold text-brand-ink outline-none transition focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10";

export default function AddNoteForm({
  open,
  year,
  month,
  selectedDay,
  onClose,
  onSave,
}) {
  if (!open) return null;

  const selectedDateLabel = new Date(
    year,
    month,
    selectedDay,
  ).toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const day = Number(form.day.value);
    const text = form.text.value.trim();
    const category = form.category.value;

    if (!text) return;

    onSave({
      year,
      month,
      day,
      text,
      category,
    });

    form.reset();
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-brand-ink/40 p-4 backdrop-blur-sm sm:items-center">
      <div
        className="w-full max-w-md rounded-2xl border border-brand-navy/10 bg-white shadow-lift"
        role="dialog"
        aria-modal="true"
        aria-labelledby="note-title"
      >
        <div className="flex items-center justify-between border-b border-brand-navy/8 px-5 py-4">
          <div>
            <h2
              id="note-title"
              className="font-display text-lg font-extrabold text-brand-navy"
            >
              Agregar nota
            </h2>
            <p className="mt-0.5 text-xs font-semibold capitalize text-brand-ink/45">
              {selectedDateLabel}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-brand-ink/50 hover:bg-[#f6f7fb]"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-5"
        >
          <label className="block">
            <span className="text-sm font-bold text-brand-ink/70">
              Día seleccionado
            </span>
            <input
              name="day"
              type="number"
              min="1"
              max="31"
              defaultValue={selectedDay}
              className={inputClass}
            />
          </label>

          <label className="block">
            <span className="text-sm font-bold text-brand-ink/70">
              Texto de la nota
            </span>
            <textarea
              name="text"
              required
              rows={3}
              placeholder="Ej: Revisar CTA de videos de oferta"
              className={`${inputClass} min-h-[100px] resize-none py-2`}
            />
          </label>

          <label className="block">
            <span className="text-sm font-bold text-brand-ink/70">
              Categoría
            </span>
            <select
              name="category"
              className={inputClass}
              defaultValue="Recordatorio"
            >
              <option value="Idea">Idea</option>
              <option value="Recordatorio">Recordatorio</option>
              <option value="Campaña">Campaña</option>
              <option value="Revisión">Revisión</option>
            </select>
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
              Guardar nota
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
