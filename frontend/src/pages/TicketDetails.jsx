import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, User, Mail, Calendar, AlertCircle } from "lucide-react";
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
    return <Loader />;
  }

  if (!ticket) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 text-center shadow-xs">
        <h2 className="text-lg sm:text-xl font-bold text-slate-800">Ticket not found</h2>

        <Link
          to="/tickets"
          className="mt-4 inline-block text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-800 underline underline-offset-4"
        >
          Back to Tickets
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8">
   

      <div className="mb-6 rounded-2xl border border-slate-200/90 bg-white  sm:p-6 md:p-8 shadow-xs">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-xs font-semibold text-slate-600">
                Ticket #{ticket.id}
              </span>
            </div>

            <h1 className="mt-1 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mt-2 text-slate-900 tracking-tight">
              {ticket.subject}
            </h1>
          </div>

          <StatusBadge status={ticket.status} />
        </div>

        <div className="mb-6 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 rounded-xl bg-slate-50/70 p-4 border border-slate-200/70">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-500 shadow-2xs">
              <User size={18} />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Customer
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-800">
                {ticket.customer_name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-500 shadow-2xs">
              <Mail size={18} />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Email
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-800 truncate max-w-[180px]">
                {ticket.customer_email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-500 shadow-2xs">
              <AlertCircle size={18} />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Priority
              </p>
              <div className="mt-0.5">
                <PriorityBadge priority={ticket.priority} />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-500 shadow-2xs">
              <Calendar size={18} />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Submitted
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-800">
                {new Date(ticket.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-5">
          <h3 className="mb-2 text-sm sm:text-base md:text-lg font-bold text-slate-800 tracking-tight">
            Issue Description
          </h3>

          <p className="whitespace-pre-wrap text-xs sm:text-sm md:text-base leading-relaxed text-slate-600">
            {ticket.description}
          </p>
        </div>

        <div className="mt-6 border-t border-slate-100 pt-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1">
              Change Ticket Status
            </label>
            <p className="text-xs text-slate-400">
              Update progress so the customer and team stay informed.
            </p>
          </div>

          <select
            value={ticket.status}
            onChange={handleStatusChange}
            disabled={updating}
            className="rounded-xl border border-slate-200  px-4 py-2.5 text-xs sm:text-sm md:text-base text-slate-800 outline-none   disabled:opacity-50 transition-all font-semibold"
          >
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      <CommentSection
        ticketId={ticket.id}
        resolved={ticket.status === "resolved"}
      />
    </div>
  );
};

export default TicketDetails;
