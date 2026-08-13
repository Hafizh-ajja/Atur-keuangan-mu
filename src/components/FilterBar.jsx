import { Search, Download, RotateCcw } from "lucide-react";

const TYPE_OPTIONS = [
  { key: "semua", label: "Semua" },
  { key: "masuk", label: "Pemasukan" },
  { key: "keluar", label: "Pengeluaran" },
];

const inputCls =
  "h-10 px-3 rounded-xl border border-slate-200 bg-white text-[13px] font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-500 transition";

export default function FilterBar({
  categories,
  typeFilter, onTypeFilterChange,
  catFilter, onCatFilterChange,
  fromDate, onFromDateChange,
  toDate, onToDateChange,
  search, onSearchChange,
  onExport, onReset,
}) {
  return (
    <div className="flex items-center gap-2.5 flex-wrap mb-5">
      <div className="inline-flex bg-slate-100 p-1 rounded-xl">
        {TYPE_OPTIONS.map((opt) => (
          <button
            key={opt.key}
            onClick={() => onTypeFilterChange(opt.key)}
            className={
              "px-3.5 py-1.5 rounded-lg text-[12.5px] font-semibold transition " +
              (typeFilter === opt.key
                ? "bg-white text-emerald-700 shadow-sm ring-1 ring-slate-900/5"
                : "text-slate-500 hover:text-slate-700")
            }
          >
            {opt.label}
          </button>
        ))}
      </div>

      <select value={catFilter} onChange={(e) => onCatFilterChange(e.target.value)} className={inputCls}>
        <option value="semua">Semua kategori</option>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <input type="date" value={fromDate} onChange={(e) => onFromDateChange(e.target.value)} className={inputCls} />
      <span className="text-[12.5px] text-slate-400 font-medium">s/d</span>
      <input type="date" value={toDate} onChange={(e) => onToDateChange(e.target.value)} className={inputCls} />

      <div className="relative flex-1 sm:flex-none min-w-[170px]">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari transaksi…"
          className={inputCls + " pl-9 w-full"}
        />
      </div>

      <div className="flex-1" />

      <button
        onClick={onExport}
        className="h-10 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[13px] font-semibold shadow-sm shadow-emerald-600/25 inline-flex items-center gap-2 transition"
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
