import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Ticket,
  PlusCircle,
  X,
  CircleDot,
  CheckCircle2,
  Clock,
  FolderKanban,
} from "lucide-react";
import { useTickets } from "../context/TicketContext";

const Sidebar = ({ mobileOpen, onClose }) => {
  const { dashboard } = useTickets();

  const mainLinks = [
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
      badge: dashboard?.total || 0,
    },
    {
      name: "Create Ticket",
      path: "/tickets/create",
      icon: PlusCircle,
      badge: null,
    },
  ];

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between border-r border-slate-200 bg-white p-3.5 sm:p-4">
      <div className="space-y-5">
        {/* Workspace Brand / Project Switcher */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-indigo-600 text-white shadow-xs">
              <FolderKanban size={16} strokeWidth={2.2} />
            </div>
            <div>
              <h1 className="text-xs font-bold uppercase tracking-wider text-slate-900 leading-tight">
                SupportDesk
              </h1>
              <span className="text-[10px] font-medium text-slate-500">
                Customer Queue
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition-colors hover:bg-slate-100 md:hidden"
            aria-label="Close sidebar"
          >
            <X size={15} />
          </button>
        </div>

        {/* Section 1: Main Navigation */}
        <div>
          <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Navigation
          </p>
          <nav className="space-y-0.5">
            {mainLinks.map((link) => {
              const Icon = link.icon;

              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === "/" || link.path === "/tickets"}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `group flex items-center justify-between rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                      isActive
                        ? "bg-indigo-50 text-indigo-700 font-semibold"
                        : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-2.5">
                        <Icon
                          size={15}
                          className={`transition-colors ${
                            isActive
                              ? "text-indigo-600"
                              : "text-slate-400 group-hover:text-slate-600"
                          }`}
                        />
                        <span>{link.name}</span>
                      </div>

                      {link.badge !== null && (
                        <span
                          className={`rounded border px-1.5 py-0.2 text-[10px] font-semibold tabular-nums ${
                            isActive
                              ? "border-indigo-200 bg-white text-indigo-700"
                              : "border-slate-200 bg-slate-50 text-slate-500"
                          }`}
                        >
                          {link.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar: Clean w-64 standard enterprise width */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 md:block">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={onClose}
          />
          <aside className="relative h-full w-[80vw] max-w-[280px] shadow-lg">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;
