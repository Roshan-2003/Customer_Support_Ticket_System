import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";

import { useTickets } from "../context/TicketContext";
import TicketFilters from "../components/TicketFilters";
import TicketCard from "../components/TicketCard";
import StatusBadge from "../components/StatusBadge";
import PriorityBadge from "../components/PriorityBadge";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";

const TicketList = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { tickets, loading, error, fetchTickets } = useTickets();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [priority, setPriority] = useState(searchParams.get("priority") || "");
  const [viewMode, setViewMode] = useState("table"); // 'table' | 'card'

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setStatus(searchParams.get("status") || "");
    setPriority(searchParams.get("priority") || "");
  }, [searchParams]);

  useEffect(() => {
    fetchTickets({
      search,
      status,
      priority,
    });
  }, [search, status, priority, fetchTickets]);

  return (
    <div>
      <TicketFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        priority={priority}
        setPriority={setPriority}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      <div className="mb-3 flex items-center justify-between text-xs text-slate-500">
        <p>
          Showing{" "}
          <span className="font-semibold text-slate-900">{tickets.length}</span>{" "}
          {tickets.length === 1 ? "issue" : "issues"}
          {(search || status || priority) && " (filtered)"}
        </p>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-xs font-medium text-rose-700">
          {error}
        </div>
      ) : tickets.length === 0 ? (
        <EmptyState message="No matching tickets found" />
      ) : viewMode === "table" ? (
        <div className="surface-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  <th className="py-2.5 px-3.5 w-16">No.</th>
                  <th className="py-2.5 px-3.5 hidden sm:table-cell">
                    Customer
                  </th>
                  <th className="py-2.5 px-3.5 hidden sm:table-cell">Email</th>

                  <th className="py-2.5 px-3.5">Subject</th>

                  <th className="py-2.5 px-3.5 w-24">Priority</th>
                  <th className="py-2.5 px-3.5 w-28">Status</th>

                  <th className="py-2.5 px-3.5 w-10 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {tickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    onClick={() => navigate(`/tickets/${ticket.id}`)}
                    className="group cursor-pointer hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-2.5 px-3.5 whitespace-nowrap">
                      <span className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-slate-600 group-hover:border-indigo-200 group-hover:bg-indigo-50/50 group-hover:text-indigo-600">
                        #{ticket.id}
                      </span>
                    </td>
                    <td className="py-2.5 px-3.5 hidden sm:table-cell whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-slate-700">
                          {ticket.customer_name}
                        </span>
                      </div>
                    </td>

                    <td className="py-2.5 px-3.5 hidden sm:table-cell whitespace-nowrap text-slate-600">
                      {ticket.customer_email || "—"}
                    </td>

                    <td className="py-2.5 px-3.5 min-w-[200px]">
                      <div className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                        {ticket.subject}
                      </div>
                      {/* <div className="text-[11px] text-slate-400 line-clamp-1">
                        {ticket.description}
                      </div> */}
                    </td>

                    <td className="py-2.5 px-3.5 whitespace-nowrap">
                      <PriorityBadge priority={ticket.priority} />
                    </td>

                    <td className="py-2.5 px-3.5 whitespace-nowrap">
                      <StatusBadge status={ticket.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TicketList;
