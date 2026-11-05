const express = require("express");
const router = express.Router();

const {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicketStatus,
  getDashboardCounts,
} = require("../controllers/ticketController");


router.post("/", createTicket);


router.get("/dashboard/counts", getDashboardCounts);


router.get("/", getAllTickets);


router.get("/:id", getTicketById);


router.put("/:id/status", updateTicketStatus);

module.exports = router;