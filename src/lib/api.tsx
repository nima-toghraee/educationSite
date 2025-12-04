import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // مثلا "http://localhost:5000"
});

// --- Types ---
export interface Course {
  id: number;
  title: string;
  description?: string;
  grade?: string;
  field?: string;
  thumbnail_url?: string;
}

// --- Courses ---
export const getCourses = async (): Promise<Course[]> => {
  const res = await api.get("/courses");
  return res.data;
};

// --- Auth ---
export interface AuthData {
  name?: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const registerUser = async (data: AuthData): Promise<AuthResponse> => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const loginUser = async (data: AuthData): Promise<AuthResponse> => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export default api;
