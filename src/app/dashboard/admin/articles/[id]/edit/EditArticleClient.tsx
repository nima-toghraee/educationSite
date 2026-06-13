"use client";

import { useRouter } from "next/navigation";
import ArticleForm from "../../component/ArticleForm";

export default function EditArticleClient({ article, categories }: any) {
  const router = useRouter();

  const handleUpdate = async (data: any) => {
    const res = await fetch(
      `http://localhost:5000/api/articles/${article.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      },
    );

    if (!res.ok) {
      throw new Error("خطا در ویرایش مقاله");
    }

    router.push("/dashboard/admin/articles");
  };

  return (
    <ArticleForm
      categories={categories}
      initialData={article}
      onSubmit={handleUpdate}
      submitLabel="ویرایش مقاله"
    />
  );
}
