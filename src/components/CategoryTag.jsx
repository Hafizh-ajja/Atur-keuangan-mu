export default function CategoryTag({ cat, type }) {
  return (
    <span
      className={
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset whitespace-nowrap " +
        (type === "masuk"
          ? "bg-emerald-50 text-emerald-700 ring-emerald-600/15"
          : "bg-amber-50 text-amber-700 ring-amber-600/20")
      }
    >
      {cat}
    </span>
  );
}
