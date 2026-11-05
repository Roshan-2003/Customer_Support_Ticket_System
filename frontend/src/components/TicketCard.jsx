import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";

const TicketCard = ({ ticket }) => {
  const getInitials = (name) => {
    if (!name) return "CU";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formattedDate = ticket.created_at
    ? new Date(ticket.created_at).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <Link
      to={`/tickets/${ticket.id}`}
      className="group relative flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-3.5 sm:p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-150 hover:border-slate-300 hover:shadow-xs"
    >
      <div>
        <div className="mb-2.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-slate-600">
              #{ticket.id}
            </span>
            <span className="text-[11px] text-slate-400">{formattedDate}</span>
          </div>

          <StatusBadge status={ticket.status} />
        </div>

        <h3 className="mb-1.5 text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
          {ticket.subject}
        </h3>

        <p className="mb-4 text-xs leading-relaxed text-slate-600 line-clamp-2">
          {ticket.description}
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between gap-2 border-t border-slate-100 pt-2.5">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-slate-100 text-[10px] font-bold text-slate-700">
            {getInitials(ticket.customer_name)}
          </div>
          <div className="min-w-0 truncate">
            <p className="truncate text-xs font-medium text-slate-800">
              {ticket.customer_name}
            </p>
            <p className="truncate text-[10px] text-slate-400">
              {ticket.customer_email}
            </p>
          </div>
        </div>

        <PriorityBadge priority={ticket.priority} />
      </div>
    </Link>
  );
};

export default TicketCard;
