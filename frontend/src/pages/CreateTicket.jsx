import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { createTicket } from "../services/ticketApi";
import { useTickets } from "../context/TicketContext";

const CreateTicket = () => {
  const navigate = useNavigate();
  const { refreshData } = useTickets();

  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    subject: "",
    description: "",
    priority: "medium",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createTicket(formData);

      toast.success("Ticket created successfully");

      await refreshData();

      navigate("/tickets");
    } catch (error) {
      const errors = error.response?.data?.errors;

      if (errors) {
        Object.values(errors).forEach((message) => {
          toast.error(message);
        });
      } else {
        toast.error(
          error.response?.data?.message || "Failed to create ticket"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Create New Ticket
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Enter customer details and issue information.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-xl border bg-white p-6"
      >
        <div>
          <label className="mb-2 block text-sm font-medium">
            Customer Name
          </label>

          <input
            type="text"
            name="customer_name"
            value={formData.customer_name}
            onChange={handleChange}
            required
            placeholder="Enter customer name"
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Customer Email
          </label>

          <input
            type="email"
            name="customer_email"
            value={formData.customer_email}
            onChange={handleChange}
            required
            placeholder="Enter customer email"
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Subject
          </label>

          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder="Enter ticket subject"
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Description
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="5"
            placeholder="Describe the customer issue"
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Priority
          </label>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="flex flex-wrap justify-end gap-3 pt-3">
          <button
            type="button"
            onClick={() => navigate("/tickets")}
            className="rounded-lg border px-5 py-3 text-sm font-medium hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Ticket"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTicket;