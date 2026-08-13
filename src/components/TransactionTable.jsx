import { Trash2 } from "lucide-react";
import CategoryTag from "./CategoryTag";
import { rupiah, formatDateLabel } from "../utils/format";

export default function TransactionTable({ rows, onDelete }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <table className="w-full text-[13.5px] border-collapse">
        <thead>
          <tr className="text-left text-[10.5px] font-bold tracking-wide uppercase text-gray-400 border-b border-gray-200">
            <th className="pb-2.5">Tanggal</th>
            <th className="pb-2.5">Deskripsi</th>
            <th className="pb-2.5">Kategori</th>
            <th className="pb-2.5 text-right">Jumlah</th>
            <th className="pb-2.5">Tipe</th>
            <th className="pb-2.5">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center text-gray-400 py-9 text-[13px]">
                Tidak ada transaksi yang cocok dengan filter ini.
              </td>
            </tr>
          )}
          {rows.map((t) => (
            <tr key={t.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
              <td className="py-3.5 text-gray-500 whitespace-nowrap">{formatDateLabel(t.date)}</td>
              <td className="py-3.5 font-semibold">{t.desc}</td>
              <td className="py-3.5"><CategoryTag cat={t.cat} type={t.type} /></td>
              <td className={"py-3.5 text-right font-mono font-semibold " + (t.type === "masuk" ? "text-emerald-700" : "text-red-600")}>
                {t.type === "masuk" ? "+" : "-"}{rupiah(t.amount)}
              </td>
              <td className="py-3.5">
                <span className={"inline-flex items-center gap-1.5 text-[12px] font-semibold " + (t.type === "masuk" ? "text-emerald-700" : "text-amber-700")}>
                  <i className={"w-1.5 h-1.5 rounded-full inline-block " + (t.type === "masuk" ? "bg-emerald-600" : "bg-amber-600")} />
                  {t.type === "masuk" ? "Pemasukan" : "Pengeluaran"}
                </span>
              </td>
              <td className="py-3.5">
                <button
                  onClick={() => onDelete(t.id)}
                  className="text-red-600 hover:underline text-[12.5px] font-semibold inline-flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
