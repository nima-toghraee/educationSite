"use client";

import { useState, useEffect } from "react";

type Category = { id: number; name: string; parent_id: number | null };

type CourseFormProps = {
  categories: Category[];
  token: string | null;
  initialData?: any; // داده اولیه برای فرم (ویرایش)
  onSubmit: (data: any) => Promise<void>; // تابع ارسال داده
  submitLabel?: string; // متن دکمه
};

export default function CourseForm({
  categories,
  token,
  initialData,
  onSubmit,
  submitLabel = "ذخیره دوره",
}: CourseFormProps) {
  const [parentId, setParentId] = useState<number | null>(null);
  const [subCategories, setSubCategories] = useState<Category[]>([]);
  const [loadingSub, setLoadingSub] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState<any>({
    title: "",
    description: "",
    thumbnail_url: "",
    price: "",
    is_free: false,
    field: "ریاضی",
    grade: "دهم",
    category_id: "",
    sub_category_id: "",
    discount_percent: "",
    is_published: false,
  });

  // مقداردهی اولیه برای ادیت
  useEffect(() => {
    if (!initialData) return;

    // 1️⃣ پر کردن فرم
    setForm((prev: any) => ({
      ...prev,
      ...initialData,
      price: initialData.price ?? "",
      discount_percent: initialData.discount_percent ?? "",
      category_id: initialData.category_id ?? "",
      sub_category_id: initialData.sub_category_id ?? "",
    }));

    // 2️⃣ لود زیرکتگوری در حالت ادیت
    if (initialData.category_id) {
      const loadSubs = async () => {
        setLoadingSub(true);
        try {
          const res = await fetch(
            `http://localhost:5000/api/categories/${initialData.category_id}/children`,
            { headers: { Authorization: token ? `Bearer ${token}` : "" } },
          );

          if (!res.ok) throw new Error("Failed to fetch subcategories");

          const data = await res.json();
          setSubCategories(data);
        } catch (err) {
          console.error(err);
          setSubCategories([]);
        } finally {
          setLoadingSub(false);
        }
      };

      loadSubs();
    }
  }, [initialData, token]);

  // تغییر فیلدها
  const handleChange = async (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type, checked } = e.target;
    setForm((f: any) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "category_id") {
      const newParentId = Number(value);
      setParentId(newParentId);
      setForm((f: any) => ({ ...f, sub_category_id: 0 }));

      if (newParentId) {
        setLoadingSub(true);
        try {
          const res = await fetch(
            `http://localhost:5000/api/categories/${newParentId}/children`,
            { headers: { Authorization: token ? `Bearer ${token}` : "" } },
          );
          if (!res.ok) throw new Error("Failed to fetch subcategories");
          const data = await res.json();
          setSubCategories(data);
        } catch (err) {
          console.error(err);
          setSubCategories([]);
        } finally {
          setLoadingSub(false);
        }
      } else setSubCategories([]);
    }
  };

  // آپلود تصویر
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        headers: { Authorization: token ? `Bearer ${token}` : "" },
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setForm((f: any) => ({ ...f, thumbnail_url: data.url }));
    } catch (err) {
      console.error(err);
      alert("آپلود تصویر موفق نبود");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col">
          <label className="mb-1 text-gray-600">عنوان دوره</label>
          <input
            name="title"
            placeholder="مثال: فیزیک دهم"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* توضیحات */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-600">توضیحات دوره</label>
          <textarea
            name="description"
            placeholder="توضیح کوتاه درباره دوره..."
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* آپلود تصویر */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-600">تصویر دوره</label>
          <input
            type="text"
            name="thumbnail_url"
            placeholder="لینک تصویر (اختیاری)"
            value={form.thumbnail_url}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="text-gray-600"
          />
          {uploading && (
            <p className="text-sm text-gray-500 mt-1">در حال آپلود...</p>
          )}
          {form.thumbnail_url && (
            <img
              src={form.thumbnail_url}
              alt="Thumbnail Preview"
              className="mt-2 max-h-48 rounded-lg shadow-sm object-cover"
            />
          )}
        </div>

        {/* قیمت و گزینه‌ها */}
        <div className="grid grid-cols-2 gap-4">
          <input
            name="price"
            type="number"
            placeholder="قیمت"
            value={form.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            name="discount_percent"
            type="number"
            placeholder="درصد تخفیف"
            value={form.discount_percent}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* چک‌باکس‌ها */}
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_free"
              checked={form.is_free}
              onChange={handleChange}
              className="accent-blue-500"
            />
            رایگان
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_published"
              checked={form.is_published}
              onChange={handleChange}
              className="accent-blue-500"
            />
            انتشار
          </label>
        </div>

        {/* فیلد و پایه تحصیلی */}
        <div className="grid grid-cols-2 gap-4">
          <select
            name="field"
            value={form.field}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="ریاضی">ریاضی</option>
            <option value="تجربی">تجربی</option>
            <option value="عمومی">عمومی</option>
          </select>

          <select
            name="grade"
            value={form.grade}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="دهم">دهم</option>
            <option value="یازدهم">یازدهم</option>
            <option value="دوازدهم">دوازدهم</option>
            <option value="نامشخص">نامشخص</option>
          </select>
        </div>

        {/* دسته‌بندی و زیرکتگوری */}
        <div className="grid grid-cols-2 gap-4">
          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">انتخاب دسته‌بندی</option>
            {categories && categories.length > 0 ? (
              categories
                .filter((c) => !c.parent_id)
                .map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))
            ) : (
              <option disabled>دسته‌بندی موجود نیست</option>
            )}
          </select>

          {loadingSub ? (
            <p className="text-gray-500">در حال بارگذاری زیرکتگوری...</p>
          ) : subCategories.length > 0 ? (
            <select
              name="sub_category_id"
              value={form.sub_category_id}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">انتخاب زیرکتگوری</option>
              {subCategories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          ) : null}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
        >
          {submitLabel}
        </button>
      </form>
    </div>
  );
}
