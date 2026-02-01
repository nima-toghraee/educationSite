import { Comment } from "@/services/commentsService";
import CommentItem from "./CommentItem";

export default function CommentList({ comments }: { comments: Comment[] }) {
  if (comments.length === 0)
    return <p className="text-gray-500 text-center">هنوز نظری ثبت نشده!</p>;

  return (
    <div className="space-y-4">
      {comments.map((c) => (
        <CommentItem key={c.id} comment={c} />
      ))}
    </div>
  );
}
