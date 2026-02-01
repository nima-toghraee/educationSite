"use client";
import { useState } from "react";

type Props = {
  onSubmit: (data: {
    guest_name: string;
    guest_email?: string;
    comment_text: string;
  }) => void;
};

export default function CommentForm({ onSubmit }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    onSubmit({ guest_name: name, guest_email: email, comment_text: text });
    setName("");
    setEmail("");
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 p-4 rounded-2xl shadow-md mb-6 space-y-3"
    >
      <input
        type="text"
        placeholder="نام شما"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full p-2 rounded-lg border border-gray-300 focus:ring focus:ring-green-200 focus:border-green-500 outline-none"
      />
      <input
        type="email"
        placeholder="ایمیل شما"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 rounded-lg border border-gray-300 focus:ring focus:ring-green-200 focus:border-green-500 outline-none"
      />
      <textarea
        placeholder="نظر خود را بنویسید..."
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        className="w-full p-2 rounded-lg border border-gray-300 focus:ring focus:ring-green-200 focus:border-green-500 outline-none"
      />
      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg shadow-md transition-transform hover:scale-105"
      >
        ارسال نظر
      </button>
    </form>
  );
}
