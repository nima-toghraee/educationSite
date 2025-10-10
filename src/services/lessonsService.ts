import api from "@/lib/api";

export const getLessonById = async (lessonId: string) => {
  const res = await api.get(`/lessons/${lessonId}`);
  return res.data;
};
