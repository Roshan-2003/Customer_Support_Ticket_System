import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Ticket,
  PlusCircle,
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
    <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r bg-white p-5 md:block">
      <h1 className="mb-10 text-2xl font-bold text-blue-600">
        SupportDesk
      </h1>

      <nav className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <Icon size={19} />
              {link.name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;