import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getCourses = async () => {
  const res = await api.get("/courses");
  return res.data;
};

export default api;
