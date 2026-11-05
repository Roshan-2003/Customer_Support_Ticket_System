import {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";

import {
  getTickets,
  getDashboardCounts,
} from "../services/ticketApi";

const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const [dashboard, setDashboard] = useState({
    total: 0,
    open: 0,
    in_progress: 0,
    resolved: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const fetchTickets = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError("");

      const response = await getTickets(params);

      setTickets(response.data.data);
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to fetch tickets"
      );
    } finally {
      setLoading(false);
    }
  }, []);


  const fetchDashboard = useCallback(async () => {
    try {
      const response = await getDashboardCounts();

      setDashboard(response.data.data);
    } catch (error) {
      console.error("Dashboard error:", error);
    }
  }, []);


  const refreshData = async () => {
    await Promise.all([
      fetchTickets(),
      fetchDashboard(),
    ]);
  };

  return (
    <TicketContext.Provider
      value={{
        tickets,
        setTickets,
        dashboard,
        loading,
        error,
        fetchTickets,
        fetchDashboard,
        refreshData,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};

export const useTickets = () => {
  return useContext(TicketContext);
};