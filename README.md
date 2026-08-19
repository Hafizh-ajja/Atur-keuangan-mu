# Percetakan Pak Abas — Website Permintaan (Dummy)

Website permintaan (order) untuk usaha percetakan milik Pak Abas. Dibangun
dengan React + Vite, Tailwind CSS (PostCSS build), Recharts untuk grafik,
dan lucide-react untuk ikon.

Fitur yang menjawab kebutuhan klien:

- **Permintaan tidak ribet** — catat permintaan cetak (pelanggan, produk,
  jumlah, harga), ubah status dengan sekali klik (Baru → Diproses → Selesai
  → Diambil), dan export ke spreadsheet.
- **Multi device** — tampilan responsif untuk HP & laptop; cukup di-hosting
  agar bisa diakses dari mana saja.
- **Laporan bulanan** — tab Laporan: ringkasan pemasukan, pengeluaran, dan
  selisih per bulan, lengkap dengan rincian per produk & per kategori,
  bisa di-export ke CSV.
- **Pemasukan & pengeluaran** — pemasukan dihitung otomatis dari nilai
  permintaan + pemasukan lain yang dicatat manual; pengeluaran mencatat
  bahan habis pakai (kertas, tinta, dll) dan operasional.

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
├── App.jsx                     menyusun state & merangkai 4 tab
├── data/
│   ├── products.js             daftar produk & jasa percetakan
│   ├── orders.js               data permintaan awal + status (dummy, tanggal relatif)
│   ├── categories.js           kategori pemasukan/pengeluaran
│   └── transactions.js         data transaksi awal (dummy, tanggal relatif)
├── utils/
│   └── format.js               rupiah(), monthKey(), formatMonthLabel(), dst.
└── components/
    ├── PageHeader.jsx          header dengan identitas usaha
    ├── NavTabs.jsx             navigasi 4 tab (Ringkasan, Permintaan, Keuangan, Laporan)
    ├── StatCard.jsx            kartu metrik + StatGrid (grid kartu)
    ├── TrendChart.jsx          grafik tren 6 bulan (Recharts)
    ├── CategoryPie.jsx         donut pengeluaran per kategori bulan ini
    ├── CategoryTag.jsx         badge kategori transaksi
    ├── FilterBar.jsx           filter keuangan + export
    ├── TransactionForm.jsx     form tambah/edit transaksi
    ├── TransactionTable.jsx    tabel transaksi + aksi edit/hapus
    ├── OrderFilter.jsx         filter permintaan (status, produk, tanggal, cari)
    ├── OrderForm.jsx           form tambah/edit permintaan + total otomatis
    ├── OrderTable.jsx          tabel permintaan + ubah status cepat
    ├── StatusBadge.jsx         badge/select status permintaan
    └── ReportView.jsx          laporan bulanan + export CSV
```

Setiap komponen menerima data lewat props dan tidak menyimpan state
sendiri (kecuali di dalam `App.jsx`), jadi mudah dipakai ulang atau
dites secara terpisah.

## Catatan

- **Data dummy**: tanggal permintaan & transaksi dihitung relatif terhadap
  hari ini, jadi dashboard selalu tampak hidup dan statistik "bulan ini"
  selalu benar.
- **Persistensi**: data disimpan otomatis di `localStorage` browser dengan
  key `percetakan-pak-abas:orders` dan `percetakan-pak-abas:transactions`.
  Hapus key tersebut untuk kembali ke data dummy awal.
- **Multi device**: karena memakai `localStorage`, data tersimpan per
  perangkat/browser. Agar benar-benar sinkron antar perangkat (HP & laptop),
  aplikasi perlu dihubungkan ke backend — ini langkah lanjutan yang
  disarankan bila Pak Abas ingin data terpusat.
- **Tailwind**: dikompilasi via PostCSS (`tailwind.config.js`,
  `postcss.config.js`) — bukan CDN, sehingga siap produksi dan offline.
