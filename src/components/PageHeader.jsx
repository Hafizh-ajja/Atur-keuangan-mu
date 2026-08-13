import { Circle } from "lucide-react";

export default function PageHeader({ title, subtitle, badge }) {
  return (
    <div className="flex items-start justify-between flex-wrap gap-2 mb-5">
      <div>
        <h1 className="font-serif text-[26px] font-semibold m-0 mb-1">{title}</h1>
        <p className="text-[13.5px] text-gray-500 m-0">{subtitle}</p>
      </div>
      {badge && (
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-[12.5px] font-semibold px-3.5 py-1.5 rounded-full mt-0.5">
          <Circle className="w-1.5 h-1.5 fill-emerald-600 text-emerald-600" />
          {badge}
        </div>
      )}
    </div>
  );
}
