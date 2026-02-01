"use client";

import { CategoryContentMap } from "@/lib/categoryContentMap";

export default function CategoryPage({
  categorySlug,
}: {
  categorySlug: string;
}) {
  const ContentComponent = CategoryContentMap[categorySlug];

  if (!ContentComponent) {
    return null;
  }

  return <ContentComponent categorySlug={categorySlug} />;
}
