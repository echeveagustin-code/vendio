import { MdSearch } from "react-icons/md";
import { contentAccounts, contentFormats, contentSortOptions, contentStatuses } from "../../data/contentMockData";

const selectClass =
  "h-10 rounded-xl border border-brand-navy/10 bg-white px-3 text-sm font-semibold text-brand-ink shadow-sm outline-none focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10";

export default function ContentFilters({
  search,
  onSearchChange,
  format,
  onFormatChange,
  account,
  onAccountChange,
  status,
  onStatusChange,
  sort,
  onSortChange,
}) {
  return (
    <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-brand-navy/6 bg-white p-3 sm:flex-row sm:flex-wrap sm:items-center">
      <label className="relative flex-1 sm:min-w-[220px]">
        <MdSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-brand-ink/40" />
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar en tu biblioteca..."
          className="h-10 w-full rounded-xl border border-brand-navy/10 bg-[#f6f7fb] pl-9 pr-3 text-sm font-semibold text-brand-ink outline-none focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10"
        />
      </label>

      <select value={format} onChange={(event) => onFormatChange(event.target.value)} className={selectClass} aria-label="Formato">
        {contentFormats.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>

      <select value={account} onChange={(event) => onAccountChange(event.target.value)} className={selectClass} aria-label="Cuenta">
        {contentAccounts.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>

      <select value={status} onChange={(event) => onStatusChange(event.target.value)} className={selectClass} aria-label="Estado">
        {contentStatuses.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>

      <select value={sort} onChange={(event) => onSortChange(event.target.value)} className={selectClass} aria-label="Ordenar por">
        {contentSortOptions.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}
