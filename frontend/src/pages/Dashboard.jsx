import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Ticket,
  Clock,
  CheckCircle,
  CircleDot,
  Plus,
  ArrowRight,
} from "lucide-react";

import { useTickets } from "../context/TicketContext";
import TicketCard from "../components/TicketCard";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";

const Dashboard = () => {
  const {
    dashboard,
    tickets,
    loading,
    error,
    fetchTickets,
    fetchDashboard,
  } = useTickets();

  useEffect(() => {
    fetchDashboard();
    fetchTickets();
  }, [fetchDashboard, fetchTickets]);

  const stats = [
    {
      title: "Total Tickets",
      value: dashboard.total,
      icon: Ticket,
      iconBg: "bg-indigo-100 text-indigo-600",
      cardBorder: "hover:border-indigo-300",
    },
    {
      title: "Open Tickets",
      value: dashboard.open,
      icon: CircleDot,
      iconBg: "bg-sky-100 text-sky-600",
      cardBorder: "hover:border-sky-300",
    },
    {
      title: "In Progress",
      value: dashboard.in_progress,
      icon: Clock,
      iconBg: "bg-amber-100 text-amber-600",
      cardBorder: "hover:border-amber-300",
    },
    {
      title: "Resolved",
      value: dashboard.resolved,
      icon: CheckCircle,
      iconBg: "bg-emerald-100 text-emerald-600",
      cardBorder: "hover:border-emerald-300",
    },
  ];

  return (
    <div>
      <div className="mb-6 sm:mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          {/* <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Helpdesk Dashboard
          </h1>

          <p className="mt-1 text-xs sm:text-sm md:text-base text-slate-500">
            Overview of customer inquiries and support status.
          </p> */}
        </div>

        {/* <Link
          to="/tickets/create"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 sm:px-5 py-2.5 text-xs sm:text-sm md:text-base font-semibold text-white shadow-sm hover:from-indigo-700 hover:to-violet-700 hover:shadow-md transition-all active:scale-[0.98]"
        >
          <Plus size={18} />
          Create Ticket
        </Link> */}
      </div>

      <div className="mb-8 grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className={`rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 md:p-6 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${item.cardBorder}`}
            >
              <div className="flex items-center justify-between">
                <p className="text-xs sm:text-sm font-semibold text-slate-500">
                  {item.title}
                </p>

                <div className={`flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl shadow-2xs ${item.iconBg}`}>
                  <Icon size={20} />
                </div>
              </div>

              <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                {item.value}
              </h2>
            </div>
          );
        })}
      </div>

      <div className="mb-4 sm:mb-5 flex items-center justify-between">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
          Recent Tickets
        </h2>

        <Link
          to="/tickets"
          className="inline-flex items-center gap-1 text-xs sm:text-sm md:text-base font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          View all tickets
          <ArrowRight size={15} />
        </Link>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs sm:text-sm font-medium text-rose-700">
          {error}
        </div>
      ) : tickets.length === 0 ? (
        <EmptyState message="No tickets available" />
      ) : (
        <div className="grid gap-4 sm:gap-5 grid-cols-1 lg:grid-cols-2">
          {tickets.slice(0, 4).map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
