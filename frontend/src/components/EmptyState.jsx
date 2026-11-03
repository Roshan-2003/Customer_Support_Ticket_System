import { Inbox } from "lucide-react";

const EmptyState = ({ message = "No tickets found" }) => {
  return (
    <div className="flex flex-col items-center justify-center py-14 sm:py-20 text-center rounded-2xl border border-dashed border-slate-300 bg-white p-6 shadow-2xs">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500 mb-4 shadow-xs">
        <Inbox size={28} strokeWidth={1.8} />
      </div>

      <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-800 tracking-tight">
        {message}
      </h3>

      <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-sm">
        New support requests will appear here once created.
      </p>
    </div>
  );
};

export default EmptyState;
