import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

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
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            All Tickets
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Search and manage all customer tickets.
          </p>
        </div>

        <Link
          to="/tickets/create"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Create Ticket
        </Link>
      </div>

      <TicketFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        priority={priority}
        setPriority={setPriority}
      />

      <p className="mb-4 text-sm text-gray-500">
        {tickets.length} tickets found
      </p>

      {loading ? (
        <Loader />
      ) : error ? (
        <p className="rounded-lg bg-red-50 p-4 text-red-600">
          {error}
        </p>
      ) : tickets.length === 0 ? (
        <EmptyState message="No matching tickets found" />
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