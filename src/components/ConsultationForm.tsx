"use client";

import { useState } from "react";
import {
  createConsultation,
  ConsultationRequest,
} from "../services/consultationService";
import FormInput from "./FormInput";

interface ConsultationFormProps {
  onSuccess?: () => void;
}

export default function ConsultationForm({ onSuccess }: ConsultationFormProps) {
  const [formData, setFormData] = useState<ConsultationRequest>({
    name: "",
    grade_level: "",
    phone: "",
    email: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      await createConsultation(formData);
      setSuccess(true);
      setFormData({
        name: "",
        grade_level: "",
        phone: "",
        email: "",
        description: "",
      });
      onSuccess?.();
    } catch {
      setError("ارسال درخواست با خطا مواجه شد!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-200"
    >
      <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
        شروع مسیر موفقیت همین الان!
      </h2>

      <FormInput
        label="نام"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="نام خود را وارد کنید"
        required
      />
      <FormInput
        label="پایه تحصیلی"
        name="grade_level"
        value={formData.grade_level}
        onChange={handleChange}
        type="select"
        options={[
          { value: "9", label: "نهم" },
          { value: "10", label: "دهم" },
          { value: "11", label: "یازدهم" },
          { value: "12", label: "دوازدهم" },
        ]}
        required
      />
      <FormInput
        label="شماره تماس"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="09xx xxx xxxx"
        required
      />
      <FormInput
        label="ایمیل"
        name="email"
        value={formData.email || ""}
        onChange={handleChange}
        placeholder="email@example.com"
        type="email"
      />
      <FormInput
        label="توضیحات"
        name="description"
        value={formData.description || ""}
        onChange={handleChange}
        placeholder="هر سوال یا توضیحی داری اینجا بنویس..."
        textarea
        rows={4}
      />

      {success && (
        <p className="text-green-600 text-center font-medium mb-3">
          ✅ درخواست شما با موفقیت ارسال شد!
        </p>
      )}
      {error && (
        <p className="text-red-600 text-center font-medium mb-3">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
      >
        {loading ? "در حال ارسال..." : "🚀 ارسال درخواست"}
      </button>
    </form>
  );
}
