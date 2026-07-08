import { platformBadgeStyles, platformIcons } from "../../data/accountsMockData";

export default function ConnectPlatformCard({ platform, description, connectedCount, cta, onConnect }) {
  return (
    <article className="flex flex-col rounded-2xl border border-brand-navy/8 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${platformBadgeStyles[platform] ?? "bg-[#f6f7fb]"}`}>
          {platformIcons[platform] ?? "🔗"}
        </div>
        {connectedCount > 0 && (
          <span className="rounded-full bg-brand-navy/8 px-2.5 py-1 text-[11px] font-bold text-brand-navy">
            {connectedCount} conectada{connectedCount !== 1 ? "s" : ""}
          </span>
        )}
      </div>
      <h3 className="mt-4 font-display text-lg font-extrabold text-brand-navy">{platform}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-brand-ink/55">{description}</p>
      <button
        type="button"
        onClick={() => onConnect(platform)}
        className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-xl bg-brand-navy px-4 text-sm font-bold text-white shadow-soft transition hover:bg-[#0f3b8f]"
      >
        {cta}
      </button>
    </article>
  );
}
