import CategoryCards from "@/components/CategoryCard";
import FreeVideoCarousel from "@/components/FreeVideoCarousel/FreeVideoCarousel";
import Hero from "@/components/Hero";
import VideoGrid from "@/components/VideoGrid";

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
