const BASE_URL = process.env.NEXT_PUBLIC_API_URL;



export async function getMainCategories() {
  const res = await fetch(`${BASE_URL}/categories/main`);
  if (!res.ok) throw new Error("Failed to fetch main categories");
  return res.json();
}

export async function getSubCategories(categoryId: number) {
  const res = await fetch(`${BASE_URL}/categories/${categoryId}/children`);
  if (!res.ok) throw new Error("Failed to fetch subcategories");
  return res.json();
}
 