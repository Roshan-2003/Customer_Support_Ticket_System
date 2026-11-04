import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="app-shell antialiased">
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <div className="flex min-h-screen flex-col transition-all duration-200 md:ml-64">
        <Navbar
          mobileOpen={mobileOpen}
          onToggleMobileMenu={() => setMobileOpen((prev) => !prev)}
        />

        <main className="flex-1 px-3 py-4 sm:px-5 sm:py-6 lg:px-8">
          <div className="">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
