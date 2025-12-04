"use client";

interface Course {
  id: number;
  title: string;
  progress: number;
}

const mockCourses: Course[] = [
  { id: 1, title: "ریاضی پایه", progress: 60 },
  { id: 2, title: "فیزیک مقدماتی", progress: 40 },
  { id: 3, title: "برنامه‌نویسی با جاوااسکریپت", progress: 20 },
];

export const ActiveCourses = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">دوره‌های فعال</h2>
      {mockCourses.map((course) => (
        <div
          key={course.id}
          className="bg-white p-4 rounded shadow flex justify-between"
        >
          <span>{course.title}</span>
          <span>{course.progress}%</span>
        </div>
      ))}
    </div>
  );
};
