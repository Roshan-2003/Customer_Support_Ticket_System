import { BrowserRouter, Routes, Route } from "react-router-dom";

import { TicketProvider } from "./context/TicketContext";
import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import TicketList from "./pages/TicketList";
import CreateTicket from "./pages/CreateTicket";
import TicketDetails from "./pages/TicketDetails";

function App() {
  return (
    <BrowserRouter>
      <TicketProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />

            <Route path="/tickets" element={<TicketList />} />

            <Route
              path="/tickets/create"
              element={<CreateTicket />}
            />

            <Route
              path="/tickets/:id"
              element={<TicketDetails />}
            />
          </Route>
        </Routes>
      </TicketProvider>
    </BrowserRouter>
  );
}

export default App;