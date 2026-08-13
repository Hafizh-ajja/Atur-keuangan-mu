export function StatCard({ label, value, icon, hero = false, down = false, foot }) {
  return (
    <div className={"rounded-xl p-4.5 border " + (hero ? "bg-gray-900 border-gray-900 text-white" : "bg-white border-gray-200")}>
      <div className="flex items-center justify-between mb-3.5">
        <span className={"text-[11px] font-bold tracking-wide uppercase " + (hero ? "text-white/50" : "text-gray-400")}>
          {label}
        </span>
        <div
          className={
            "w-7 h-7 rounded-lg flex items-center justify-center " +
            (hero ? "bg-white/10 text-emerald-400" : down ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-700")
          }
        >
          {icon}
        </div>
      </div>
      <div className={"font-serif text-[25px] font-semibold " + (hero ? "text-emerald-400" : "text-gray-900")}>{value}</div>
      <div className={"text-[11.5px] mt-1.5 " + (hero ? "text-white/40" : "text-gray-400")}>{foot || "\u00A0"}</div>
    </div>
  );
}

export default function StatGrid({ stats }) {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {stats.map((s) => (
        <StatCard key={s.label} {...s} />
      ))}
    </div>
  );
}
