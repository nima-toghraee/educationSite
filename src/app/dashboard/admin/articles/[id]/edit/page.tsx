import { getArticleById } from "@/lib/articles";
import EditArticleClient from "./EditArticleClient";
import { getMainCategories } from "@/lib/categories";

export default async function EditPage({ params }: { params: { id: string } }) {
  const article = await getArticleById(params.id);
  const categories = await getMainCategories();

  console.log("ARTICLE FROM API:", article);

  return <EditArticleClient article={article} categories={categories} />;
}
