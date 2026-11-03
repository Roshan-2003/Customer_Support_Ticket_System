import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Send, ArrowLeft } from "lucide-react";

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
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 sm:mb-8 flex items-center justify-between">
    
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 md:p-8 shadow-xs"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs sm:text-sm font-semibold text-slate-700">
              Customer Name <span className="text-rose-500">*</span>
            </label>

            <input
              type="text"
              name="customer_name"
              value={formData.customer_name}
              onChange={handleChange}
              required
              placeholder="e.g. John Doe"
              className="w-full rounded-xl border border-slate-200  px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base text-slate-800 placeholder:text-slate-400 outline-none  transition-all"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs sm:text-sm font-semibold text-slate-700">
              Customer Email <span className="text-rose-500">*</span>
            </label>

            <input
              type="email"
              name="customer_email"
              value={formData.customer_email}
              onChange={handleChange}
              required
              placeholder="e.g. john@example.com"
              className="w-full rounded-xl border border-slate-200  px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base text-slate-800 placeholder:text-slate-400 outline-none  transition-all"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs sm:text-sm font-semibold text-slate-700">
            Ticket Subject <span className="text-rose-500">*</span>
          </label>

          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder="Brief summary of the issue"
            className="w-full rounded-xl border border-slate-200  px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base text-slate-800 placeholder:text-slate-400 outline-none  transition-all"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs sm:text-sm font-semibold text-slate-700">
            Description <span className="text-rose-500">*</span>
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="5"
            placeholder="Provide full details about the issue..."
            className="w-full rounded-xl border border-slate-200  px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base text-slate-800 placeholder:text-slate-400 outline-none  transition-all"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs sm:text-sm font-semibold text-slate-700">
            Priority Level
          </label>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200  px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm md:text-base text-slate-800 outline-none  transition-all"
          >
            <option value="low">Low Priority (General Inquiry)</option>
            <option value="medium">Medium Priority (Standard Issue)</option>
            <option value="high">High Priority (Urgent Attention)</option>
          </select>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => navigate("/tickets")}
            className="rounded-xl border border-slate-200 bg-white px-4 sm:px-5 py-2.5 text-xs sm:text-sm md:text-base font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 sm:px-6 py-2.5 text-xs sm:text-sm md:text-base font-semibold text-white shadow-sm hover:from-indigo-700 hover:to-violet-700 hover:shadow-md disabled:opacity-50 transition-all active:scale-[0.98]"
          >
            <Send size={16} />
            {loading ? "Creating..." : "Submit Ticket"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTicket;
