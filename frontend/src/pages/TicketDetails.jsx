import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  UserRound,
  Mail,
  CalendarDays,
  Ticket,
  FileText,
  RefreshCw,
  Clock,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  getTicketById,
  updateTicketStatus,
} from "../services/ticketApi";

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

  const fetchTicket = async () => {
    try {
      setLoading(true);

      const response = await getTicketById(id);
      setTicket(response.data.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Ticket not found"
      );

      setTicket(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;

    try {
      setUpdating(true);

      const response = await updateTicketStatus(id, newStatus);

      setTicket(response.data.data);

      await refreshData();

      toast.success("Ticket status updated");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update status"
      );
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white py-12">
        <Loader />
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
          <Ticket size={26} className="text-gray-500" />
        </div>

        <h2 className="text-xl font-bold text-gray-800">
          Ticket not found
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          This ticket may have been removed or the ID is incorrect.
        </p>

        <Link
          to="/tickets"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <ArrowLeft size={16} />
          Back to Tickets
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      {/* Back Navigation */}
      <Link
        to="/tickets"
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-blue-600"
      >
        <ArrowLeft size={18} />
        Back to Tickets
      </Link>

      {/* Ticket Header */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                <Ticket size={14} />
                Ticket #{ticket.id}
              </span>

              <StatusBadge status={ticket.status} />
            </div>

            <h1 className="max-w-3xl text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:text-3xl">
              {ticket.subject}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              View ticket information and manage its resolution.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-gray-50 px-4 py-3">
            <Clock size={17} className="text-gray-500" />

            <div>
              <p className="text-xs text-gray-500">
                Created on
              </p>

              <p className="mt-0.5 text-sm font-semibold text-gray-800">
                {new Date(ticket.created_at).toLocaleDateString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50/70 p-4">
            <div className="rounded-lg bg-white p-2.5 text-blue-600 shadow-sm">
              <UserRound size={19} />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-500">
                Customer Name
              </p>

              <p className="mt-1 break-words text-sm font-semibold text-gray-800">
                {ticket.customer_name}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50/70 p-4">
            <div className="rounded-lg bg-white p-2.5 text-blue-600 shadow-sm">
              <Mail size={19} />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-500">
                Customer Email
              </p>

              <p className="mt-1 break-all text-sm font-semibold text-gray-800">
                {ticket.customer_email}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50/70 p-4">
            <div className="rounded-lg bg-white p-2.5 text-amber-600 shadow-sm">
              <FileText size={19} />
            </div>

            <div>
              <p className="text-xs font-medium text-gray-500">
                Priority
              </p>

              <div className="mt-2">
                <PriorityBadge priority={ticket.priority} />
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50/70 p-4">
            <div className="rounded-lg bg-white p-2.5 text-emerald-600 shadow-sm">
              <CalendarDays size={19} />
            </div>

            <div>
              <p className="text-xs font-medium text-gray-500">
                Created At
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-800">
                {new Date(ticket.created_at).toLocaleString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-7 border-t border-gray-100 pt-6">
          <div className="mb-3 flex items-center gap-2">
            <FileText size={18} className="text-gray-500" />

            <h2 className="text-base font-semibold text-gray-800">
              Ticket Description
            </h2>
          </div>

          <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-4 sm:p-5">
            <p className="whitespace-pre-wrap break-words text-sm leading-7 text-gray-600">
              {ticket.description}
            </p>
          </div>
        </div>

        {/* Status Update */}
        <div className="mt-7 border-t border-gray-100 pt-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-base font-semibold text-gray-800">
                Update Ticket Status
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Change the current status of this ticket.
              </p>
            </div>

            <div className="relative w-full sm:w-56">
              <select
                value={ticket.status}
                onChange={handleStatusChange}
                disabled={updating}
                className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 pr-10 text-sm font-semibold text-gray-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>

              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                {updating ? (
                  <RefreshCw
                    size={16}
                    className="animate-spin text-blue-600"
                  />
                ) : (
                  <span className="text-xs text-gray-500">▼</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comments */}
      <CommentSection
        ticketId={ticket.id}
        resolved={ticket.status === "resolved"}
      />
    </div>
  );
};

export default TicketDetails;