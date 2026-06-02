"use client";

import { useState, useEffect } from "react";

export type Lesson = {
  id?: number;
  title: string;
  description?: string;
  video_url?: string;
  is_preview?: boolean;
  order_index?: number;
  duration?: number;
  course_id: number;
};

type LessonFormProps = {
  initialData?: Lesson;
  courses: { id: number; title: string }[];
  onSubmit: (data: Lesson) => Promise<void>;
  submitLabel?: string;
};

export default function LessonForm({
  initialData,
  courses,
  onSubmit,
  submitLabel = "ذخیره درس",
}: LessonFormProps) {
  const [form, setForm] = useState<Lesson>({
    title: "",
    description: "",
    video_url: "",
    is_preview: false,
    order_index: 1,
    duration: 0,
    course_id: courses[0]?.id || 0,
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm((prev) => ({
        ...prev,
        ...initialData,
      }));
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value, type, checked } = e.target;

    let val: any = value;
    if (name === "course_id") val = Number(value); // تبدیل رشته به عدد

    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : val,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 p-6 rounded-xl shadow-md space-y-6 max-w-3xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">
        {submitLabel}
      </h2>

      {/* عنوان درس */}
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1">عنوان درس</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="مثال: فیزیک دهم"
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      {/* توضیحات */}
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1">توضیحات</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="توضیح کوتاه درباره درس..."
          rows={4}
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* لینک ویدیو */}
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1">لینک ویدیو</label>
        <input
          name="video_url"
          value={form.video_url}
          onChange={handleChange}
          placeholder="لینک ویدیو (اختیاری)"
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex flex-col">
        <label>آپلود ویدیو</label>
        <input
          type="file"
          accept="video/*"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const formData = new FormData();
            formData.append("file", file);

            try {
              setUploading(true);
              const res = await fetch("http://localhost:5000/api/upload", {
                method: "POST",
                credentials: "include",
                body: formData,
              });
              if (!res.ok) throw new Error("آپلود موفق نبود");
              const data = await res.json();
              setForm((f) => ({ ...f, video_url: data.url }));
            } catch (err) {
              console.error(err);
              alert("آپلود ویدیو موفق نبود");
            } finally {
              setUploading(false);
            }
          }}
          className="border p-2 rounded"
        />
        {uploading && (
          <p className="text-gray-500 text-sm mt-1">در حال آپلود...</p>
        )}
        {form.video_url && (
          <p className="text-green-600 text-sm mt-1">
            ویدیو با موفقیت آپلود شد
          </p>
        )}
      </div>

      {/* ترتیب نمایش و مدت زمان */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">ترتیب نمایش</label>
          <input
            name="order_index"
            type="number"
            value={form.order_index}
            onChange={handleChange}
            placeholder="ترتیب نمایش"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">
            مدت زمان (دقیقه)
          </label>
          <input
            name="duration"
            type="number"
            value={form.duration}
            onChange={handleChange}
            placeholder="مدت زمان درس"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* پیش‌نمایش */}
      <div className="flex flex-col">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="is_preview"
            checked={form.is_preview}
            onChange={handleChange}
            className="accent-blue-500"
          />
          پیش‌نمایش
        </label>
        <p className="text-sm text-gray-500 mt-1">
          با فعال کردن این گزینه، کاربران می‌توانند بخش کوتاهی از این درس را قبل
          از خرید مشاهده کنند.
        </p>
      </div>

      {/* انتخاب دوره */}
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1">انتخاب دوره</label>
        <select
          name="course_id"
          value={form.course_id === 0 ? "" : form.course_id}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        >
          <option value="" disabled hidden>
            انتخاب دوره
          </option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
      </div>

      {/* دکمه ذخیره */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        {submitLabel}
      </button>
    </form>
  );
}
