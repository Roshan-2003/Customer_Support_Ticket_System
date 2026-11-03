import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MessageSquare, Send } from "lucide-react";

import { addComment, getComments } from "../services/ticketApi";
import Loader from "./Loader";

const CommentSection = ({ ticketId, resolved }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [comment, setComment] = useState("");

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await getComments(ticketId);
      setComments(response.data.data || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load comments"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ticketId) {
      fetchComments();
    }
  }, [ticketId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    try {
      setSubmitting(true);
      const response = await addComment(ticketId, comment);

      setComments((prev) => [...prev, response.data.data]);
      setComment("");
      toast.success("Comment added successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add comment"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 md:p-8 shadow-xs">
      <div className="flex items-center gap-2 mb-5">
        <MessageSquare size={20} className="text-indigo-600" />
        <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-800 tracking-tight">
          Conversation ({comments.length})
        </h3>
      </div>

      {loading ? (
        <Loader />
      ) : comments.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-xs sm:text-sm text-slate-500">
          No comments yet. Start the conversation below.
        </div>
      ) : (
        <div className="space-y-3.5 mb-6">
          {comments.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-4 transition-colors"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-semibold text-slate-800">Support Note</span>
                <span className="text-[10px] sm:text-xs text-slate-400">
                  {new Date(item.created_at).toLocaleString()}
                </span>
              </div>
              <p className="text-xs sm:text-sm md:text-base leading-relaxed text-slate-700 whitespace-pre-wrap">
                {item.comment}
              </p>
            </div>
          ))}
        </div>
      )}

      {resolved ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs sm:text-sm text-amber-800">
          This ticket has been marked as <strong>Resolved</strong>. Comments are disabled.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="3"
            placeholder="Type your response or update here..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-xs sm:text-sm md:text-base text-slate-800 placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting || !comment.trim()}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs sm:text-sm md:text-base font-semibold text-white shadow-sm hover:bg-indigo-700 hover:shadow disabled:opacity-50 transition-all active:scale-[0.98]"
            >
              <Send size={15} />
              {submitting ? "Sending..." : "Post Comment"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CommentSection;
