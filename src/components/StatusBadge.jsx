import { ORDER_STATUSES } from "../data/orders";

export const STATUS_CLS = {
  baru: "bg-sky-50 text-sky-700 ring-sky-600/20",
  diproses: "bg-amber-50 text-amber-700 ring-amber-600/20",
  selesai: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  diambil: "bg-indigo-50 text-indigo-700 ring-indigo-600/20",
};

export const STATUS_DOT = {
  baru: "bg-sky-500",
  diproses: "bg-amber-500",
  selesai: "bg-emerald-500",
  diambil: "bg-indigo-500",
};

// Badge status permintaan. Jika `onChange` diberikan, dirender sebagai
// <select> kecil agar status bisa diganti cepat langsung dari tabel.
export default function StatusBadge({ status, onChange }) {
  const label = ORDER_STATUSES.find((s) => s.key === status)?.label || status;
  const cls = STATUS_CLS[status] || STATUS_CLS.baru;
  const dot = STATUS_DOT[status] || STATUS_DOT.baru;

  if (onChange) {
    return (
      <select
        value={status}
        onChange={(e) => onChange(e.target.value)}
        className={
          "rounded-full pl-2.5 pr-1.5 py-1 text-[11.5px] font-semibold ring-1 ring-inset cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/40 " +
          cls
        }
      >
        {ORDER_STATUSES.map((s) => (
          <option key={s.key} value={s.key}>
            {s.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <span
      className={
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-semibold ring-1 ring-inset whitespace-nowrap " +
        cls
      }
    >
      <i className={"w-1.5 h-1.5 rounded-full inline-block " + dot} />
      {label}
    </span>
  );
}
