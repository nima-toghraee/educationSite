"use client";

import { useRouter } from "next/navigation";
import ArticleForm from "../component/ArticleForm";

export default function NewArticleClient({
  categories,
}: {
  categories: any[];
}) {
  const router = useRouter();

  const handleCreate = async (data: any) => {
    const res = await fetch("http://localhost:5000/api/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("خطا در ایجاد مقاله");
    }

    router.push("/dashboard/admin/articles");
  };

  return <ArticleForm categories={categories} onSubmit={handleCreate} />;
}
