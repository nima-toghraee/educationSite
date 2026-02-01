import SubCategoryPage from "@/components/course/SubCategoryPage";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { category: string; subSlug: string };
}) {
  const { category, subSlug } = params;

  if (!category || !subSlug) {
    notFound();
  }

  return <SubCategoryPage categorySlug={category} subSlug={subSlug} />;
}
