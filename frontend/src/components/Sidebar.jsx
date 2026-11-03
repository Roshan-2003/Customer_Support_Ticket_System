import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Ticket,
  PlusCircle,
  X,
  Headphones,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const Sidebar = ({ mobileOpen, onClose }) => {
  const links = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      name: "All Tickets",
      path: "/tickets",
      icon: Ticket,
      badge: null,
    },
    {
      name: "Create Ticket",
      path: "/tickets/create",
      icon: PlusCircle,
    //   badge: "New",
    },
  ];

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between bg-white text-slate-800 p-5 border-r border-slate-200/80 shadow-xs">
      <div>
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-sm shadow-indigo-200">
              <Headphones size={20} strokeWidth={2.2} />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 leading-none">
                Support<span className="text-indigo-600">Desk</span>
              </h1>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Help Center
              </span>
            </div>
          </div>

          {/* Close button on mobile */}
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 md:hidden transition-colors"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mb-3 px-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Menu
          </p>
        </div>

        <nav className="space-y-1.5">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/" || link.path === "/tickets"}
                onClick={onClose}
                className={({ isActive }) =>
                  `group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700 shadow-2xs font-bold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon
                        size={19}
                        className={`transition-colors ${
                          isActive
                            ? "text-indigo-600"
                            : "text-slate-400 group-hover:text-slate-600"
                        }`}
                      />
                      <span>{link.name}</span>
                    </div>

                    {link.badge ? (
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          isActive
                            ? "bg-indigo-600 text-white"
                            : "bg-indigo-100 text-indigo-700"
                        }`}
                      >
                        {link.badge}
                      </span>
                    ) : (
                      <ChevronRight
                        size={14}
                        className={`opacity-0 group-hover:opacity-100 transition-opacity ${
                          isActive ? "opacity-100 text-indigo-400" : "text-slate-300"
                        }`}
                      />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/70 to-violet-50/50 p-4">
        <div className="flex items-center gap-2 mb-1.5 text-indigo-700">
          <Sparkles size={16} />
          <p className="text-xs font-bold">24/7 Support Portal</p>
        </div>
        <p className="text-[11px] leading-relaxed text-slate-500">
          Quickly resolve customer tickets & inquiries in real time.
        </p>
      </div> */}
    </div>
  );

  return (
    <>
      {/* Desktop fixed sidebar */}
      <aside className="fixed left-0 top-0 hidden h-screen w-64 md:block z-40">
        {sidebarContent}
      </aside>

      {/* Mobile drawer backdrop and panel */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={onClose}
          />

          {/* Drawer */}
          <aside className="relative h-full w-72 max-w-[85vw] shadow-2xl">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;
