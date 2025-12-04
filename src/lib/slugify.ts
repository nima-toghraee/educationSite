// src/lib/slugify.ts
export const categorySlugMap: Record<string, string> = {
  "توانمندی ذهن": "mind-skills",
  "ریاضی": "math",
  "فیزیک": "physics",
  // زیر‌دسته‌های توانمندی ذهن:
  "کوچینگ و رشد فردی": "focus",
  "یادگیری 360": "memory",
  "مدیریت استرس و آرامش ذهن": "stress-management",
};

export function slugify(text: string) {
  // اگر در map هست، همون انگلیسی رو برگردون
  if (categorySlugMap[text]) return categorySlugMap[text];
  // اگر نبود، fallback ساده بساز
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "");
}

// و برعکس، برای نمایش فارسی از slug
export function deslugify(slug: string) {
  const entry = Object.entries(categorySlugMap).find(
    ([fa, en]) => en === slug
  );
  return entry ? entry[0] : slug.replace(/-/g, " ");
}
