import { Landmark, CalendarDays } from "lucide-react";

export default function PageHeader({ title, subtitle, badge }) {
  return (
    <div className="relative overflow-hidden rounded-b-[2rem] bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white">
      {/* dekorasi blur */}
      <div className="absolute -top-24 -right-20 w-80 h-80 rounded-full bg-emerald-500/25 blur-3xl" />
      <div className="absolute -bottom-36 left-1/4 w-96 h-96 rounded-full bg-teal-400/10 blur-3xl" />
      <div className="absolute top-1/2 right-1/4 w-40 h-40 rounded-full bg-white/5 blur-2xl" />

      <div className="relative max-w-[1180px] mx-auto px-4 sm:px-8 pt-7 sm:pt-9 pb-12 flex items-start justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur flex items-center justify-center shadow-lg shadow-emerald-950/30">
            <Landmark className="w-6 h-6 text-emerald-300" />
          </div>
          <div>
            <h1 className="text-[22px] sm:text-[26px] font-extrabold tracking-tight m-0 leading-tight">{title}</h1>
            <p className="text-[13px] text-emerald-100/70 m-0 mt-1">{subtitle}</p>
          </div>
        </div>

        {badge && (
          <div className="inline-flex items-center gap-2 bg-white/10 ring-1 ring-white/15 backdrop-blur px-4 py-2 rounded-full text-[12.5px] font-semibold text-emerald-50 shadow-lg shadow-emerald-950/20">
            <CalendarDays className="w-4 h-4 text-emerald-300" />
            {badge}
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
          </div>
        )}
      </div>
    </div>
  );
}
