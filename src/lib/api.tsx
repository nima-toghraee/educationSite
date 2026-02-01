import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
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
  success: boolean;
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
    phone?: string;
    role_id?: number;
  };
}

export const registerUser = async (data: AuthData): Promise<AuthResponse> => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const loginUser = async (data: AuthData): Promise<AuthResponse> => {
  const response = await api.post("/auth/login", data);
  console.log("LOGIN RESPONSE:", response.data);

  return response.data;
};

export default api;
