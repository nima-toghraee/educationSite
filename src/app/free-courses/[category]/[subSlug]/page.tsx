"use client";

import { useParams } from "next/navigation";
import SubCategoryCoursesClient from "@/components/course/SubCategoryCoursesClient";

export default function SubCategoryPage() {
  const { category, subSlug } = useParams();

  return (
    <SubCategoryCoursesClient
      category={category as string}
      subSlug={subSlug as string}
    />
  );
}
