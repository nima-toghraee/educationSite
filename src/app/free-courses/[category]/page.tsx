"use client";

import { notFound, useParams } from "next/navigation";
import { CategoryContentFreeMap } from "@/lib/categoryContentFreeMap";

export default function DynamicCategoryPage() {
  const { category } = useParams();
  const categorySlug = category as string;

  const ContentComponent = CategoryContentFreeMap[categorySlug];

  if (!ContentComponent) {
    notFound();
  }

  return <ContentComponent categorySlug={categorySlug} />;
}
