import CommentsSection from "@/component/CommentSection";

type Props = {
  params: { category: string; id: string };
};

const videos = [
  {
    category: "react",
    id: "vid1",
    title: "React جلسه 1",
    description: "مقدمه React",
    videoUrl: "/videosSampl/react.mp4",
  },
  {
    category: "react",
    id: "vid2",
    title: "React جلسه 2",
    description: "کامپوننت‌ها",
    videoUrl: "/videos/react2.mp4",
  },
  {
    category: "nextjs",
    id: "vid3",
    title: "Next.js جلسه 1",
    description: "مقدمه Next.js",
    videoUrl: "/videos/nextjs1.mp4",
  },
];

export async function generateStaticParams() {
  return videos.map((v) => ({ category: v.category, id: v.id }));
}

export default async function VideoPage({ params }: Props) {
  const video = videos.find(
    (v) => v.category === params.category && v.id === params.id
  );

  if (!video) {
    return <p>ویدیو یافت نشد.</p>;
  }

  return (
    <main className="container mx-auto px-4 py-10 max-w-4xl">
      {/* عنوان ویدیو */}
      <h1 className="text-3xl md:text-4xl font-extrabold mb-3 text-gray-900 leading-snug">
        {video.title}
      </h1>

      {/* توضیحات */}
      <p className="mb-8 text-gray-600 text-lg leading-relaxed">
        {video.description}
      </p>

      {/* پلیر ویدیو */}
      <div className="relative w-full bg-black rounded-2xl overflow-hidden shadow-xl mb-10">
        <video
          controls
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          className="w-full aspect-video"
        >
          <source src={video.videoUrl} type="video/mp4" />
          مرورگر شما از نمایش این ویدیو پشتیبانی نمی‌کند.
        </video>
      </div>

      {/* بخش کامنت‌ها */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
        <CommentsSection />
      </div>
    </main>
  );
}
