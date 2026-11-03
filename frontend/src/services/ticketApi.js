import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// GET: All Tickets
export const getTickets = (params = {}) => {
  return API.get("/tickets", { params });
};

// GET: Single Ticket
export const getTicketById = (id) => {
  return API.get(`/tickets/${id}`);
};

// POST: Create Ticket
export const createTicket = (data) => {
  return API.post("/tickets", data);
};

// PUT: Update Ticket Status
export const updateTicketStatus = (id, status) => {
  return API.put(`/tickets/${id}/status`, { status });
};

// GET: Dashboard Counts
export const getDashboardCounts = () => {
  return API.get("/tickets/dashboard/counts");
};

// GET: Ticket Comments
export const getComments = (ticketId) => {
  return API.get(`/comments/${ticketId}`);
};

// POST: Add Comment
export const addComment = (ticketId, comment) => {
  return API.post(`/comments/${ticketId}`, { comment });
};