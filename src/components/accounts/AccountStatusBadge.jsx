export default function AccountStatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-lg px-2.5 py-1 text-[11px] font-extrabold ring-1 ring-inset ${
        {
          Activa: "bg-emerald-50 text-emerald-700 ring-emerald-200",
          Pendiente: "bg-amber-50 text-amber-700 ring-amber-200",
          Error: "bg-rose-50 text-rose-700 ring-rose-200",
          "Token vencido": "bg-orange-50 text-orange-700 ring-orange-200",
          Desactivada: "bg-slate-100 text-slate-600 ring-slate-200",
        }[status] ?? "bg-slate-100 text-slate-600 ring-slate-200"
      }`}
    >
      {status}
    </span>
  );
}
