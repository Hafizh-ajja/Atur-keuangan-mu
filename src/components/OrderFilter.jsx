import { Search, Download, RotateCcw } from "lucide-react";
import { PRODUCTS } from "../data/products";
import { ORDER_STATUSES } from "../data/orders";

const inputCls =
  "h-10 px-3 rounded-xl border border-slate-200 bg-white text-[13px] font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-500 transition";

const STATUS_ACTIVE = {
  semua: "bg-white text-indigo-700 shadow-sm ring-1 ring-slate-900/5",
  baru: "bg-white text-sky-700 shadow-sm ring-1 ring-slate-900/5",
  diproses: "bg-white text-amber-700 shadow-sm ring-1 ring-slate-900/5",
  selesai: "bg-white text-emerald-700 shadow-sm ring-1 ring-slate-900/5",
  diambil: "bg-white text-indigo-700 shadow-sm ring-1 ring-slate-900/5",
};

export default function OrderFilter({
  status, onStatusChange,
  produk, onProdukChange,
  from, onFromChange,
  to, onToChange,
  search, onSearchChange,
  onExport, onReset,
}) {
  return (
    <div className="flex items-center gap-2.5 flex-wrap mb-5">
      <div className="inline-flex bg-slate-100 p-1 rounded-xl flex-wrap">
        <button
          onClick={() => onStatusChange("semua")}
          className={
            "px-3.5 py-1.5 rounded-lg text-[12.5px] font-semibold transition " +
            (status === "semua" ? STATUS_ACTIVE.semua : "text-slate-500 hover:text-slate-700")
          }
        >
          Semua
        </button>
        {ORDER_STATUSES.map((s) => (
          <button
            key={s.key}
            onClick={() => onStatusChange(s.key)}
            className={
              "px-3.5 py-1.5 rounded-lg text-[12.5px] font-semibold transition " +
              (status === s.key ? STATUS_ACTIVE[s.key] : "text-slate-500 hover:text-slate-700")
            }
          >
            {s.label}
          </button>
        ))}
      </div>

      <select value={produk} onChange={(e) => onProdukChange(e.target.value)} className={inputCls}>
        <option value="semua">Semua produk</option>
        {PRODUCTS.map((p) => (
          <option key={p.name} value={p.name}>{p.name}</option>
        ))}
      </select>

      <input type="date" value={from} onChange={(e) => onFromChange(e.target.value)} className={inputCls} />
      <span className="text-[12.5px] text-slate-400 font-medium">s/d</span>
      <input type="date" value={to} onChange={(e) => onToChange(e.target.value)} className={inputCls} />

      <div className="relative flex-1 sm:flex-none min-w-[170px]">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari pelanggan / produk…"
          className={inputCls + " pl-9 w-full"}
        />
      </div>

      <div className="flex-1" />

      <button
        onClick={onExport}
        className="h-10 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[13px] font-semibold shadow-sm shadow-indigo-600/25 inline-flex items-center gap-2 transition"
      >
        <Download className="w-4 h-4" />
        Export Spreadsheet
      </button>
      <button
        onClick={onReset}
        className="h-10 px-4 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-[13px] font-semibold inline-flex items-center gap-2 transition"
      >
        <RotateCcw className="w-4 h-4" />
        Reset Filter
      </button>
    </div>
  );
}
