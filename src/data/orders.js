// Membuat tanggal ISO lokal (YYYY-MM-DD), mundur N hari dari hari ini
function isoDaysAgo(daysAgo) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// Status alur pengerjaan permintaan cetak
export const ORDER_STATUSES = [
  { key: "baru", label: "Baru" },
  { key: "diproses", label: "Diproses" },
  { key: "selesai", label: "Selesai" },
  { key: "diambil", label: "Diambil" },
];

export const orderStatusLabel = (key) =>
  ORDER_STATUSES.find((s) => s.key === key)?.label || key;

// Data dummy — tanggal dihitung relatif terhadap hari ini agar dashboard
// selalu tampak hidup (grafik, statistik bulan ini, dan filter langsung terisi).
// Total permintaan = jumlah × harga satuan.
export const INITIAL_ORDERS = [
  
];
