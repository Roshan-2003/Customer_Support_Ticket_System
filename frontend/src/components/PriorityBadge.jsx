const PriorityBadge = ({ priority }) => {
  const styles = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[priority] || "bg-gray-100 text-gray-700"
      }`}
    >
      {priority?.toUpperCase()}
    </span>
  );
};

export default PriorityBadge;