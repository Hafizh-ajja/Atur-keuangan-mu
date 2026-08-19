import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { rupiah } from "../utils/format";

const COLORS = ["#6366f1", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#ec4899", "#84cc16"];

function PieTooltip({ active, payload }) {
  if (!active || !payload || payload.length === 0) return null;
  const d = payload[0];
  return (
    <div className="rounded-xl bg-slate-900/95 px-3.5 py-2.5 text-white shadow-lift ring-1 ring-black/10">
      <p className="text-[12px] font-semibold">{d.name}</p>
      <p className="text-[12px] text-slate-300 tabular-nums mt-0.5">{rupiah(d.value)}</p>
    </div>
  );
}

export default function CategoryPie({ data }) {
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="rounded-2xl bg-white p-5 sm:p-6 shadow-card ring-1 ring-slate-900/5 h-full">
      <div className="mb-4">
        <h3 className="text-[15px] font-bold text-slate-800 m-0">Pengeluaran per Kategori</h3>
        <p className="text-xs text-slate-400 mt-0.5 m-0">Bulan ini · <span className="font-semibold text-slate-500 tabular-nums">{rupiah(total)}</span></p>
      </div>

      {data.length === 0 ? (
        <div className="flex items-center justify-center h-[230px] text-[13px] text-slate-400">
          Belum ada pengeluaran bulan ini.
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="relative shrink-0" style={{ height: 210, width: 210 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={62}
                  outerRadius={95}
                  paddingAngle={2}
                  strokeWidth={0}
                >
                  {data.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total</span>
              <span className="text-[15px] font-extrabold text-slate-800 tabular-nums mt-0.5">
                {rupiah(total)}
              </span>
            </div>
          </div>

          <div className="flex-1 min-w-0 w-full">
            {data.map((d, i) => {
              const pct = total ? Math.round((d.value / total) * 100) : 0;
              return (
                <div key={d.name} className="py-1.5">
                  <div className="flex items-center justify-between gap-2 text-[12px]">
                    <span className="flex items-center gap-2 truncate font-medium text-slate-600">
                      <i
                        className="w-2.5 h-2.5 rounded-md inline-block shrink-0"
                        style={{ background: COLORS[i % COLORS.length] }}
                      />
                      <span className="truncate">{d.name}</span>
                    </span>
                    <span className="font-bold text-slate-800 tabular-nums whitespace-nowrap">
                      {pct}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${pct}%`, background: COLORS[i % COLORS.length] }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
