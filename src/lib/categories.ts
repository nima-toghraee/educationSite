export async function getMainCategories() {
  const res = await fetch("https://backend-education-x5ta.onrender.com/api/categories/main");
  if (!res.ok) throw new Error("Failed to fetch main categories");
  return res.json();
}

export async function getSubCategories(categoryId: number) {
  const res = await fetch(`https://backend-education-x5ta.onrender.com/api/categories/${categoryId}/children`);
  if (!res.ok) throw new Error("Failed to fetch subcategories");
  return res.json();
}
