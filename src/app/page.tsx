import CategoryCards from "@/component/CategoryCard";
import FreeVideoCarousel from "@/component/FreeVideoCarousel/FreeVideoCarousel";
import Hero from "@/component/Hero";
import VideoGrid from "@/component/VideoGrid";

export default async function Home() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <Hero />

      <CategoryCards />
      <VideoGrid />
      <FreeVideoCarousel />
    </div>
  );
}
