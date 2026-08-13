export default function CategoryTag({ cat, type }) {
  return (
    <span
      className={
        "inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full " +
        (type === "masuk" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700")
      }
    >
      {cat}
    </span>
  );
}
