import { Bell, Menu, X } from "lucide-react";

const Navbar = ({ mobileOpen, onToggleMobileMenu }) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 sm:px-6 md:px-8 backdrop-blur-md">
      <div className="flex items-center gap-3">
        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 md:hidden transition-colors"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className="flex items-center gap-2.5">
          <h2 className=" text-2xl font-bold tracking-tight text-slate-900">
            Customer Support System
          </h2>
          {/* <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-emerald-200/70 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live System
          </span> */}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50/50 transition-colors"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-600 ring-2 ring-white" />
        </button>

        <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white p-1 pr-3 shadow-2xs">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 text-xs font-bold text-white shadow-xs">
            A
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold leading-none text-slate-900">Admin</p>
            <p className="text-[10px] font-medium text-slate-500 leading-tight">Support Lead</p>
          </div>
        </div> */}
      </div>
    </header>
  );
};

export default Navbar;
