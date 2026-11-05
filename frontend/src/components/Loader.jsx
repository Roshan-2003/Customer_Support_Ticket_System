

const Loader = ({ message = "Loading ..." }) => {
  return (
   <div className="flex min-h-48 flex-col items-center justify-center gap-3 py-10">
  <div className="flex items-center gap-1.5">
    {[0, 1, 2].map((dot) => (
      <span
        key={dot}
        className="h-2.5 w-2.5 animate-bounce rounded-full bg-indigo-600"
        style={{ animationDelay: `${dot * 150}ms` }}
      />
    ))}
  </div>

  <p className="text-xs font-medium text-slate-500">
    {message}
  </p>
</div>
  );
};

export default Loader;
