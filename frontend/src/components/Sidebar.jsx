import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Ticket,
  PlusCircle,
  Headset,
} from "lucide-react";

const Sidebar = () => {
  const links = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "All Tickets",
      path: "/tickets",
      icon: Ticket,
    },
    {
      name: "Create Ticket",
      path: "/tickets/create",
      icon: PlusCircle,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-gray-200 bg-white md:block">
      {/* Logo */}
      <div className="flex h-20 items-center gap-3 border-b border-gray-100 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
          <Headset size={23} />
        </div>

        <div>
          <h2 className="text-xl font-bold tracking-tight text-gray-900">
            SupportDesk
          </h2>

       
        </div>
      </div>

      {/* Navigation */}
      <div className="px-4 py-7">
        {/* <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Main Menu
        </p> */}

        <nav className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/" || link.path === "/tickets"}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                      : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={19}
                      strokeWidth={2}
                      className={
                        isActive
                          ? "text-white"
                          : "text-gray-400 transition group-hover:text-blue-600"
                      }
                    />

                    <span>{link.name}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      
    </aside>
  );
};

export default Sidebar;