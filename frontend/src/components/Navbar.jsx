import { Bell } from "lucide-react";

const Navbar = () => {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-5 md:px-8">
      <h2 className="font-semibold text-gray-800">
        Customer Support System
      </h2>

      <div className="flex items-center gap-4">
        <Bell size={20} className="text-gray-500" />

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
          A
        </div>
      </div>
    </header>
  );
};

export default Navbar;