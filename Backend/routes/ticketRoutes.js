const express = require("express");
const router = express.Router();

const {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicketStatus,
  getDashboardCounts,
} = require("../controllers/ticketController");

// POST: Create Ticket
router.post("/", createTicket);

// GET: Dashboard Counts
router.get("/dashboard/counts", getDashboardCounts);

// GET: All Tickets
router.get("/", getAllTickets);

// GET: Single Ticket
router.get("/:id", getTicketById);

// PUT: Update Ticket Status
router.put("/:id/status", updateTicketStatus);

module.exports = router;