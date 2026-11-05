# Customer Support Ticket System

A full-stack web application designed to manage customer support tickets efficiently. Users can create tickets, track their status, manage priorities, and communicate through ticket comments. The dashboard provides an overview of ticket statuses for easy management.

## Features

- **Create Tickets:** Create support tickets with customer name, email, subject, description, and priority.
- **View All Tickets:** Display all tickets in an organized list.
- **Ticket Details:** View complete information about an individual ticket.
- **Update Ticket Status:** Change ticket status to Open, In Progress, or Resolved.
- **Add Comments:** Add comments to tickets for communication and updates.
- **Search Tickets:** Search tickets by subject.
- **Filter Tickets:** Filter tickets by status and priority.
- **Dashboard:** Display ticket counts based on their current status.
- **Responsive UI:** Simple and user-friendly interface for different screen sizes.

## Tech Stack

### Frontend
- React.js
- React Router DOM
- Tailwind CSS
- Axios
- Lucide React

### Backend
- Node.js
- Express.js
- PostgreSQL
- Drizzle ORM

### Tools
- Git & GitHub
- Postman
- VS Code

## Project Structure

```text
customer-support-ticket-system/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── db/
│   │   ├── middleware/
│   │   └── index.js
│   ├── drizzle/
│   └── package.json
│
└── README.md
```

## Database Schema

The application uses PostgreSQL to store ticket information.

### Tickets Table

| Field | Description |
|---|---|
| id | Unique ticket ID |
| customer_name | Customer name |
| customer_email | Customer email |
| subject | Ticket subject |
| description | Ticket description |
| priority | Low, Medium, or High |
| status | Open, In Progress, or Resolved |
| created_at | Ticket creation date |
| updated_at | Last updated date |

### Comments Table

| Field | Description |
|---|---|
| id | Unique comment ID |
| ticket_id | Associated ticket ID |
| comment | Comment content |
| created_at | Comment creation date |

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Roshan-2003/Customer_Support_Ticket_System.git
cd company-assign--task
```

### 2. Install Dependencies

Install frontend dependencies:

```bash
cd frontend
npm install
```

Install backend dependencies:

```bash
cd ../backend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the server directory.

```env
PORT=5000
DATABASE_URL=your_postgresql_connection_string
```

Replace the database URL with your PostgreSQL connection string.

### 4. Run Database Migrations

```bash
npm run db:generate
npm run db:migrate
```

### 5. Start the Backend

```bash
npm run dev
```

### 6. Start the Frontend

Open another terminal:

```bash
cd client
npm run dev
```

The frontend will run at:

```text
http://localhost:5173
```

The backend will run at:

```text
http://localhost:5000
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tickets` | Get all tickets |
| POST | `/api/tickets` | Create a new ticket |
| GET | `/api/tickets/:id` | Get ticket details |
| PUT | `/api/tickets/:id` | Update ticket status/details |
| GET | `/api/tickets/:id/comments` | Get ticket comments |
| POST | `/api/tickets/:id/comments` | Add a comment |
| GET | `/api/dashboard` | Get dashboard counts |

*Note: Update these endpoints according to your actual backend routes.*

## Ticket Status

- **Open:** Newly created ticket that requires attention.
- **In Progress:** Ticket currently being handled.
- **Resolved:** Issue successfully resolved.

## Dashboard

The dashboard provides a summary of customer support tickets:

- Total Tickets
- Open Tickets
- In Progress Tickets
- Resolved Tickets

## Future Enhancements

- User authentication and authorization.
- Email notifications for ticket updates.
- File attachments in tickets.
- Ticket assignment to support agents.
- Advanced filtering and reporting.

## Author

**Roshan Bhagat**

Frontend Developer | React.js | MERN Stack

GitHub: [Roshan-2003](https://github.com/Roshan-2003)

---

If you find this project useful, feel free to give it a ⭐ on GitHub.
