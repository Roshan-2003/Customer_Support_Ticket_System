import { Inbox } from "lucide-react";

const EmptyState = ({ message = "No tickets found" }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Inbox size={45} className="mb-3 text-gray-400" />

      <h3 className="text-lg font-semibold text-gray-700">
        {message}
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        Tickets will appear here.
      </p>
    </div>
  );
};

export default EmptyState;