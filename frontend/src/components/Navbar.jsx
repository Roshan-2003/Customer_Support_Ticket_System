import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Plus, X } from "lucide-react";

const Navbar = ({ mobileOpen, onToggleMobileMenu }) => {
  const [navSearch, setNavSearch] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (navSearch.trim()) {
      navigate(`/tickets?search=${encodeURIComponent(navSearch.trim())}`);
    } else {
      navigate("/tickets");
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white px-3 sm:px-5 lg:px-6">
      <div className="flex h-14 items-center justify-between gap-2 sm:gap-4">
        {/* Left: Mobile Toggle & Responsive Customer Support Branding */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 md:hidden"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          {/* Customer Support Brand - 100% Responsive for All Screen Sizes */}
     
        </div>

        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex flex-1 max-w-xs lg:max-w-md mx-2 lg:mx-4 items-center"
        ></form>

        {/* Right: Actions, Status & User Profile */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <Link
            to="/tickets/create"
            className="inline-flex h-8 items-center gap-1.5 rounded-md bg-indigo-600 px-2.5 sm:px-3 text-xs font-medium text-white shadow-xs transition-colors hover:bg-indigo-700"
          >
            <Plus size={15} strokeWidth={2.2} />
            <span className="hidden sm:inline">Create Ticket</span>
            <span className="sm:hidden">Create</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
