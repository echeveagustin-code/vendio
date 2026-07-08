import { platformStyles, statusStyles } from "../../data/accountsMockData";

export default function AccountStatusBadge({ children, type = "status" }) {
  const styles = type === "platform" ? platformStyles : statusStyles;

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-extrabold ring-1 ${styles[children] ?? "bg-slate-100 text-slate-600 ring-slate-200"}`}>
      {children}
    </span>
  );
}
