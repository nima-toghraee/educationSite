import AdminLayout from "../layout";
import CommentCard from "./CommentCard";

export default function CommentsPage() {
  return (
    <AdminLayout>
      <h2 className="text-xl font-bold mb-4">کامنت‌ها</h2>
      <CommentCard />
    </AdminLayout>
  );
}
