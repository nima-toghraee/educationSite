import CategoryCards from "@/component/CategoryCard";
import FreeVideoCarousel from "@/component/FreeVideoCarousel/FreeVideoCarousel";
import Hero from "@/component/Hero";
import VideoGrid from "@/component/VideoGrid";

export default async function Home() {
  const sampleVideos = [
    {
      id: "abc123",
      category: "study-skills",
      title: "چطور با تمرکز بیشتر مطالعه کنیم؟",
      thumbnail: "/home5.jpg",
    },
    {
      id: "xyz456",
      category: "mindset",
      title: "۵ تکنیک برای کاهش استرس کنکور",
      thumbnail: "/home3.jpg",
    },
    {
      id: "efg789",
      category: "planning",
      title: "برنامه‌ریزی روزانه برای دانش‌آموزان",
      thumbnail: "/home2.jpg",
    },
  ];
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <Hero />

      <CategoryCards />
      <VideoGrid videos={sampleVideos} />
      <FreeVideoCarousel />
    </div>
  );
}
