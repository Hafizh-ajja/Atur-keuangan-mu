import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { rupiah } from "../utils/format";

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-xl bg-slate-900/95 px-3.5 py-2.5 text-white shadow-lift ring-1 ring-black/10">
      <p className="text-[11px] font-semibold text-slate-300 mb-1.5">{label}</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex items-center gap-2 text-[12px] py-0.5">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} />
          <span className="text-slate-300">{p.name}</span>
          <span className="ml-3 pl-2 font-semibold tabular-nums border-l border-white/15">{rupiah(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

export default function TrendChart({ data }) {
  return (
    <div className="rounded-2xl bg-white p-5 sm:p-6 shadow-card ring-1 ring-slate-900/5 h-full">
      <div className="flex items-start justify-between flex-wrap gap-2 mb-5">
        <div>
          <h3 className="text-[15px] font-bold text-slate-800 m-0">Tren Pemasukan vs Pengeluaran</h3>
          <p className="text-xs text-slate-400 mt-0.5 m-0">Ringkasan 6 bulan terakhir</p>
        </div>
        <div className="flex gap-4 text-xs font-medium text-slate-500">
          <span className="flex items-center gap-1.5">
            <i className="w-2.5 h-2.5 rounded-md bg-indigo-600 inline-block" />
            Pemasukan
          </span>
          <span className="flex items-center gap-1.5">
            <i className="w-2.5 h-2.5 rounded-md bg-amber-500 inline-block" />
            Pengeluaran
          </span>
        </div>
      </div>
      <div style={{ height: 270 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ left: 4, right: 12, top: 8, bottom: 0 }}>
            <defs>
              <linearGradient id="fillMasuk" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.22} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="fillKeluar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.1} />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#eef0f3" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: "#94a3b8", fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
              dy={4}
            />
            <YAxis
              tickFormatter={(v) => "Rp " + (v >= 1000000 ? v / 1000000 + " jt" : v.toLocaleString("id-ID"))}
              tick={{ fontSize: 11, fill: "#94a3b8", fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
              width={70}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: "#cbd5e1", strokeDasharray: "4 4" }} />
            <Area
              type="monotone"
              dataKey="Pemasukan"
              stroke="#6366f1"
              strokeWidth={2.5}
              fill="url(#fillMasuk)"
              dot={{ r: 3, fill: "#6366f1", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 5 }}
            />
            <Area
              type="monotone"
              dataKey="Pengeluaran"
              stroke="#f59e0b"
              strokeWidth={2.5}
              strokeDasharray="5 3"
              fill="url(#fillKeluar)"
              dot={{ r: 3, fill: "#f59e0b", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
