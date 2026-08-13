# Keuangan Masjid — Dummy (React)

Website dummy untuk mengatur keuangan masjid. Dibangun dengan React + Vite,
Tailwind CSS (PostCSS build), Recharts untuk grafik, dan lucide-react untuk ikon.

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
├── index.css                   entry Tailwind (via PostCSS)
├── App.jsx                     menyusun state & merangkai komponen
├── data/
│   ├── categories.js           daftar kategori pemasukan/pengeluaran
│   └── transactions.js         data transaksi awal (dummy, tanggal relatif hari ini)
├── utils/
│   └── format.js               rupiah(), monthKey(), formatDateLabel(), formatDateTimeLabel()
└── components/
    ├── TopBar.jsx              header dengan info user
    ├── PageHeader.jsx          judul halaman + badge tanggal
    ├── StatCard.jsx            kartu metrik + StatGrid (grid kartu)
    ├── TrendChart.jsx          grafik tren 6 bulan (Recharts)
    ├── CategoryPie.jsx         donut pengeluaran per kategori bulan ini
    ├── CategoryTag.jsx         badge kategori transaksi
    ├── FilterBar.jsx           filter jenis/kategori/tanggal/search + export
    ├── TransactionForm.jsx     form tambah/edit transaksi
    └── TransactionTable.jsx    tabel transaksi + aksi edit/hapus (dengan konfirmasi)
```

Setiap komponen menerima data lewat props dan tidak menyimpan state
sendiri (kecuali di dalam `App.jsx`), jadi mudah dipakai ulang atau
dites secara terpisah — misalnya `StatCard` atau `CategoryTag` bisa
langsung dipakai di halaman lain.

## Catatan

- **Data dummy**: tanggal transaksi dihitung relatif terhadap hari ini,
  jadi dashboard selalu tampak hidup dan statistik "bulan ini" selalu benar.
- **Persistensi**: transaksi disimpan otomatis di `localStorage` browser.
  Hapus key `keuangan-masjid:transactions` untuk kembali ke data dummy awal.
- **Tailwind**: dikompilasi via PostCSS (`tailwind.config.js`,
  `postcss.config.js`) — bukan CDN, sehingga siap produksi dan offline.
