const TONES = {
  hero: {
    card: "relative overflow-hidden p-5 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-700 text-white shadow-lg shadow-indigo-700/25",
    label: "text-indigo-100/70",
    value: "text-white text-[30px]",
    foot: "text-indigo-100/60",
    tile: "bg-white/15 text-white",
    glow: true,
  },
  up: {
    card: "rounded-2xl bg-white p-5 shadow-card ring-1 ring-slate-900/5 hover:shadow-lift transition-shadow",
    label: "text-slate-400",
    value: "text-slate-900",
    foot: "text-slate-400",
    tile: "bg-indigo-50 text-indigo-600",
    glow: false,
  },
  down: {
    card: "rounded-2xl bg-white p-5 shadow-card ring-1 ring-slate-900/5 hover:shadow-lift transition-shadow",
    label: "text-slate-400",
    value: "text-slate-900",
    foot: "text-slate-400",
    tile: "bg-red-50 text-red-500",
    glow: false,
  },
  neutral: {
    card: "rounded-2xl bg-white p-5 shadow-card ring-1 ring-slate-900/5 hover:shadow-lift transition-shadow",
    label: "text-slate-400",
    value: "text-slate-900",
    foot: "text-slate-400",
    tile: "bg-amber-50 text-amber-600",
    glow: false,
  },
};

export function StatCard({ label, value, icon, tone = "up", foot }) {
  const t = TONES[tone] || TONES.up;
  return (
    <div className={t.card + " animate-fade-up"}>
      {t.glow && <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-white/15 blur-2xl" />}
      <div className="relative flex items-center justify-between mb-4">
        <span className={"text-[11px] font-bold tracking-wider uppercase " + t.label}>{label}</span>
        <div className={"w-9 h-9 rounded-xl flex items-center justify-center shrink-0 " + t.tile}>{icon}</div>
      </div>
      <div className={"relative text-[27px] leading-none font-extrabold tracking-tight tabular-nums " + t.value}>
        {value}
      </div>
      {t.glow && <div className="absolute -bottom-10 -left-8 w-28 h-28 rounded-full bg-teal-300/20 blur-2xl" />}
      <div className={"relative text-[11.5px] font-medium mt-2 " + t.foot}>{foot || "\u00A0"}</div>
    </div>
  );
}

export default function StatGrid({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((s, i) => (
        <div key={s.label} style={{ animationDelay: `${i * 70}ms` }}>
          <StatCard {...s} />
        </div>
      ))}
    </div>
  );
}
