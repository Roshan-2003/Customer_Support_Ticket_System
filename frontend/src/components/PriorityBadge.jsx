const PriorityBadge = ({ priority }) => {
  const styles = {
    low: "bg-teal-50 text-teal-700 border-teal-200",
    medium: "bg-amber-50 text-amber-700 border-amber-200",
    high: "bg-rose-50 text-rose-700 border-rose-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-colors ${
        styles[priority] || "bg-slate-100 text-slate-700 border-slate-200"
      }`}
    >
      {priority || "normal"}
    </span>
  );
};

export default PriorityBadge;
