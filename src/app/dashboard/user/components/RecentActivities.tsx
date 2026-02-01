"use client";

const activities = [
  "درس ۳ از دوره ریاضی را تکمیل کردید",
  "آزمون فیزیک مقدماتی را شروع کردید",
  "درس ۵ برنامه‌نویسی با جاوااسکریپت را مشاهده کردید",
];

export const RecentActivities = () => {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-bold">فعالیت‌های اخیر</h2>
      <ul className="bg-white p-4 rounded shadow space-y-2">
        {activities.map((act, idx) => (
          <li key={idx} className="border-b last:border-b-0 p-2">
            {act}
          </li>
        ))}
      </ul>
    </div>
  );
};
