"use client";

import { notFound } from "next/navigation";
import { CategoryContentFreeMap } from "@/lib/categoryContentFreeMap";

type Props = {
  categorySlug: string;
};

export default function CategoryContentRenderer({ categorySlug }: Props) {
  const ContentComponent = CategoryContentFreeMap[categorySlug];

  if (!ContentComponent) {
    notFound();
  }

  return <ContentComponent categorySlug={categorySlug} />;
}
