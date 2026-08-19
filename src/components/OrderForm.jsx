import { PlusCircle, PencilLine, X, Save } from "lucide-react";
import { PRODUCTS } from "../data/products";
import { ORDER_STATUSES } from "../data/orders";
import { rupiah } from "../utils/format";

const labelCls = "block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5";
const inputCls =
  "w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-[13px] font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-500 transition";

export default function OrderForm({
  tanggal, onTanggalChange,
  pelanggan, onPelangganChange,
  produk, onProdukChange,
  jumlah, onJumlahChange,
  harga, onHargaChange,
  status, onStatusChange,
  catatan, onCatatanChange,
  error,
  editingId, onSubmit, onCancelEdit,
}) {
  function handleHargaInput(e) {
    const digits = e.target.value.replace(/\D/g, "");
    onHargaChange(digits ? Number(digits).toLocaleString("id-ID") : "");
  }

  const qty = Number(jumlah) || 0;
  const price = Number(harga.replace(/\D/g, "")) || 0;
  const total = qty * price;

  return (
    <div
      id="form-permintaan"
      className="rounded-2xl bg-gradient-to-br from-indigo-50/80 via-white to-sky-50/60 ring-1 ring-indigo-100/70 p-5"
    >
      <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-sm shadow-indigo-600/30">
            {editingId != null ? <PencilLine className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />}
          </div>
          <span className="text-[14px] font-bold text-slate-800">
            {editingId != null ? "Edit Permintaan" : "Tambah Permintaan Baru"}
          </span>
          {editingId != null && (
            <span className="text-[11px] font-semibold text-white bg-indigo-600 px-2.5 py-1 rounded-full">
              Sedang mengedit #{editingId}
            </span>
          )}
        </div>
      </div>

      <div className="grid gap-3 mb-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[0.95fr_1.6fr_1.5fr_0.8fr_1.2fr_0.95fr]">
        <div>
          <label className={labelCls}>Tanggal</label>
          <input type="date" value={tanggal} onChange={(e) => onTanggalChange(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Pelanggan</label>
          <input
            type="text"
            value={pelanggan}
            onChange={(e) => onPelangganChange(e.target.value)}
            placeholder="Nama pelanggan / instansi"
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Produk / Jasa</label>
          <select value={produk} onChange={(e) => onProdukChange(e.target.value)} className={inputCls}>
            {PRODUCTS.map((p) => (
              <option key={p.name} value={p.name}>{p.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelCls}>Jumlah</label>
          <input
            type="number"
            min="1"
            value={jumlah}
            onChange={(e) => onJumlahChange(e.target.value)}
            placeholder="1"
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Harga Satuan (Rp)</label>
          <input
            type="text"
            value={harga}
            onChange={handleHargaInput}
            placeholder="15.000"
            className={inputCls}
          />
          <div className="text-[10.5px] text-slate-400 mt-1">Otomatis format: 15.000</div>
        </div>
        <div>
          <label className={labelCls}>Status</label>
          <select value={status} onChange={(e) => onStatusChange(e.target.value)} className={inputCls}>
            {ORDER_STATUSES.map((s) => (
              <option key={s.key} value={s.key}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-xl bg-white ring-1 ring-slate-200 px-4 py-2.5 mb-3">
        <span className="text-[12px] font-bold uppercase tracking-wider text-slate-500">Total Permintaan</span>
        <span className="text-[16px] font-extrabold text-indigo-700 tabular-nums">{rupiah(total)}</span>
      </div>

      <div className="mb-4">
        <label className={labelCls}>Catatan</label>
        <input
          type="text"
          value={catatan}
          onChange={(e) => onCatatanChange(e.target.value)}
          placeholder="Contoh: kertas 80 gram, ukuran, rangkap…"
          className={inputCls}
        />
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
          className="h-10 px-5 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-700 hover:from-indigo-700 hover:to-blue-700 text-white text-[13px] font-bold shadow-md shadow-indigo-600/25 inline-flex items-center gap-2 transition"
        >
          <Save className="w-4 h-4" />
          {editingId != null ? "Simpan Perubahan" : "Simpan Permintaan"}
        </button>
      </div>
    </div>
  );
}
