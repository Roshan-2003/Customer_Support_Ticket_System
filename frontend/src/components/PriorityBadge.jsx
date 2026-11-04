import { ArrowUp, ArrowDown, Minus } from "lucide-react";

const PriorityBadge = ({ priority }) => {
  const normalized = (priority || "medium").toLowerCase();

  const config = {
    high: {
      label: "High",
      style: "bg-rose-50 text-rose-700 border-rose-200",
      icon: ArrowUp,
    },
    medium: {
      label: "Medium",
      style: "bg-amber-50 text-amber-700 border-amber-200",
      icon: Minus,
    },
    low: {
      label: "Low",
      style: "bg-slate-50 text-slate-600 border-slate-200",
      icon: ArrowDown,
    },
  };

  const item = config[normalized] || config.medium;
  const Icon = item.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider transition-colors ${item.style}`}
    >
      <Icon size={12} strokeWidth={2.5} />
      <span>{item.label}</span>
    </span>
  );
};

export default PriorityBadge;
