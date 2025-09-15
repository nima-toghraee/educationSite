import Hero from "@/component/Hero";
import VideoGrid from "@/component/VideoGrid";

export default async function Home() {
  const sampleVideos = [
    {
      id: "abc123",
      category: "study-skills",
      title: "چطور با تمرکز بیشتر مطالعه کنیم؟",
      thumbnail: "/videos/thumbnail1.jpg",
    },
    {
      id: "xyz456",
      category: "mindset",
      title: "۵ تکنیک برای کاهش استرس کنکور",
      thumbnail: "/videos/thumbnail2.jpg",
    },
    {
      id: "efg789",
      category: "planning",
      title: "برنامه‌ریزی روزانه برای دانش‌آموزان",
      thumbnail: "/videos/thumbnail3.jpg",
    },
  ];
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <Hero />

      {/* Categories */}
      {/* <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          دسته‌بندی‌ها
        </h2>
        <Categories categories={categories} />
      </section> */}

      <VideoGrid videos={sampleVideos} />
    </div>
  );
}
