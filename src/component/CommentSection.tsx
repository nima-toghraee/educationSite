"use client";
import { useState } from "react";

type Comment = {
  id: number;
  name: string;
  text: string;
};

export default function CommentsSection() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !text.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      name,
      text,
    };

    setComments([newComment, ...comments]);
    setName("");
    setEmail("");
    setText("");
  };

  return (
    <div className="max-w-3xl mx-auto mt-12">
      <h3 className="text-xl font-bold mb-4">💬 نظرات کاربران</h3>

      {/* فرم ثبت کامنت */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 p-4 rounded-2xl shadow-md mb-6 space-y-3"
      >
        <input
          type="text"
          placeholder="نام شما"
          className="w-full p-2 rounded-lg border border-gray-300 focus:ring focus:ring-green-200 focus:border-green-500 outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="ایمیل شما"
          className="w-full p-2 rounded-lg border border-gray-300 focus:ring focus:ring-green-200 focus:border-green-500 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="نظر خود را بنویسید..."
          rows={4}
          className="w-full p-2 rounded-lg border border-gray-300 focus:ring focus:ring-green-200 focus:border-green-500 outline-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg shadow-md transition-transform hover:scale-105"
        >
          ارسال نظر
        </button>
      </form>

      {/* لیست کامنت‌ها */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center">
            هنوز نظری ثبت نشده، اولین نفر باشید!
          </p>
        ) : (
          comments.map((c) => (
            <div
              key={c.id}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
            >
              <p className="font-semibold text-green-700">{c.name}</p>
              <p className="text-gray-700 mt-1">{c.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
