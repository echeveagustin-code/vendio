import { contentTabs } from "../../data/contentMockData";

export default function ContentTabs({ activeTab, onTabChange }) {
  return (
    <div className="flex gap-1 overflow-x-auto rounded-xl border border-brand-navy/8 bg-white p-1 shadow-sm scrollbar-thin">
      {contentTabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onTabChange(tab.id)}
          className={`shrink-0 rounded-lg px-3 py-2 text-xs font-bold transition sm:px-4 sm:text-sm ${
            activeTab === tab.id
              ? "bg-brand-navy text-white shadow-sm"
              : "text-brand-ink/60 hover:bg-[#f6f7fb] hover:text-brand-navy"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
