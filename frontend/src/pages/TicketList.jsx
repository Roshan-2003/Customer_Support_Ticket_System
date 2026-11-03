import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Ticket,
  Search,
  ArrowUpRight,
} from "lucide-react";

import { useTickets } from "../context/TicketContext";
import TicketFilters from "../components/TicketFilters";
import TicketCard from "../components/TicketCard";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";

const TicketList = () => {
  const {
    tickets,
    loading,
    error,
    fetchTickets,
  } = useTickets();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  useEffect(() => {
    fetchTickets({
      search,
      status,
      priority,
    });
  }, [search, status, priority, fetchTickets]);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-7">
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

      {/* Filters */}
    <TicketFilters
  search={search}
  setSearch={setSearch}
  status={status}
  setStatus={setStatus}
  priority={priority}
  setPriority={setPriority}
/>

      {/* Ticket Count */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Tickets
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {tickets.length} {tickets.length === 1 ? "ticket" : "tickets"} found
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700">
          <Ticket size={16} />
          Ticket List
        </div>
      </div>

      {/* Ticket Results */}
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
          <EmptyState message="No matching tickets found" />
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TicketList;