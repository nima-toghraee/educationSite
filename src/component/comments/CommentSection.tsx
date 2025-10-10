"use client";
import { useEffect, useState } from "react";
import { getComments, addComment, Comment } from "@/services/commentsService";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

type Props = { videoId: string | number };

export default function CommentsSection({ videoId }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const data = await getComments(videoId);
      setComments(data);
      setLoading(false);
    };
    fetch();
  }, [videoId]);

  const handleAddComment = async (data: {
    guest_name: string;
    guest_email?: string;
    comment_text: string;
  }) => {
    const newComment = await addComment(videoId, data);
    if (newComment) setComments([newComment, ...comments]);
  };

  if (loading) return <p className="text-center mt-6">در حال بارگذاری...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-12">
      <h3 className="text-xl font-bold mb-4">💬 نظرات کاربران</h3>
      <CommentForm onSubmit={handleAddComment} />
      <CommentList comments={comments} />
    </div>
  );
}
