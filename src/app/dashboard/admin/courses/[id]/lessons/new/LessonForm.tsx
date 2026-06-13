"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lesson } from "@/types/lesson";

const lessonSchema = z.object({
  title: z.string().min(1, "عنوان درس الزامی است"),
  description: z.string().optional(),
  video_url: z.string().min(1, "ویدیو الزامی است"),
  is_preview: z.boolean(),
  order_index: z.coerce.number().min(1, "حداقل مقدار 1 است"),

  duration: z.coerce.number().min(0, "مدت نامعتبر است"),

  course_id: z.coerce.number().min(1, "انتخاب دوره الزامی است"),
});

type LessonFormData = z.input<typeof lessonSchema>;

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
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const [uploading, setUploading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LessonFormData>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: "",
      description: "",
      video_url: "",
      is_preview: false,
      order_index: 1,
      duration: 0,
      course_id: courses[0]?.id || 0,
    },
  });

  const videoUrl = watch("video_url");

  // edit mode
  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title || "",
        description: initialData.description || "",
        video_url: initialData.video_url || "",
        is_preview: initialData.is_preview || false,
        order_index: initialData.order_index || 1,
        duration: initialData.duration || 0,
        course_id: initialData.course_id || courses[0]?.id || 0,
      });

      if (initialData.video_url) {
        setMode("url");
      }
    }
  }, [initialData, reset, courses]);

  // set first course after API load
  useEffect(() => {
    if (courses.length > 0) {
      setValue("course_id", courses[0].id);
    }
  }, [courses, setValue]);

  // upload video
  const handleUpload = async (file: File) => {
    if (file.size > 200 * 1024 * 1024) {
      alert("حجم ویدیو نباید بیشتر از 200MB باشد");
      return;
    }

    setUploading(true);

    try {
      const res = await fetch(
        `http://localhost:5000/upload/presign?mimetype=${file.type}`,
      );

      if (!res.ok) {
        throw new Error("Presign failed");
      }

      const { uploadUrl, fileUrl, fields } = await res.json();

      const formData = new FormData();

      // فیلدهای لازم S3
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      // فایل باید آخر اضافه شود
      formData.append("file", file);

      const uploadRes = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        throw new Error("Upload failed");
      }

      setValue("video_url", fileUrl, {
        shouldValidate: true,
      });
    } catch (err) {
      console.error(err);
      alert("آپلود ویدیو ناموفق بود");
    } finally {
      setUploading(false);
    }
  };

  const submitHandler = async (data: LessonFormData) => {
    if (uploading) {
      alert("لطفاً تا پایان آپلود صبر کنید");
      return;
    }

    await onSubmit(data as Lesson);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="space-y-8 rounded-3xl border border-zinc-200 bg-white/80 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.05)] backdrop-blur-sm"
    >
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-zinc-900">اطلاعات درس</h2>

        <p className="mt-1 text-sm text-zinc-500">
          اطلاعات ویدیو و تنظیمات درس را وارد کنید
        </p>
      </div>

      {/* title */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700">عنوان درس</label>

        <input
          {...register("title")}
          placeholder="مثلاً فصل اول: معادلات درجه دوم"
          className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 outline-none transition focus:border-zinc-400 focus:ring-4 focus:ring-zinc-100"
        />

        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* description */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700">توضیحات</label>

        <textarea
          {...register("description")}
          rows={5}
          placeholder="توضیحات مربوط به این درس..."
          className="min-h-[120px] w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 outline-none transition focus:border-zinc-400 focus:ring-4 focus:ring-zinc-100"
        />
      </div>

      {/* upload mode switch */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-zinc-700">نوع ویدیو</label>

        <div className="flex rounded-2xl bg-zinc-100 p-1">
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium transition ${
              mode === "upload"
                ? "bg-white shadow-sm text-zinc-900"
                : "text-zinc-500 hover:text-zinc-800"
            }`}
          >
            آپلود ویدیو
          </button>

          <button
            type="button"
            onClick={() => setMode("url")}
            className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium transition ${
              mode === "url"
                ? "bg-white shadow-sm text-zinc-900"
                : "text-zinc-500 hover:text-zinc-800"
            }`}
          >
            لینک ویدیو
          </button>
        </div>
      </div>

      {/* upload */}
      {mode === "upload" && (
        <div className="space-y-3 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-6">
          <input
            type="file"
            accept="video/*"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (file) {
                handleUpload(file);
              }
            }}
            className="block w-full text-sm text-zinc-500
        file:mr-4
        file:rounded-xl
        file:border-0
        file:bg-zinc-900
        file:px-4
        file:py-2
        file:text-sm
        file:font-medium
        file:text-white
        hover:file:bg-zinc-800"
          />

          <div className="flex items-center justify-between text-sm text-zinc-500">
            <span>حداکثر حجم مجاز: 200MB</span>

            {uploading && (
              <span className="font-medium text-blue-600">در حال آپلود...</span>
            )}
          </div>
        </div>
      )}

      {/* url */}
      {mode === "url" && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700">
            لینک ویدیو
          </label>

          <input
            {...register("video_url")}
            placeholder="https://example.com/video.mp4"
            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 outline-none transition focus:border-zinc-400 focus:ring-4 focus:ring-zinc-100"
          />

          {errors.video_url && (
            <p className="text-sm text-red-500">{errors.video_url.message}</p>
          )}
        </div>
      )}

      {/* video preview */}
      {videoUrl && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700">
            پیش‌نمایش ویدیو
          </label>

          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-black">
            <video controls className="w-full" src={videoUrl} />
          </div>
        </div>
      )}

      {/* order + duration */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700">
            ترتیب نمایش
          </label>

          <input
            type="number"
            {...register("order_index")}
            placeholder="1"
            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 outline-none transition focus:border-zinc-400 focus:ring-4 focus:ring-zinc-100"
          />

          {errors.order_index && (
            <p className="text-sm text-red-500">{errors.order_index.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700">
            مدت ویدیو (دقیقه)
          </label>

          <input
            type="number"
            {...register("duration")}
            placeholder="30"
            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 outline-none transition focus:border-zinc-400 focus:ring-4 focus:ring-zinc-100"
          />

          {errors.duration && (
            <p className="text-sm text-red-500">{errors.duration.message}</p>
          )}
        </div>
      </div>

      {/* preview checkbox */}
      <div className="rounded-2xl border border-zinc-200 p-4">
        <label className="flex cursor-pointer items-center justify-between">
          <div>
            <p className="font-medium text-zinc-800">پیش‌نمایش رایگان</p>

            <p className="text-sm text-zinc-500">
              دانش‌آموز بدون خرید بتواند این درس را ببیند
            </p>
          </div>

          <input
            type="checkbox"
            {...register("is_preview")}
            className="h-5 w-5 rounded"
          />
        </label>
      </div>

      {/* course select */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700">دوره مربوطه</label>

        <select
          {...register("course_id")}
          className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 outline-none transition focus:border-zinc-400 focus:ring-4 focus:ring-zinc-100"
        >
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>

        {errors.course_id && (
          <p className="text-sm text-red-500">{errors.course_id.message}</p>
        )}
      </div>

      {/* submit */}
      <button
        type="submit"
        disabled={uploading || isSubmitting}
        className="flex w-full items-center justify-center rounded-2xl bg-zinc-900 px-6 py-4 font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {uploading
          ? "در حال آپلود..."
          : isSubmitting
            ? "در حال ذخیره..."
            : submitLabel}
      </button>
    </form>
  );
}
