"use client";

import { useParams } from "next/navigation";
import CategoryContentRenderer from "@/components/course/CategoryContentRenderer";

export default function DynamicCategoryPage() {
  const { category } = useParams();

  return <CategoryContentRenderer categorySlug={category as string} />;
}
