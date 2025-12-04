import { categorySlugMap } from "./slugify";

export interface Article {
  id: number;
  title: string;
  summary: string;
  content: string;
  categoryId: number;
  image?: string;
  author_name?: string;
}

export async function getArticlesByCategory(categorySlug: string): Promise<Article[]> {
  try {
    console.log("[DEBUG] categorySlug received:", categorySlug);

    // پیدا کردن categoryId از روی slug
    const categoryIdEntry = Object.entries(categorySlugMap).find(
      ([name, slug]) => slug === categorySlug
    );

    if (!categoryIdEntry) {
      console.warn("[DEBUG] No matching category found for slug:", categorySlug);
      return [];
    }

    const categoryName = categoryIdEntry[0];
    console.log("[DEBUG] categoryName mapped from slug:", categoryName);

    const categoryId = await fetchCategoryIdByName(categoryName);
    console.log("[DEBUG] categoryId fetched from API:", categoryId);

    if (!categoryId) {
      console.warn("[DEBUG] No categoryId found for categoryName:", categoryName);
      return [];
    }

    const res = await fetch(`http://localhost:5000/api/articles/by-category/${categoryId}`);
    console.log("[DEBUG] fetch articles response status:", res.status);

    if (!res.ok) throw new Error("Failed to fetch articles");

    const data: Article[] = await res.json();
    console.log("[DEBUG] Articles fetched:", data);

    return data;
  } catch (err) {
    console.error("[DEBUG] Error in getArticlesByCategory:", err);
    return [];
  }
}

async function fetchCategoryIdByName(name: string): Promise<number> {
  try {
    console.log("[DEBUG] Fetching categoryId for name:", name);

    const res = await fetch("http://localhost:5000/api/categories/main");
    console.log("[DEBUG] fetch http://localhost:5000/api/categories/main status:", res.status);

    if (!res.ok) throw new Error("Failed to fetch categories");

    const categories: { id: number; name: string }[] = await res.json();
    console.log("[DEBUG] Categories fetched:", categories);

    const category = categories.find((c) => c.name === name);
    console.log("[DEBUG] Category matched:", category);

    return category ? category.id : 0;
  } catch (err) {
    console.error("[DEBUG] Error in fetchCategoryIdByName:", err);
    return 0;
  }
}


export async function getArticleById(id: number): Promise<Article | null> {
  try {
    const res = await fetch(`http://localhost:5000/api/articles/${id}`);

    if (!res.ok) {
      console.error("[getArticleById] Failed to fetch article, status:", res.status);
      return null;
    }

    const article: Article = await res.json();
    return article;
  } catch (err) {
    console.error("[getArticleById] Error:", err);
    return null;
  }
}