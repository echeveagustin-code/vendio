export default function ConnectPlatformCard({ platform, onConnect }) {
  return (
    <article className="flex min-h-[220px] flex-col rounded-2xl border border-brand-navy/6 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-navy text-sm font-extrabold text-white">{platform.icon}</span>
        <span className="rounded-full bg-[#f6f7fb] px-2.5 py-1 text-xs font-extrabold text-brand-ink/60">
          {platform.connectedCount} conectadas
        </span>
      </div>
      <h3 className="mt-5 font-display text-xl font-extrabold text-brand-navy">{platform.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-brand-ink/58">{platform.description}</p>
      <button
        type="button"
        onClick={() => onConnect(platform.name)}
        className="mt-5 inline-flex h-10 items-center justify-center rounded-xl border border-brand-navy/12 bg-white px-4 text-sm font-bold text-brand-navy transition hover:bg-[#f6f7fb]"
      >
        {platform.buttonLabel}
      </button>
    </article>
  );
}
