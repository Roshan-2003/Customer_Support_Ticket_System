
const Loader = () => {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center gap-4">
      <div className="flex items-center gap-2">
        {[0, 1, 2, 3].map((dot) => (
          <span
            key={dot}
            className="h-3 w-3 animate-bounce rounded-full bg-indigo-600"
            style={{
              animationDelay: `${dot * 0.15}s`,
            }}
          />
        ))}
      </div>

      <p className="text-sm font-medium text-slate-500">
        Loading data...
      </p>
    </div>
  );
};

export default Loader;
