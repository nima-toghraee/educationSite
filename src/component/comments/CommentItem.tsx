import { Comment } from "@/services/commentsService";

export default function CommentItem({ comment }: { comment: Comment }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <p className="font-semibold text-green-700">{comment.guest_name}</p>
      <p className="text-gray-700 mt-1">{comment.comment_text}</p>
    </div>
  );
}
