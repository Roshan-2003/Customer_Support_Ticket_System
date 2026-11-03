import { Search, X, Filter } from "lucide-react";

const TicketFilters = ({
  search,
  setSearch,
  status,
  setStatus,
  priority,
  setPriority,
}) => {
  const hasActiveFilters = search || status || priority;

  const handleReset = () => {
    setSearch("");
    setStatus("");
    setPriority("");
  };

  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-indigo-600" />
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700">
            Search & Filter
          </span>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <X size={14} />
            Reset filters
          </button>
        )}
      </div>

      <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 md:grid-cols-3">
        {/* Search */}
        <div className="relative">
          <label className="mb-1 block text-xs font-semibold text-slate-600">
            Search Tickets
          </label>
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by subject or description..."
              className="w-full rounded-xl border border-slate-200  pl-10 pr-8 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none  transition-all"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-600">
            Filter by Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-xl border border-slate-200  px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 outline-none  transition-all"
          >
            <option value="">All Statuses</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        {/* Priority */}
        <div className="sm:col-span-2 md:col-span-1">
          <label className="mb-1 block text-xs font-semibold text-slate-600">
            Filter by Priority
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full rounded-xl border border-slate-200  px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 outline-none  transition-all"
          >
            <option value="">All Priorities</option>
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TicketFilters;
