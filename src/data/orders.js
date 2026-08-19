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
  { id: 1, date: isoDaysAgo(1), customer: "SDN 01 Sukamaju", product: "Lembar Jawaban Siswa", qty: 1200, price: 250, status: "diproses", note: "Kertas HVS, cetak 1 sisi" },
  { id: 2, date: isoDaysAgo(2), customer: "Toko Sumber Rejeki", product: "Nota Bon", qty: 20, price: 18000, status: "baru", note: "Ukuran 1/2 folio, 2 rangkap" },
  { id: 3, date: isoDaysAgo(3), customer: "Kantor Desa Sukamaju", product: "Kop Surat", qty: 2000, price: 150, status: "diproses", note: "Kertas 80 gram" },
  { id: 4, date: isoDaysAgo(5), customer: "Masjid Al-Hidayah", product: "Spanduk", qty: 1, price: 350000, status: "selesai", note: "Ukuran 3 × 1 meter" },
  { id: 5, date: isoDaysAgo(7), customer: "Toko Buku Pintar", product: "Buku Tulis", qty: 1000, price: 3500, status: "diambil", note: "38 lembar, 4 macam isi" },
  { id: 6, date: isoDaysAgo(12), customer: "SDN 02 Sukamaju", product: "Buku Bacaan", qty: 300, price: 8000, status: "diambil", note: "Full colour" },
  { id: 7, date: isoDaysAgo(15), customer: "PKK Desa Sukamaju", product: "Dus Nasi", qty: 250, price: 4500, status: "selesai", note: "Motif bunga" },
  { id: 8, date: isoDaysAgo(20), customer: "Yayasan Pendidikan Insan", product: "Sampul Raport Kalf", qty: 800, price: 1200, status: "diambil", note: "Kalf bening + tulisan" },
  { id: 9, date: isoDaysAgo(26), customer: "Toko Sumber Rejeki", product: "Dus Kue", qty: 150, price: 6000, status: "diambil", note: "Kotak ukuran 20 × 20" },
  { id: 10, date: isoDaysAgo(33), customer: "Kantor Kecamatan", product: "Cetak Kalender", qty: 300, price: 15000, status: "selesai", note: "Kalender duduk + paku" },
  { id: 11, date: isoDaysAgo(45), customer: "Koperasi Unit Desa", product: "Nota Bon", qty: 30, price: 18000, status: "diambil", note: "3 rangkap, bernomor" },
  { id: 12, date: isoDaysAgo(60), customer: "Masjid Baiturrahman", product: "Cetak Kalender", qty: 250, price: 15000, status: "diambil", note: "Kalender meja" },
];
