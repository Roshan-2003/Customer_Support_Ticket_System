import { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { getTicketById, updateTicketStatus } from "../services/ticketApi";
import StatusBadge from "../components/StatusBadge";
import PriorityBadge from "../components/PriorityBadge";
import CommentSection from "../components/CommentSection";
import Loader from "../components/Loader";

import { useTickets } from "../context/TicketContext";

const TicketDetails = () => {
  const { id } = useParams();
  const { refreshData } = useTickets();

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchTicket = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getTicketById(id);
      setTicket(response.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Ticket not found");
      setTicket(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchTicket();
  }, [fetchTicket]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;

    try {
      setUpdating(true);
      const response = await updateTicketStatus(id, newStatus);
      setTicket(response.data.data);
      await refreshData();
      toast.success("Status updated to " + newStatus.replace("_", " "));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return "CU";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return <Loader />;
  }

  if (!ticket) {
    return (
      <div className="surface-card p-8 text-center">
        <h2 className="text-base font-bold text-slate-900">Ticket not found</h2>
        <p className="mt-1 text-xs text-slate-500">
          The requested ticket does not exist or has been deleted.
        </p>
        <Link
          to="/tickets"
          className="mt-4 inline-flex h-8 items-center gap-1.5 rounded-md bg-indigo-600 px-3 text-xs font-medium text-white transition-colors hover:bg-indigo-700"
        >
          <ArrowLeft size={14} />
          Back to Tickets
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-8">
      <div className="flex flex-wrap items-center justify-between gap-3"></div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="surface-card p-4 sm:p-5">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-xs font-semibold text-slate-700">
                  #{ticket.id}
                </span>
                <span className="text-xs text-slate-400">
                  Reported by {ticket.customer_name}
                </span>
              </div>
              <StatusBadge status={ticket.status} />
            </div>

            <h1 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              {ticket.subject}
            </h1>

            <div className="mt-4 border-t border-slate-100 pt-3.5">
              <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Description
              </h3>
              <div className="rounded-md border border-slate-100 bg-slate-50/60 p-3 sm:p-3.5">
                <p className="whitespace-pre-wrap text-xs sm:text-sm leading-relaxed text-slate-700">
                  {ticket.description}
                </p>
              </div>
            </div>
          </div>

          <CommentSection
            ticketId={ticket.id}
            resolved={ticket.status === "resolved"}
          />
        </div>

        <div className="space-y-4">
          <div className="surface-card p-4 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-2 border-b border-slate-100">
              Issue Attributes
            </h3>

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                Workflow Status
              </label>
              <div className="relative">
                <select
                  value={ticket.status}
                  onChange={handleStatusChange}
                  disabled={updating}
                  className="h-8.5 w-full rounded-md border border-slate-300 bg-white px-2.5 text-xs font-medium text-slate-800 outline-none transition-colors focus:border-indigo-600 disabled:opacity-60"
                >
                  <option value="open">Open </option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved (Done)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                Priority
              </label>
              <div className="pt-0.5">
                <PriorityBadge priority={ticket.priority} />
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3">
              <label className="mb-2 block text-xs font-semibold text-slate-700">
                Reporter / Customer
              </label>
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-slate-100 text-xs font-bold text-slate-700">
                  {getInitials(ticket.customer_name)}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-slate-900">
                    {ticket.customer_name}
                  </p>
                  <a
                    href={`mailto:${ticket.customer_email}`}
                    className="truncate text-[11px] text-indigo-600 hover:underline block"
                  >
                    {ticket.customer_email}
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-500">
                <span>Created:</span>
                <span className="font-medium text-slate-700">
                  {ticket.created_at
                    ? new Date(ticket.created_at).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })
                    : "—"}
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-500">
                <span>Key:</span>
                <span className="font-mono font-medium text-slate-700">
                  #{ticket.id}
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-500">
                <span>Service Level:</span>
                <span className="font-medium text-emerald-600">
                  Standard Tier
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
