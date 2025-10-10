import api from "@/lib/api";

export type Comment = {
  id?: number;
  user_id?: number;
  guest_name: string;
  guest_email?: string;
  comment_text: string;
  parent_comment_id?: number;
  created_at?: string;
};

// گرفتن کامنت‌ها برای یک ویدیو
export async function getComments(videoId: string | number): Promise<Comment[]> {
  try {
    const res = await api.get(`/comments/${videoId}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching comments:", err);
    return [];
  }
}

// ثبت کامنت جدید برای یک ویدیو
export async function addComment(videoId: string | number, comment: Omit<Comment, "id">): Promise<Comment | null> {
  try {
    const res = await api.post(`/comments/${videoId}`, comment); // videoId در URL
    return res.data;
  } catch (err) {
    console.error("Error adding comment:", err);
    return null;
  }
}


// حذف یک کامنت (اختیاری)
export async function deleteComment(commentId: number): Promise<boolean> {
  try {
    await api.delete(`/comments/${commentId}`);
    return true;
  } catch (err) {
    console.error("Error deleting comment:", err);
    return false;
  }
}
