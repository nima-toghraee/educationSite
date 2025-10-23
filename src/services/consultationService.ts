import axios from "axios";

const API_URL = "https://backend-education-x5ta.onrender.com/api/consultation";

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
