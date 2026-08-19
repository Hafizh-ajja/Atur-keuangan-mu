import { LayoutDashboard, ClipboardList, Wallet, FileBarChart2, PenTool } from "lucide-react";

const TABS = [
  { key: "ringkasan", label: "Ringkasan", icon: LayoutDashboard },
  { key: "input", label: "Input Data", icon: PenTool },
  { key: "permintaan", label: "Permintaan", icon: ClipboardList },
  { key: "keuangan", label: "Keuangan", icon: Wallet },
  { key: "laporan", label: "Laporan", icon: FileBarChart2 },
];

export default function NavTabs({ tab, onChange, orderCount }) {
  return (
    <div className="rounded-2xl bg-white shadow-card ring-1 ring-slate-900/5 p-1.5 mb-6 flex items-center gap-1 overflow-x-auto scrollbar-thin">
      {TABS.map((t) => {
        const Icon = t.icon;
        const active = tab === t.key;
        return (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            className={
              "relative flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-[13px] font-bold transition whitespace-nowrap " +
              (active
                ? "bg-gradient-to-br from-indigo-600 to-blue-700 text-white shadow-md shadow-indigo-600/25"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-50")
            }
          >
            <Icon className="w-4 h-4" />
            {t.label}
            {t.key === "permintaan" && (
              <span
                className={
                  "text-[10px] font-extrabold rounded-full px-1.5 py-0.5 " +
                  (active ? "bg-white/20 text-white" : "bg-indigo-50 text-indigo-700")
                }
              >
                {orderCount}
              </span>
            )}
            {t.key === "input" && (
              <span
                className={
                  "text-[10px] font-extrabold rounded-full px-1.5 py-0.5 ml-1 " +
                  (active ? "bg-white/20 text-white" : "bg-emerald-50 text-emerald-700")
                }
              >
                ✏️
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
