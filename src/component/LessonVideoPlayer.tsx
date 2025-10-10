type Props = {
  videoUrl: string;
};

export default function LessonVideoPlayer({ videoUrl }: Props) {
  if (!videoUrl)
    return <p className="text-red-500">⚠️ ویدیو برای این لسن موجود نیست.</p>;

  return (
    <div className="aspect-w-16 aspect-h-9 mb-6">
      <video
        src={videoUrl}
        controls
        className="w-full rounded-2xl shadow-lg border border-gray-200"
      />
    </div>
  );
}
