import ScheduledPostChip from "./ScheduledPostChip";
import NoteChip from "./NoteChip";
import { getDayLabel } from "../../data/calendarMockData";

export default function DayDetailPanel({ year, month, day, posts, notes, onSchedule, onAddNote }) {
  const activeAccounts = new Set(posts.map((p) => p.account)).size;

  return (
    <aside className="flex flex-col rounded-2xl border border-brand-navy/8 bg-white shadow-sm lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto">
      <div className="border-b border-brand-navy/8 p-5">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-ink/40">Detalle del día</p>
        <h2 className="mt-1 font-display text-xl font-extrabold text-brand-navy">{getDayLabel(year, month, day)}</h2>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            [posts.length, "publicaciones"],
            [notes.length, "notas"],
            [activeAccounts || (posts.length > 0 ? 1 : 0), "cuentas"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-xl bg-[#f6f7fb] px-2 py-2.5 text-center">
              <p className="font-display text-lg font-extrabold text-brand-navy">{value}</p>
              <p className="text-[10px] font-semibold text-brand-ink/50">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 space-y-5 p-5">
        <section>
          <h3 className="text-sm font-extrabold text-brand-navy">Publicaciones</h3>
          {posts.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {posts.map((post) => (
                <li key={post.id}>
                  <div className="rounded-xl border border-brand-navy/6 bg-[#f6f7fb] p-3">
                    <ScheduledPostChip {...post} />
                    <p className="mt-2 text-xs font-semibold text-brand-ink/55">{post.title}</p>
                    <p className="text-[11px] text-brand-ink/40">{post.account}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-brand-ink/45">No hay publicaciones programadas para este día.</p>
          )}
        </section>

        <section>
          <h3 className="text-sm font-extrabold text-brand-navy">Notas</h3>
          {notes.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {notes.map((note) => (
                <li key={note.id}>
                  <NoteChip {...note} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-brand-ink/45">No hay notas para este día.</p>
          )}
        </section>
      </div>

      <div className="flex flex-col gap-2 border-t border-brand-navy/8 p-5 sm:flex-row lg:flex-col">
        <button
          type="button"
          onClick={onSchedule}
          className="inline-flex h-10 flex-1 items-center justify-center rounded-xl bg-brand-navy px-4 text-sm font-bold text-white shadow-soft transition hover:-translate-y-0.5"
        >
          Programar contenido
        </button>
        <button
          type="button"
          onClick={onAddNote}
          className="inline-flex h-10 flex-1 items-center justify-center rounded-xl border border-brand-navy/12 bg-white px-4 text-sm font-bold text-brand-navy transition hover:bg-[#f6f7fb]"
        >
          Agregar nota
        </button>
      </div>
    </aside>
  );
}
