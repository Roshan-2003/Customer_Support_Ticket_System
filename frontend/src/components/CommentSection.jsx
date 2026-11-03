import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
    <div className="rounded-xl border bg-white p-6">
      <h3 className="mb-4 text-xl font-bold text-gray-800">
        Comments
      </h3>

      {loading ? (
        <Loader />
      ) : comments.length === 0 ? (
        <p className="rounded-lg bg-gray-50 p-4 text-sm text-gray-500">
          No comments yet.
        </p>
      ) : (
        <div className="space-y-3">
          {comments.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border border-gray-200 bg-gray-50 p-4"
            >
              <p className="text-sm leading-6 text-gray-700">
                {item.comment}
              </p>
              <p className="mt-2 text-xs text-gray-500">
                {new Date(item.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-5 space-y-3">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
          disabled={resolved}
          placeholder={
            resolved
              ? "This ticket is resolved. You cannot add more comments."
              : "Write a comment..."
          }
          className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
        />

        <button
          type="submit"
          disabled={submitting || resolved || !comment.trim()}
          className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {submitting ? "Adding..." : "Add Comment"}
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
