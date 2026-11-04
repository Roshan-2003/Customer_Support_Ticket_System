const {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  pgEnum,
} = require("drizzle-orm/pg-core");

// Priority Enum
const priorityEnum = pgEnum("priority", ["low", "medium", "high"]);

// Ticket Status Enum
const statusEnum = pgEnum("ticket_status", ["open", "in_progress", "resolved"]);

// Tickets Table
const tickets = pgTable("tickets", {
  id: serial("id").primaryKey(),

  customer_name: varchar("customer_name", {
    length: 100,
  }).notNull(),

  customer_email: varchar("customer_email", {
    length: 150,
  }).notNull(),

  subject: varchar("subject", {
    length: 255,
  }).notNull(),

  description: text("description").notNull(),

  priority: priorityEnum("priority").notNull(),

  status: statusEnum("status").default("open").notNull(),

  created_at: timestamp("created_at").defaultNow().notNull(),

  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// Ticket Comments Table
const ticketComments = pgTable("ticket_comments", {
  id: serial("id").primaryKey(),

  ticket_id: integer("ticket_id")
    .notNull()
    .references(() => tickets.id, {
      onDelete: "cascade",
    }),

  comment: text("comment").notNull(),

  created_at: timestamp("created_at").defaultNow().notNull(),
});

module.exports = {
  tickets,
  ticketComments,
  priorityEnum,
  statusEnum,
};
