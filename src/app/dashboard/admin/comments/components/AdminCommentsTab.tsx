"use client";

import { useEffect, useState } from "react";

type Comment = {
  id: number;
  video_id: number;
  user_name?: string;
  guest_name?: string;
  comment_text: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  parent_comment_id?: number;
  is_deleted: number;
};

export default function AdminCommentsTab() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("all");

  // ================= FETCH =================
  const fetchComments = async () => {
    setLoading(true);

    try {
      const url =
        filter === "all"
          ? "http://localhost:5000/api/comments/admin/all"
          : `http://localhost:5000/api/comments/admin/all?status=${filter}`;

      const res = await fetch(url, {
        credentials: "include",
      });

      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error("Error loading comments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [filter]);

  // ================= ACTIONS =================
  const approveComment = async (id: number) => {
    await fetch(`http://localhost:5000/api/comments/admin/${id}/approve`, {
      method: "PATCH",
      credentials: "include",
    });

    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "approved" } : c)),
    );
  };

  const rejectComment = async (id: number) => {
    await fetch(`http://localhost:5000/api/comments/admin/${id}/reject`, {
      method: "PATCH",
      credentials: "include",
    });

    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "rejected" } : c)),
    );
  };

  const deleteComment = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:5000/api/comments/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      // به‌جای حذف از UI
      setComments((prev) =>
        prev.map((c) => (c.id === id ? { ...c, is_deleted: 1 } : c)),
      );
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const restoreComment = async (id: number) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/comments/${id}/restore`,
        {
          method: "PATCH",
          credentials: "include",
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Restore failed");
      }

      // آپدیت UI
      setComments((prev) =>
        prev.map((c) => (c.id === id ? { ...c, is_deleted: 0 } : c)),
      );
    } catch (err) {
      console.error("❌ restore error:", err);
    }
  };

  // ================= UI =================
  return (
    <div className="p-6 bg-white rounded-2xl shadow" dir="rtl">
      {/* FILTER BAR */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {[
          { key: "all", label: "همه" },
          { key: "pending", label: "در انتظار" },
          { key: "approved", label: "تأیید شده" },
          { key: "rejected", label: "رد شده" },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key as any)}
            className={`px-4 py-2 rounded-lg text-sm border transition ${
              filter === f.key
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white hover:bg-gray-50"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-center text-gray-500">در حال دریافت کامنت‌ها...</p>
      )}

      {/* COMMENTS */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className={`border rounded-2xl p-4 transition ${
              comment.is_deleted
                ? "bg-red-50 border-red-200 opacity-80"
                : "bg-white"
            }`}
          >
            {/* HEADER */}
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>🎬 ویدیو #{comment.video_id}</span>

              <span>
                {new Date(comment.created_at).toLocaleString("fa-IR")}
              </span>
            </div>

            {/* USER */}
            <div className="font-medium text-sm mb-2">
              👤 {comment.user_name || comment.guest_name || "کاربر ناشناس"}
            </div>

            {/* TEXT */}
            <div
              className={`text-sm leading-7 ${
                comment.is_deleted
                  ? "text-gray-500 line-through"
                  : "text-gray-700"
              }`}
            >
              {comment.comment_text}
            </div>

            {/* STATUS */}
            <div className="flex gap-2 mt-3 flex-wrap">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  comment.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : comment.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                }`}
              >
                {comment.status === "approved"
                  ? "تأیید شده"
                  : comment.status === "pending"
                    ? "در انتظار تأیید"
                    : "رد شده"}
              </span>

              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  comment.is_deleted
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {comment.is_deleted ? "حذف شده" : "فعال"}
              </span>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => approveComment(comment.id)}
                disabled={comment.is_deleted === 1}
                className="px-3 py-2 bg-green-600 text-white rounded-lg text-xs disabled:opacity-50"
              >
                تأیید
              </button>

              <button
                onClick={() => rejectComment(comment.id)}
                disabled={comment.is_deleted === 1}
                className="px-3 py-2 bg-yellow-500 text-white rounded-lg text-xs disabled:opacity-50"
              >
                رد
              </button>

              {comment.is_deleted ? (
                <button
                  onClick={() => restoreComment(comment.id)}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-xs"
                >
                  بازگردانی
                </button>
              ) : (
                <button
                  onClick={() => deleteComment(comment.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded text-xs"
                >
                  حذف
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY */}
      {comments.length === 0 && !loading && (
        <p className="text-center text-gray-400 mt-6">هیچ کامنتی یافت نشد</p>
      )}
    </div>
  );
}
