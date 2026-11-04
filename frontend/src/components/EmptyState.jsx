import { Inbox } from "lucide-react";
import { Link } from "react-router-dom";

const EmptyState = ({
  message = "No tickets found",
  description = "No customer requests match your current filters or queue criteria.",
  showAction = true,
}) => {
  return (
    <div className="surface-card flex flex-col items-center justify-center p-8 text-center">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-slate-400">
        <Inbox size={20} strokeWidth={1.8} />
      </div>

      <h3 className="text-sm font-semibold text-slate-900 tracking-tight">
        {message}
      </h3>

      <p className="mt-1 max-w-sm text-xs text-slate-500">
        {description}
      </p>

      {showAction && (
        <Link
          to="/tickets/create"
          className="mt-4 inline-flex h-8 items-center gap-1.5 rounded-md bg-indigo-600 px-3 text-xs font-medium text-white transition-colors hover:bg-indigo-700"
        >
          Create New Ticket
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
