import { Article } from "@/types/article";

const API_URL = "http://localhost:5000/api/articles";

type GetArticlesParams = {
  q?: string;
  categoryId?: number;
};

export async function getArticles(
  params: GetArticlesParams = {}
): Promise<Article[]> {
  const query = new URLSearchParams();

  if (params.q) {
    query.append("q", params.q);
  }

  if (params.categoryId) {
    query.append(
      "categoryId",
      String(params.categoryId)
    );
  }

  const res = await fetch(
    `${API_URL}?${query.toString()}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(
      "Failed to fetch articles"
    );
  }

  return res.json();
}

export async function getArticleById(
  id: string | number
): Promise<Article> {
  const res = await fetch(
    `${API_URL}/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(
      "Failed to fetch article"
    );
  }

  return res.json();
}