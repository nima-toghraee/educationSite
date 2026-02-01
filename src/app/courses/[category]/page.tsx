import CategoryPage from "@/components/course/CategoryPage";
import { notFound } from "next/navigation";

export default function Page({ params }: { params: { category: string } }) {
  if (!params.category) {
    notFound();
  }

  return <CategoryPage categorySlug={params.category} />;
}
