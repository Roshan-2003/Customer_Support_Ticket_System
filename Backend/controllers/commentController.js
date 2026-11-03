const db = require("../config/db");

const {
  tickets,
  ticketComments,
} = require("../database/schema");

const { eq, asc } = require("drizzle-orm");

const { validateComment } = require("../utils/validators");

// GET: Comments by Ticket ID
const getCommentsByTicketId = async (req, res) => {
  try {
    const ticketId = Number(req.params.ticketId);

    if (!Number.isInteger(ticketId) || ticketId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid ticket ID",
      });
    }

    const [ticket] = await db
      .select()
      .from(tickets)
      .where(eq(tickets.id, ticketId));

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    const comments = await db
      .select()
      .from(ticketComments)
      .where(eq(ticketComments.ticket_id, ticketId))
      .orderBy(asc(ticketComments.created_at));

    res.status(200).json({
      success: true,
      count: comments.length,
      data: comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// POST: Add Comment
const addComment = async (req, res) => {
  try {
    const ticketId = Number(req.params.ticketId);
    const { comment } = req.body;

    if (!Number.isInteger(ticketId) || ticketId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid ticket ID",
      });
    }

    const validation = validateComment(comment);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: validation.message,
      });
    }

    // Transaction: lock ticket and check its status
    const newComment = await db.transaction(async (tx) => {
      const [ticket] = await tx
        .select({
          id: tickets.id,
          status: tickets.status,
        })
        .from(tickets)
        .where(eq(tickets.id, ticketId))
        .for("update");

      if (!ticket) {
        const error = new Error("Ticket not found");
        error.statusCode = 404;
        throw error;
      }

      if (ticket.status === "resolved") {
        const error = new Error(
          "Cannot add comments to a resolved ticket"
        );
        error.statusCode = 400;
        throw error;
      }

      const [createdComment] = await tx
        .insert(ticketComments)
        .values({
          ticket_id: ticketId,
          comment: comment.trim(),
        })
        .returning();

      return createdComment;
    });

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: newComment,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getCommentsByTicketId,
  addComment,
};