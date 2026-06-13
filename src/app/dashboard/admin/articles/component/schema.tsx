import { z } from "zod";

export const articleSchema = z.object({
  title: z.string().min(1, "عنوان الزامی است"),
  summary: z.string().optional(),
  content: z.string().min(1, "محتوا الزامی است"),
  thumbnail_url: z.string().optional(),
  category_id: z.number().min(1, "دسته الزامی است"),
});

export type ArticleFormData = z.infer<typeof articleSchema>;
