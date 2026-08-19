// Membuat tanggal ISO lokal (YYYY-MM-DD), mundur N hari dari hari ini
function isoDaysAgo(daysAgo) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const now = new Date();
export const NOW_MONTH = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

// Data dummy — tanggal dihitung relatif terhadap hari ini agar dashboard
// selalu tampak hidup (grafik, statistik bulan ini, dan filter langsung terisi).
// Pemasukan utama dihitung otomatis dari permintaan; transaksi di sini mencatat
// pengeluaran (bahan habis pakai, operasional) dan pemasukan tambahan (walk-in).
export const INITIAL_TRANSACTIONS = [
  { id: 1, date: isoDaysAgo(1), type: "keluar", cat: "Bahan Habis Pakai", desc: "Beli kertas HVS A4 5 rim", amount: 425000 },
  { id: 2, date: isoDaysAgo(4), type: "keluar", cat: "Kertas & Tinta", desc: "Isi ulang tinta printer", amount: 180000 },
  { id: 3, date: isoDaysAgo(6), type: "keluar", cat: "Bahan Habis Pakai", desc: "Beli karton & mika dus kue", amount: 300000 },
  { id: 4, date: isoDaysAgo(8), type: "masuk", cat: "Penjualan Barang", desc: "Penjualan nota bon tunai di toko", amount: 180000 },
  { id: 5, date: isoDaysAgo(10), type: "keluar", cat: "Transport & Kirim", desc: "Transport antar spanduk", amount: 50000 },
  { id: 6, date: isoDaysAgo(14), type: "keluar", cat: "Operasional", desc: "Listrik & air bulanan", amount: 350000 },
  { id: 7, date: isoDaysAgo(18), type: "keluar", cat: "Bahan Habis Pakai", desc: "Beli lem & plastik packing", amount: 95000 },
  { id: 8, date: isoDaysAgo(22), type: "masuk", cat: "Jasa Cetak", desc: "Jasa cetak undangan (walk-in)", amount: 450000 },
  { id: 9, date: isoDaysAgo(25), type: "keluar", cat: "Operasional", desc: "Honor karyawan 2 orang", amount: 1200000 },
  { id: 10, date: isoDaysAgo(32), type: "keluar", cat: "Kertas & Tinta", desc: "Beli tinta & toner", amount: 420000 },
  { id: 11, date: isoDaysAgo(40), type: "keluar", cat: "Operasional", desc: "Servis & pelumas mesin cetak", amount: 75000 },
  { id: 12, date: isoDaysAgo(55), type: "keluar", cat: "Bahan Habis Pakai", desc: "Beli kertas buram 3 rim", amount: 285000 },
];
