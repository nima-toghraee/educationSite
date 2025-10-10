import api from "@/lib/api";

export async function fetchCourseById(courseId: string) {
  const res = await api.get(`/courses/${courseId}`);
  return res.data;
}

export async function fetchLessonsByCourse(courseId: string) {
  const res = await api.get(`/lessons/course/${courseId}`);
  return res.data;
}
