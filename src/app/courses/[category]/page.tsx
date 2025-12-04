"use client";

import { notFound, useParams } from "next/navigation";
import { CategoryContentMap } from "@/lib/categoryContentMap";

export default function DynamicCategoryPage() {
  const { category } = useParams();
  const categorySlug = category as string;

  const ContentComponent = CategoryContentMap[categorySlug];

  if (!ContentComponent) {
    notFound();
  }

  return <ContentComponent categorySlug={categorySlug} />;
}
