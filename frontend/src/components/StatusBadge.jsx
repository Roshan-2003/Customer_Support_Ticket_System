const StatusBadge = ({ status }) => {
  const config = {
    open: {
      label: "Open",
      style: "bg-sky-50 text-sky-700 border-sky-200",
      dot: "bg-sky-500",
    },
    in_progress: {
      label: "In Progress",
      style: "bg-amber-50 text-amber-700 border-amber-200",
      dot: "bg-amber-500 animate-pulse",
    },
    resolved: {
      label: "Resolved",
      style: "bg-emerald-50 text-emerald-700 border-emerald-200",
      dot: "bg-emerald-500",
    },
  };

  const item = config[status] || {
    label: status,
    style: "bg-slate-100 text-slate-700 border-slate-200",
    dot: "bg-slate-400",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-xs font-semibold tracking-wide transition-all ${item.style}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${item.dot}`} />
      {item.label}
    </span>
  );
};

export default StatusBadge;
