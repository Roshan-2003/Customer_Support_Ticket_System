const db = require("../config/db");

const { tickets } = require("../database/schema");

const { eq, ilike, and, or, desc, sql } = require("drizzle-orm");

const { validateTicket, isValidStatus } = require("../utils/validators");

const createTicket = async (req, res) => {
  try {
    const validation = validateTicket(req.body);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        errors: validation.errors,
      });
    }

    const { customer_name, customer_email, subject, description, priority } =
      req.body;

    const [ticket] = await db
      .insert(tickets)
      .values({
        customer_name: customer_name.trim(),
        customer_email: customer_email.trim(),
        subject: subject.trim(),
        description: description.trim(),
        priority,
      })
      .returning();

    res.status(201).json({
      success: true,
      message: "Ticket created successfully",
      data: ticket,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getAllTickets = async (req, res) => {
  try {
    const { search = "", status = "", priority = "" } = req.query;

    const conditions = [];

    if (search.trim()) {
      const searchTerm = search.trim();

      conditions.push(
        or(
          ilike(tickets.subject, `%${searchTerm}%`),
          ilike(tickets.description, `%${searchTerm}%`),
          ilike(tickets.customer_name, `%${searchTerm}%`),
          ilike(tickets.customer_email, `%${searchTerm}%`)
        )
      );
    }

    if (status) {
      if (!isValidStatus(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid ticket status",
        });
      }

      conditions.push(eq(tickets.status, status));
    }

    if (priority) {
      if (!["low", "medium", "high"].includes(priority)) {
        return res.status(400).json({
          success: false,
          message: "Invalid ticket priority",
        });
      }

      conditions.push(eq(tickets.priority, priority));
    }

    const result = await db
      .select()
      .from(tickets)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(tickets.created_at));

    res.status(200).json({
      success: true,
      count: result.length,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getTicketById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid ticket ID",
      });
    }

    const [ticket] = await db.select().from(tickets).where(eq(tickets.id, id));

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    res.status(200).json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const updateTicketStatus = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid ticket ID",
      });
    }

    if (!isValidStatus(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be open, in_progress, or resolved",
      });
    }

    const [updatedTicket] = await db
      .update(tickets)
      .set({
        status,
        updated_at: new Date(),
      })
      .where(eq(tickets.id, id))
      .returning();

    if (!updatedTicket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Ticket status updated successfully",
      data: updatedTicket,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getDashboardCounts = async (req, res) => {
  try {
    const [counts] = await db
      .select({
        total: sql`count(*)`,
        open: sql`count(*) filter (where ${tickets.status} = 'open')`,
        in_progress: sql`count(*) filter (where ${tickets.status} = 'in_progress')`,
        resolved: sql`count(*) filter (where ${tickets.status} = 'resolved')`,
      })
      .from(tickets);

    res.status(200).json({
      success: true,
      data: {
        total: Number(counts.total),
        open: Number(counts.open),
        in_progress: Number(counts.in_progress),
        resolved: Number(counts.resolved),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicketStatus,
  getDashboardCounts,
};
