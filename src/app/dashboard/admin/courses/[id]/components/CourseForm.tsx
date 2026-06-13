"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CourseFormData, courseSchema } from "./schema";
import { Category } from "@/types/course";

type Props = {
  categories: Category[];
  initialData?: Partial<CourseFormData>;
  onSubmit: (data: CourseFormData) => Promise<void>;
  submitLabel?: string;
};

export default function CourseForm({
  categories,
  initialData,
  onSubmit,
  submitLabel = "ذخیره",
}: Props) {
  const [subCategories, setSubCategories] = useState<Category[]>([]);
  const [loadingSub, setLoadingSub] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [mode, setMode] = useState<"upload" | "url">("upload");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
      thumbnail_url: "",
      price: "",
      is_free: false,
      field: "ریاضی",
      grade: "دهم",
      category_id: 0,
      sub_category_id: 0,
      discount_percent: "",
      is_published: false,
      ...initialData,
    },
  });

  const categoryId = watch("category_id");

  useEffect(() => {
    if (!categoryId) return;

    const load = async () => {
      setLoadingSub(true);
      try {
        const res = await fetch(
          `http://localhost:5000/api/categories/${categoryId}/children`,
        );
        const data = await res.json();
        setSubCategories(data);
      } finally {
        setLoadingSub(false);
      }
    };

    load();
  }, [categoryId]);

  // =========================
  // Upload via presigned URL
  // =========================
  const handleUpload = async (file: File) => {
    setUploading(true);

    try {
      const res = await fetch(
        `http://localhost:5000/upload/presign?mimetype=${file.type}`,
      );

      const data = await res.json();
      const { uploadUrl, fields, fileUrl } = data;

      const formData = new FormData();

      // مهم: fields از backend
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      // فایل آخر اضافه میشه
      formData.append("file", file);

      const uploadRes = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });

      console.log("📡 upload status:", uploadRes.status);

      setValue("thumbnail_url", fileUrl);
    } catch (err) {
      console.error("❌ upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log("🟢 react-hook-form submit:", data);
        onSubmit(data);
      })}
      className="space-y-8 rounded-3xl border border-zinc-200 bg-white/80 backdrop-blur-sm p-8 shadow-[0_8px_30px_rgb(0,0,0,0.05)]"
    >
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-zinc-900">اطلاعات دوره</h2>
        <p className="text-sm text-zinc-500 mt-1">مشخصات دوره را تکمیل کنید</p>
      </div>

      {/* title */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700">عنوان دوره</label>

        <input
          {...register("title")}
          placeholder="مثلا آموزش React پیشرفته"
          className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />

        {errors.title?.message && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* description */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700">توضیحات</label>

        <textarea
          {...register("description")}
          rows={5}
          placeholder="توضیحات دوره..."
          className="w-full resize-none rounded-2xl border border-zinc-300 bg-white px-4 py-3 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />
      </div>

      {/* thumbnail mode */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-zinc-700">تصویر دوره</label>

        <div className="flex w-fit rounded-2xl bg-zinc-100 p-1">
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`rounded-xl px-5 py-2 text-sm font-medium transition-all ${
              mode === "upload"
                ? "bg-white shadow text-zinc-900"
                : "text-zinc-500 hover:text-zinc-800"
            }`}
          >
            آپلود عکس
          </button>

          <button
            type="button"
            onClick={() => setMode("url")}
            className={`rounded-xl px-5 py-2 text-sm font-medium transition-all ${
              mode === "url"
                ? "bg-white shadow text-zinc-900"
                : "text-zinc-500 hover:text-zinc-800"
            }`}
          >
            URL تصویر
          </button>
        </div>

        {/* upload */}
        {mode === "upload" && (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-6 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleUpload(file);
              }}
              className="block w-full text-sm text-zinc-500
          file:mr-4 file:rounded-xl file:border-0
          file:bg-blue-600 file:px-4
          file:py-2 file:text-white
          hover:file:bg-blue-700"
            />

            {uploading && (
              <p className="mt-3 text-sm text-blue-600">در حال آپلود...</p>
            )}
          </div>
        )}

        {/* url */}
        {mode === "url" && (
          <input
            {...register("thumbnail_url")}
            placeholder="https://example.com/image.jpg"
            className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        )}
      </div>

      {/* price + category */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700">قیمت</label>

          <input
            {...register("price")}
            placeholder="مثلا 890000"
            className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700">دسته بندی</label>

          <select
            {...register("category_id", {
              valueAsNumber: true,
            })}
            className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          >
            <option value={0}>انتخاب دسته</option>

            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* sub category */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700">زیر دسته</label>

        <select
          {...register("sub_category_id", {
            valueAsNumber: true,
          })}
          className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        >
          <option value={0}>زیر دسته</option>

          {subCategories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* checkboxes */}
      <div className="flex flex-wrap gap-6 rounded-2xl bg-zinc-50 p-4 border border-zinc-200">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            {...register("is_free")}
            className="h-5 w-5 rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-zinc-700">دوره رایگان</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            {...register("is_published")}
            className="h-5 w-5 rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-zinc-700"> نمایش در سایت</span>
        </label>
      </div>

      {/* submit */}
      <button
        type="submit"
        className="w-full rounded-2xl bg-blue-600 px-5 py-4 text-sm font-semibold text-white transition-all hover:scale-[1.01] hover:bg-blue-700 active:scale-[0.99]"
      >
        {submitLabel}
      </button>
    </form>
  );
}
