"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArticleFormData, articleSchema } from "./schema";

type Props = {
  categories: { id: number; name: string }[];
  initialData?: Partial<ArticleFormData>;
  onSubmit: (data: ArticleFormData) => Promise<void>;
  submitLabel?: string;
};

export default function ArticleForm({
  categories,
  initialData,
  onSubmit,
  submitLabel = "ثبت مقاله",
}: Props) {
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: "",
      summary: "",
      content: "",
      thumbnail_url: "",
      category_id: 0,
      ...initialData,
    },
  });

  const thumbnailUrl = watch("thumbnail_url");
  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title || "",
        summary: initialData.summary || "",
        content: initialData.content || "",
        thumbnail_url: initialData.thumbnail || "",
        category_id: initialData.category_id || 0,
      });

      if (initialData.thumbnail_url) {
        setMode("url");
      }
    }
  }, [initialData, reset]);

  // ================= UPLOAD =================
  const handleUpload = async (file: File) => {
    setUploading(true);

    try {
      const res = await fetch(
        `http://localhost:5000/upload/presign?mimetype=${file.type}`,
      );

      const data = await res.json();
      const { uploadUrl, fields, fileUrl } = data;

      const formData = new FormData();

      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      formData.append("file", file);

      await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });

      setValue("thumbnail_url", fileUrl, {
        shouldDirty: true,
        shouldValidate: true,
      });
    } catch (err) {
      console.error("upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  // ================= UI =================
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        console.log("FORM DATA:", data);
        await onSubmit(data);
      })}
      className="space-y-6 rounded-2xl border bg-white p-6 shadow-sm"
    >
      {/* TITLE */}
      <input
        {...register("title")}
        placeholder="عنوان مقاله"
        className="w-full rounded-xl border p-3"
      />
      {errors.title && (
        <p className="text-red-500 text-xs">{errors.title.message}</p>
      )}

      {/* SUMMARY */}
      <textarea
        {...register("summary")}
        placeholder="خلاصه مقاله"
        className="w-full rounded-xl border p-3"
      />

      {/* CONTENT */}
      <textarea
        {...register("content")}
        rows={6}
        placeholder="متن مقاله"
        className="w-full rounded-xl border p-3"
      />
      {errors.content && (
        <p className="text-red-500 text-xs">{errors.content.message}</p>
      )}

      {/* MODE */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode("upload")}
          className={`px-3 py-1 rounded ${
            mode === "upload" ? "bg-blue-600 text-white" : "bg-gray-100"
          }`}
        >
          آپلود
        </button>

        <button
          type="button"
          onClick={() => setMode("url")}
          className={`px-3 py-1 rounded ${
            mode === "url" ? "bg-blue-600 text-white" : "bg-gray-100"
          }`}
        >
          URL
        </button>
      </div>

      {/* UPLOAD */}
      {mode === "upload" && (
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUpload(file);
          }}
        />
      )}

      {/* URL */}
      {mode === "url" && (
        <input
          value={thumbnailUrl || ""}
          onChange={(e) =>
            setValue("thumbnail_url", e.target.value, {
              shouldDirty: true,
            })
          }
          placeholder="https://image.com/file.jpg"
          className="w-full rounded-xl border p-3"
        />
      )}

      {/* PREVIEW */}
      {uploading ? (
        <div className="h-52 animate-pulse rounded-2xl border bg-gray-100" />
      ) : thumbnailUrl ? (
        <div className="overflow-hidden rounded-2xl border">
          <img src={thumbnailUrl} className="h-52 w-full object-cover" />
        </div>
      ) : null}

      {/* CATEGORY */}
      <select
        {...register("category_id", { valueAsNumber: true })}
        className="w-full rounded-xl border p-3"
      >
        <option value={0}>انتخاب دسته</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={isSubmitting || uploading}
        className="w-full rounded-xl bg-blue-600 p-3 text-white disabled:opacity-50"
      >
        {uploading ? "در حال آپلود..." : submitLabel}
      </button>
    </form>
  );
}
