import { useState, useMemo, useEffect } from "react";
import { ClipboardList, Wallet, ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";

import PageHeader from "./components/PageHeader";
import NavTabs from "./components/NavTabs";
import StatGrid from "./components/StatCard";
import TrendChart from "./components/TrendChart";
import CategoryPie from "./components/CategoryPie";
import FilterBar from "./components/FilterBar";
import InputDataPage from "./components/InputDataPage";
import TransactionTable from "./components/TransactionTable";
import OrderFilter from "./components/OrderFilter";
import OrderTable from "./components/OrderTable";
import ReportView from "./components/ReportView";

import { CATEGORIES, ALL_CATEGORIES } from "./data/categories";
import { INITIAL_TRANSACTIONS, NOW_MONTH } from "./data/transactions";
import { INITIAL_ORDERS, orderStatusLabel } from "./data/orders";
import { PRODUCTS } from "./data/products";
import { rupiah, monthKey, formatDateTimeLabel } from "./utils/format";

const ORDERS_KEY = "percetakan-pak-abas:orders";
const TX_KEY = "percetakan-pak-abas:transactions";

function loadJSON(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // penyimpanan tidak tersedia — fallback ke data dummy
  }
  return fallback;
}

function downloadCsv(csv, filename) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function App() {
  const [tab, setTab] = useState("ringkasan");

  // ---- Data permintaan ----
  const [orders, setOrders] = useState(() => loadJSON(ORDERS_KEY, INITIAL_ORDERS));
  const [oStatus, setOStatus] = useState("semua");
  const [oProduk, setOProduk] = useState("semua");
  const [oFrom, setOFrom] = useState("");
  const [oTo, setOTo] = useState("");
  const [oSearch, setOSearch] = useState("");

  const [ofTanggal, setOfTanggal] = useState("");
  const [ofPelanggan, setOfPelanggan] = useState("");
  const [ofProduk, setOfProduk] = useState(PRODUCTS[0].name);
  const [ofJumlah, setOfJumlah] = useState("1");
  const [ofHarga, setOfHarga] = useState("");
  const [ofStatus, setOfStatus] = useState("baru");
  const [ofCatatan, setOfCatatan] = useState("");
  const [orderError, setOrderError] = useState("");
  const [editingOrderId, setEditingOrderId] = useState(null);

  // ---- Data keuangan ----
  const [transactions, setTransactions] = useState(() => loadJSON(TX_KEY, INITIAL_TRANSACTIONS));

  const [typeFilter, setTypeFilter] = useState("semua");
  const [catFilter, setCatFilter] = useState("semua");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [search, setSearch] = useState("");

  const [fJenis, setFJenis] = useState("keluar");
  const [fDesk, setFDesk] = useState("");
  const [fKategori, setFKategori] = useState(CATEGORIES.keluar[0]);
  const [fJumlah, setFJumlah] = useState("");
  const [fTanggal, setFTanggal] = useState("");
  const [txError, setTxError] = useState("");
  const [editingTxId, setEditingTxId] = useState(null);

  const [reportMonth, setReportMonth] = useState(NOW_MONTH);

  // Simpan otomatis ke localStorage agar data tidak hilang saat refresh
  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    } catch {
      // penyimpanan penuh / tidak tersedia — abaikan
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(TX_KEY, JSON.stringify(transactions));
    } catch {
      // penyimpanan penuh / tidak tersedia — abaikan
    }
  }, [transactions]);

  const filteredOrders = useMemo(() => {
    const q = oSearch.trim().toLowerCase();
    return orders
      .filter((o) => {
        if (oStatus !== "semua" && o.status !== oStatus) return false;
        if (oProduk !== "semua" && o.product !== oProduk) return false;
        if (oFrom && o.date < oFrom) return false;
        if (oTo && o.date > oTo) return false;
        if (q && !`${o.customer} ${o.product} ${o.note || ""}`.toLowerCase().includes(q)) return false;
        return true;
      })
      .sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id);
  }, [orders, oStatus, oProduk, oFrom, oTo, oSearch]);

  const filteredTx = useMemo(() => {
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
    const monthOrders = orders.filter((o) => monthKey(o.date) === NOW_MONTH);
    const orderIncome = monthOrders.reduce((s, o) => s + o.qty * o.price, 0);
    const monthTx = transactions.filter((t) => monthKey(t.date) === NOW_MONTH);
    const masuk = orderIncome + monthTx.filter((t) => t.type === "masuk").reduce((s, t) => s + t.amount, 0);
    const keluar = monthTx.filter((t) => t.type === "keluar").reduce((s, t) => s + t.amount, 0);
    return {
      orderCount: monthOrders.length,
      pending: monthOrders.filter((o) => o.status === "baru" || o.status === "diproses").length,
      masuk,
      keluar,
      selisih: masuk - keluar,
    };
  }, [orders, transactions]);

  const chartData = useMemo(() => {
    const months = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) months.push(new Date(now.getFullYear(), now.getMonth() - i, 1));
    return months.map((d) => {
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const label = d.toLocaleDateString("id-ID", { month: "short", year: "2-digit" });
      const orderIncome = orders.filter((o) => monthKey(o.date) === key).reduce((s, o) => s + o.qty * o.price, 0);
      const masukTx = transactions
        .filter((t) => monthKey(t.date) === key && t.type === "masuk")
        .reduce((s, t) => s + t.amount, 0);
      const keluar = transactions
        .filter((t) => monthKey(t.date) === key && t.type === "keluar")
        .reduce((s, t) => s + t.amount, 0);
      return { label, Pemasukan: orderIncome + masukTx, Pengeluaran: keluar };
    });
  }, [orders, transactions]);

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

  // ---- Handler permintaan ----
  function handleEditOrder(o) {
    setOfTanggal(o.date);
    setOfPelanggan(o.customer);
    setOfProduk(o.product);
    setOfJumlah(String(o.qty));
    setOfHarga(o.price.toLocaleString("id-ID"));
    setOfStatus(o.status);
    setOfCatatan(o.note || "");
    setEditingOrderId(o.id);
    setOrderError("");
    document.getElementById("form-permintaan")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function handleSaveOrder() {
    const hargaRaw = ofHarga.replace(/\D/g, "");
    const qty = Number(ofJumlah);
    if (!ofPelanggan.trim() || !ofTanggal || !qty || qty < 1 || !hargaRaw) {
      setOrderError("Lengkapi tanggal, pelanggan, jumlah, dan harga satuan terlebih dahulu.");
      setTimeout(() => setOrderError(""), 2500);
      return;
    }
    const data = {
      date: ofTanggal,
      customer: ofPelanggan.trim(),
      product: ofProduk,
      qty,
      price: Number(hargaRaw),
      status: ofStatus,
      note: ofCatatan.trim(),
    };
    if (editingOrderId != null) {
      setOrders((prev) => prev.map((o) => (o.id === editingOrderId ? { ...o, ...data } : o)));
      setEditingOrderId(null);
    } else {
      const maxId = orders.reduce((m, o) => Math.max(m, o.id), 0);
      setOrders((prev) => [...prev, { id: maxId + 1, ...data }]);
    }
    setOfTanggal("");
    setOfPelanggan("");
    setOfJumlah("1");
    setOfHarga("");
    setOfCatatan("");
  }

  function handleCancelOrderEdit() {
    setEditingOrderId(null);
    setOfTanggal("");
    setOfPelanggan("");
    setOfJumlah("1");
    setOfHarga("");
    setOfCatatan("");
  }

  function handleDuplicateOrder(o) {
    setOfTanggal(o.date);
    setOfPelanggan(o.customer);
    setOfProduk(o.product);
    setOfJumlah(String(o.qty));
    setOfHarga(o.price.toLocaleString("id-ID"));
    setOfStatus("baru");
    setOfCatatan(o.note || "");
    setEditingOrderId(null);
    setOrderError("");
  }

  function handleDeleteOrder(id) {
    setOrders((prev) => prev.filter((o) => o.id !== id));
    if (editingOrderId === id) setEditingOrderId(null);
  }

  function handleStatusChange(id, status) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  }

  function handleResetOrderFilter() {
    setOStatus("semua");
    setOProduk("semua");
    setOFrom("");
    setOTo("");
    setOSearch("");
  }

  function handleExportOrders() {
    let csv = "\uFEFFTanggal,Pelanggan,Produk,Jumlah,Harga Satuan,Total,Status,Catatan\n";
    filteredOrders.forEach((o) => {
      csv += `${o.date},"${o.customer}","${o.product}",${o.qty},${o.price},${o.qty * o.price},${orderStatusLabel(o.status)},"${o.note || ""}"\n`;
    });
    downloadCsv(csv, "permintaan-percetakan.csv");
  }

  // ---- Handler keuangan ----
  function handleJenisChange(v) {
    setFJenis(v);
    setFKategori(CATEGORIES[v][0]);
  }

  function handleTypeFilterChange(v) {
    setTypeFilter(v);
    if (v !== "semua" && !CATEGORIES[v].includes(catFilter)) setCatFilter("semua");
  }

  function handleEditTx(t) {
    setFJenis(t.type);
    setFDesk(t.desc);
    setFKategori(t.cat);
    setFJumlah(t.amount.toLocaleString("id-ID"));
    setFTanggal(t.date);
    setEditingTxId(t.id);
    setTxError("");
    document.getElementById("form-transaksi")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function handleSaveTx() {
    const jumlahRaw = fJumlah.replace(/\D/g, "");
    if (!fDesk.trim() || !jumlahRaw || !fTanggal) {
      setTxError("Lengkapi deskripsi, jumlah, dan tanggal terlebih dahulu.");
      setTimeout(() => setTxError(""), 2500);
      return;
    }
    const data = { date: fTanggal, desc: fDesk.trim(), cat: fKategori, type: fJenis, amount: Number(jumlahRaw) };
    if (editingTxId != null) {
      setTransactions((prev) => prev.map((t) => (t.id === editingTxId ? { ...t, ...data } : t)));
      setEditingTxId(null);
    } else {
      const maxId = transactions.reduce((m, t) => Math.max(m, t.id), 0);
      setTransactions((prev) => [...prev, { id: maxId + 1, ...data }]);
    }
    setFDesk("");
    setFJumlah("");
    setFTanggal("");
  }

  function handleCancelTxEdit() {
    setEditingTxId(null);
    setFDesk("");
    setFJumlah("");
    setFTanggal("");
  }

  function handleDuplicateTx(t) {
    setFJenis(t.type);
    setFDesk(t.desc);
    setFKategori(t.cat);
    setFJumlah(t.amount.toLocaleString("id-ID"));
    setFTanggal(t.date);
    setEditingTxId(null);
    setTxError("");
  }

  function handleDeleteTx(id) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    if (editingTxId === id) setEditingTxId(null);
  }

  function handleResetTxFilter() {
    setTypeFilter("semua");
    setCatFilter("semua");
    setFromDate("");
    setToDate("");
    setSearch("");
  }

  function handleExportTx() {
    let csv = "\uFEFFTanggal,Deskripsi,Kategori,Jumlah,Tipe\n";
    filteredTx.forEach((t) => {
      csv += `${t.date},"${t.desc}",${t.cat},${t.amount},${t.type === "masuk" ? "Pemasukan" : "Pengeluaran"}\n`;
    });
    downloadCsv(csv, "keuangan-percetakan.csv");
  }

  // ---- Navigasi ----
  function handleTabChange(next) {
    setTab(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const filterCategories = typeFilter === "semua" ? ALL_CATEGORIES : CATEGORIES[typeFilter];

  const statCards = [
    { label: "Permintaan Bulan Ini", value: String(stats.orderCount), foot: `${stats.pending} masih diproses`, tone: "hero", icon: <ClipboardList className="w-4 h-4" /> },
    { label: "Pemasukan Bulan Ini", value: rupiah(stats.masuk), foot: "dari permintaan & penjualan", tone: "up", icon: <ArrowUpRight className="w-4 h-4" /> },
    { label: "Pengeluaran Bulan Ini", value: rupiah(stats.keluar), foot: "bahan habis pakai & operasional", tone: "down", icon: <ArrowDownRight className="w-4 h-4" /> },
    { label: "Selisih Bulan Ini", value: rupiah(Math.abs(stats.selisih)), foot: stats.selisih >= 0 ? "Surplus" : "Defisit", tone: "neutral", icon: <TrendingUp className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
      <PageHeader
        title="Percetakan Pak Abas"
        subtitle="Pusat permintaan cetak, pemasukan & pengeluaran"
        badge={formatDateTimeLabel(new Date())}
      />

      <div className="relative max-w-[1180px] mx-auto px-4 sm:px-8 -mt-9 pb-16">
        <NavTabs tab={tab} onChange={handleTabChange} orderCount={orders.length} />

        {tab === "ringkasan" && (
          <div key="ringkasan" className="animate-fade-up">
            <StatGrid stats={statCards} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              <div className="lg:col-span-2">
                <TrendChart data={chartData} />
              </div>
              <CategoryPie data={pieData} />
            </div>
          </div>
        )}

        {tab === "input" && (
          <InputDataPage
            ofTanggal={ofTanggal}
            onTanggalChange={setOfTanggal}
            ofPelanggan={ofPelanggan}
            onPelangganChange={setOfPelanggan}
            ofProduk={ofProduk}
            onProdukChange={setOfProduk}
            ofJumlah={ofJumlah}
            onJumlahChange={setOfJumlah}
            ofHarga={ofHarga}
            onHargaChange={setOfHarga}
            ofStatus={ofStatus}
            onStatusChange={setOfStatus}
            ofCatatan={ofCatatan}
            onCatatanChange={setOfCatatan}
            orderError={orderError}
            editingOrderId={editingOrderId}
            onSubmitOrder={handleSaveOrder}
            onCancelOrderEdit={handleCancelOrderEdit}
            onEditOrder={handleEditOrder}
            categoriesByType={CATEGORIES}
            fJenis={fJenis}
            onFJenisChange={handleJenisChange}
            fDesk={fDesk}
            onFDeskChange={setFDesk}
            fKategori={fKategori}
            onFKategoriChange={setFKategori}
            fJumlah={fJumlah}
            onFJumlahChange={setFJumlah}
            fTanggal={fTanggal}
            onFTanggalChange={setFTanggal}
            txError={txError}
            editingTxId={editingTxId}
            onSubmitTx={handleSaveTx}
            onCancelTxEdit={handleCancelTxEdit}
            onEditTx={handleEditTx}
            orders={orders}
            transactions={transactions}
            onDuplicateOrder={handleDuplicateOrder}
            onDuplicateTx={handleDuplicateTx}
          />
        )}

        {tab === "permintaan" && (
          <div key="permintaan" className="animate-fade-up">
            <div className="rounded-2xl bg-white p-5 sm:p-6 shadow-card ring-1 ring-slate-900/5 mb-6">
              <OrderFilter
                status={oStatus}
                onStatusChange={setOStatus}
                produk={oProduk}
                onProdukChange={setOProduk}
                from={oFrom}
                onFromChange={setOFrom}
                to={oTo}
                onToChange={setOTo}
                search={oSearch}
                onSearchChange={setOSearch}
                onExport={handleExportOrders}
                onReset={handleResetOrderFilter}
              />
            </div>

            <OrderTable
              rows={filteredOrders}
              onDelete={handleDeleteOrder}
              onEdit={handleEditOrder}
              onStatusChange={handleStatusChange}
            />
          </div>
        )}

        {tab === "keuangan" && (
          <div key="keuangan" className="animate-fade-up">
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
                onExport={handleExportTx}
                onReset={handleResetTxFilter}
              />
            </div>

            <TransactionTable rows={filteredTx} onDelete={handleDeleteTx} onEdit={handleEditTx} />
          </div>
        )}

        {tab === "laporan" && (
          <div key="laporan" className="animate-fade-up">
            <ReportView
              month={reportMonth}
              onMonthChange={setReportMonth}
              orders={orders}
              transactions={transactions}
            />
          </div>
        )}

        <footer className="mt-10 pt-6 border-t border-slate-200/80 flex items-center justify-between flex-wrap gap-2">
          <p className="text-[12px] text-slate-400">
            Percetakan Pak Abas — data tersimpan aman di perangkat ini (localStorage), siap diakses dari HP & laptop.
          </p>
          <p className="text-[12px] text-slate-400">
            {orders.length} permintaan · {transactions.length} transaksi · {rupiah(stats.masuk)} pemasukan bulan ini
          </p>
        </footer>
      </div>
    </div>
  );
}
