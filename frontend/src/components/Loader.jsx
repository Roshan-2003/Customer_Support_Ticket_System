import { Loader2 } from "lucide-react";

const Loader = ({ message = "Loading queue data..." }) => {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center gap-2.5 py-10">
      <Loader2 size={24} className="animate-spin text-indigo-600" />
      <p className="text-xs font-medium text-slate-500">{message}</p>
    </div>
  );
};

export default Loader;
