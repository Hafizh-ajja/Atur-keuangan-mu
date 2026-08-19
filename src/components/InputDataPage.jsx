import { useState } from "react";
import { ClipboardList, Wallet, PencilLine, Copy, Clock } from "lucide-react";

import OrderForm from "./OrderForm";
import TransactionForm from "./TransactionForm";

import { rupiah } from "../utils/format";
import { orderStatusLabel } from "../data/orders";

const inputTabCls =
  "flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-bold transition whitespace-nowrap ";
const activeCls = "bg-gradient-to-br from-indigo-600 to-blue-700 text-white shadow-md shadow-indigo-600/25";
const inactiveCls = "text-slate-500 hover:text-slate-800 hover:bg-slate-50";

export default function InputDataPage({
  // — Order props —
  ofTanggal, onTanggalChange,
  ofPelanggan, onPelangganChange,
  ofProduk, onProdukChange,
  ofJumlah, onJumlahChange,
  ofHarga, onHargaChange,
  ofStatus, onStatusChange,
  ofCatatan, onCatatanChange,
  orderError,
  editingOrderId,
  onSubmitOrder,
  onCancelOrderEdit,
  onEditOrder,
  // — Transaction props —
  categoriesByType,
  fJenis, onFJenisChange,
  fDesk, onFDeskChange,
  fKategori, onFKategoriChange,
  fJumlah, onFJumlahChange,
  fTanggal, onFTanggalChange,
  txError,
  editingTxId,
  onSubmitTx,
  onCancelTxEdit,
  onEditTx,
  // — Data —
  orders,
  transactions,
  onDuplicateOrder,
  onDuplicateTx,
}) {
  const [inputType, setInputType] = useState("permintaan");

  const recentOrders = orders.slice().sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id).slice(0, 5);
  const recentTx = transactions.slice().sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id).slice(0, 5);

  return (
    <div className="animate-fade-up">
      {/* Toggle Permintaan / Transaksi */}
      <div className="rounded-2xl bg-white shadow-card ring-1 ring-slate-900/5 p-1.5 mb-6 flex items-center gap-1">
        <button
          onClick={() => setInputType("permintaan")}
          className={inputTabCls + (inputType === "permintaan" ? activeCls : inactiveCls)}
        >
          <ClipboardList className="w-4 h-4" />
          Permintaan Percetakan
        </button>
        <button
          onClick={() => setInputType("transaksi")}
          className={inputTabCls + (inputType === "transaksi" ? activeCls : inactiveCls)}
        >
          <Wallet className="w-4 h-4" />
          Transaksi Keuangan
        </button>
      </div>

      {/* Form */}
      {inputType === "permintaan" ? (
        <div className="rounded-2xl bg-white p-5 sm:p-6 shadow-card ring-1 ring-slate-900/5 mb-6">
          <OrderForm
            tanggal={ofTanggal}
            onTanggalChange={onTanggalChange}
            pelanggan={ofPelanggan}
            onPelangganChange={onPelangganChange}
            produk={ofProduk}
            onProdukChange={onProdukChange}
            jumlah={ofJumlah}
            onJumlahChange={onJumlahChange}
            harga={ofHarga}
            onHargaChange={onHargaChange}
            status={ofStatus}
            onStatusChange={onStatusChange}
            catatan={ofCatatan}
            onCatatanChange={onCatatanChange}
            error={orderError}
            editingId={editingOrderId}
            onSubmit={onSubmitOrder}
            onCancelEdit={onCancelOrderEdit}
          />

          {/* 5 Entri Terakhir — Permintaan */}
          <RecentEntries
            type="permintaan"
            recentOrders={recentOrders}
            onEditOrder={onEditOrder}
            onDuplicateOrder={onDuplicateOrder}
          />
        </div>
      ) : (
        <div className="rounded-2xl bg-white p-5 sm:p-6 shadow-card ring-1 ring-slate-900/5 mb-6">
          <TransactionForm
            categoriesByType={categoriesByType}
            jenis={fJenis}
            onJenisChange={onFJenisChange}
            desk={fDesk}
            onDeskChange={onFDeskChange}
            kategori={fKategori}
            onKategoriChange={onFKategoriChange}
            jumlah={fJumlah}
            onJumlahChange={onFJumlahChange}
            tanggal={fTanggal}
            onTanggalChange={onFTanggalChange}
            error={txError}
            editingId={editingTxId}
            onSubmit={onSubmitTx}
            onCancelEdit={onCancelTxEdit}
          />

          {/* 5 Entri Terakhir — Transaksi */}
          <RecentEntries
            type="transaksi"
            recentTx={recentTx}
            onEditTx={onEditTx}
            onDuplicateTx={onDuplicateTx}
          />
        </div>
      )}
    </div>
  );
}

/* ──────── Recent Entries Sub-Component ──────── */

function RecentEntries({ type, recentOrders, onEditOrder, onDuplicateOrder, recentTx, onEditTx, onDuplicateTx }) {
  const items = type === "permintaan" ? recentOrders : recentTx;

  if (!items || items.length === 0) return null;

  return (
    <div className="mt-6">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="w-4 h-4 text-slate-400" />
        <span className="text-[12px] font-bold uppercase tracking-wider text-slate-500">
          5 Entri Terakhir
        </span>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 ring-1 ring-slate-100 px-4 py-3 hover:bg-slate-100/80 transition"
          >
            <div className="flex-1 min-w-0">
              {type === "permintaan" ? (
                <>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[13px] font-bold text-slate-800">{item.customer}</span>
                    <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                      {item.product}
                    </span>
                    <span className="text-[10px] font-semibold text-white bg-slate-500 px-1.5 py-0.5 rounded-full">
                      {orderStatusLabel(item.status)}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {item.date} · {item.qty}×{rupiah(item.price)} = {rupiah(item.qty * item.price)}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[13px] font-bold text-slate-800">{item.desc}</span>
                    <span
                      className={
                        "text-[10px] font-semibold px-1.5 py-0.5 rounded-full " +
                        (item.type === "masuk"
                          ? "text-emerald-700 bg-emerald-50"
                          : "text-red-600 bg-red-50")
                      }
                    >
                      {item.type === "masuk" ? "Masuk" : "Keluar"}
                    </span>
                    <span className="text-[11px] text-slate-500">{item.cat}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {item.date} · {rupiah(item.amount)}
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() =>
                  type === "permintaan" ? onEditOrder(item) : onEditTx(item)
                }
                className="h-8 w-8 rounded-lg bg-white ring-1 ring-slate-200 hover:bg-indigo-50 hover:ring-indigo-200 flex items-center justify-center transition"
                title="Edit"
              >
                <PencilLine className="w-3.5 h-3.5 text-slate-500" />
              </button>
              <button
                onClick={() =>
                  type === "permintaan" ? onDuplicateOrder(item) : onDuplicateTx(item)
                }
                className="h-8 w-8 rounded-lg bg-white ring-1 ring-slate-200 hover:bg-sky-50 hover:ring-sky-200 flex items-center justify-center transition"
                title="Duplikat"
              >
                <Copy className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
