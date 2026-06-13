import { getMainCategories } from "@/lib/categories";
import NewArticleClient from "./NewArticleClient";

export default async function NewArticlePage() {
  const categories = await getMainCategories();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-6">ایجاد مقاله</h1>

      <NewArticleClient categories={categories} />
    </div>
  );
}
