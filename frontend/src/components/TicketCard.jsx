import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";

const TicketCard = ({ ticket }) => {
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Link
      to={`/tickets/${ticket.id}`}
      className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 md:p-6 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md"
    >
      <div>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[11px] font-semibold text-slate-600">
              #{ticket.id}
            </span>
            <span className="text-[11px] text-slate-400">
              {ticket.created_at ? new Date(ticket.created_at).toLocaleDateString() : ""}
            </span>
          </div>

          <StatusBadge status={ticket.status} />
        </div>

        <div className="flex items-start justify-between gap-2">
          <h3 className="mb-2 text-sm sm:text-base md:text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
            {ticket.subject}
          </h3>
          <ArrowUpRight
            size={16}
            className="text-slate-400 opacity-0 group-hover:opacity-100 group-hover:text-indigo-600 transition-all shrink-0 mt-1"
          />
        </div>

        <p className="mb-5 line-clamp-2 text-xs sm:text-sm leading-relaxed text-slate-600">
          {ticket.description}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3.5 mt-auto">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50 border border-indigo-100 text-xs font-bold text-indigo-700">
            {getInitials(ticket.customer_name)}
          </div>
          <div>
            <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-tight">
              {ticket.customer_name}
            </p>
            <p className="text-[11px] text-slate-400 leading-none">
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
