import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Ticket,
  Clock,
  CheckCircle2,
  CircleDot,
  ArrowRight,
  LayoutGrid,
  List,
} from "lucide-react";

import { useTickets } from "../context/TicketContext";
import TicketCard from "../components/TicketCard";
import StatusBadge from "../components/StatusBadge";
import PriorityBadge from "../components/PriorityBadge";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";

const Dashboard = () => {
  const navigate = useNavigate();
  const { dashboard, tickets, loading, error, fetchTickets, fetchDashboard } =
    useTickets();

  const [viewMode, setViewMode] = useState("table");

  useEffect(() => {
    fetchDashboard();
    fetchTickets();
  }, [fetchDashboard, fetchTickets]);

  const total = dashboard.total || 0;
  const openCount = dashboard.open || 0;
  const inProgressCount = dashboard.in_progress || 0;
  const resolvedCount = dashboard.resolved || 0;

  const openPct = total > 0 ? Math.round((openCount / total) * 100) : 0;
  const inProgressPct =
    total > 0 ? Math.round((inProgressCount / total) * 100) : 0;
  const resolvedPct = total > 0 ? Math.round((resolvedCount / total) * 100) : 0;

  const stats = [
    {
      title: "Total Issues",
      value: total,
      icon: Ticket,
      iconBg: "bg-indigo-50 text-indigo-600 border border-indigo-200",
      link: "/tickets",
    },
    {
      title: "Open & Unassigned",
      value: openCount,
      icon: CircleDot,
      iconBg: "bg-sky-50 text-sky-600 border border-sky-200",
      link: "/tickets?status=open",
    },
    {
      title: "In Progress",
      value: inProgressCount,
      icon: Clock,
      iconBg: "bg-amber-50 text-amber-600 border border-amber-200",
      link: "/tickets?status=in_progress",
    },
    {
      title: "Resolved Issues",
      value: resolvedCount,
      icon: CheckCircle2,
      iconBg: "bg-emerald-50 text-emerald-600 border border-emerald-200",
      link: "/tickets?status=resolved",
    },
  ];

  return (
    <div>
      {/* Jira-style 4 Key Metrics Grid */}
      <div className="mb-5 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              to={item.link}
              className="surface-card p-3.5 sm:p-4 transition-all duration-150 hover:border-slate-300 hover:shadow-xs group"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-slate-500">
                  {item.title}
                </p>
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-md ${item.iconBg}`}
                >
                  <Icon size={14} />
                </div>
              </div>

              <div className="mt-2.5 flex items-baseline justify-between">
                <span className="text-2xl font-bold tracking-tight text-slate-900">
                  {item.value}
                </span>
                <span className="text-[11px] text-slate-400 group-hover:text-indigo-600 transition-colors">
                  {item.meta}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {total > 0 && (
        <div className="surface-card mb-5 p-3.5 sm:p-4">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-800">
              Queue Distribution
            </span>
            <span className="text-[11px] text-slate-500">
              {resolvedPct}% Completion Rate
            </span>
          </div>
          {/* Multi-segment progress bar */}
          <div className="flex h-2 w-full overflow-hidden rounded-md bg-slate-100">
            <div
              style={{ width: `${openPct}%` }}
              className="bg-sky-500 transition-all duration-500"
              title={`Open: ${openCount} (${openPct}%)`}
            />
            <div
              style={{ width: `${inProgressPct}%` }}
              className="bg-amber-500 transition-all duration-500"
              title={`In Progress: ${inProgressCount} (${inProgressPct}%)`}
            />
            <div
              style={{ width: `${resolvedPct}%` }}
              className="bg-emerald-500 transition-all duration-500"
              title={`Resolved: ${resolvedCount} (${resolvedPct}%)`}
            />
          </div>
          <div className="mt-2.5 flex flex-wrap items-center gap-4 text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-sky-500" />
              <span>Open: {openCount}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              <span>In Progress: {inProgressCount}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>Resolved: {resolvedCount}</span>
            </div>
          </div>
        </div>
      )}

      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-slate-900">
          Recent Activity &amp; Tickets
        </h2>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center rounded-md border border-slate-200 bg-slate-100/80 p-0.5">
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`flex h-6 items-center gap-1 rounded px-2 text-[11px] font-medium transition-colors ${
                viewMode === "table"
                  ? "bg-white text-slate-900 shadow-2xs font-semibold"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <List size={13} />
              <span>Table</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("card")}
              className={`flex h-6 items-center gap-1 rounded px-2 text-[11px] font-medium transition-colors ${
                viewMode === "card"
                  ? "bg-white text-slate-900 shadow-2xs font-semibold"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <LayoutGrid size={12} />
              <span>Cards</span>
            </button>
          </div>

          <Link
            to="/tickets"
            className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 transition-colors hover:text-indigo-800"
          >
            <span>View all queue</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-xs font-medium text-rose-700">
          {error}
        </div>
      ) : tickets.length === 0 ? (
        <EmptyState message="No tickets recorded yet" />
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
                {tickets.slice(0, 5).map((ticket) => (
                  <tr
                    key={ticket.id}
                    onClick={() => navigate(`/tickets/${ticket.id}`)}
                    className="group cursor-pointer hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-2.5 px-3.5 whitespace-nowrap">
                      <span className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-slate-600 group-hover:border-indigo-200 group-hover:text-indigo-600">
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
                      <span className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                        {ticket.subject}
                      </span>
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
        <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2">
          {tickets.slice(0, 4).map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
