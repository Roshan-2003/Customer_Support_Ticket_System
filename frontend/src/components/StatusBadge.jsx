const StatusBadge = ({ status }) => {
  const styles = {
    open: "bg-blue-100 text-blue-700",
    in_progress: "bg-yellow-100 text-yellow-700",
    resolved: "bg-green-100 text-green-700",
  };

  const labels = {
    open: "Open",
    in_progress: "In Progress",
    resolved: "Resolved",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {labels[status] || status}
    </span>
  );
};

export default StatusBadge;