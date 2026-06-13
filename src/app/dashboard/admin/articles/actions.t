"use server";

export async function createArticle(formData: any) {
  const payload = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    content: formData.get("content"),
    thumbnail_url: formData.get("thumbnail_url"),
    category_id: Number(formData.get("category_id")),
  };

  const res = await fetch("http://localhost:5000/api/articles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to create article");
  }
}