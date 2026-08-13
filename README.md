# Keuangan Masjid — Dummy (React)

Website dummy untuk mengatur keuangan masjid. Dibangun dengan React + Vite,
Tailwind CSS (via CDN), Recharts untuk grafik, dan lucide-react untuk ikon.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Lalu buka `http://localhost:5173` di browser.

## Build untuk produksi

```bash
npm run build
npm run preview
```

## Struktur

```
src/
├── main.jsx                    entry point React
├── App.jsx                     menyusun state & merangkai komponen
├── data/
│   ├── categories.js           daftar kategori pemasukan/pengeluaran
│   └── transactions.js         data transaksi awal (dummy)
├── utils/
│   └── format.js                rupiah(), monthKey(), formatDateLabel()
└── components/
    ├── TopBar.jsx               header dengan info user
    ├── PageHeader.jsx           judul halaman + badge tanggal
    ├── StatCard.jsx             kartu metrik + StatGrid (grid kartu)
    ├── TrendChart.jsx           grafik tren 6 bulan (Recharts)
    ├── CategoryTag.jsx          badge kategori transaksi
    ├── FilterBar.jsx            filter jenis/kategori/tanggal + export
    ├── TransactionForm.jsx      form tambah transaksi
    └── TransactionTable.jsx     tabel transaksi + aksi hapus
```

Setiap komponen menerima data lewat props dan tidak menyimpan state
sendiri (kecuali di dalam `App.jsx`), jadi mudah dipakai ulang atau
dites secara terpisah — misalnya `StatCard` atau `CategoryTag` bisa
langsung dipakai di halaman lain.

## Catatan

Semua data transaksi disimpan di state React (dummy, in-memory) — akan
kembali ke data awal setiap kali halaman di-refresh. Untuk data yang
persisten, sambungkan `App.jsx` ke backend/database sesuai kebutuhan.
