import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { MessageSquare, Send, CheckCircle2 } from "lucide-react";

import { addComment, getComments } from "../services/ticketApi";
import Loader from "./Loader";

const CommentSection = ({ ticketId, resolved }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [comment, setComment] = useState("");

  const fetchComments = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getComments(ticketId);
      setComments(response.data.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load comments");
    } finally {
      setLoading(false);
    }
  }, [ticketId]);

  useEffect(() => {
    if (ticketId) {
      fetchComments();
    }
  }, [ticketId, fetchComments]);

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
      toast.error(error.response?.data?.message || "Failed to add comment");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="surface-card p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-2.5">
        <div className="flex items-center gap-2">
          <MessageSquare size={15} className="text-indigo-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Activity &amp; Comments
          </h3>
          <span className="rounded border border-slate-200 bg-slate-100 px-1.5 py-0.2 text-[10px] font-semibold text-slate-600">
            {comments.length}
          </span>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : comments.length === 0 ? (
        <div className="mb-4 rounded-md border border-dashed border-slate-200 bg-slate-50/70 p-5 text-center text-xs text-slate-500">
          No comments yet. Add an internal note or reply to customer below.
        </div>
      ) : (
        <div className="mb-5 space-y-3">
          {comments.map((item) => (
            <div
              key={item.id}
              className="rounded-md border border-slate-200 bg-white p-3 shadow-2xs"
            >
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-50 text-[9px] font-bold text-indigo-700 border border-indigo-200">
                    SA
                  </div>
                  <span className="text-xs font-semibold text-slate-800">
                    Support Agent
                  </span>
                </div>
                <span className="text-[10px] text-slate-400">
                  {new Date(item.created_at).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </span>
              </div>
              <p className="whitespace-pre-wrap text-xs sm:text-sm leading-relaxed text-slate-700 pl-7">
                {item.comment}
              </p>
            </div>
          ))}
        </div>
      )}

      {resolved ? (
        <div className="flex items-center gap-2 rounded-md border border-amber-200 bg-amber-50/80 px-3 py-2.5 text-xs text-amber-800">
          <CheckCircle2 size={16} className="text-amber-600 shrink-0" />
          <span>
            This issue is marked as <strong>Resolved</strong>. Comments are
            disabled unless reopened.
          </span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2.5">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="3"
            placeholder="Add a comment or internal note (Markdown supported)..."
            className="field-shell min-h-[85px] resize-y text-xs sm:text-sm"
          />

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              Visible to customer and team members
            </span>
            <button
              type="submit"
              disabled={submitting || !comment.trim()}
              className="inline-flex h-8 items-center gap-1.5 rounded-md bg-indigo-600 px-3 text-xs font-medium text-white shadow-xs transition-colors hover:bg-indigo-700 disabled:opacity-50"
            >
              <Send size={13} />
              <span>{submitting ? "Posting..." : "Post Comment"}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CommentSection;
