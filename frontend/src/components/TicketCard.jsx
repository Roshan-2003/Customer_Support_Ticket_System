import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";

const TicketCard = ({ ticket }) => {
  return (
    <Link
      to={`/tickets/${ticket.id}`}
      className="block rounded-xl border bg-white p-5 transition hover:shadow-md"
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-medium text-gray-500">
          Ticket #{ticket.id}
        </span>

        <StatusBadge status={ticket.status} />
      </div>

      <h3 className="mb-2 font-semibold text-gray-800">
        {ticket.subject}
      </h3>

      <p className="mb-4 line-clamp-2 text-sm text-gray-500">
        {ticket.description}
      </p>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-gray-700">
            {ticket.customer_name}
          </p>

          <p className="text-xs text-gray-500">
            {ticket.customer_email}
          </p>
        </div>

        <PriorityBadge priority={ticket.priority} />
      </div>
    </Link>
  );
};

export default TicketCard;