import { Comment } from "@/services/commentsService";

export default function CommentItem({ comment }: { comment: Comment }) {
  const formattedDate = comment.created_at
    ? new Date(comment.created_at).toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    : "";

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-1">
        <span className="font-semibold text-green-700">
          {comment.guest_name}
        </span>
        <span className="text-gray-400 text-sm">{formattedDate}</span>
      </div>
      <p className="text-gray-700">{comment.comment_text}</p>
    </div>
  );
}
