const TYPE_OPTIONS = [
  { key: "semua", label: "Semua" },
  { key: "masuk", label: "Pemasukan" },
  { key: "keluar", label: "Pengeluaran" },
];

export default function FilterBar({
  categories,
  typeFilter, onTypeFilterChange,
  catFilter, onCatFilterChange,
  fromDate, onFromDateChange,
  toDate, onToDateChange,
  onExport, onReset,
}) {
  return (
    <div className="flex items-center gap-2.5 flex-wrap mb-5">
      <div className="inline-flex bg-gray-100 rounded-lg p-1">
        {TYPE_OPTIONS.map((opt) => (
          <button
            key={opt.key}
            onClick={() => onTypeFilterChange(opt.key)}
            className={
              "px-3.5 py-1.5 rounded-md text-[12.5px] font-semibold " +
              (typeFilter === opt.key ? "bg-white text-gray-900 shadow-sm" : "text-gray-500")
            }
          >
            {opt.label}
          </button>
        ))}
      </div>

      <select
        value={catFilter}
        onChange={(e) => onCatFilterChange(e.target.value)}
        className="text-[13px] px-2.5 py-2 rounded-lg border border-gray-200"
      >
        <option value="semua">Semua kategori</option>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <input
        type="date"
        value={fromDate}
        onChange={(e) => onFromDateChange(e.target.value)}
        className="text-[13px] px-2.5 py-2 rounded-lg border border-gray-200"
      />
      <span className="text-[12.5px] text-gray-400">s/d</span>
      <input
        type="date"
        value={toDate}
        onChange={(e) => onToDateChange(e.target.value)}
        className="text-[13px] px-2.5 py-2 rounded-lg border border-gray-200"
      />

      <div className="flex-1" />

      <button
        onClick={onExport}
        className="text-[13px] font-semibold px-3.5 py-2 rounded-lg border border-gray-200 hover:bg-gray-50"
      >
        Export Spreadsheet
      </button>
      <button
        onClick={onReset}
        className="text-[13px] font-semibold px-3.5 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
      >
        Batal
      </button>
    </div>
  );
}
