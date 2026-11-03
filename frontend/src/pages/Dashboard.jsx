import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Ticket,
  Clock,
  CheckCircle,
  CircleDot,
  Plus,
  ArrowUpRight,
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
      color: "bg-blue-50 text-blue-600",
      accent: "border-l-blue-500",
    },
    {
      title: "Open Tickets",
      value: dashboard.open,
      icon: CircleDot,
      color: "bg-sky-50 text-sky-600",
      accent: "border-l-sky-500",
    },
    {
      title: "In Progress",
      value: dashboard.in_progress,
      icon: Clock,
      color: "bg-amber-50 text-amber-600",
      accent: "border-l-amber-500",
    },
    {
      title: "Resolved",
      value: dashboard.resolved,
      icon: CheckCircle,
      color: "bg-emerald-50 text-emerald-600",
      accent: "border-l-emerald-500",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
   
        </div>

        <Link
          to="/tickets/create"
          className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-100"
        >
          <Plus size={18} />
          Create Ticket
        </Link>
      </div>

      {/* Statistics */}
      <section>
        <div className="mb-4">
        
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`rounded-2xl border border-gray-100 border-l-4 ${item.accent} bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-500">
                    {item.title}
                  </p>

                  <div className={`rounded-xl p-3 ${item.color}`}>
                    <Icon size={21} strokeWidth={2} />
                  </div>
                </div>

                <div className="mt-5 flex items-end justify-between">
                  <h3 className="text-3xl font-bold tracking-tight text-gray-900">
                    {item.value ?? 0}
                  </h3>

                  <span className="text-xs font-medium text-gray-400">
                    Tickets
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recent Tickets */}
      <section>
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Recent Tickets
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Latest customer support requests
            </p>
          </div>

          <Link
            to="/tickets"
            className="inline-flex w-fit items-center gap-1 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
          >
            View All Tickets
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-gray-100 bg-white py-12">
            <Loader />
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        ) : tickets.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white py-10">
            <EmptyState message="No tickets available" />
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">
            {tickets.slice(0, 4).map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;