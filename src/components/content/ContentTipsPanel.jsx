import { MdAutoAwesome, MdFolderOpen, MdSchedule } from "react-icons/md";
import { contentTips } from "../../data/contentMockData";

const tipIconMap = {
  MdSchedule,
  MdAutoAwesome,
  MdFolderOpen,
};

export default function ContentTipsPanel() {
  return (
    <aside className="rounded-2xl border border-brand-navy/6 bg-white p-4 shadow-sm">
      <h2 className="font-display text-base font-extrabold text-brand-navy">Sugerencias para vos</h2>
      <p className="mt-1 text-sm text-brand-ink/55">Ideas rápidas basadas en tu biblioteca.</p>

      <ul className="mt-4 space-y-3">
        {contentTips.map((tip) => {
          const Icon = tipIconMap[tip.icon];
          return (
            <li key={tip.id} className="flex gap-3 rounded-xl bg-[#f6f7fb] p-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-brand-navy shadow-sm">
                {Icon && <Icon className="text-lg" />}
              </span>
              <div>
                <p className="text-sm font-bold text-brand-ink">{tip.title}</p>
                <p className="mt-0.5 text-xs leading-5 text-brand-ink/55">{tip.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
