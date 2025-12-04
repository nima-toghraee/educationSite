export async function getMainCategories() {
  const res = await fetch("http://localhost:5000/api/categories/main");
  if (!res.ok) throw new Error("Failed to fetch main categories");
  return res.json();
}

export async function getSubCategories(categoryId: number) {
  const res = await fetch(`http://localhost:5000/api/categories/${categoryId}/children`);
  if (!res.ok) throw new Error("Failed to fetch subcategories");
  return res.json();
}
