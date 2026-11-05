import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api",
});


export const getTickets = (params = {}) => {
  return API.get("/tickets", { params });
};


export const getTicketById = (id) => {
  return API.get(`/tickets/${id}`);
};


export const createTicket = (data) => {
  return API.post("/tickets", data);
};


export const updateTicketStatus = (id, status) => {
  return API.put(`/tickets/${id}/status`, { status });
};


export const getDashboardCounts = () => {
  return API.get("/tickets/dashboard/counts");
};


export const getComments = (ticketId) => {
  return API.get(`/comments/${ticketId}`);
};


export const addComment = (ticketId, comment) => {
  return API.post(`/comments/${ticketId}`, { comment });
};