import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Ticket,
  Clock,
  CheckCircle,
  CircleDot,
  Plus,
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
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Open",
      value: dashboard.open,
      icon: CircleDot,
      color: "bg-sky-100 text-sky-600",
    },
    {
      title: "In Progress",
      value: dashboard.in_progress,
      icon: Clock,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Resolved",
      value: dashboard.resolved,
      icon: CheckCircle,
      color: "bg-green-100 text-green-600",
    },
  ];

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage and track customer support tickets.
          </p>
        </div>

        <Link
          to="/tickets/create"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Create Ticket
        </Link>
      </div>

      <div className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-xl border bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  {item.title}
                </p>

                <div className={`rounded-lg p-3 ${item.color}`}>
                  <Icon size={21} />
                </div>
              </div>

              <h2 className="mt-4 text-3xl font-bold text-gray-800">
                {item.value}
              </h2>
            </div>
          );
        })}
      </div>

      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">
          Recent Tickets
        </h2>

        <Link
          to="/tickets"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          View All
        </Link>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <p className="rounded-lg bg-red-50 p-4 text-red-600">
          {error}
        </p>
      ) : tickets.length === 0 ? (
        <EmptyState message="No tickets available" />
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {tickets.slice(0, 4).map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;