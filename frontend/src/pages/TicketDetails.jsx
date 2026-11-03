import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
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
      <div className="rounded-xl border bg-white p-8 text-center">
        <h2 className="text-xl font-semibold">Ticket not found</h2>

        <Link
          to="/tickets"
          className="mt-4 inline-block text-blue-600 hover:underline"
        >
          Back to Tickets
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        to="/tickets"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
      >
        <ArrowLeft size={18} />
        Back to Tickets
      </Link>

      <div className="mb-6 rounded-xl border bg-white p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-gray-500">
              Ticket #{ticket.id}
            </p>

            <h1 className="mt-1 text-2xl font-bold text-gray-800">
              {ticket.subject}
            </h1>
          </div>

          <StatusBadge status={ticket.status} />
        </div>

        <div className="mb-6 grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-xs text-gray-500">Customer Name</p>
            <p className="mt-1 font-medium">
              {ticket.customer_name}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Customer Email</p>
            <p className="mt-1 font-medium">
              {ticket.customer_email}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Priority</p>
            <div className="mt-2">
              <PriorityBadge priority={ticket.priority} />
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-500">Created At</p>
            <p className="mt-1 font-medium">
              {new Date(ticket.created_at).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="border-t pt-5">
          <h3 className="mb-2 font-semibold text-gray-800">
            Description
          </h3>

          <p className="whitespace-pre-wrap text-sm leading-7 text-gray-600">
            {ticket.description}
          </p>
        </div>

        <div className="mt-6 border-t pt-5">
          <label className="mb-2 block text-sm font-semibold">
            Update Ticket Status
          </label>

          <select
            value={ticket.status}
            onChange={handleStatusChange}
            disabled={updating}
            className="w-full max-w-xs rounded-lg border px-4 py-3 outline-none focus:border-blue-500 disabled:opacity-60"
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