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
      <div className="mb-4 sm:mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          {/* <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Support Tickets
          </h1>

          <p className="mt-1 text-xs sm:text-sm md:text-base text-slate-500">
            Browse, search, and manage all incoming support requests.
          </p> */}
        </div>

      
      </div>

      <TicketFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        priority={priority}
        setPriority={setPriority}
      />

      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs sm:text-sm font-semibold text-slate-500">
          Showing <span className="text-slate-900 font-bold">{tickets.length}</span> {tickets.length === 1 ? "ticket" : "tickets"}
        </p>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs sm:text-sm font-medium text-rose-700">
          {error}
        </div>
      ) : tickets.length === 0 ? (
        <EmptyState message="No matching tickets found" />
      ) : (
        <div className="grid gap-4 sm:gap-5 grid-cols-1 lg:grid-cols-2">
          {tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TicketList;
