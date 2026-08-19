import { useState } from "react";
import { Trash2, Pencil, ReceiptText } from "lucide-react";
import CategoryTag from "./CategoryTag";
import { rupiah, formatDateLabel } from "../utils/format";

export default function TransactionTable({ rows, onDelete, onEdit }) {
  const [confirmId, setConfirmId] = useState(null);

  function handleDeleteClick(t) {
    if (confirmId === t.id) {
      onDelete(t.id);
      setConfirmId(null);
    } else {
      setConfirmId(t.id);
      setTimeout(() => setConfirmId((c) => (c === t.id ? null : c)), 3000);
    }
  }

  return (
    <div className="rounded-2xl bg-white p-5 sm:p-6 shadow-card ring-1 ring-slate-900/5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center">
            <ReceiptText className="w-4 h-4" />
          </div>
          <span className="text-[15px] font-bold text-slate-800">Daftar Transaksi</span>
        </div>
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 rounded-full px-2.5 py-1">
          {rows.length} transaksi
        </span>
      </div>

      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-[13.5px] border-collapse min-w-[680px]">
          <thead>
            <tr className="text-left text-[10.5px] font-bold tracking-wider uppercase text-slate-400 border-b border-slate-200">
              <th className="pb-3">Tanggal</th>
              <th className="pb-3">Deskripsi</th>
              <th className="pb-3">Kategori</th>
              <th className="pb-3 text-right">Jumlah</th>
              <th className="pb-3">Tipe</th>
              <th className="pb-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-slate-400 py-10 text-[13px]">
                  Tidak ada transaksi yang cocok dengan filter ini.
                </td>
              </tr>
            )}
            {rows.map((t) => (
              <tr key={t.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/80 transition-colors">
                <td className="py-4 text-slate-500 whitespace-nowrap">{formatDateLabel(t.date)}</td>
                <td className="py-4 font-semibold text-slate-800">{t.desc}</td>
                <td className="py-4"><CategoryTag cat={t.cat} type={t.type} /></td>
                <td className={"py-4 text-right font-semibold tabular-nums whitespace-nowrap " + (t.type === "masuk" ? "text-indigo-600" : "text-red-500")}>                    {t.type === "masuk" ? "+" : "−"}{rupiah(t.amount)}
                </td>
                <td className="py-4">
                  <span className={"inline-flex items-center gap-1.5 text-[12px] font-semibold " + (t.type === "masuk" ? "text-indigo-700" : "text-amber-700")}>
                    <i className={"w-1.5 h-1.5 rounded-full inline-block " + (t.type === "masuk" ? "bg-indigo-600" : "bg-amber-500")} />
                    {t.type === "masuk" ? "Pemasukan" : "Pengeluaran"}
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onEdit(t)}
                      className="h-8 px-2.5 rounded-lg text-[12px] font-semibold text-slate-500 hover:text-slate-900 hover:bg-slate-100 inline-flex items-center gap-1.5 transition"
                    >
                      <Pencil className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(t)}
                      className={
                        "h-8 px-2.5 rounded-lg text-[12px] font-semibold inline-flex items-center gap-1.5 transition " +
                        (confirmId === t.id
                          ? "bg-red-50 text-red-700 ring-1 ring-red-200"
                          : "text-red-500 hover:text-red-700 hover:bg-red-50")
                      }
                    >
                      <Trash2 className="w-3.5 h-3.5" /> {confirmId === t.id ? "Yakin?" : "Hapus"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
