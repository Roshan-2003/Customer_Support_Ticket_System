import { Search, X, LayoutGrid, List } from "lucide-react";

const TicketFilters = ({
  search,
  setSearch,
  status,
  setStatus,
  priority,
  setPriority,
  viewMode,
  setViewMode,
}) => {
  const hasActiveFilters = Boolean(search || status || priority);

  const handleReset = () => {
    setSearch("");
    setStatus("");
    setPriority("");
  };

  const quickFilters = [
    { label: "All", statusVal: "", priorityVal: "" },
    { label: "Open Issues", statusVal: "open", priorityVal: "" },
    { label: "In Progress", statusVal: "in_progress", priorityVal: "" },
    { label: "Resolved", statusVal: "resolved", priorityVal: "" },
    { label: "High Priority", statusVal: "", priorityVal: "high" },
  ];

  return (
    <div className="surface-card mb-4 p-3 sm:p-4">
      {/* Top row: Search input + View switcher + Reset */}
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-lg">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by subject, description, customer name or email..."
            className="h-8.5 w-full rounded-md border border-slate-300 bg-white pl-8.5 pr-8 text-xs text-slate-800 placeholder:text-slate-400 outline-none transition-colors focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Controls: Dropdowns + View toggle */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Dropdown */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-8.5 rounded-md border border-slate-300 bg-white px-2.5 text-xs font-medium text-slate-700 outline-none transition-colors focus:border-indigo-600"
          >
            <option value="">All Statuses</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>

          {/* Priority Dropdown */}
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="h-8.5 rounded-md border border-slate-300 bg-white px-2.5 text-xs font-medium text-slate-700 outline-none transition-colors focus:border-indigo-600"
          >
            <option value="">All Priorities</option>
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>

          {/* View Mode Toggle (Table / Card) */}
          {setViewMode && (
            <div className="flex items-center rounded-md border border-slate-200 bg-slate-100/80 p-0.5">
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`flex h-7 items-center gap-1 rounded px-2 text-xs font-medium transition-colors ${
                  viewMode === "table"
                    ? "bg-white text-slate-900 shadow-2xs font-semibold"
                    : "text-slate-500 hover:text-slate-900"
                }`}
                title="Table view"
              >
                <List size={14} />
                <span className="hidden md:inline">Table</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode("card")}
                className={`flex h-7 items-center gap-1 rounded px-2 text-xs font-medium transition-colors ${
                  viewMode === "card"
                    ? "bg-white text-slate-900 shadow-2xs font-semibold"
                    : "text-slate-500 hover:text-slate-900"
                }`}
                title="Card view"
              >
                <LayoutGrid size={13} />
                <span className="hidden md:inline">Cards</span>
              </button>
            </div>
          )}

          {/* Reset button */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex h-8.5 items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            >
              <X size={13} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Jira/Asana style quick filter pills */}
      <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-slate-100 pt-2.5">
      
        {quickFilters.map((q) => {
          const isActive =
            status === q.statusVal &&
            priority === q.priorityVal;

          return (
            <button
              key={q.label}
              type="button"
              onClick={() => {
                setStatus(q.statusVal);
                setPriority(q.priorityVal);
              }}
              className={`rounded-md px-2 py-0.5 text-[11px] font-medium transition-colors ${
                isActive
                  ? "bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold"
                  : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-800"
              }`}
            >
              {q.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TicketFilters;
