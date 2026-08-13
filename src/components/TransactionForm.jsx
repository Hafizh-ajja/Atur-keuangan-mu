export default function TransactionForm({
  categoriesByType,
  jenis, onJenisChange,
  desk, onDeskChange,
  kategori, onKategoriChange,
  jumlah, onJumlahChange,
  tanggal, onTanggalChange,
  error,
  onSubmit,
}) {
  function handleJumlahInput(e) {
    const digits = e.target.value.replace(/\D/g, "");
    onJumlahChange(digits ? Number(digits).toLocaleString("id-ID") : "");
  }

  return (
    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5">
      <div className="grid gap-3 mb-4" style={{ gridTemplateColumns: "1.1fr 1.7fr 1.3fr 1.1fr 1.1fr" }}>
        <div>
          <label className="block text-[11.5px] font-semibold text-gray-500 mb-1.5">Jenis</label>
          <select
            value={jenis}
            onChange={(e) => onJenisChange(e.target.value)}
            className="w-full text-[13px] px-2.5 py-2 rounded-lg border border-gray-200"
          >
            <option value="masuk">Pemasukan</option>
            <option value="keluar">Pengeluaran</option>
          </select>
        </div>
        <div>
          <label className="block text-[11.5px] font-semibold text-gray-500 mb-1.5">Deskripsi</label>
          <input
            type="text"
            value={desk}
            onChange={(e) => onDeskChange(e.target.value)}
            placeholder="Deskripsi transaksi"
            className="w-full text-[13px] px-2.5 py-2 rounded-lg border border-gray-200"
          />
        </div>
        <div>
          <label className="block text-[11.5px] font-semibold text-gray-500 mb-1.5">Kategori</label>
          <select
            value={kategori}
            onChange={(e) => onKategoriChange(e.target.value)}
            className="w-full text-[13px] px-2.5 py-2 rounded-lg border border-gray-200"
          >
            {categoriesByType[jenis].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-[11.5px] font-semibold text-gray-500 mb-1.5">Jumlah (Rp)</label>
          <input
            type="text"
            value={jumlah}
            onChange={handleJumlahInput}
            placeholder="1.000.000"
            className="w-full text-[13px] px-2.5 py-2 rounded-lg border border-gray-200"
          />
          <div className="text-[10.5px] text-gray-400 mt-1">Otomatis format: 1.000.000</div>
        </div>
        <div>
          <label className="block text-[11.5px] font-semibold text-gray-500 mb-1.5">Tanggal</label>
          <input
            type="date"
            value={tanggal}
            onChange={(e) => onTanggalChange(e.target.value)}
            className="w-full text-[13px] px-2.5 py-2 rounded-lg border border-gray-200"
          />
        </div>
      </div>

      {error && <div className="text-[12.5px] text-red-600 mb-3">{error}</div>}

      <div className="flex justify-end">
        <button
          onClick={onSubmit}
          className="bg-emerald-600 hover:bg-emerald-700 text-white text-[13px] font-semibold rounded-lg px-5 py-2.5"
        >
          Simpan Transaksi
        </button>
      </div>
    </div>
  );
}
