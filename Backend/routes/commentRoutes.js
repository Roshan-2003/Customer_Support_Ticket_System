const express = require("express");
const router = express.Router();

const {
  getCommentsByTicketId,
  addComment,
} = require("../controllers/commentController");


router.get("/:ticketId", getCommentsByTicketId);

router.post("/:ticketId", addComment);

module.exports = router;