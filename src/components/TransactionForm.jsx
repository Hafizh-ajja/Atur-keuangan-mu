import { PlusCircle, PencilLine, X, Save } from "lucide-react";

const labelCls = "block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5";
const inputCls =
  "w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-[13px] font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-500 transition";

export default function TransactionForm({
  categoriesByType,
  jenis, onJenisChange,
  desk, onDeskChange,
  kategori, onKategoriChange,
  jumlah, onJumlahChange,
  tanggal, onTanggalChange,
  error,
  editingId, onSubmit, onCancelEdit,
}) {
  function handleJumlahInput(e) {
    const digits = e.target.value.replace(/\D/g, "");
    onJumlahChange(digits ? Number(digits).toLocaleString("id-ID") : "");
  }

  return (
    <div
      id="form-transaksi"
      className="rounded-2xl bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/60 ring-1 ring-emerald-100/70 p-5"
    >
      <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-sm shadow-emerald-600/30">
            {editingId != null ? <PencilLine className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />}
          </div>
          <span className="text-[14px] font-bold text-slate-800">
            {editingId != null ? "Edit Transaksi" : "Tambah Transaksi Baru"}
          </span>
          {editingId != null && (
            <span className="text-[11px] font-semibold text-white bg-emerald-600 px-2.5 py-1 rounded-full">
              Sedang mengedit #{editingId}
            </span>
          )}
        </div>
      </div>

      <div className="grid gap-3 mb-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.1fr_1.7fr_1.3fr_1.1fr_1.1fr]">
        <div>
          <label className={labelCls}>Jenis</label>
          <select value={jenis} onChange={(e) => onJenisChange(e.target.value)} className={inputCls}>
            <option value="masuk">Pemasukan</option>
            <option value="keluar">Pengeluaran</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Deskripsi</label>
          <input
            type="text"
            value={desk}
            onChange={(e) => onDeskChange(e.target.value)}
            placeholder="Deskripsi transaksi"
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Kategori</label>
          <select value={kategori} onChange={(e) => onKategoriChange(e.target.value)} className={inputCls}>
            {categoriesByType[jenis].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls}>Jumlah (Rp)</label>
          <input
            type="text"
            value={jumlah}
            onChange={handleJumlahInput}
            placeholder="1.000.000"
            className={inputCls}
          />
          <div className="text-[10.5px] text-slate-400 mt-1">Otomatis format: 1.000.000</div>
        </div>
        <div>
          <label className={labelCls}>Tanggal</label>
          <input type="date" value={tanggal} onChange={(e) => onTanggalChange(e.target.value)} className={inputCls} />
        </div>
      </div>

      {error && (
        <div className="text-[12.5px] font-medium text-red-600 bg-red-50 ring-1 ring-red-100 rounded-lg px-3 py-2 mb-4">
          {error}
        </div>
      )}

      <div className="flex justify-end items-center gap-2">
        {editingId != null && (
          <button
            onClick={onCancelEdit}
            className="h-10 px-4 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 text-[13px] font-semibold inline-flex items-center gap-2 transition"
          >
            <X className="w-4 h-4" />
            Batal
          </button>
        )}
        <button
          onClick={onSubmit}
          className="h-10 px-5 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-[13px] font-bold shadow-md shadow-emerald-600/25 inline-flex items-center gap-2 transition"
        >
          <Save className="w-4 h-4" />
          {editingId != null ? "Simpan Perubahan" : "Simpan Transaksi"}
        </button>
      </div>
    </div>
  );
}
