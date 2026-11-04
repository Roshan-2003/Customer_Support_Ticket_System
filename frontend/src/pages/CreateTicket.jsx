import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Plus, ArrowUp, ArrowDown, Minus, Check } from "lucide-react";

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

  const handlePrioritySelect = (priorityVal) => {
    setFormData((prev) => ({
      ...prev,
      priority: priorityVal,
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

  const priorityOptions = [
    {
      id: "low",
      label: "Low Priority",
      icon: ArrowDown,
      color: "text-slate-600",
      borderActive: "border-slate-400 bg-slate-50 ring-1 ring-slate-300",
      desc: "General inquiry or minor feedback",
    },
    {
      id: "medium",
      label: "Medium Priority",
      icon: Minus,
      color: "text-amber-600",
      borderActive: "border-amber-400 bg-amber-50/50 ring-1 ring-amber-300",
      desc: "Standard issue affecting workflow",
    },
    {
      id: "high",
      label: "High Priority",
      icon: ArrowUp,
      color: "text-rose-600",
      borderActive: "border-rose-400 bg-rose-50/50 ring-1 ring-rose-300",
      desc: "Urgent blocker or service disruption",
    },
  ];

  return (
    <div className="max-w-6xl">
      {/* Header */}
 

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="surface-card space-y-4 p-4 sm:p-6"
      >
        {/* Customer Name & Customer Email */}
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">
              Customer Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="customer_name"
              value={formData.customer_name}
              onChange={handleChange}
              required
              placeholder="e.g. Sarah Jenkins"
              className="field-shell"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">
              Customer Email <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              name="customer_email"
              value={formData.customer_email}
              onChange={handleChange}
              required
              placeholder="e.g. sarah.j@company.com"
              className="field-shell"
            />
          </div>
        </div>

        {/* Issue Subject */}
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">
            Subject / Summary <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder="Concise summary of the problem"
            className="field-shell"
          />
        </div>

        {/* Priority Selector (Jira-style visual tiles) */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-700">
            Priority Level
          </label>
          <div className="grid gap-2 sm:grid-cols-3">
            {priorityOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = formData.priority === opt.id;

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handlePrioritySelect(opt.id)}
                  className={`flex flex-col text-left p-2.5 rounded-md border transition-all ${
                    isSelected
                      ? opt.borderActive
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Icon size={14} className={opt.color} strokeWidth={2.5} />
                      <span className="text-xs font-semibold text-slate-800">
                        {opt.label}
                      </span>
                    </div>
                    {isSelected && (
                      <Check size={13} className="text-indigo-600" />
                    )}
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500 leading-tight">
                    {opt.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Issue Description */}
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-700">
            Issue Description <span className="text-rose-500">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="5"
            placeholder="Detailed description of the issue, steps to reproduce, or error messages..."
            className="field-shell min-h-[120px] resize-y text-xs sm:text-sm"
          />
          <p className="mt-1 text-[11px] text-slate-400">
            Please include relevant details to assist the support team in rapid diagnosis.
          </p>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-3.5">
          <button
            type="button"
            onClick={() => navigate("/tickets")}
            className="h-8.5 rounded-md border border-slate-200 bg-white px-3.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-8.5 items-center gap-1.5 rounded-md bg-indigo-600 px-4 text-xs font-medium text-white shadow-xs transition-colors hover:bg-indigo-700 disabled:opacity-50"
          >
            <Plus size={15} strokeWidth={2.2} />
            <span>{loading ? "Creating Issue..." : "Create Issue"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTicket;
