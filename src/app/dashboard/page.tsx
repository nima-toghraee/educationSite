"use client";

import { OverviewWidget } from "./components/OverviewWidget";
import { ActiveCourses } from "./components/ActiveCourses";
import { RecentActivities } from "./components/RecentActivities";
import { Notifications } from "./components/Notifications";
import { Resources } from "./components/Resources";

export default function DashboardPage() {
  // داده‌های نمونه برای OverviewWidget
  const coursesCount = 3;
  const completedLessons = 10;
  const totalLessons = 30;

  return (
    <div className="space-y-6">
      {/* Overview Widgets */}
      <OverviewWidget
        coursesCount={coursesCount}
        completedLessons={completedLessons}
        totalLessons={totalLessons}
      />

      {/* دوره‌های فعال */}
      <ActiveCourses />

      {/* فعالیت‌های اخیر */}
      <RecentActivities />

      {/* اعلان‌ها */}
      <Notifications />

      {/* منابع */}
      <Resources />
    </div>
  );
}
