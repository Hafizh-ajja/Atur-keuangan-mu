import { useState, useMemo, useEffect } from "react";
import { Wallet, ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";

import PageHeader from "./components/PageHeader";
import StatGrid from "./components/StatCard";
import TrendChart from "./components/TrendChart";
import CategoryPie from "./components/CategoryPie";
import FilterBar from "./components/FilterBar";
import TransactionForm from "./components/TransactionForm";
import TransactionTable from "./components/TransactionTable";

import { CATEGORIES, ALL_CATEGORIES } from "./data/categories";
import { INITIAL_TRANSACTIONS, NOW_MONTH } from "./data/transactions";
import { rupiah, monthKey, formatDateTimeLabel } from "./utils/format";

const STORAGE_KEY = "keuangan-masjid:transactions";

function loadInitialTransactions() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // penyimpanan tidak tersedia — fallback ke data dummy
  }
  return INITIAL_TRANSACTIONS;
}

export default function App() {
  const [transactions, setTransactions] = useState(loadInitialTransactions);

  const [typeFilter, setTypeFilter] = useState("semua");
  const [catFilter, setCatFilter] = useState("semua");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [search, setSearch] = useState("");

  const [fJenis, setFJenis] = useState("masuk");
  const [fDesk, setFDesk] = useState("");
  const [fKategori, setFKategori] = useState(CATEGORIES.masuk[0]);
  const [fJumlah, setFJumlah] = useState("");
  const [fTanggal, setFTanggal] = useState("");
  const [formError, setFormError] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Simpan otomatis ke localStorage agar data tidak hilang saat refresh
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    } catch {
      // penyimpanan penuh / tidak tersedia — abaikan
    }
  }, [transactions]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return transactions
      .filter((t) => {
        if (typeFilter !== "semua" && t.type !== typeFilter) return false;
        if (catFilter !== "semua" && t.cat !== catFilter) return false;
        if (fromDate && t.date < fromDate) return false;
        if (toDate && t.date > toDate) return false;
        if (q && !t.desc.toLowerCase().includes(q)) return false;
        return true;
      })
      .sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id);
  }, [transactions, typeFilter, catFilter, fromDate, toDate, search]);

  const stats = useMemo(() => {
    const saldo = transactions.reduce((s, t) => s + (t.type === "masuk" ? t.amount : -t.amount), 0);
    const thisMonth = transactions.filter((t) => monthKey(t.date) === NOW_MONTH);
    const masuk = thisMonth.filter((t) => t.type === "masuk").reduce((s, t) => s + t.amount, 0);
    const keluar = thisMonth.filter((t) => t.type === "keluar").reduce((s, t) => s + t.amount, 0);
    return { saldo, masuk, keluar, selisih: masuk - keluar };
  }, [transactions]);

  const chartData = useMemo(() => {
    const months = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) months.push(new Date(now.getFullYear(), now.getMonth() - i, 1));
    return months.map((d) => {
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const label = d.toLocaleDateString("id-ID", { month: "short", year: "2-digit" });
      const masuk = transactions.filter((t) => monthKey(t.date) === key && t.type === "masuk").reduce((s, t) => s + t.amount, 0);
      const keluar = transactions.filter((t) => monthKey(t.date) === key && t.type === "keluar").reduce((s, t) => s + t.amount, 0);
      return { label, Pemasukan: masuk, Pengeluaran: keluar };
    });
  }, [transactions]);

  const pieData = useMemo(() => {
    const byCat = {};
    transactions
      .filter((t) => t.type === "keluar" && monthKey(t.date) === NOW_MONTH)
      .forEach((t) => {
        byCat[t.cat] = (byCat[t.cat] || 0) + t.amount;
      });
    return Object.entries(byCat)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  function handleJenisChange(v) {
    setFJenis(v);
    setFKategori(CATEGORIES[v][0]);
  }

  function handleTypeFilterChange(v) {
    setTypeFilter(v);
    if (v !== "semua" && !CATEGORIES[v].includes(catFilter)) setCatFilter("semua");
  }

  function handleEdit(t) {
    setFJenis(t.type);
    setFDesk(t.desc);
    setFKategori(t.cat);
    setFJumlah(t.amount.toLocaleString("id-ID"));
    setFTanggal(t.date);
    setEditingId(t.id);
    setFormError("");
    document.getElementById("form-transaksi")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function handleSimpan() {
    const jumlahRaw = fJumlah.replace(/\D/g, "");
    if (!fDesk.trim() || !jumlahRaw || !fTanggal) {
      setFormError("Lengkapi deskripsi, jumlah, dan tanggal terlebih dahulu.");
      setTimeout(() => setFormError(""), 2500);
      return;
    }
    const data = { date: fTanggal, desc: fDesk.trim(), cat: fKategori, type: fJenis, amount: Number(jumlahRaw) };
    if (editingId != null) {
      setTransactions((prev) => prev.map((t) => (t.id === editingId ? { ...t, ...data } : t)));
      setEditingId(null);
    } else {
      const maxId = transactions.reduce((m, t) => Math.max(m, t.id), 0);
      setTransactions((prev) => [...prev, { id: maxId + 1, ...data }]);
    }
    setFDesk("");
    setFJumlah("");
    setFTanggal("");
  }

  function handleCancelEdit() {
    setEditingId(null);
    setFDesk("");
    setFJumlah("");
    setFTanggal("");
  }

  function handleDelete(id) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    if (editingId === id) setEditingId(null);
  }

  function handleResetFilter() {
    setTypeFilter("semua");
    setCatFilter("semua");
    setFromDate("");
    setToDate("");
    setSearch("");
  }

  function handleExport() {
    let csv = "\uFEFFTanggal,Deskripsi,Kategori,Jumlah,Tipe\n";
    filtered.forEach((t) => {
      csv += `${t.date},"${t.desc}",${t.cat},${t.amount},${t.type === "masuk" ? "Pemasukan" : "Pengeluaran"}\n`;
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "keuangan-masjid.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const filterCategories = typeFilter === "semua" ? ALL_CATEGORIES : CATEGORIES[typeFilter];

  const statCards = [
    { label: "Saldo Kas Saat Ini", value: rupiah(stats.saldo), foot: "Total all-time", tone: "hero", icon: <Wallet className="w-4 h-4" /> },
    { label: "Pemasukan Bulan Ini", value: rupiah(stats.masuk), tone: "up", icon: <ArrowUpRight className="w-4 h-4" /> },
    { label: "Pengeluaran Bulan Ini", value: rupiah(stats.keluar), tone: "down", icon: <ArrowDownRight className="w-4 h-4" /> },
    { label: "Selisih Bulan Ini", value: rupiah(Math.abs(stats.selisih)), foot: stats.selisih >= 0 ? "Surplus" : "Defisit", tone: "neutral", icon: <TrendingUp className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
      <PageHeader
        title="Keuangan Masjid"
        subtitle="Laporan pemasukan & pengeluaran dana masjid"
        badge={formatDateTimeLabel(new Date())}
      />

      <div className="relative max-w-[1180px] mx-auto px-4 sm:px-8 -mt-9 pb-16">
        <StatGrid stats={statCards} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-2">
            <TrendChart data={chartData} />
          </div>
          <CategoryPie data={pieData} />
        </div>

        <div className="rounded-2xl bg-white p-5 sm:p-6 shadow-card ring-1 ring-slate-900/5 mb-6">
          <FilterBar
            categories={filterCategories}
            typeFilter={typeFilter}
            onTypeFilterChange={handleTypeFilterChange}
            catFilter={catFilter}
            onCatFilterChange={setCatFilter}
            fromDate={fromDate}
            onFromDateChange={setFromDate}
            toDate={toDate}
            onToDateChange={setToDate}
            search={search}
            onSearchChange={setSearch}
            onExport={handleExport}
            onReset={handleResetFilter}
          />

          <TransactionForm
            categoriesByType={CATEGORIES}
            jenis={fJenis}
            onJenisChange={handleJenisChange}
            desk={fDesk}
            onDeskChange={setFDesk}
            kategori={fKategori}
            onKategoriChange={setFKategori}
            jumlah={fJumlah}
            onJumlahChange={setFJumlah}
            tanggal={fTanggal}
            onTanggalChange={setFTanggal}
            error={formError}
            editingId={editingId}
            onSubmit={handleSimpan}
            onCancelEdit={handleCancelEdit}
          />
        </div>

        <TransactionTable rows={filtered} onDelete={handleDelete} onEdit={handleEdit} />

        <footer className="mt-10 pt-6 border-t border-slate-200/80 flex items-center justify-between flex-wrap gap-2">
          <p className="text-[12px] text-slate-400">
            Keuangan Masjid — data tersimpan aman di perangkat ini (localStorage).
          </p>
          <p className="text-[12px] text-slate-400">
            {transactions.length} transaksi tercatat · {rupiah(stats.saldo)}
          </p>
        </footer>
      </div>
    </div>
  );
}
