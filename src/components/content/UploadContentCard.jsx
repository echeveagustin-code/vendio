export default function UploadContentCard({ onUpload, onCreateDraft }) {
  return (
    <section className="rounded-2xl border-2 border-dashed border-brand-navy/15 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col items-center text-center lg:flex-row lg:items-start lg:gap-8 lg:text-left">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-navy/8 text-3xl">
          ⬆️
        </div>

        <div className="mt-5 flex-1 lg:mt-0">
          <h2 className="font-display text-xl font-extrabold text-brand-navy">Subí un nuevo video</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-brand-ink/55">
            Arrastrá tu archivo o seleccioná un video para programarlo, analizarlo o guardarlo como borrador.
          </p>
          <p className="mt-2 text-xs font-semibold text-brand-ink/40">MP4, MOV o WebM hasta 1GB</p>

          <div className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start">
            <button
              type="button"
              onClick={onUpload}
              className="inline-flex h-10 items-center justify-center rounded-xl bg-brand-navy px-5 text-sm font-bold text-white shadow-soft transition hover:-translate-y-0.5"
            >
              Seleccionar archivo
            </button>
            <button type="button" className="inline-flex h-10 items-center justify-center rounded-xl border border-brand-navy/12 bg-white px-4 text-sm font-bold text-brand-navy transition hover:bg-[#f6f7fb]">
              Programar publicación
            </button>
            <button type="button" onClick={onCreateDraft} className="inline-flex h-10 items-center justify-center rounded-xl border border-brand-navy/12 bg-white px-4 text-sm font-bold text-brand-navy transition hover:bg-[#f6f7fb]">
              Guardar como borrador
            </button>
            <button type="button" className="inline-flex h-10 items-center justify-center rounded-xl border border-brand-navy/12 bg-white px-4 text-sm font-bold text-brand-navy transition hover:bg-[#f6f7fb]">
              Analizar rendimiento
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
