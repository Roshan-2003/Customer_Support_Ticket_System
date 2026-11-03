const express = require("express");
const router = express.Router();

const {
  getCommentsByTicketId,
  addComment,
} = require("../controllers/commentController");

// GET: All Comments
router.get("/:ticketId", getCommentsByTicketId);

// POST: Add Comment
router.post("/:ticketId", addComment);

module.exports = router;