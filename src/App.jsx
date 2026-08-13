import { useState, useMemo } from "react";
import { Wallet, ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";

import PageHeader from "./components/PageHeader";
import StatGrid from "./components/StatCard";
import TrendChart from "./components/TrendChart";
import FilterBar from "./components/FilterBar";
import TransactionForm from "./components/TransactionForm";
import TransactionTable from "./components/TransactionTable";

import { CATEGORIES, ALL_CATEGORIES } from "./data/categories";
import { INITIAL_TRANSACTIONS, NOW_MONTH } from "./data/transactions";
import { rupiah, monthKey } from "./utils/format";

export default function App() {
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [nextId, setNextId] = useState(10);

  const [typeFilter, setTypeFilter] = useState("semua");
  const [catFilter, setCatFilter] = useState("semua");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [fJenis, setFJenis] = useState("masuk");
  const [fDesk, setFDesk] = useState("");
  const [fKategori, setFKategori] = useState(CATEGORIES.masuk[0]);
  const [fJumlah, setFJumlah] = useState("");
  const [fTanggal, setFTanggal] = useState("");
  const [formError, setFormError] = useState("");

  const filtered = useMemo(() => {
    return transactions
      .filter((t) => {
        if (typeFilter !== "semua" && t.type !== typeFilter) return false;
        if (catFilter !== "semua" && t.cat !== catFilter) return false;
        if (fromDate && t.date < fromDate) return false;
        if (toDate && t.date > toDate) return false;
        return true;
      })
      .sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id);
  }, [transactions, typeFilter, catFilter, fromDate, toDate]);

  const stats = useMemo(() => {
    const saldo = transactions.reduce((s, t) => s + (t.type === "masuk" ? t.amount : -t.amount), 0);
    const thisMonth = transactions.filter((t) => monthKey(t.date) === NOW_MONTH);
    const masuk = thisMonth.filter((t) => t.type === "masuk").reduce((s, t) => s + t.amount, 0);
    const keluar = thisMonth.filter((t) => t.type === "keluar").reduce((s, t) => s + t.amount, 0);
    return { saldo, masuk, keluar, selisih: masuk - keluar };
  }, [transactions]);

  const chartData = useMemo(() => {
    const months = [];
    const base = new Date(2026, 7, 1);
    for (let i = 5; i >= 0; i--) months.push(new Date(base.getFullYear(), base.getMonth() - i, 1));
    return months.map((d) => {
      const key = d.toISOString().slice(0, 7);
      const label = d.toLocaleDateString("id-ID", { month: "short", year: "2-digit" });
      const masuk = transactions.filter((t) => monthKey(t.date) === key && t.type === "masuk").reduce((s, t) => s + t.amount, 0);
      const keluar = transactions.filter((t) => monthKey(t.date) === key && t.type === "keluar").reduce((s, t) => s + t.amount, 0);
      return { label, Pemasukan: masuk, Pengeluaran: keluar };
    });
  }, [transactions]);

  function handleJenisChange(v) {
    setFJenis(v);
    setFKategori(CATEGORIES[v][0]);
  }

  function handleSimpan() {
    const jumlahRaw = fJumlah.replace(/\D/g, "");
    if (!fDesk.trim() || !jumlahRaw || !fTanggal) {
      setFormError("Lengkapi deskripsi, jumlah, dan tanggal terlebih dahulu.");
      setTimeout(() => setFormError(""), 2500);
      return;
    }
    setTransactions((prev) => [
      ...prev,
      { id: nextId, date: fTanggal, desc: fDesk.trim(), cat: fKategori, type: fJenis, amount: Number(jumlahRaw) },
    ]);
    setNextId((n) => n + 1);
    setFDesk("");
    setFJumlah("");
    setFTanggal("");
  }

  function handleDelete(id) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  function handleResetFilter() {
    setTypeFilter("semua");
    setCatFilter("semua");
    setFromDate("");
    setToDate("");
  }

  function handleExport() {
    let csv = "Tanggal,Deskripsi,Kategori,Jumlah,Tipe\n";
    filtered.forEach((t) => {
      csv += `${t.date},"${t.desc}",${t.cat},${t.amount},${t.type === "masuk" ? "Pemasukan" : "Pengeluaran"}\n`;
    });
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "keuangan-masjid.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const statCards = [
    { label: "Saldo Kas Saat Ini", value: rupiah(stats.saldo), foot: "Total all-time", hero: true, icon: <Wallet className="w-3.5 h-3.5" /> },
    { label: "Pemasukan Bulan Ini", value: rupiah(stats.masuk), icon: <ArrowUpRight className="w-3.5 h-3.5" /> },
    { label: "Pengeluaran Bulan Ini", value: rupiah(stats.keluar), down: true, icon: <ArrowDownRight className="w-3.5 h-3.5" /> },
    { label: "Selisih Bulan Ini", value: rupiah(Math.abs(stats.selisih)), foot: stats.selisih >= 0 ? "Surplus" : "Defisit", icon: <TrendingUp className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="min-h-screen bg-[#f5f6f2] font-sans text-gray-900">
      
      <div className="max-w-[1180px] mx-auto px-8 py-6 pb-16">
        <PageHeader
          title="Keuangan Masjid"
          subtitle="Laporan pemasukan & pengeluaran dana masjid"
          badge="Rabu, 12 Agustus 2026 pukul 15.00"
        />

        <StatGrid stats={statCards} />

        <TrendChart data={chartData} />

        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
          <FilterBar
            categories={ALL_CATEGORIES}
            typeFilter={typeFilter}
            onTypeFilterChange={setTypeFilter}
            catFilter={catFilter}
            onCatFilterChange={setCatFilter}
            fromDate={fromDate}
            onFromDateChange={setFromDate}
            toDate={toDate}
            onToDateChange={setToDate}
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
            onSubmit={handleSimpan}
          />
        </div>

        <TransactionTable rows={filtered} onDelete={handleDelete} />
      </div>
    </div>
  );
}
