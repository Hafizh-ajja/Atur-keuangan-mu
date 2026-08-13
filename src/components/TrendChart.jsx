import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";
import { rupiah } from "../utils/format";

export default function TrendChart({ data }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[15px] font-semibold">Tren Keuangan 6 Bulan</span>
        <div className="flex gap-4 text-[12px] text-gray-500">
          <span className="flex items-center gap-1.5">
            <i className="w-2.5 h-2.5 rounded-sm bg-emerald-600 inline-block" />
            Pemasukan
          </span>
          <span className="flex items-center gap-1.5">
            <i className="w-2.5 h-2.5 rounded-sm bg-amber-600 inline-block" />
            Pengeluaran
          </span>
        </div>
      </div>
      <div style={{ height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ left: 4, right: 12, top: 8, bottom: 0 }}>
            <defs>
              <linearGradient id="fillMasuk" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#059669" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#059669" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="fillKeluar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#b45309" stopOpacity={0.08} />
                <stop offset="100%" stopColor="#b45309" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#eeefe9" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#9a9d94" }} axisLine={false} tickLine={false} />
            <YAxis
              tickFormatter={(v) => "Rp " + v.toLocaleString("id-ID")}
              tick={{ fontSize: 11, fill: "#9a9d94" }}
              axisLine={false}
              tickLine={false}
              width={90}
            />
            <Tooltip formatter={(v) => rupiah(v)} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            <Area type="monotone" dataKey="Pemasukan" stroke="#059669" strokeWidth={2} fill="url(#fillMasuk)" dot={{ r: 3 }} />
            <Area
              type="monotone"
              dataKey="Pengeluaran"
              stroke="#b45309"
              strokeWidth={2}
              strokeDasharray="5 3"
              fill="url(#fillKeluar)"
              dot={{ r: 3 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
