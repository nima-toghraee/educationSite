import { z } from "zod";

export const courseSchema = z.object({
  title: z.string().min(1, "عنوان الزامی است"),
  description: z.string().optional(),
  thumbnail_url: z.string().url().optional().or(z.literal("")),
  price: z.string().min(1),
  is_free: z.boolean(),
  field: z.string(),
  grade: z.string(),
  category_id: z.number(),
  sub_category_id: z.number().optional(),
  discount_percent: z.string().optional(),
  is_published: z.boolean(),
});

export type CourseFormData = z.infer<typeof courseSchema>;
