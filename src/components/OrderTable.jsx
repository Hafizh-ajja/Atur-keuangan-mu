import { useState } from "react";
import { Trash2, Pencil, ClipboardList } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { PRODUCTS, PRODUCT_TYPE_LABEL } from "../data/products";
import { rupiah, formatDateLabel } from "../utils/format";

function productType(name) {
  const p = PRODUCTS.find((x) => x.name === name);
  return p ? p.type : "jasa";
}

export default function OrderTable({ rows, onDelete, onEdit, onStatusChange }) {
  const [confirmId, setConfirmId] = useState(null);

  function handleDeleteClick(o) {
    if (confirmId === o.id) {
      onDelete(o.id);
      setConfirmId(null);
    } else {
      setConfirmId(o.id);
      setTimeout(() => setConfirmId((c) => (c === o.id ? null : c)), 3000);
    }
  }

  return (
    <div className="rounded-2xl bg-white p-5 sm:p-6 shadow-card ring-1 ring-slate-900/5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center">
            <ClipboardList className="w-4 h-4" />
          </div>
          <span className="text-[15px] font-bold text-slate-800">Daftar Permintaan</span>
        </div>
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 rounded-full px-2.5 py-1">
          {rows.length} permintaan
        </span>
      </div>

      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-[13.5px] border-collapse min-w-[840px]">
          <thead>
            <tr className="text-left text-[10.5px] font-bold tracking-wider uppercase text-slate-400 border-b border-slate-200">
              <th className="pb-3">Tanggal</th>
              <th className="pb-3">Pelanggan</th>
              <th className="pb-3">Produk</th>
              <th className="pb-3 text-right">Jumlah</th>
              <th className="pb-3 text-right">Total</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-slate-400 py-10 text-[13px]">
                  Tidak ada permintaan yang cocok dengan filter ini.
                </td>
              </tr>
            )}
            {rows.map((o) => (
              <tr key={o.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/80 transition-colors">
                <td className="py-4 text-slate-500 whitespace-nowrap">{formatDateLabel(o.date)}</td>
                <td className="py-4 font-semibold text-slate-800">{o.customer}</td>
                <td className="py-4">
                  <span className="font-medium text-slate-700">{o.product}</span>{" "}
                  <span className="text-[10px] font-bold uppercase text-slate-400 bg-slate-100 rounded px-1.5 py-0.5">
                    {PRODUCT_TYPE_LABEL[productType(o.product)]}
                  </span>
                </td>
                <td className="py-4 text-right font-semibold text-slate-700 tabular-nums whitespace-nowrap">
                  {o.qty.toLocaleString("id-ID")}
                </td>
                <td className="py-4 text-right font-semibold text-slate-800 tabular-nums whitespace-nowrap">
                  {rupiah(o.qty * o.price)}
                </td>
                <td className="py-4">
                  <StatusBadge status={o.status} onChange={(s) => onStatusChange(o.id, s)} />
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onEdit(o)}
                      className="h-8 px-2.5 rounded-lg text-[12px] font-semibold text-slate-500 hover:text-slate-900 hover:bg-slate-100 inline-flex items-center gap-1.5 transition"
                    >
                      <Pencil className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(o)}
                      className={
                        "h-8 px-2.5 rounded-lg text-[12px] font-semibold inline-flex items-center gap-1.5 transition " +
                        (confirmId === o.id
                          ? "bg-red-50 text-red-700 ring-1 ring-red-200"
                          : "text-red-500 hover:text-red-700 hover:bg-red-50")
                      }
                    >
                      <Trash2 className="w-3.5 h-3.5" /> {confirmId === o.id ? "Yakin?" : "Hapus"}
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
