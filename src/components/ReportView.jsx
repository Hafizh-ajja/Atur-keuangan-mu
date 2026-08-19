import { useMemo } from "react";
import { FileBarChart2, Download, Wallet, ArrowDownRight, TrendingUp, ClipboardList } from "lucide-react";
import StatGrid from "./StatCard";
import { rupiah, monthKey, formatMonthLabel } from "../utils/format";

const inputCls =
  "h-10 px-3 rounded-xl border border-slate-200 bg-white text-[13px] font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-500 transition";

function sum(list, fn) {
  return list.reduce((s, x) => s + fn(x), 0);
}

export default function ReportView({ month, onMonthChange, orders, transactions }) {
  const report = useMemo(() => {
    const mo = orders.filter((o) => monthKey(o.date) === month);
    const mt = transactions.filter((t) => monthKey(t.date) === month);
    const masukTx = mt.filter((t) => t.type === "masuk");
    const keluarTx = mt.filter((t) => t.type === "keluar");
    const orderIncome = sum(mo, (o) => o.qty * o.price);
    const masuk = orderIncome + sum(masukTx, (t) => t.amount);
    const keluar = sum(keluarTx, (t) => t.amount);

    const byProduct = {};
    mo.forEach((o) => {
      const cur = byProduct[o.product] || { name: o.product, count: 0, qty: 0, total: 0 };
      cur.count += 1;
      cur.qty += o.qty;
      cur.total += o.qty * o.price;
      byProduct[o.product] = cur;
    });

    const byCatMasuk = {};
    masukTx.forEach((t) => {
      byCatMasuk[t.cat] = (byCatMasuk[t.cat] || 0) + t.amount;
    });

    const byCatKeluar = {};
    keluarTx.forEach((t) => {
      byCatKeluar[t.cat] = (byCatKeluar[t.cat] || 0) + t.amount;
    });

    return {
      orderCount: mo.length,
      masuk,
      keluar,
      selisih: masuk - keluar,
      byProduct: Object.values(byProduct).sort((a, b) => b.total - a.total),
      byCatMasuk: Object.entries(byCatMasuk).sort((a, b) => b[1] - a[1]),
      byCatKeluar: Object.entries(byCatKeluar).sort((a, b) => b[1] - a[1]),
    };
  }, [month, orders, transactions]);

  function handleExport() {
    let csv = `\uFEFFLaporan Bulanan Percetakan Pak Abas — ${formatMonthLabel(month)}\n`;
    csv += `Pemasukan Total,Rp ${report.masuk}\n`;
    csv += `Pengeluaran Total,Rp ${report.keluar}\n`;
    csv += `Selisih,Rp ${report.selisih}\n\n`;
    csv += "== PEMASUKAN PER PRODUK ==\nProduk,Jumlah Permintaan,Qty,Total\n";
    report.byProduct.forEach((p) => {
      csv += `"${p.name}",${p.count},${p.qty},${p.total}\n`;
    });
    csv += "\n== PEMASUKAN LAINNYA ==\nKategori,Total\n";
    report.byCatMasuk.forEach(([c, v]) => {
      csv += `"${c}",${v}\n`;
    });
    csv += "\n== PENGELUARAN PER KATEGORI ==\nKategori,Total\n";
    report.byCatKeluar.forEach(([c, v]) => {
      csv += `"${c}",${v}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `laporan-${month}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const statCards = [
    { label: "Pemasukan", value: rupiah(report.masuk), foot: "dari permintaan & penjualan", tone: "hero", icon: <Wallet className="w-4 h-4" /> },
    { label: "Pengeluaran", value: rupiah(report.keluar), foot: "bahan habis pakai & operasional", tone: "down", icon: <ArrowDownRight className="w-4 h-4" /> },
    { label: "Selisih", value: rupiah(Math.abs(report.selisih)), foot: report.selisih >= 0 ? "Surplus" : "Defisit", tone: "neutral", icon: <TrendingUp className="w-4 h-4" /> },
    { label: "Jumlah Permintaan", value: String(report.orderCount), foot: "permintaan di bulan ini", tone: "up", icon: <ClipboardList className="w-4 h-4" /> },
  ];

  return (
    <div className="rounded-2xl bg-white p-5 sm:p-6 shadow-card ring-1 ring-slate-900/5">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm shadow-indigo-600/30">
            <FileBarChart2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-[15px] font-bold text-slate-800 m-0">Laporan Bulanan</h3>
            <p className="text-xs text-slate-400 mt-0.5 m-0">
              Ringkasan keuangan {formatMonthLabel(month)} — pilih bulan untuk melihat laporannya
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <input type="month" value={month} onChange={(e) => onMonthChange(e.target.value)} className={inputCls} />
          <button
            onClick={handleExport}
            className="h-10 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[13px] font-semibold shadow-sm shadow-indigo-600/25 inline-flex items-center gap-2 transition"
          >
            <Download className="w-4 h-4" />
            Export Laporan
          </button>
        </div>
      </div>

      <StatGrid stats={statCards} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl ring-1 ring-slate-200/80 p-4">
          <h4 className="text-[13px] font-bold text-slate-700 m-0 mb-3">Pemasukan per Produk</h4>
          {report.byProduct.length === 0 ? (
            <p className="text-[12.5px] text-slate-400 py-6 text-center m-0">Tidak ada permintaan di bulan ini.</p>
          ) : (
            <div className="space-y-2">
              {report.byProduct.map((p) => (
                <div key={p.name} className="flex items-center justify-between gap-3 text-[12.5px]">
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-700 truncate m-0">{p.name}</p>
                    <p className="text-[11px] text-slate-400 m-0">{p.count} permintaan · {p.qty.toLocaleString("id-ID")} pcs</p>
                  </div>
                  <span className="font-bold text-indigo-700 tabular-nums whitespace-nowrap">{rupiah(p.total)}</span>
                </div>
              ))}
            </div>
          )}
          {report.byCatMasuk.length > 0 && (
            <>
              <h4 className="text-[13px] font-bold text-slate-700 m-0 mt-5 mb-3">Pemasukan Lainnya</h4>
              <div className="space-y-2">
                {report.byCatMasuk.map(([c, v]) => (
                  <div key={c} className="flex items-center justify-between gap-3 text-[12.5px]">
                    <span className="font-semibold text-slate-600">{c}</span>
                    <span className="font-bold text-indigo-700 tabular-nums">{rupiah(v)}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="rounded-2xl ring-1 ring-slate-200/80 p-4">
          <h4 className="text-[13px] font-bold text-slate-700 m-0 mb-3">Pengeluaran per Kategori</h4>
          {report.byCatKeluar.length === 0 ? (
            <p className="text-[12.5px] text-slate-400 py-6 text-center m-0">Tidak ada pengeluaran di bulan ini.</p>
          ) : (
            <div className="space-y-2">
              {report.byCatKeluar.map(([c, v]) => {
                const pct = report.keluar ? Math.round((v / report.keluar) * 100) : 0;
                return (
                  <div key={c}>
                    <div className="flex items-center justify-between gap-3 text-[12.5px]">
                      <span className="font-semibold text-slate-600">{c}</span>
                      <span className="font-bold text-slate-800 tabular-nums">{rupiah(v)} · {pct}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                      <div className="h-full rounded-full bg-amber-500" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <p className="text-[11.5px] text-slate-400 mt-4 m-0">
        Catatan: pemasukan dihitung dari nilai permintaan (jumlah × harga satuan) + pemasukan lain yang dicatat manual.
      </p>
    </div>
  );
}
