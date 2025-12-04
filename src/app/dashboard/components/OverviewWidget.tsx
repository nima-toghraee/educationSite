"use client";

interface OverviewWidgetProps {
  coursesCount: number;
  completedLessons: number;
  totalLessons: number;
}

export const OverviewWidget = ({
  coursesCount,
  completedLessons,
  totalLessons,
}: OverviewWidgetProps) => {
  const progress = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="bg-white shadow p-4 rounded-lg flex justify-between">
      <div>
        <h3 className="font-bold text-lg">دوره‌ها</h3>
        <p>{coursesCount} دوره فعال</p>
      </div>
      <div>
        <h3 className="font-bold text-lg">پیشرفت</h3>
        <p>{progress}% تکمیل شده</p>
      </div>
    </div>
  );
};
