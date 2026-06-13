import axios from "axios";

const API_URL = "http://localhost:5000/api/consultation";

export interface ConsultationRequest {
  name: string;
  grade_level: string;
  phone: string;
  email?: string;
  description?: string;
}

export const createConsultation = async (data: ConsultationRequest) => {
  try {
    const res = await axios.post(API_URL, data);
    return res.data;
  } catch (error) {
    console.error("❌ Error creating consultation request:", error);
    throw error;
  }
};

export const ConsultationService = {
  getAll: async ({
    page = 1,
    limit = 20,
    search = "",
    contacted,
  }: {
    page?: number;
    limit?: number;
    search?: string;
    contacted?: number;
  }) => {
    const params = new URLSearchParams();

    params.append("page", String(page));
    params.append("limit", String(limit));

    if (search) params.append("search", search);
    if (contacted !== undefined)
      params.append("contacted", String(contacted));

    const res = await fetch(`${API_URL}?${params.toString()}`, {
      credentials: "include",
    });

    return res.json();
  },

  markContacted: async (id: number, contacted: number) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ contacted }),
    });

    return res.json();
  },

  delete: async (id: number) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    return res.json();
  },
};